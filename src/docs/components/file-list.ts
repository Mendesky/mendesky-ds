import type { ComponentSpec } from '../component-spec.js';

export const fileListSpec: ComponentSpec = {
  id: 'file-list',
  name: 'File List',
  group: '展示元件',
  when: '需要呈現已上傳檔案列表並提供操作時。支援「無類型模式」（例如 wizard 裡只收單一種文件）與「有類型模式」（依文件類型分類的附件，type 由父層傳入 FileItem.type）。disabled=true 為唯讀，只剩 view。**需要 download 或依檔案類型切換動作時不要用這支**——它沒有 actions 屬性；直接用 #number-list（有 actions 屬性，NumberListAction 已含 download），需要下載的文件清單即如此。',
  notes: [
    {
      type: 'info',
      content: '檔案資料的型別 FileItem 跟元件一起匯出，外層元件直接引用。',
    },
    {
      type: 'info',
      content: '元件內部使用 #number-list 渲染每列，type 欄位對應 label chip；type 空字串時不渲染 chip。',
    },
    {
      type: 'warn',
      content: 'emptyText 設空字串時不渲染 empty state，避免在卡片等場景下產生多餘的 padding。',
    },
  ],
  customTables: [],
};
