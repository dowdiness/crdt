/**
 * Network Sync Module for CRDT Collaboration
 *
 * Implements peer-to-peer synchronization using WebSocket for signaling
 * and WebRTC for direct peer communication.
 */

import * as crdt from '../public/crdt';

export interface SyncMessage {
  type: 'ops' | 'frontier' | 'request_sync';
  sender: string;
  ops?: string;  // JSON-encoded operations
  frontier?: string;  // JSON-encoded frontier
}

export interface PeerConnection {
  id: string;
  connection: RTCPeerConnection;
  dataChannel?: RTCDataChannel;
}

export class NetworkSync {
  private handle: number;
  private agentId: string;
  private ws: WebSocket | null = null;
  private peers: Map<string, PeerConnection> = new Map();
  private onTextChange?: (text: string) => void;

  constructor(handle: number, agentId: string) {
    this.handle = handle;
    this.agentId = agentId;
  }

  /**
   * Connect to signaling server for peer discovery
   */
  async connect(wsUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[NetworkSync] Connected to signaling server');
        // Announce presence
        this.ws?.send(JSON.stringify({
          type: 'join',
          agentId: this.agentId
        }));
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error('[NetworkSync] WebSocket error:', error);
        reject(error);
      };

      this.ws.onmessage = (event) => {
        this.handleSignalingMessage(JSON.parse(event.data));
      };

