export const sortHeaderSpec = {
    id: 'sort-header',
    name: 'Sort Header',
    group: '展示元件',
    when: '列表表頭裡可點擊排序的一格。點了發出這欄的 key，由呼叫端決定怎麼排、並把新的排序狀態傳回來；本元件不持有狀態，也不排序資料。',
    notes: [
        { type: 'info', content: '沒在排序的欄：跟一般表頭一樣是淺灰字，滑過或鍵盤聚焦時才出現排序圖示。正在排序的欄：動作色、半粗，一直顯示上／下箭頭。' },
        { type: 'info', content: '欄寬由呼叫端放在 host 上的 class（例：col-name）決定。' },
        { type: 'info', content: 'nextSort(目前狀態, key, 預設方向)：點同一欄反轉方向，點別欄從預設方向開始。數量、日期欄通常傳 \'desc\'，第一次點就「多到少／新到舊」。' },
        { type: 'info', content: 'host 帶 role="columnheader" 與 aria-sort，讀屏會唸出目前的排序方向。' },
    ],
};
