import type { ComponentSpec } from '../component-spec.js';

export const processModalSpec: ComponentSpec = {
  id: 'process-modal',
  name: 'Process Modal',
  group: '浮層元件',
  when: '耗時操作的進度顯示（覆蓋整個畫面）。',
  notes: [
    {
      type: 'info',
      content: 'running 狀態不可關閉（系統處理中阻擋操作）；congratulation 點擊背景會送出 dismissed 事件。',
    },
    {
      type: 'info',
      content: 'running 的訊息放在 `role="status"` 的區域裡，報讀軟體會念出訊息（預設「執行中請稍候」）。這個區域一直存在，視窗打開時才填入訊息：區域跟視窗一起出現的話，有些報讀軟體不會念。左側的 #spinner 是裝飾用，不另外念。',
    },
  ],
  customTables: [
    {
      title: '外觀規格',
      columns: [
        '',
        'running',
        'congratulation',
      ],
      rows: [
        [
          '尺寸',
          '333 × 72px',
          '333 × 104px',
        ],
        [
          '背景',
          '#ffffff',
          '--button/success #74ae3e',
        ],
        [
          '圓角',
          '10px',
          '10px',
        ],
        [
          '陰影',
          '0 0 20px rgba(0,0,0,0.2)',
          '0 0 20px rgba(0,0,0,0.2)',
        ],
        [
          '左側',
          '#spinner size="36"',
          '彩帶慶祝插圖',
        ],
        [
          '文字色',
          '--text/body #686868',
          '#ffffff',
        ],
      ],
    },
  ],
};
