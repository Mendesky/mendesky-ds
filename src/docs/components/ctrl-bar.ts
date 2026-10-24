import type { ComponentSpec } from '../component-spec.js';

export const ctrlBarSpec: ComponentSpec = {
  id: 'ctrl-bar',
  name: 'Ctrl Bar',
  group: '展示元件',
  when: '頁面或區塊頂部的操作列，左側放篩選/toggle，右側放搜尋/切換。',
  notes: [],
  customTables: [
    {
      title: '放入位置',
      columns: [
        '位置',
        '說明',
      ],
      rows: [
        [
          'left',
          '左對齊區塊，items flex-wrap，適合篩選 chips、toggle、排序按鈕',
        ],
        [
          'right',
          '右對齊區塊，flex-shrink: 0，適合搜尋欄、視角切換',
        ],
      ],
    },
  ],
};
