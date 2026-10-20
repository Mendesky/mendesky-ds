export const iconBtnSpec = {
    id: 'icon-btn',
    name: 'Icon Button',
    group: '互動元件',
    when: '工具列、表格操作、純圖示互動。禁止用 div 包 icon 模擬按鈕。',
    notes: [
        {
            type: 'info',
            content: '（2026-04 更新）tooltip 已綁在外層 wrapper div 而非 button 本身，disabled 狀態下 tooltip 仍正常顯示。內部使用 [appTooltip] directive（portal 模式）。',
        },
        {
            type: 'info',
            content: '支援 :focus-visible focus ring（使用 --focus-ring-* tokens），僅鍵盤操作時顯示。',
        },
    ],
    customTables: [],
};
