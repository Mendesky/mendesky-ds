import type { ComponentSpec } from '../component-spec.js';

export const selectSpec: ComponentSpec = {
  id: 'select',
  name: 'Select',
  group: '表單元件',
  when: '固定選項下拉選擇。禁止原生 `<select>`。',
  notes: [
    {
      type: 'info',
      content: '本元件是 Combobox（可輸入搜尋的下拉選單）。Panel 以 Portal 方式掛載到 document.body，避免被 overflow:hidden 或 transform 祖先裁切。可以跟表單雙向綁定值。',
    },
    {
      type: 'info',
      content: 'Suffix icon（DownArrow 等）統一使用 size="16"，不可用其他尺寸。與 #input 的 suffix icon 規範一致。',
    },
    '選項可以帶狀態標記：文字右邊一個紅色的圓形驚嘆號，顏色跟 #label 的 Error 一樣，滑過顯示標記的文字。選中有標記的選項後，選取框文字右邊也會顯示同一個驚嘆號，報讀軟體念選取框時會念出標記文字；可輸入模式打開下拉、正在打字時先藏起來。停用的選項或選取框，標記跟文字一樣變灰。下拉清單裡用方向鍵移動時，報讀軟體念不到選項，標記也念不到。標記的文字只有滑鼠滑過才看得到，所以用了標記，選中後的畫面一定要另外寫出原因。用法跟 #tabs 的狀態標記相同，只用來標出「這一項有東西要處理」，不當一般提示或計數。',
  ],
  customTables: [],
};
