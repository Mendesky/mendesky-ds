export const cellBtnSpec = {
    id: 'cell-btn',
    name: 'Cell Button',
    group: '互動元件',
    when: '日期/年月選擇器內部的格子按鈕。高密度網格選取場景（年份格、月份格、日期格）。',
    notes: [
        'display: contents — 外殼透明，父層 grid 直接作用在內部 button 上，不破壞 grid 佈局',
        'hover 效果為元件內建（:hover 偽類），不需額外 Input',
        'selected + hover 時 hover 不覆蓋 selected 態',
    ],
    customTables: [],
};
