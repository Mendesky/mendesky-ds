import type { ComponentSpec } from '../component-spec.js';

export const poProcessSpec: ComponentSpec = {
  id: 'po-process',
  name: 'Po Process',
  group: '展示元件',
  when: '採購/流程節點狀態顯示。',
  notes: [
    {
      type: 'info',
      content: '採購訂單流程元件，顯示 PO 審核狀態步驟條。Props 與狀態定義待業務確認後補充。',
    },
  ],
  customTables: [],
};
