/**
 * 列印 PDF blob（跨瀏覽器，一律不開新分頁）。
 *
 * 契約（2026-07-22 定案）：本函式以「完整下載的 Blob」為輸入，且任何路徑都不開新分頁。
 *
 * - **Chromium（Chrome/Edge，`useIframe=true`）**：隱藏 iframe 載入 PDF → `contentWindow.print()`，
 *   同分頁無縫列印。
 * - **Safari/Firefox（`useIframe=false`）**：iframe 內 PDF 列印會印空白（瀏覽器限制，無法同分頁列印）
 *   → 直接下載 PDF 檔，由使用者開啟檔案列印（產品決策，取代先前「開新分頁載入 PDF」方案）。
 *   caller 據回傳值 `'downloaded'` 提示使用者。
 *
 * `filename` 由使用端決定（含 `.pdf`），也是列印對話窗「另存 PDF」的預設檔名。
 */
export declare function printPdfBlob(blob: Blob, filename: string, useIframe?: boolean): 'printed' | 'downloaded';
/**
 * Chromium（Chrome/Edge/Arc…）支援 iframe 內 PDF 列印；Safari/Firefox 不支援 → 下載。
 *
 * 偵測順序（2026-07-23 內網實測教訓）：`navigator.userAgentData` 只存在於 secure context
 * （HTTPS / localhost）——部署在內網 `http://<IP>` 時 Chromium 也拿不到，只靠它會把
 * Chrome/Arc/Edge 全誤判成 Safari/Firefox。故再以 UA 字串 fallback：`Chrome/` token
 * 僅 Chromium 系有（Safari 無、Firefox 無、iOS Chrome 是 `CriOS/` 且為 WebKit 核不支援）。
 */
export declare function supportsIframePrint(nav?: {
    userAgent: string;
    userAgentData?: unknown;
} | undefined): boolean;
