export const progressBarSpec = {
    id: 'progress-bar',
    name: 'Progress Bar',
    group: '展示元件',
    when: '顯示一件分批進行的工作做到哪裡（例：批次授權「處理中 12 / 40」）。只畫比例，不內建文字；「處理中 12 / 40」這類說明由呼叫端排在旁邊。',
    notes: [
        { type: 'info', content: 'max ≤ 0 或 value 不是有限數字時一律顯示 0%，呼叫端還沒算出總數（total = 0）也不會出現 NaN 寬度。' },
        { type: 'info', content: '不內建文字，是因為每個情境的措辭與單位（項、人、檔案）都不同。' },
    ],
};
