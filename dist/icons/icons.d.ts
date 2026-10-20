/**
 * Icon Registry
 * 每個 icon 儲存完整 inner SVG 內容（path / circle / rect 等元素）。
 * 所有填色已替換為 fill="currentColor"，使顏色可由父層 CSS color 屬性控制。
 *
 * 新增 icon 步驟：
 * 1. 在 Figma 中選取 icon → 右鍵 → Copy/Paste as → Copy as SVG
 * 2. 取出 <svg> 內層的 path/circle/rect 等元素
 * 3. 將 fill="#xxxxxx" 全部替換為 fill="currentColor"
 * 4. 以 icon 名稱（對應 Figma 的 Icons/xxx）為 key 新增至此 registry
 */
export declare const ICON_REGISTRY: Record<string, string>;
