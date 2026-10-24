export const keyboardHelpSpec = {
    id: 'keyboard-help',
    name: 'Keyboard Help 快速鍵說明',
    group: '浮層元件',
    when: '集中展示目前畫面可用的鍵盤快速鍵。慣例以 ? 開啟。快速鍵資料由父層傳入，元件不自己蒐集——因為哪些快速鍵有效取決於當前路由與權限。',
    notes: [
        {
            type: 'info',
            content: '內建搜尋框，輸入關鍵字即時篩選 items（比對 description）。搜尋無結果時顯示 #empty-state。',
        },
        {
            type: 'warning',
            content: '登記進 shortcuts 的組合必須是本專案實際綁定的。⌘N / ⌘T / ⌘W 等會被瀏覽器攔截的 modifier combo 不得使用，也不要列進說明面板。',
        },
        {
            type: 'info',
            content: '面板本身用 #modal-shell + #modal-close-btn 組成，所以 ESC 與 backdrop 行為直接沿用 modal.dismissal pattern。',
        },
    ],
};
