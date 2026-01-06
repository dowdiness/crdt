# Network Synchronization for CRDT Collaboration

This document describes how to use the network synchronization feature for real-time collaborative editing.

## Architecture

The network sync implementation uses:
- **WebSocket** for signaling and peer discovery
- **WebRTC Data Channels** for peer-to-peer operation broadcasting
- **eg-walker CRDT** for conflict-free merging

```
┌─────────────┐     WebSocket      ┌─────────────────┐      WebSocket     ┌─────────────┐
│   Browser   │ ◄─────Signaling───►│ Signaling Server│◄────Signaling─────►│   Browser   │
│   Peer A    │                     └─────────────────┘                    │   Peer B    │
└─────────────┘                                                            └─────────────┘
       │                                                                          │
       └────────────────────────WebRTC Data Channel───────────────────────────────┘
                            (Direct peer-to-peer CRDT operations)
```

## Quick Start

### 1. Start the Signaling Server

The signaling server coordinates peer discovery and WebRTC setup:

```bash
# From the crdt directory
cd web
node signaling-server.js
```

The server will start on `ws://localhost:8080` by default.

### 2. Build and Start the Web Interface

```bash
# Build MoonBit code for JavaScript
cd ../
moon build --target js
cp target/js/release/build/crdt.js web/public/
cp target/js/release/build/crdt.d.ts web/public/

# Start the dev server
cd web
npm run dev
```

### 3. Open Multiple Browser Windows

1. Open `http://localhost:5173` in multiple browser windows/tabs
2. Click "Connect to Network" in each window
3. Start typing in one window - changes appear in all connected windows!

## How It Works

### Operation Broadcasting

When you type in the editor:

1. **Local Edit** - Text is inserted/deleted locally
2. **CRDT Operation** - MoonBit creates a CRDT operation with causal metadata
3. **Broadcast** - Operation is serialized to JSON and sent to all peers via WebRTC
4. **Remote Merge** - Each peer receives the operation and calls `merge_operations()`
5. **Convergence** - The eg-walker ensures all peers converge to the same state

### Conflict Resolution

The CRDT automatically resolves conflicts:

```
Peer A types "Hello" at position 0
Peer B types "World" at position 0 (concurrently)

Result: Both peers converge to either "HelloWorld" or "WorldHello"
(Deterministic ordering based on agent IDs and Lamport timestamps)
```

### Network Messages

```typescript
interface SyncMessage {
  type: 'ops' | 'frontier' | 'request_sync';
  sender: string;              // Agent ID
  ops?: string;                // JSON-encoded operations
  frontier?: string;           // JSON-encoded version frontier
}
```

## API Reference

### LambdaEditor

```typescript
class LambdaEditor {
  // Enable network synchronization
  async enableNetworkSync(wsUrl: string): Promise<void>

  // Disable network synchronization
  disableNetworkSync(): void

  // Get current network status
  getNetworkStatus(): { connected: boolean; peers: number } | null
}
```

### NetworkSync

```typescript
class NetworkSync {
  constructor(handle: number, agentId: string)

  // Connect to signaling server
  async connect(wsUrl: string): Promise<void>

  // Disconnect from network
  disconnect(): void

  // Broadcast current operations to peers
  broadcastOperations(): void

  // Set callback for remote text changes
  setTextChangeCallback(callback: (text: string) => void): void

  // Get connection status
  getStatus(): { connected: boolean; peers: number }
}
```

## Signaling Server API

The signaling server accepts WebSocket connections and handles these message types:

### Client → Server

```json
// Join the network
{
  "type": "join",
  "agentId": "user-123..."
}

// WebRTC offer
{
  "type": "offer",
  "to": "peer-id",
  "from": "my-id",
  "offer": { /* RTCSessionDescription */ }
}

// WebRTC answer
{
  "type": "answer",
  "to": "peer-id",
  "from": "my-id",
  "answer": { /* RTCSessionDescription */ }
}

// ICE candidate
{
  "type": "ice_candidate",
  "to": "peer-id",
  "from": "my-id",
  "candidate": { /* RTCIceCandidate */ }
}
```

### Server → Client

```json
// New peer joined
{
  "type": "peer_joined",
  "peerId": "new-peer-id"
}

// Current peer list
{
  "type": "peer_list",
  "peers": ["peer-1", "peer-2", ...]
}

// Peer left
{
  "type": "peer_left",
  "peerId": "departed-peer-id"
}
```

## Deployment

### Production Signaling Server

For production use, deploy the signaling server with:

```bash
# Set custom port
PORT=3000 node signaling-server.js

# Or use a process manager
pm2 start signaling-server.js --name crdt-signaling
```

### Environment Variables

- `PORT` - WebSocket server port (default: 8080)

### Security Considerations

⚠️ **Important**: This implementation is for development/demo purposes. For production:

1. **Add Authentication** - Verify peer identities
2. **Use WSS** - Encrypt WebSocket connections with TLS
3. **Rate Limiting** - Prevent abuse of signaling server
4. **TURN Server** - Add TURN server for NAT traversal
5. **Access Control** - Implement room/document-level permissions

## Troubleshooting

### "Connection failed" Error

- Ensure signaling server is running: `node web/signaling-server.js`
- Check console for WebSocket connection errors
- Verify port 8080 is not blocked by firewall

### Peers Not Connecting

- Check browser console for WebRTC errors
- Ensure both peers are connected to signaling server
- Try refreshing both browser windows
- Check NAT/firewall settings (may need TURN server)

### Changes Not Syncing

- Verify both peers show "Connected (1 peer)" status
- Check browser console for merge errors
- Ensure operations are being broadcast (check Network tab)

### Performance Issues

- Reduce broadcast frequency (increase debounce timeout)
- Use delta encoding for large documents
- Implement version vectors for efficient frontier tracking

## Advanced: Custom Network Layer

You can implement your own network layer by:

1. Getting operations: `crdt.get_operations_json(handle)`
2. Getting frontier: `crdt.get_frontier_json(handle)`
3. Broadcasting via your transport (WebSocket, HTTP, etc.)
4. Receiving operations and calling: `crdt.merge_operations(handle, ops, frontier)`

Example:

```typescript
// Send operations
const ops = crdt.get_operations_json(handle);
const frontier = crdt.get_frontier_json(handle);
myTransport.send({ ops, frontier });

// Receive operations
myTransport.onMessage((data) => {
  crdt.merge_operations(handle, data.ops, data.frontier);
  updateUI();
});
```

## References

- [eg-walker Paper](https://arxiv.org/abs/2409.14252) - The CRDT algorithm
- [WebRTC Data Channels](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels)
- [CRDT Implementation Guide](./EG_WALKER_IMPLEMENTATION.md)
- [Branch System Documentation](./WALKER_USAGE.md)

## Future Improvements

- [ ] Persistent storage with operation log replay
- [ ] Version vectors for efficient frontier compression
- [ ] Delta encoding for reduced bandwidth
- [ ] Document rooms/channels
- [ ] Presence awareness (cursor positions, user names)
- [ ] Operation compression (gzip, brotli)
- [ ] Reconnection handling with state sync
- [ ] Offline support with eventual consistency
