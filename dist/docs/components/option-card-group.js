export const optionCardGroupSpec = {
    id: 'option-card-group',
    name: 'Option Card Group',
    group: '表單元件',
    when: '一組互斥的插圖選擇卡（版面樣式 / 主題外觀等）。取代各處手刻的卡片 grid 與鍵盤 handler。',
    notes: [
        {
            type: 'warning',
            content: '群組在 tablet-down 會 display:none（由 consumer 的 .layout-card-group + scss 斷點規則控制）→ 每個 consumer 都必須額外配一個 app-select 作手機 fallback，否則手機完全無法選取。（曾有頁面因漏配而在手機上無法選取。）',
        },
        {
            type: 'info',
            content: '完全受控元件：只吃 [value]、只 emit (valueChange)，不持有內部選取狀態。父層取消變更時直接保持 value 不變即可讓卡片還原（app-select fallback 因點選即內部 set value，取消需 remount 還原）。',
        },
        {
            type: 'info',
            content: '方向鍵 ←/↑/→/↓ 在啟用卡片間 roving focus（wrap）；@for track option.value 避免重複 key NG0955。',
        },
    ],
    customTables: [],
};
