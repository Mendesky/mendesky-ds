export const collapsibleGroupSpec = {
    id: 'collapsible-group',
    name: 'Collapsible Group',
    group: '互動元件',
    when: '把幾個 #collapsible 包成一組，一次只開一段。例如幾組設定一起打開會太長，使用者一次也只改一組。每段各自開合的話不用包。',
    notes: [
        '設了 `single`，打開一段時，原本開著的那段會自己收起來。沒設的話跟沒包一樣，各段各自開合。',
        '可以全部收起來，不會硬留一段開著。',
        '群組只管「一次開幾段」。外觀、箭頭位置、停用都在每個 #collapsible 上設。',
    ],
    anatomy: [
        { name: '收合區塊', description: '一個以上的 #collapsible，依序排下來。群組本身不畫外框、不加間距，排法由頁面決定。' },
    ],
    states: [
        { name: '全部收合', description: '每段都收著。' },
        { name: '一段展開', description: '設了 `single` 時最多只有一段開著；打開另一段，這段會跟著收起來。' },
    ],
    a11y: {
        keyboard: [
            'Tab 依序停在每段的標題按鈕，跟單獨的 #collapsible 一樣；沒有方向鍵。',
        ],
        screenReader: [
            '每段的標題按鈕各自念出已展開或已收合。因為打開另一段而被收起來的那段，不會另外通知。',
        ],
    },
    dos: [
        { text: '一次只會改一組的設定，包進群組並設 `single`，畫面不會一路長下去。', story: 'single' },
    ],
    donts: [
        { text: '使用者常常要對照兩段內容時還設 `single`。他打開第二段，第一段就被收走了。' },
    ],
};
