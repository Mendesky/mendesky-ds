import type { ComponentSpec } from '../component-spec.js';

export const inlineAddSpec: ComponentSpec = {
  id: 'inline-add',
  name: 'Inline Add',
  group: '互動元件',
  when: '在 chip 群組 / 清單尾端讓使用者新增「自訂項」。取代 native window.prompt；單行文字輸入不要在 modal 內再疊 dialog。',
  notes: [
    {
      type: 'info',
      content: '展示櫃原則：本元件只管「輸入 affordance」，不持有清單 / 勾選。去重、加入清單、勾選由父層的 add 事件處理。',
    },
    {
      type: 'info',
      content: '互動：僅 Enter 提交；Esc / blur 一律取消（最不意外）。輸入態 keydown 已 stopPropagation，不會被 chip 群組方向鍵 roving focus 攔截。',
    },
  ],
  customTables: [],
};
