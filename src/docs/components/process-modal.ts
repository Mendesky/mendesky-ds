import type { ComponentSpec } from '../component-spec.js';

export const processModalSpec: ComponentSpec = {
  id: 'process-modal',
  name: 'Process Modal',
  group: '浮層元件',
  when: '耗時操作的進度顯示（覆蓋整個畫面）。',
  notes: [
    {
      type: 'info',
      content: 'running 狀態不可關閉（系統處理中阻擋操作）；congratulation 點擊背景可觸發 (dismissed)。',
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
          'Loading spinner icon (36×36)',
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
