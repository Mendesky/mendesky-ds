export const modalCloseBtnSpec = {
    id: 'modal-close-btn',
    name: 'Modal Close Button',
    group: '浮層元件',
    when: '所有 modal / dialog 的關閉 X 鈕。放進各 modal 自己的 header，關閉決策交 parent。禁止自刻 X button 或散用 #icon-btn 當關閉鈕。',
    notes: [
        {
            type: 'info',
            content: '搭配 #modal-shell 的 canDismiss（設為「沒有未儲存的變更」）：backdrop 受 dirty gate，X 鈕走 closeClick。X/ESC 行為分層（小 modal 直接關 / 大 wizard 二次確認）見 pattern modal.dismissal。',
        },
    ],
};
