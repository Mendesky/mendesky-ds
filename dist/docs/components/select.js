export const selectSpec = {
    id: 'select',
    name: 'Select',
    group: '表單元件',
    when: '固定選項下拉選擇。禁止原生 <select>。',
    notes: [
        {
            type: 'info',
            content: '本元件是 Combobox（可輸入搜尋的下拉選單）。Panel 以 Portal 方式掛載到 document.body，避免被 overflow:hidden 或 transform 祖先裁切。可以跟表單雙向綁定值。',
        },
        {
            type: 'info',
            content: 'Suffix icon（DownArrow 等）統一使用 size="16"，不可用其他尺寸。與 #input 的 suffix icon 規範一致。',
        },
    ],
    customTables: [],
};
