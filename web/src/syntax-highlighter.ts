// Syntax highlighting for lambda calculus

import { ASTNode } from './editor';

interface HighlightSpan {
  start: number;
  end: number;
  className: string;
}

export class SyntaxHighlighter {
  highlight(text: string, ast: ASTNode, errors: string[]): string {
    const spans: HighlightSpan[] = [];

    // Collect syntax highlighting spans from AST
    this.collectSpans(ast, spans);

    // Sort spans by start position
    spans.sort((a, b) => a.start - b.start);

    // Build HTML with highlighted spans
    return this.buildHTML(text, spans);
  }

  private collectSpans(node: ASTNode, spans: HighlightSpan[]): void {
    const { kind, start, end, children } = node;

    switch (kind.tag) {
      case 'Lam':
        // Lambda abstraction
        spans.push({ start, end, className: 'lambda' });
        break;
      case 'Var':
        // Variable
        spans.push({ start, end, className: 'variable' });
        break;
      case 'Int':
        // Number
        spans.push({ start, end, className: 'number' });
        break;
      case 'If':
        // Keyword
        spans.push({ start, end, className: 'keyword' });
        break;
      case 'Bop':
        // Operator
        spans.push({ start, end, className: 'operator' });
        break;
      case 'Error':
        // Error node
        spans.push({ start, end, className: 'error' });
        break;
    }

    // Recursively process children
    for (const child of children) {
      this.collectSpans(child, spans);
    }
  }

  private buildHTML(text: string, spans: HighlightSpan[]): string {
    if (spans.length === 0) {
      return this.escapeHTML(text);
    }

    let html = '';
    let lastIndex = 0;

    for (const span of spans) {
      // Add text before this span
      if (span.start > lastIndex) {
        html += this.escapeHTML(text.substring(lastIndex, span.start));
      }

      // Add highlighted span
      const spanText = text.substring(span.start, span.end);
      html += `<span class="${span.className}">${this.escapeHTML(spanText)}</span>`;

      lastIndex = span.end;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      html += this.escapeHTML(text.substring(lastIndex));
    }

    return html;
  }

  private escapeHTML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  printTermNode(node: ASTNode): string {
    const { kind, children } = node;

    switch (kind.tag) {
      case 'Int':
        return String(kind.value);

      case 'Var':
        return String(kind.value);

      case 'Lam':
        const param = kind.value;
        const body = children.length > 0 ? this.printTermNode(children[0]) : '?';
        return `(λ${param}. ${body})`;

      case 'App':
        const left = children.length > 0 ? this.printTermNode(children[0]) : '?';
        const right = children.length > 1 ? this.printTermNode(children[1]) : '?';
        return `(${left} ${right})`;

      case 'Bop':
        const op = kind.value === 'Plus' ? '+' : '-';
        const leftOp = children.length > 0 ? this.printTermNode(children[0]) : '?';
        const rightOp = children.length > 1 ? this.printTermNode(children[1]) : '?';
        return `(${leftOp} ${op} ${rightOp})`;

      case 'If':
        const cond = children.length > 0 ? this.printTermNode(children[0]) : '?';
        const thenBranch = children.length > 1 ? this.printTermNode(children[1]) : '?';
        const elseBranch = children.length > 2 ? this.printTermNode(children[2]) : '?';
        return `if ${cond} then ${thenBranch} else ${elseBranch}`;

      case 'Error':
        return `<error: ${kind.value}>`;

      default:
        return '?';
    }
  }

  formatAST(ast: ASTNode, indent: number = 0): string {
    const indentStr = '  '.repeat(indent);
    const { kind, start, end, children } = ast;

    let result = `${indentStr}${kind.tag}`;
    if (kind.value !== undefined) {
      result += `: ${kind.value}`;
    }
    result += ` [${start}:${end}]`;

    if (children.length > 0) {
      result += '\n';
      for (const child of children) {
        result += this.formatAST(child, indent + 1);
      }
    } else {
      result += '\n';
    }

    return result;
  }
}
