import type { ComponentSpec } from '../component-spec.js';

export const selectSpec: ComponentSpec = {
  id: 'select',
  name: 'Select',
  group: '表單元件',
  when: '固定選項下拉選擇。禁止原生 <select>。',
  notes: [
    {
      type: 'info',
      content: 'app-select 是 Combobox（可輸入搜尋的下拉選單）。Panel 以 Portal 方式掛載到 document.body，避免被 overflow:hidden 或 transform 祖先裁切。實作 CVA（ControlValueAccessor），可直接接 formControlName 或 [(ngModel)]。',
    },
    {
      type: 'info',
      content: 'Suffix icon（DownArrow 等）統一使用 size="16"，不可用其他尺寸。與 app-input suffix icon 規範一致。',
    },
  ],
  customTables: [],
};
