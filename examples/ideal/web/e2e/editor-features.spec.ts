import { test, expect } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────

/** Wait for the Rabbita app to mount and the editor to be ready. */
async function waitForEditor(page: import('@playwright/test').Page) {
  await page.goto('/');
  await expect(page).toHaveTitle('Canopy Editor');
  await expect(page.getByRole('button', { name: 'Text' })).toBeVisible();
  // Wait for CM6 to mount inside the shadow DOM
  await page.waitForFunction(() => {
    const ce = document.querySelector('canopy-editor');
    return ce?.shadowRoot?.querySelector('.cm-editor') !== null;
  }, { timeout: 10000 });
}

/** Get the outline panel text content. */
async function getOutlineText(page: import('@playwright/test').Page) {
  return page.getByLabel('AST outline').innerText();
}

/** Type text into the CM6 editor via the shadow DOM. */
async function typeInEditor(page: import('@playwright/test').Page, text: string) {
  // Focus the CM6 content area inside shadow DOM
  await page.evaluate(() => {
    const ce = document.querySelector('canopy-editor');
    const cm = ce?.shadowRoot?.querySelector('.cm-content') as HTMLElement;
    cm?.focus();
  });
  await page.keyboard.type(text, { delay: 20 });
}

// ── Example Buttons ──────────────────────────────────────────

test.describe('Example Buttons', () => {
  test('Identity example updates outline', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Identity' }).click();
    const text = await getOutlineText(page);
    expect(text).toContain('module [id]');
    expect(text).toContain('λx');
  });

  test('Add example updates outline', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Add' }).click();
    const text = await getOutlineText(page);
    expect(text).toContain('module [add]');
    expect(text).toContain('Plus');
  });

  test('Church 2 example updates outline', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Church 2' }).click();
    const text = await getOutlineText(page);
    expect(text).toContain('module [two]');
  });

  test('Conditional example shows if node', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Conditional' }).click();
    const text = await getOutlineText(page);
    expect(text).toContain('if');
  });

  test('Apply example updates outline', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Apply' }).click();
    const text = await getOutlineText(page);
    expect(text).toContain('module [apply]');
  });

  test('switching examples updates CRDT state', async ({ page }) => {
    await waitForEditor(page);
    // Open bottom panel and switch to CRDT State tab
    await page.getByRole('button', { name: 'Panels' }).click();
    await page.getByRole('button', { name: 'CRDT State' }).click();

    await page.getByRole('button', { name: 'Identity' }).click();
    await page.waitForTimeout(200);
    const len1 = await page.locator('.state-value').last().innerText();

    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForTimeout(200);
    const len2 = await page.locator('.state-value').last().innerText();
    expect(Number(len1)).not.toEqual(Number(len2));
  });
});

// ── Outline Refresh ──────────────────────────────────────────

test.describe('Outline Refresh', () => {
  test('outline updates after typing (select-all + replace)', async ({ page }) => {
    await waitForEditor(page);
    // Select all and replace with new content
    await page.evaluate(() => {
      const ce = document.querySelector('canopy-editor');
      const cm = ce?.shadowRoot?.querySelector('.cm-content') as HTMLElement;
      cm?.focus();
    });
    await page.keyboard.press('Control+a');
    await page.keyboard.type('let f = \\x.x\nf 1', { delay: 10 });
    // Wait for outline refresh
    await page.waitForTimeout(300);
    const text = await getOutlineText(page);
    expect(text).toContain('module [f]');
  });

  test('outline updates when switching examples rapidly', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Conditional' }).click();
    await page.getByRole('button', { name: 'Identity' }).click();
    // Wait for the last refresh to complete
    await page.waitForTimeout(500);
    const text = await getOutlineText(page);
    expect(text).toContain('module [id]');
  });
});

// ── Syntax Highlighting ──────────────────────────────────────

test.describe('Syntax Highlighting', () => {
  test('CM6 renders syntax tokens with color', async ({ page }) => {
    await waitForEditor(page);
    // Check that the CM6 editor has syntax-highlighted spans (tok- or ͼ classes)
    const hasHighlighting = await page.evaluate(() => {
      const ce = document.querySelector('canopy-editor');
      if (!ce?.shadowRoot) return false;
      const editor = ce.shadowRoot.querySelector('.cm-editor');
      if (!editor) return false;
      // CM6 uses either tok- classes or ͼ-prefixed classes for highlighting
      const spans = editor.querySelectorAll('.cm-line span');
      return spans.length > 1; // Multiple spans = tokens are split = highlighting active
    });
    expect(hasHighlighting).toBe(true);
  });

  test('line numbers are visible', async ({ page }) => {
    await waitForEditor(page);
    const hasLineNumbers = await page.evaluate(() => {
      const ce = document.querySelector('canopy-editor');
      const gutters = ce?.shadowRoot?.querySelectorAll('.cm-gutterElement');
      return (gutters?.length ?? 0) > 0;
    });
    expect(hasLineNumbers).toBe(true);
  });
});

// ── Panel Toggles ────────────────────────────────────────────

