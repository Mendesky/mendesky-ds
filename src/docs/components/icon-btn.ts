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
      content: '拿來打開選單時（例如 More），跟 #button 一樣設 `ariaHaspopup` 和 `ariaExpanded`，報讀軟體才知道它會打開選單、選單現在開著沒有。這兩個屬性落在裡面那顆按鈕上，Safari 關閉選單後也是靠這兩個屬性一起認出觸發鈕，少一個就認不出來。細節見 #action-menu 的無障礙說明。',
    },
    {
      type: 'info',
      content: '按下去要等結果時（例如等後端產生 PDF），打開 `loading`，不要自己把轉圈放進按鈕。載入中時 #spinner 取代圖示，大小跟平常放的圖示一樣；有文字標籤的外觀保留文字。',
    },
    {
      type: 'info',
      content: '頁面上主要的新增入口（例如頁首的新增鈕）用實心主色：propClass 設為 PrimaryFilled，主色底、白色圖示、圓角方形，size 搭配 12（圖示 12 px，按鈕 24×24）。它只有圖示，一律要設 `ariaLabel`，用滑過時提示的同一句話，報讀軟體才念得出這顆按鈕要做什麼。',
    },
  ],
  states: [
    { name: '載入中', description: '設了 `loading`，#spinner 取代圖示。按鈕不會變淡：停用時整顆按鈕淡成一半，轉圈的對比會掉到 3:1 以下。點了沒反應，滑過也不變色。tooltip 照常顯示，可以把它改成「產生 PDF 中…」這類說明。' },
  ],
  a11y: {
    keyboard: ['載入中按 Enter 或空白鍵不會觸發。'],
    focus: ['載入中焦點留在按鈕上。如果改用停用，焦點所在的按鈕一停用，焦點就會掉到頁面最上面，鍵盤使用者要從頭找回來。'],
    screenReader: ['載入中會念出按鈕名稱，再念「忙碌中」「無法使用」。轉圈是裝飾用，不另外念。'],
    motion: ['載入轉圈跟 #spinner 一樣：0.8 秒轉一圈；使用者在系統裡開了「減少動態」，改成 2.4 秒轉一圈。'],
    aria: ['載入中時內層按鈕加 `aria-busy="true"` 與 `aria-disabled="true"`，不加原生 `disabled`，焦點才留得住。同時設了 `disabled` 時，以 `disabled` 為準。'],
  },
  customTables: [],
};
