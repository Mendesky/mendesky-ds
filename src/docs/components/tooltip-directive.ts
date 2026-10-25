import type { ComponentSpec } from '../component-spec.js';

export const tooltipDirectiveSpec: ComponentSpec = {
  id: 'tooltip-directive',
  name: 'Tooltip Directive (Portal)',
  group: '浮層元件',
  when: '替代 #tooltips 元件的 portal 版本。hover/focus 時自動顯示 tooltip，portal 到 body 避免容器裁切。',
  notes: [
    '動態建立 tooltip 浮層元素，portal 到 document.body，position:fixed',
    '顯示延遲 300ms（mouseenter/focus 觸發），mouseleave/blur 立即隱藏',
    '觸發元素捲出可視範圍時自動隱藏 tooltip',
    '平板以下尺寸（tablet-landscape-down）自動隱藏——tooltip 浮層本身的外層元素設為 `display:none !important`。寫測試量尺寸時要先解除，否則測試執行環境的視窗比桌機斷點（$bp-desktop）窄，量到的一律是 0，「寬度 ≤ N」這類斷言會恆真假綠',
    '#icon-btn 已內建本 tooltip 支援（透過 tooltip、tooltipPos 屬性），disabled 狀態下 tooltip 仍正常顯示（綁在 wrapper div 上）',
    '長內容：`.tooltip__text` 預設只有 `white-space: pre-line`（讓呼叫端字串裡的 `\\n` 保留，多行 tooltip 如 #button 的 disabledMessage 靠它），**沒有 max-width**——一個 90 字的無空白 ASCII 檔名實測會撐到 1735px。長字串請開啟換行選項（2026-10-13 加回，選用、不改預設）：加上 `.tooltip__text--wrap`（`max-width:520px` + `overflow-wrap:anywhere`）',
  ],
  customTables: [],
};
