// Lambda Calculus Editor with CRDT backend

import { SyntaxHighlighter } from './syntax-highlighter';
import { NetworkSync } from './network';
import * as crdt from '../public/crdt'

export interface ASTNode {
  kind: [string] | [string, string | number]; // MoonBit enum serialized as array
  start: number;
  end: number;
  node_id: number;
  children: ASTNode[];
}

export class LambdaEditor {
  private handle: number;
  private agentId: string;
  private editorElement: HTMLDivElement;
  private astElement: HTMLPreElement;
  private errorElement: HTMLUListElement;
  private highlighter: SyntaxHighlighter;
  private updating: boolean = false;
  private networkSync: NetworkSync | null = null;

  constructor(agentId: string) {
    this.agentId = agentId;
    console.log('Creating editor with agent ID:', agentId);
    console.log('create_editor function:', crdt.create_editor);

    try {
      this.handle = crdt.create_editor(agentId);
      console.log('Editor handle created:', this.handle);
    } catch (error) {
      console.error('Failed to create editor:', error);
      throw error;
    }

    this.editorElement = document.getElementById('editor') as HTMLDivElement;
    this.astElement = document.getElementById('ast-output') as HTMLPreElement;
    this.errorElement = document.getElementById('error-output') as HTMLUListElement;

    this.highlighter = new SyntaxHighlighter();

    this.attachEventHandlers();
  }

  private lastSyncedText: string = '';
  private updateScheduled: boolean = false;

  private attachEventHandlers(): void {
    // Update AST/errors after user stops typing
    this.editorElement.addEventListener('input', () => {
      if (this.updateScheduled) return;

      this.updateScheduled = true;
      requestAnimationFrame(() => {
        this.updateScheduled = false;
        this.updateUI();
      });
    });
  }

  private updateUI(): void {
    if (this.updating) return;
    this.updating = true;

    try {

      const currentText = this.editorElement.textContent || '';

      // Sync DOM text to MoonBit if it has changed
      if (currentText !== this.lastSyncedText) {
        try {
          this.syncTextToMoonBit(currentText);
          this.lastSyncedText = currentText;
        } catch (syncError) {
          console.error('Failed to sync text to MoonBit:', syncError);
          // Continue anyway - try to read state even if sync failed
        }
      }

      // Get AST and errors from MoonBit
      try {
        const astJson = crdt.get_ast_json(this.handle);
        const errorsJson = crdt.get_errors_json(this.handle);

        console.log('Raw AST JSON:', astJson);
        console.log('Raw errors JSON:', errorsJson);

        // Validate JSON before parsing
        if (!astJson || typeof astJson !== 'string') {
          throw new Error('Invalid AST JSON: ' + typeof astJson);
        }
        if (!errorsJson || typeof errorsJson !== 'string') {
          throw new Error('Invalid errors JSON: ' + typeof errorsJson);
        }

        const ast: ASTNode = JSON.parse(astJson);
        const errors: string[] = JSON.parse(errorsJson);

        // Update side panels with current AST and errors
        this.updateASTDisplay(ast);
        this.updateErrorsDisplay(errors);
      } catch (parseError) {
        console.error('Failed to parse AST/errors:', parseError);
        const errorMsg = parseError instanceof Error ? parseError.message : String(parseError);
        this.updateErrorsDisplay(['Parse error: ' + errorMsg]);
      }
    } catch (error) {
      console.error('Unexpected error in updateUI:', error);
    } finally {
      this.updating = false;
    }
  }

  private syncTextToMoonBit(newText: string): void {
    try {
      // Use the new set_text function for efficient sync
      crdt.set_text(this.handle, newText);
    } catch (error) {
      console.error('Error in syncTextToMoonBit:', error);
      throw error;
    }
  }


  private updateASTDisplay(ast: ASTNode): void {
    const prettyPrinted = this.highlighter.printTermNode(ast);
    const treeView = this.highlighter.formatAST(ast);
    this.astElement.textContent = `Expression: ${prettyPrinted}\n\nTree:\n${treeView}`;
  }

  private updateErrorsDisplay(errors: string[]): void {
    if (errors.length === 0) {
      this.errorElement.innerHTML = '<li>No errors ✓</li>';
    } else {
      this.errorElement.innerHTML = errors
        .map(err => `<li class="error-item">${this.escapeHTML(err)}</li>`)
        .join('');
    }
  }

  private escapeHTML(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getText(): string {
    return crdt.get_text(this.handle);
  }

  getHandle(): number {
    return this.handle;
  }

  getAgentId(): string {
    return this.agentId;
  }

  /**
   * Enable network synchronization
   */
  async enableNetworkSync(wsUrl: string): Promise<void> {
    if (this.networkSync) {
      console.warn('Network sync already enabled');
      return;
    }

    this.networkSync = new NetworkSync(this.handle, this.agentId);

    // Set callback for remote text changes
    this.networkSync.setTextChangeCallback((remoteText) => {
      this.handleRemoteTextChange(remoteText);
    });

    // Connect to signaling server
    await this.networkSync.connect(wsUrl);

    // Broadcast operations on local changes
    this.editorElement.addEventListener('input', () => {
      if (this.networkSync && !this.updating) {
        // Debounce broadcasts
        setTimeout(() => {
          this.networkSync?.broadcastOperations();
        }, 100);
      }
    });

    console.log('[LambdaEditor] Network sync enabled');
  }

  /**
   * Disable network synchronization
   */
  disableNetworkSync(): void {
    if (this.networkSync) {
      this.networkSync.disconnect();
      this.networkSync = null;
      console.log('[LambdaEditor] Network sync disabled');
    }
  }

  /**
   * Get network status
   */
  getNetworkStatus(): { connected: boolean; peers: number } | null {
    return this.networkSync?.getStatus() ?? null;
  }

  /**
   * Handle text changes from remote peers
   */
  private handleRemoteTextChange(remoteText: string): void {
    console.log('[LambdaEditor] Received remote text change');

    // Update DOM without triggering local sync
    this.updating = true;
    this.editorElement.textContent = remoteText;
    this.lastSyncedText = remoteText;

    // Update AST and errors
    try {
      const astJson = crdt.get_ast_json(this.handle);
      const errorsJson = crdt.get_errors_json(this.handle);

      const ast: ASTNode = JSON.parse(astJson);
      const errors: string[] = JSON.parse(errorsJson);

      this.updateASTDisplay(ast);
      this.updateErrorsDisplay(errors);
    } catch (error) {
      console.error('Error updating UI after remote change:', error);
    } finally {
      this.updating = false;
    }
  }
}
