export const yearMonthPickerSpec = {
    id: 'year-month-picker',
    name: 'Year Month Picker',
    group: '表單元件',
    when: '需要選取民國年 / 年月 / 期別（1 期 = 2 個月）的場景。值為純字串，透過 ngModel 綁定。單純選年月時優先用此元件，不要自組年月下拉。',
    notes: [
        {
            type: 'info',
            content: "值格式：yearOnly='114'、month='114-3'、period 起始月為單月（'114-3' 代表 3~4 月），空值 ''；實作 ControlValueAccessor，支援 ngModel。",
        },
        {
            type: 'info',
            content: "顯示文字：yearOnly → '114 年'；month → '114 年 3 月'；period → '114 年 3~4月'。",
        },
        {
            type: 'info',
            content: '行為規格：點擊 trigger → portal 到 body 的浮動面板（YearMonthPanelComponent），點擊面板外或選取後關閉。disabled=true 時點擊不開啟面板。',
        },
    ],
    customTables: [],
};
