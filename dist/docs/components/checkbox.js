export const checkboxSpec = {
    id: 'checkbox',
    name: 'Checkbox',
    group: '互動元件',
    when: '單純的勾選框，三態：沒有／全有／部分。「部分」用在「一組裡選了一些」的地方（例：權限清單的分類列）。要「勾選框＋文字」的可點按鈕、只需兩態時，改用 app-check-chip。',
    notes: [
        { type: 'info', content: '點擊後元件會先自己清掉 indeterminate，之後以呼叫端傳入的值為準。' },
        { type: 'info', content: '顏色：沒有＝text/body；全有、部分＝Color/Green/80。不用 button/success（#74ae3e），因為白色勾放在上面只有 2.67:1，達不到 WCAG 1.4.11 的 3:1。' },
        { type: 'info', content: '圖示與 app-check-chip 共用同一組 registry：CheckBox／CheckBoxOn／CheckBoxMixed。' },
    ],
};