      this.ws.onclose = () => {
        console.log('[NetworkSync] Disconnected from signaling server');
      };
    });
  }

  /**
   * Disconnect from network
   */
  disconnect(): void {
    // Close all peer connections
    for (const [peerId, peer] of this.peers) {
      peer.connection.close();
      this.peers.delete(peerId);
    }

    // Close WebSocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Broadcast local operations to all peers
   */
  broadcastOperations(): void {
    const ops = crdt.get_operations_json(this.handle);
    const frontier = crdt.get_frontier_json(this.handle);

    console.log('[NetworkSync] Broadcasting operations:', {
      ops: ops.substring(0, 100) + '...',
      frontier,
      peers: this.peers.size
    });

    const message: SyncMessage = {
      type: 'ops',
      sender: this.agentId,
      ops,
      frontier
    };

    const messageStr = JSON.stringify(message);
    console.log('[NetworkSync] Message size:', messageStr.length, 'bytes');

    this.broadcast(messageStr);
  }

  /**
   * Handle incoming operations from remote peer
   */
  private handleRemoteOps(ops: string, frontier: string, sender: string): void {
    console.log(`[NetworkSync] Received ops from ${sender}`);
    console.log('Remote ops:', ops);
    console.log('Remote frontier:', frontier);

    // Merge remote operations into local state
    crdt.merge_operations(this.handle, ops, frontier);

    // Notify UI of change
    if (this.onTextChange) {
      const newText = crdt.get_text(this.handle);
      this.onTextChange(newText);
    }
  }

  /**
   * Set callback for text changes from network
   */
  setTextChangeCallback(callback: (text: string) => void): void {
    this.onTextChange = callback;
  }

  /**
   * Handle signaling messages for WebRTC setup
   */
  private async handleSignalingMessage(data: any): Promise<void> {
    console.log('[NetworkSync] Signaling message:', data.type, data);

    switch (data.type) {
      case 'peer_list':
        console.log('[NetworkSync] Received peer list:', data.peers);
        // Connect to all existing peers - but only if we have lower ID (avoid glare)
        for (const peerId of data.peers) {
          // Use lexicographic comparison to determine who initiates
          if (this.agentId < peerId) {
            console.log('[NetworkSync] Initiating connection to existing peer:', peerId);
            await this.connectToPeer(peerId);
          } else {
            console.log('[NetworkSync] Waiting for offer from existing peer:', peerId);
          }
        }
        break;

      case 'peer_joined':
        console.log('[NetworkSync] Peer joined:', data.peerId);
        // Only initiate if we have lower ID (avoid glare)
        if (this.agentId < data.peerId) {
          console.log('[NetworkSync] Initiating connection to new peer');
          await this.connectToPeer(data.peerId);
        } else {
          console.log('[NetworkSync] Waiting for offer from new peer');
        }
        break;

      case 'offer':
        console.log('[NetworkSync] Received offer from:', data.from);
        await this.handleOffer(data);
        break;

      case 'answer':
        console.log('[NetworkSync] Received answer from:', data.from);
        await this.handleAnswer(data);
        break;

      case 'ice_candidate':
        console.log('[NetworkSync] Received ICE candidate from:', data.from);
        await this.handleIceCandidate(data);
        break;

      case 'peer_left':
        console.log('[NetworkSync] Peer left:', data.peerId);
        const peer = this.peers.get(data.peerId);
        if (peer) {
          peer.connection.close();
          this.peers.delete(data.peerId);
        }
        break;

      case 'sync_request':
        // Send current state to requesting peer
        this.sendSyncResponse(data.from);
        break;
    }
  }

  /**
   * Connect to a peer using WebRTC
   */
  private async connectToPeer(peerId: string): Promise<void> {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    });

    const dataChannel = pc.createDataChannel('crdt-sync');
    this.setupDataChannel(dataChannel, peerId);

    this.peers.set(peerId, { id: peerId, connection: pc, dataChannel });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.ws?.send(JSON.stringify({
          type: 'ice_candidate',
          to: peerId,
          from: this.agentId,
          candidate: event.candidate
        }));
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    this.ws?.send(JSON.stringify({
      type: 'offer',
      to: peerId,
      from: this.agentId,
      offer
    }));
  }

  /**
   * Handle WebRTC offer from peer
   */
  private async handleOffer(data: any): Promise<void> {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    });

    pc.ondatachannel = (event) => {
      this.setupDataChannel(event.channel, data.from);
    };

    this.peers.set(data.from, { id: data.from, connection: pc });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.ws?.send(JSON.stringify({
          type: 'ice_candidate',
          to: data.from,
          from: this.agentId,
          candidate: event.candidate
        }));
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    this.ws?.send(JSON.stringify({
      type: 'answer',
      to: data.from,
      from: this.agentId,
      answer
    }));
  }

  /**
   * Handle WebRTC answer from peer
   */
  private async handleAnswer(data: any): Promise<void> {
    const peer = this.peers.get(data.from);
    if (peer) {
      await peer.connection.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  }

  /**
   * Handle ICE candidate from peer
   */
  private async handleIceCandidate(data: any): Promise<void> {
    const peer = this.peers.get(data.from);
    if (peer && data.candidate) {
      await peer.connection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }

  /**
   * Setup data channel for CRDT sync
   */
  private setupDataChannel(channel: RTCDataChannel, peerId: string): void {
    console.log(`[NetworkSync] Setting up data channel with ${peerId}`);

    channel.onopen = () => {
      console.log(`[NetworkSync] ✅ Data channel opened with ${peerId}`);
      // Request full sync when connection establishes
      const syncRequest = JSON.stringify({
        type: 'request_sync',
        sender: this.agentId
      });
      console.log(`[NetworkSync] Sending sync request to ${peerId}`);
      channel.send(syncRequest);
    };

    channel.onmessage = (event) => {
      console.log(`[NetworkSync] 📨 Received message from ${peerId}:`, event.data.substring(0, 100) + '...');

      try {
        const message: SyncMessage = JSON.parse(event.data);
        console.log(`[NetworkSync] Message type: ${message.type} from ${message.sender}`);

        switch (message.type) {
          case 'ops':
            if (message.ops && message.frontier) {
              console.log(`[NetworkSync] Processing ops from ${message.sender}`);
              this.handleRemoteOps(message.ops, message.frontier, message.sender);
            } else {
              console.warn('[NetworkSync] Received ops message without ops or frontier');
            }
            break;

          case 'request_sync':
            console.log(`[NetworkSync] Received sync request from ${message.sender}`);
            // Send full state
            const ops = crdt.get_operations_json(this.handle);
            const frontier = crdt.get_frontier_json(this.handle);
            console.log(`[NetworkSync] Sending full state: ${ops.length} bytes`);
            channel.send(JSON.stringify({
              type: 'ops',
              sender: this.agentId,
              ops,
              frontier
            }));
            break;

          default:
            console.warn(`[NetworkSync] Unknown message type: ${message.type}`);
        }
      } catch (error) {
        console.error('[NetworkSync] Error parsing message:', error, event.data);
      }
    };

    channel.onerror = (error) => {
      console.error(`[NetworkSync] Data channel error with ${peerId}:`, error);
    };

    channel.onclose = () => {
      console.log(`[NetworkSync] Data channel closed with ${peerId}`);
    };

    // Update peer with data channel
    const peer = this.peers.get(peerId);
    if (peer) {
      peer.dataChannel = channel;
    }
  }

  /**
   * Broadcast message to all connected peers
   */
  private broadcast(message: string): void {
    let sentCount = 0;
    for (const [peerId, peer] of this.peers) {
      if (peer.dataChannel) {
        console.log(`[NetworkSync] Data channel to ${peerId}: ${peer.dataChannel.readyState}`);
        if (peer.dataChannel.readyState === 'open') {
          peer.dataChannel.send(message);
          sentCount++;
          console.log(`[NetworkSync] Sent message to ${peerId}`);
        }
      } else {
        console.log(`[NetworkSync] No data channel for ${peerId}`);
      }
    }
    console.log(`[NetworkSync] Broadcast complete: sent to ${sentCount}/${this.peers.size} peers`);
  }

  /**
   * Send sync response to a specific peer
   */
  private sendSyncResponse(peerId: string): void {
    const peer = this.peers.get(peerId);
    if (peer && peer.dataChannel && peer.dataChannel.readyState === 'open') {
      const ops = crdt.get_operations_json(this.handle);
      const frontier = crdt.get_frontier_json(this.handle);

      peer.dataChannel.send(JSON.stringify({
        type: 'ops',
        sender: this.agentId,
        ops,
        frontier
      }));
    }
  }

  /**
   * Get connection status
   */
  getStatus(): { connected: boolean; peers: number } {
    const connectedPeers = Array.from(this.peers.values()).filter(
      peer => peer.dataChannel && peer.dataChannel.readyState === 'open'
    ).length;

    return {
      connected: this.ws !== null && this.ws.readyState === WebSocket.OPEN,
      peers: connectedPeers
    };
  }
}
