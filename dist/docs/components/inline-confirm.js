export const inlineConfirmSpec = {
    id: 'inline-confirm',
    name: 'Inline Confirm',
    group: '互動元件',
    when: '前提依賴型確認（contextualInline）：父層需要使用者在主操作前先勾選「已確認 XXX」。對應 ds-patterns action.precondition-acknowledge.scenarios[0]。',
    notes: [
        {
            type: 'info',
            content: '元件不控制外部主按鈕 disabled，消費者自行 [disabled]="!confirmed()"',
        },
        {
            type: 'info',
            content: 'bullets 用 <ng-content select="[inlineConfirmDetails]"> 投影，支援超連結 / <strong> / <app-label> 等 rich markup',
        },
        {
            type: 'warn',
            content: '父層職責：離開頁面再回來必須 signal.set(false) 清空 stale state；元件不自動重置',
        },
    ],
    customTables: [
        {
            title: 'requirement 使用情境',
            columns: [
                'requirement',
                '視覺',
                '主按鈕',
                '適用場景',
            ],
            rows: [
                [
                    'required',
                    '淡灰底 + Alert icon + label 加重',
                    '[disabled]="!confirmed()"',
                    '阻塞型前提：發布前確認已審核、匯入前確認格式、同意條款後才能繼續',
                ],
                [
                    'optional',
                    '透明底 + 細邊框 + 「（選填）」suffix',
                    '常 enabled',
                    '複核式提醒：送出前逐項 review、風險提示',
                ],
            ],
        },
    ],
};
