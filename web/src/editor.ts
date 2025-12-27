// Lambda Calculus Editor with CRDT backend

import { SyntaxHighlighter } from './syntax-highlighter';
import * as crdt from '../../target/js/release/build/crdt'

export interface ASTNode {
  kind: {
    tag: string;
    value?: string | number;
  };
  start: number;
  end: number;
  node_id: number;
  children: ASTNode[];
}

export class LambdaEditor {
  private handle: number;
  private editorElement: HTMLDivElement;
  private astElement: HTMLPreElement;
  private errorElement: HTMLUListElement;
  private highlighter: SyntaxHighlighter;
  private updating: boolean = false;

  constructor(agentId: string) {
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

      // Sync DOM text to WASM if it has changed
      if (currentText !== this.lastSyncedText) {
        try {
          this.syncTextToWasm(currentText);
          this.lastSyncedText = currentText;
        } catch (syncError) {
          console.error('Failed to sync text to WASM:', syncError);
          // Continue anyway - try to read state even if sync failed
        }
      }

      // Get AST and errors from WASM
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

  private syncTextToWasm(newText: string): void {
    try {
      // Use the new set_text function for efficient sync
      crdt.set_text(this.handle, newText);
    } catch (error) {
      console.error('Error in syncTextToWasm:', error);
      throw error;
    }
  }


  private updateASTDisplay(ast: ASTNode): void {
    const formatted = this.highlighter.formatAST(ast);
    this.astElement.textContent = formatted;
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
}
