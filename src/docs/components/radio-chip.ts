import type { ComponentSpec } from '../component-spec.js';

export const radioChipSpec: ComponentSpec = {
  id: 'radio-chip',
  name: 'Radio Chip',
  group: '互動元件',
  when: '篩選條件單選、可取消的選項。',
  notes: [
    {
      type: 'info',
      content: 'app-radio-chip 實作單選語意：點擊後 selected → true，不支援自身再次點擊取消（Radio 語意）。若需取消選中，開啟 [showCancel]="true"，並監聽 (cancelClick) 事件由父元件清空整個群組的選中值。',
    },
  ],
  customTables: [],
};
