import { vi } from 'vitest';
import { copyText } from './clipboard.util.js';

describe('copyText', () => {
  afterEach(() => vi.restoreAllMocks());

  // ── navigator.clipboard present → async path ──────────────────────────────
  it('uses navigator.clipboard.writeText when available and returns true', async () => {
    const writeTextSpy = vi.fn().mockReturnValue(Promise.resolve());
    const clipboardStub = { writeText: writeTextSpy } as unknown as Clipboard;
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(clipboardStub);

    const result = await copyText('hello');

    expect(result).toBe(true);
    expect(writeTextSpy).toHaveBeenCalledWith('hello');
  });

  // ── navigator.clipboard absent → execCommand fallback ─────────────────────
  it('falls back to execCommand when clipboard is undefined and returns true when execCommand succeeds', async () => {
    // stub clipboard getter to return undefined (non-Secure Context)
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined as unknown as Clipboard);

    const execSpy = vi.spyOn(document, 'execCommand').mockReturnValue(true);

    const result = await copyText('world');

    expect(result).toBe(true);
    expect(execSpy).toHaveBeenCalledWith('copy');
  });

  // ── navigator.clipboard absent → execCommand returns false ────────────────
  it('returns false when clipboard is undefined and execCommand fails', async () => {
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined as unknown as Clipboard);
    vi.spyOn(document, 'execCommand').mockReturnValue(false);

    const result = await copyText('fail-case');

    expect(result).toBe(false);
  });

  // ── navigator.clipboard.writeText rejects → returns false ─────────────────
  it('returns false when clipboard.writeText rejects', async () => {
    const writeTextSpy = vi.fn().mockReturnValue(Promise.reject(new Error('denied')));
    const clipboardStub = { writeText: writeTextSpy } as unknown as Clipboard;
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(clipboardStub);

    const result = await copyText('rejected');

    expect(result).toBe(false);
  });
});
