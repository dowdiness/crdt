// Main entry point for Lambda Calculus CRDT Editor

import { LambdaEditor } from './editor';
import * as crdt from '../../target/js/release/build/crdt'

async function main() {
  const statusElement = document.getElementById('status')!;

  try {
    statusElement.textContent = 'Loading MoonBit module...';

    statusElement.textContent = 'Initializing editor...';
    const agentId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const editor = new LambdaEditor(agentId);

    statusElement.textContent = `Ready! ID: ${agentId}`;
    statusElement.className = 'status success';
    console.log('Editor initialized with agent ID:', agentId);
  } catch (error) {
    console.error('Failed to initialize:', error);
    statusElement.textContent = `Error: ${error}`;
    statusElement.className = 'status error';
  }
}

main();
