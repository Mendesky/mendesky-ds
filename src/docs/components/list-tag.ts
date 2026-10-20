import type { ComponentSpec } from '../component-spec.js';

export const listTagSpec: ComponentSpec = {
  id: 'list-tag',
  name: 'List Tag',
  group: '展示元件',
  when: '清單項目附帶徽章標記。',
  notes: [
    {
      type: 'info',
      content: '用於 app-list 行中的標籤插槽，搭配 app-label 使用。',
    },
  ],
  customTables: [],
};
