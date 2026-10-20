import type { ComponentSpec } from '../component-spec.js';

export const uploadDropzoneSpec: ComponentSpec = {
  id: 'upload-dropzone',
  name: 'Upload Dropzone',
  group: '互動元件',
  when: '任何需要讓使用者上傳單一檔案的場景。不要自刻拖放區或使用原生 input type="file" 裸露呈現。',
  notes: [
    {
      type: 'info',
      content: '元件內建動畫插畫（檔案放入資料夾，兩狀態 cross-fade），不需傳入 icon。',
    },
    {
      type: 'info',
      content: '元件只負責選擇單一檔案並驗證，不含進度條或上傳列表。進度模擬由父元件處理。',
    },
    {
      type: 'warn',
      content: "acceptedTypes 需包含點號，如 '.pdf'，不要寫 'pdf'。",
    },
  ],
  customTables: [],
};
