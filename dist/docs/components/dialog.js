export const dialogSpec = {
    id: 'dialog',
    name: 'Dialog',
    group: '浮層元件',
    when: '不可逆操作前確認（刪除、封存），或錯誤提示 alert（showCancel:false）。禁止自刻 modal 做確認。title 顏色固定使用 --text/title (#1c1c2e)，禁止 hardcode hex。Warning 只代表「紅色嚴重度」、不等於「刪除動作」：trash 圖示已與 propClass 解耦，僅真正刪除/移除實體才保留預設 Trash-Del，告知型 alert 與非刪除確認（取消封存、復原、送出、匯入）一律 confirmIcon=""。',
    notes: [],
    customTables: [
        {
            title: 'Dual-Blur 視覺規格',
            columns: [
                '選擇器',
                '屬性',
                '值',
            ],
            rows: [
                [
                    '.dialog-backdrop',
                    'background',
                    'rgba(0, 0, 0, 0.2)',
                ],
                [
                    '.dialog-backdrop',
                    'backdrop-filter',
                    'blur(8px)',
                ],
                [
                    '.dialog-card',
                    'background',
                    'rgba(255, 255, 255, 0.8)',
                ],
                [
                    '.dialog-card',
                    'backdrop-filter',
                    'blur(10px)',
                ],
            ],
        },
    ],
};
