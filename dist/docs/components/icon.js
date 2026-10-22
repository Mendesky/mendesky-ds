export const iconSpec = {
    id: 'icon',
    name: 'Icon',
    group: '展示元件',
    when: '所有圖示顯示。禁止用 inline style width/height 控制大小，用 size 屬性。',
    notes: [
        {
            type: 'warn',
            content: '禁止安裝任何第三方 icon library（Font Awesome、Material Icons 等），一律使用 #icon + 本體的圖示登錄表 ICON_REGISTRY（src/icons/icons.ts）。',
        },
    ],
    customTables: [],
};
