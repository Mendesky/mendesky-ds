export const drawerShellSpec = {
    id: 'drawer-shell',
    name: 'Drawer Shell',
    group: '浮層元件',
    when: '所有 Drawer 的容器。提供毛玻璃背景、透明 overlay、進出場動畫（Panel 450ms enter / 300ms exit）、ESC 關閉。禁止各 Drawer 自刻 overlay + panel + animation。',
    notes: [
        {
            type: 'info',
            content: '內部已處理 ESC 關閉、enter/leave 動畫狀態切換、overlay 點擊。各 Drawer 元件只需在 <app-drawer-shell> 內放置自己的 content，不需要自行處理 isClosing、setTimeout、@HostListener ESC。',
        },
    ],
    customTables: [
        {
            title: '視覺規格',
            columns: [
                '屬性',
                '值',
            ],
            rows: [
                [
                    '面板背景',
                    'rgba(255,255,255,0.3) / backdrop-filter: blur(20px)',
                ],
                [
                    '邊框 (right)',
                    'border-left: 1px solid #fff',
                ],
                [
                    '邊框 (left)',
                    'border-right: 1px solid #fff',
                ],
                [
                    '陰影',
                    '0px 0px 250px 0px rgba(0,0,0,0.2)',
                ],
                [
                    '動畫 Tier',
                    'Panel — 450ms enter / 300ms exit',
                ],
                [
                    '進場 easing',
                    'cubic-bezier(0,0,0.2,1)',
                ],
                [
                    '退場 easing',
                    'cubic-bezier(0.4,0,1,1)',
                ],
                [
                    'Overlay',
                    '透明（position:fixed;inset:0）/ z-index: 300 / panel: 301',
                ],
            ],
        },
    ],
};
