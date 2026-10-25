export const labelSpec = {
    id: 'label',
    name: 'Label',
    group: '展示元件',
    when: '狀態、分類標籤。禁止用 div 自刻 badge。Badge 只放文字，不加 icon。**放在 ghost 按鈕裡（例如選單選項的編號）用 White（白底灰框），不用 GreyOutline**：GreyOutline 是透明底，滑過時灰字疊在深灰底上看不清。**Purple / GreenOutline** 用來區分兩種類別（例如「推薦」與「精選」）；GreenOutline 的字重 600 由這一格提供，呼叫端不要自己補 CSS。KanbanDraft/Opened/DealClosed/Archiving/Archived 五色為 CornflowerBlue 漸層（淺→深對應流程階段），SSOT 來自 Figma 17248:269232（看板列表的 status pill 專用）。**text 綁使用者自由輸入的欄位時必須明示 wrap 設為 true（折行）或 truncate 設為 true 並加 tooltip（省略），不可留預設 nowrap** — 預設 nowrap 讓 min-content ＝ 整串寬、chip 在 flex 容器內不可收縮，長值會撐破容器或被祖先 overflow:hidden 靜默裁掉。',
    notes: [],
    customTables: [],
};
