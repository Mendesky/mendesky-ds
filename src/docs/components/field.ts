import type { ComponentSpec } from '../component-spec.js';

export const fieldSpec: ComponentSpec = {
  id: 'field',
  name: 'Field',
  group: '表單元件',
  when: '所有表單欄位外層包裝。提供一致的 label 排版。標題只放欄位名稱（中粗 500）；單位（元）、限制（單檔上限 50MB）、提示（可複選）一律放 hint（標題旁淺灰說明），不要寫進 label 文字。跟畫面重複的說明（例如按鈕已列出的選項）直接不寫。',
  notes: [
    {
      type: 'info',
      content: 'app-field 是表單欄位的包裝元件，負責統一管理標題列與必填 badge。將 app-input、app-textarea、app-autocomplete 等放入 <ng-content> 即可。選填欄位不加任何 badge，只顯示 label 文字。',
    },
  ],
  customTables: [],
};
