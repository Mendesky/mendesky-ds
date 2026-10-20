import type { ComponentSpec } from '../component-spec.js';

export const modalShellSpec: ComponentSpec = {
  id: 'modal-shell',
  name: 'Modal Shell',
  group: '浮層元件',
  when: '所有自訂 Modal 的容器。禁止自刻 overlay + card 組合。',
  notes: [
    {
      type: 'info',
      content: '（2026-08-13 使用者拍板）毛玻璃卡片底色以實作為準＝rgba(255,255,255,0.8)（不是 0.85）。此值只在 frostedGlass=true 時生效；預設卡片是不透明 #ffffff。',
    },
    {
      type: 'info',
      content: 'app-dialog 適合固定格式的小型確認對話框；app-modal-shell 適合需要自訂 header / body / footer 的大型 Modal（例：多步驟精靈、詳情面板）。',
    },
    {
      type: 'warning',
      content: 'modal-shell 會把 host element 搬到 document.body（防止 overflow:hidden 裁切 backdrop-filter），因此父層 ::ng-deep 無法打到 .modal-card 內部樣式。如需修改卡片行為請用 @Input（例：overflowVisible）。',
    },
  ],
  customTables: [
    {
      title: '視覺規格',
      columns: [
        '屬性',
        '值',
      ],
      rows: [
        [
          '卡片背景',
          'rgba(255,255,255,0.8) / backdrop-filter: blur(7.5px)（僅 frostedGlass=true 時；預設卡片為不透明 #ffffff）',
        ],
        [
          '邊框 / 圓角',
          'border: 1px solid #fff / border-radius: 16px',
        ],
        [
          '陰影',
          '0px 4px 40px -10px rgba(0,0,0,0.2)',
        ],
        [
          '動畫 Tier',
          'Panel — 450ms / 進場: cubic-bezier(0,0,0.2,1) / 退場: cubic-bezier(0.4,0,1,1)',
        ],
      ],
    },
  ],
};
