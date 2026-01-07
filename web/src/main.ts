// Main entry point for Lambda Calculus CRDT Editor

import { LambdaEditor } from './editor';
import * as crdt from '../public/crdt'

async function main() {
  const statusElement = document.getElementById('status')!;
  const connectBtn = document.getElementById('connect-btn') as HTMLButtonElement;
  const disconnectBtn = document.getElementById('disconnect-btn') as HTMLButtonElement;
  const networkStatus = document.getElementById('network-status')!;

  try {
    statusElement.textContent = 'Loading MoonBit module...';

    statusElement.textContent = 'Initializing editor...';
    const agentId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const editor = new LambdaEditor(agentId);

    statusElement.textContent = `Ready! ID: ${agentId}`;
    statusElement.className = 'status success';
    console.log('Editor initialized with agent ID:', agentId);

    // Network sync controls
    connectBtn.addEventListener('click', async () => {
      try {
        connectBtn.disabled = true;
        networkStatus.textContent = 'Connecting...';
        networkStatus.style.color = '#007acc';

        // Auto-detect signaling server URL
        // Use environment variable if set, otherwise auto-detect
        const wsUrl = import.meta.env.VITE_SIGNALING_URL || (
          window.location.hostname === 'localhost'
            ? 'ws://localhost:8080'
            : 'wss://crdt-signaling-server.koji-ishimoto.workers.dev'
        );

        console.log('Connecting to signaling server:', wsUrl);
        await editor.enableNetworkSync(wsUrl);

        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
        networkStatus.textContent = 'Connected (0 peers)';
        networkStatus.style.color = '#4ec9b0';

        // Poll for network status updates
        const statusInterval = setInterval(() => {
          const status = editor.getNetworkStatus();
          if (status) {
            if (status.connected) {
              networkStatus.textContent = `Connected (${status.peers} peer${status.peers !== 1 ? 's' : ''})`;
              networkStatus.style.color = '#4ec9b0';
            } else {
              networkStatus.textContent = 'Disconnected';
              networkStatus.style.color = '#ff0000';
              clearInterval(statusInterval);
            }
          }
        }, 1000);

        // Store interval for cleanup
        (disconnectBtn as any).statusInterval = statusInterval;
      } catch (error) {
        console.error('Failed to enable network sync:', error);
        networkStatus.textContent = `Connection failed: ${error}`;
        networkStatus.style.color = '#ff0000';
        connectBtn.disabled = false;
      }
    });

    disconnectBtn.addEventListener('click', () => {
      editor.disableNetworkSync();
      connectBtn.disabled = false;
      disconnectBtn.disabled = true;
      networkStatus.textContent = 'Disconnected';
      networkStatus.style.color = '#858585';

      // Clear status interval
      if ((disconnectBtn as any).statusInterval) {
        clearInterval((disconnectBtn as any).statusInterval);
      }
    });
  } catch (error) {
    console.error('Failed to initialize:', error);
    statusElement.textContent = `Error: ${error}`;
    statusElement.className = 'status error';
  }
}

main();
