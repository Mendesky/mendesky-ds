export const inlineAddSpec = {
    id: 'inline-add',
    name: 'Inline Add',
    group: '互動元件',
    when: '在 chip 群組 / 清單尾端讓使用者新增「自訂項」。取代 native window.prompt；單行文字輸入不要在 modal 內再疊 dialog。',
    notes: [
        {
            type: 'info',
            content: '展示櫃原則：本元件只管「輸入 affordance」，不持有清單 / 勾選。去重、加入清單、勾選由父層的 add 事件處理。',
        },
        {
            type: 'info',
            content: '互動：僅 Enter 提交；按 Esc 或離開輸入框（點到別處、按 Tab）就取消，內容丟掉。例外：用輸入法選字時按的 Esc 是取消選字，不會收起輸入框。輸入態 keydown 已 stopPropagation，不會被 chip 群組方向鍵 roving focus 攔截。',
        },
    ],
    a11y: {
        keyboard: [
            '輸入框裡按 Enter 送出，按 Esc 取消。方向鍵留在輸入框裡移動游標，不會跳到旁邊的選項。',
            '按住 Enter 只算一下：只新增一次，收起後也不會在觸發鈕上把輸入框再打開。',
            '用輸入法選字時按的 Enter、Esc 是給輸入法的，不會送出，也不會收起輸入框。',
        ],
        focus: [
            '點開後焦點直接進輸入框。',
            '按 Enter 或 Esc 收起後，焦點回到觸發鈕。',
            '點到別處或按 Tab 離開時，輸入框收起、內容丟掉，焦點不會被拉回觸發鈕。',
        ],
        screenReader: [
            '輸入框不會念外層 #field 的標題，也不會念必填；不設 ariaLabel 時只念提示文字，聽不出這一格要填什麼。所以一律要設 ariaLabel：放在欄位裡時用欄位標題；沒有欄位時，寫這一格要新增什麼。',
            '只給名稱、不標必填：外層欄位的必填指整組至少選一個，不是這一格一定要打字。',
        ],
        aria: [
            'ariaLabel 輸出成內層輸入框的 aria-label；沒設時不輸出。內層輸入框寫在 #inline-add 自己的模板裡，連不到外層 #field，所以沒有 aria-labelledby，也沒有 aria-required。',
        ],
    },
    customTables: [],
};
