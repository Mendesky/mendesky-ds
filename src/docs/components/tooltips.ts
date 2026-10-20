import type { ComponentSpec } from '../component-spec.js';

export const tooltipsSpec: ComponentSpec = {
  id: 'tooltips',
  name: 'Tooltips',
  group: '浮層元件',
  when: 'hover 時顯示說明文字。',
  notes: [
    {
      type: 'warning',
      content: '（2026-04 更新）新開發建議改用 [appTooltip] directive（portal 模式），自動 portal 到 document.body 避免 overflow:hidden 裁切。app-tooltips component 保留向後相容，但新功能不再使用。',
    },
  ],
  customTables: [
    {
      title: '樣式說明',
      columns: [
        'styles',
        '背景',
        '文字色',
      ],
      rows: [
        [
          'Default',
          '#ffffff（白色）',
          '#686868（--text/body）',
        ],
        [
          'Grey',
          '#939393（--button/neutral）',
          '#ffffff',
        ],
        [
          'Warning',
          '#cc5252（--icon/warning）',
          '#ffffff',
        ],
      ],
    },
    {
      title: '方向說明（propClass）',
      columns: [
        '值',
        '箭頭位置',
        'tooltip 相對觸發元素的位置',
      ],
      rows: [
        [
          'Top',
          '頂部',
          '出現在元素下方',
        ],
        [
          'Down',
          '底部',
          '出現在元素上方',
        ],
        [
          'Left',
          '左側',
          '出現在元素右側',
        ],
        [
          'Right',
          '右側',
          '出現在元素左側',
        ],
      ],
    },
  ],
};
