export const selectSpec = {
    id: 'select',
    name: 'Select',
    group: '表單元件',
    when: '固定選項下拉選擇。禁止原生 `<select>`。',
    notes: [
        {
            type: 'info',
            content: '本元件是 Combobox（可輸入搜尋的下拉選單）。Panel 以 Portal 方式掛載到 document.body，避免被 overflow:hidden 或 transform 祖先裁切。可以跟表單雙向綁定值。',
        },
        {
            type: 'info',
            content: 'Suffix icon（DownArrow 等）統一使用 size="16"，不可用其他尺寸。與 #input 的 suffix icon 規範一致。',
        },
        '選項可以帶狀態標記：文字右邊一個紅色的圓形驚嘆號，顏色跟 #label 的 Error 一樣，滑過顯示標記的文字，報讀軟體把標記文字接在選項名稱後面念。選中有標記的選項後，選取框文字右邊也會顯示同一個驚嘆號；可輸入模式打開下拉、正在打字時先藏起來。用法跟 #tabs 的狀態標記相同，只用來標出「這一項有東西要處理」，不當一般提示或計數。',
    ],
    customTables: [],
};
