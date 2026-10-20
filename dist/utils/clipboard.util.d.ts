/**
 * Unified clipboard copy utility.
 *
 * Capability-first routing:
 *   - navigator.clipboard.writeText present (Secure Context) → async Web API
 *   - absent (non-Secure Context: plain http LAN) → sync document.execCommand fallback
 *
 * Returns true on success, false on failure or unsupported environment.
 * The caller decides what UI feedback to show.
 */
export declare function copyText(text: string): Promise<boolean>;