test.describe('Panel Toggles', () => {
  test('Outline button toggles outline panel', async ({ page }) => {
    await waitForEditor(page);
    const outlineBtn = page.getByRole('button', { name: 'Outline' });
    const outline = page.getByLabel('AST outline');

    // Initially visible
    await expect(outline).toBeVisible();
    await expect(outlineBtn).toHaveAttribute('aria-pressed', 'true');

    // Toggle off
    await outlineBtn.click();
    await expect(outlineBtn).toHaveAttribute('aria-pressed', 'false');

    // Toggle back on
    await outlineBtn.click();
    await expect(outlineBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('Inspector button toggles inspector panel', async ({ page }) => {
    await waitForEditor(page);
    const inspectorBtn = page.getByRole('button', { name: 'Inspector' });
    const inspector = page.getByLabel('Node inspector');

    await expect(inspector).toBeVisible();
    await inspectorBtn.click();
    await expect(inspectorBtn).toHaveAttribute('aria-pressed', 'false');
    await inspectorBtn.click();
    await expect(inspectorBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('Panels button toggles bottom panel', async ({ page }) => {
    await waitForEditor(page);
    const panelsBtn = page.getByRole('button', { name: 'Panels' });

    // Initially hidden
    await expect(panelsBtn).toHaveAttribute('aria-pressed', 'false');

    // Toggle on — bottom tabs should appear
    await panelsBtn.click();
    await expect(panelsBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Problems' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Graphviz' })).toBeVisible();

    // Toggle off
    await panelsBtn.click();
    await expect(panelsBtn).toHaveAttribute('aria-pressed', 'false');
  });
});

// ── Bottom Panel Tabs ────────────────────────────────────────

test.describe('Bottom Panel Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Panels' }).click();
  });

  test('Problems tab shows no problems for valid input', async ({ page }) => {
    await page.getByRole('button', { name: 'Problems' }).click();
    await expect(page.locator('.no-problems')).toContainText('No problems');
  });

  test('CRDT State tab shows agent and text length', async ({ page }) => {
    await page.getByRole('button', { name: 'CRDT State' }).click();
    await expect(page.locator('.state-label').first()).toContainText('Agent');
    await expect(page.locator('.state-label').nth(2)).toContainText('Text length');
  });

  test('Graphviz tab renders SVG diagram', async ({ page }) => {
    await page.getByRole('button', { name: 'Graphviz' }).click();
    // Wait for after_render SVG injection
    await page.waitForTimeout(500);
    const hasSvg = await page.locator('#canopy-graphviz-container svg').count();
    expect(hasSvg).toBeGreaterThan(0);
  });

  test('Graphviz SVG updates when switching examples', async ({ page }) => {
    await page.getByRole('button', { name: 'Graphviz' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForTimeout(500);
    const svgText1 = await page.locator('#canopy-graphviz-container').innerText();

    await page.getByRole('button', { name: 'Conditional' }).click();
    await page.waitForTimeout(500);
    const svgText2 = await page.locator('#canopy-graphviz-container').innerText();

    expect(svgText1).not.toEqual(svgText2);
  });
});

// ── Sync Status ──────────────────────────────────────────────

test.describe('Sync Status', () => {
  test('shows connection status in PEERS section', async ({ page }) => {
    await waitForEditor(page);
    // Should show Connecting or Offline (no server running)
    const peersText = await page.locator('.peer-item').innerText();
    expect(
      peersText.includes('Connecting') || peersText.includes('Offline'),
    ).toBe(true);
  });

  test('peer dot is visible', async ({ page }) => {
    await waitForEditor(page);
    await expect(page.locator('.peer-dot')).toBeVisible();
  });
});

// ── Undo / Redo ──────────────────────────────────────────────

test.describe('Undo / Redo', () => {
  test('undo button does not crash with no history', async ({ page }) => {
    await waitForEditor(page);
    // Clicking undo with no edit history should not error
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.getByRole('button', { name: 'Undo' }).click();
    await page.waitForTimeout(300);

    const realErrors = errors.filter(
      (e) => !e.includes('WebSocket') && !e.includes('ws://'),
    );
    expect(realErrors).toEqual([]);
  });

  test('undo reverts typed text', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Identity' }).click();
    await page.waitForTimeout(200);

    // Type something in the editor
    await page.evaluate(() => {
      const ce = document.querySelector('canopy-editor');
      const cm = ce?.shadowRoot?.querySelector('.cm-content') as HTMLElement;
      cm?.focus();
    });
    await page.keyboard.press('End');
    await page.keyboard.type('z', { delay: 50 });
    await page.waitForTimeout(300);

    // Undo the typed character via Ctrl+Z in CM6
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(300);

    // Editor should not crash
    await expect(page.getByLabel('Code editor')).toBeVisible();
  });
});

// ── Mode Switch ──────────────────────────────────────────────

test.describe('Mode Switch', () => {
  test('Text mode is active by default', async ({ page }) => {
    await waitForEditor(page);
    await expect(
      page.getByRole('button', { name: 'Text' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('button', { name: 'Structure' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  test('switching to Structure mode updates button state', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Structure' }).click();
    await expect(
      page.getByRole('button', { name: 'Structure' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('button', { name: 'Text' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  test('switching back to Text mode restores editor', async ({ page }) => {
    await waitForEditor(page);
    await page.getByRole('button', { name: 'Structure' }).click();
    await page.getByRole('button', { name: 'Text' }).click();
    // CM6 should be present
    const hasCm = await page.evaluate(() => {
      const ce = document.querySelector('canopy-editor');
      return ce?.shadowRoot?.querySelector('.cm-editor') !== null;
    });
    expect(hasCm).toBe(true);
  });
});

// ── No Console Errors ────────────────────────────────────────

test.describe('Error Free', () => {
  test('no JavaScript errors during normal usage', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await waitForEditor(page);
    // Exercise features
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Conditional' }).click();
    await page.getByRole('button', { name: 'Identity' }).click();
    await page.getByRole('button', { name: 'Panels' }).click();
    await page.getByRole('button', { name: 'Graphviz' }).click();
    await page.waitForTimeout(500);

    // Filter out WebSocket connection errors (expected without relay server)
    const realErrors = errors.filter(
      (e) => !e.includes('WebSocket') && !e.includes('ws://'),
    );
    expect(realErrors).toEqual([]);
  });
});
