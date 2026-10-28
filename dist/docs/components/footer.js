export const footerSpec = {
    id: 'footer',
    name: 'Footer',
    group: '展示元件',
    when: '登入頁與 Shell 共用頁尾。禁止自刻 `<footer>` 複製文字。',
    notes: [
        {
            type: 'info',
            content: '全域版權頁尾，登入頁與 Shell 共用。父層可用 CSS 自訂屬性覆寫 RWD 樣式，不需要穿透元件的樣式封裝。',
        },
    ],
    customTables: [
        {
            title: 'CSS 自訂屬性（父層可覆寫）',
            columns: [
                '屬性',
                '預設值',
                '說明',
            ],
            rows: [
                [
                    '--footer-padding',
                    '10px 10px 20px',
                    '整體 padding',
                ],
                [
                    '--footer-font-size',
                    '1em',
                    '字體大小',
                ],
                [
                    '--footer-word-break',
                    'normal',
                    '換行規則',
                ],
                [
                    '--footer-overflow-wrap',
                    'normal',
                    '溢出換行',
                ],
            ],
        },
    ],
};
