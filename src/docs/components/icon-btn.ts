import type { ComponentSpec } from '../component-spec.js';

export const iconBtnSpec: ComponentSpec = {
  id: 'icon-btn',
  name: 'Icon Button',
  group: '互動元件',
  when: '工具列、表格操作、純圖示互動。禁止用 div 包 icon 模擬按鈕。',
  notes: [
    {
      type: 'info',
      content: '（2026-04 更新）tooltip 已綁在外層 wrapper div 而非 button 本身，disabled 狀態下 tooltip 仍正常顯示。內部使用 #tooltip-directive（portal 模式）。',
    },
    {
      type: 'info',
      content: '支援 :focus-visible focus ring（使用 `--focus-ring-*` tokens），僅鍵盤操作時顯示。',
    },
    {
      type: 'info',
      content: '拿來打開選單時（例如 More），跟 #button 一樣設 `ariaHaspopup` 和 `ariaExpanded`，報讀軟體才知道它會打開選單、選單現在開著沒有。這兩個屬性落在裡面那顆按鈕上，Safari 關閉選單後也是靠它找回觸發鈕。細節見 #action-menu 的無障礙說明。',
    },
  ],
  customTables: [],
};
