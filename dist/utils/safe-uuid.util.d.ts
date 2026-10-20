/**
 * secure-context-safe UUID.
 *
 * `crypto.randomUUID()` 只在 secure context（HTTPS / localhost）才存在；在 http 的內網 IP／
 * 主機名下（非 localhost）為 `undefined`，直接呼叫會丟 `TypeError: crypto.randomUUID is not a
 * function`。本專案內網以 http 部署（nginx listen 80），故凡是「純前端 render key / client id」
 * 用途一律走此 helper，避免在不支援的環境整條流程 throw。
 *
 * 註：`crypto.getRandomValues()` 在 insecure context 仍可用，故優先用它產生符合 RFC4122 v4 的字串；
 * 連它都沒有時才退回 Math.random（此 id 非安全用途，僅供畫面/暫存 keying）。
 */
export declare function safeUuid(): string;
