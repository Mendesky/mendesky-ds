import type { ComponentSpec } from '../component-spec.js';

export const inputSpec: ComponentSpec = {
  id: 'input',
  name: 'Input',
  group: '表單元件',
  when: '單行文字輸入。禁止原生 <input>。type=\'password\' 時自動顯示 eye toggle。電話、編號等純數字欄位用 inputMode="numeric" sanitize="digits"。',
  notes: [
    'Suffix icon（eye toggle、clear 等）統一使用 size="16"，不可用其他尺寸。',
  ],
  customTables: [],
};
