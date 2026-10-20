import type { ComponentSpec } from '../component-spec.js';

export const pageSkeletonSpec: ComponentSpec = {
  id: 'page-skeleton',
  name: 'Page Skeleton',
  group: '展示元件',
  when: '頁面 loading 時的佔位符。',
  notes: [
    {
      type: 'info',
      content: '頁面資料載入前的 shimmer 佔位動畫，防止 layout shift。',
    },
  ],
  customTables: [],
};
