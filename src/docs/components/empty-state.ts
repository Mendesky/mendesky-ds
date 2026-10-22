import type { ComponentSpec } from '../component-spec.js';

export const emptyStateSpec: ComponentSpec = {
  id: 'empty-state',
  name: 'Empty State',
  group: '展示元件',
  when: '列表/查詢無資料時顯示。',
  notes: [
    {
      type: 'info',
      content: '可以放入任意自訂內容（按鈕、含 inline CTA 的訊息段落等），放入的內容顯示在 message 文字下方。',
    },
  ],
  customTables: [],
};
