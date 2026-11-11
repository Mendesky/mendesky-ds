export const dsCollapseSpec = {
    id: 'ds-collapse',
    name: 'DS Collapse 收合動畫',
    group: '工具',
    when: '內容區塊需要收合／展開動畫時用（例如可展開的卡片段落）。統一用這組 class，不要自己寫 height 動畫。整個區塊連同可以點的標頭一起做的話，直接用 #collapsible，它已經用了這組 class，鍵盤和報讀軟體也處理好了。',
    description: `CSS Grid \`0fr → 1fr\` 收合/展開工具 class。Component tier 300ms，進出場共用 ease-out curve。
所有需要「內容區塊收合/展開」動畫的元件，統一用這組做法。`,
    notes: [
        {
            type: 'info',
            content: '元件也可用自己的 class 名稱（如 .contact-content），只需沿用相同 CSS Grid 動畫方式',
        },
        {
            type: 'info',
            content: 'Component tier: 300ms var(--ease-enter)（cubic-bezier(0.215, 0.61, 0.355, 1)）',
        },
        {
            type: 'info',
            content: 'DS 內目前套用：stepper 導覽的子項收合（stepper-nav-subitems）、#collapsible 的內容區。使用端的可收合卡片也用同一組 class。',
        },
        {
            type: 'info',
            content: '使用者設了「減少動態」時，這組 class 不轉場，直接開合。用自己的 class 名稱時不會套到，要自己處理。',
        },
    ],
};
