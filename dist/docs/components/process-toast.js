export const processToastSpec = {
    id: 'process-toast',
    name: 'Process Toast',
    group: '浮層元件',
    when: '非同步操作的回饋通知。提供 action 時顯示 undo 按鈕（reversibleToast pattern）。loading 型別搭配 ToastService.show({persist:true}) + update(id, patch) 可做「進行中→完成」單一 toast 原地轉場（如匯出 PDF：文件產生中→已開始下載）——**update() 僅限這種「同一件事的兩個階段」，不同事件各自一顆、堆疊**（例如逐欄存檔時，每一欄的存檔結果各自一顆，不要用 update() 互相取代）。渲染一律經全域 `app-toast-container`（掛 app root），元件不自建本地 toast stack；唯一例外是使用端自己的全域 API 錯誤浮層（若有，自有 z-index 9999 層，需壓在 doc-preview 之上）。層級規則（2026-08-13 定案）：`app-toast-container` 為 2100，必須壓過 doc-preview 與 template-var-panel 的 2000 層——否則檔案預覽開啟時的操作回饋會被蓋住看不到（先前為 1600，實際被 doc-preview 蓋住）；全域 API 錯誤浮層與 tooltip portal 維持 9999（API 錯誤與游標提示更優先）。duration 由型別決定、呼叫端不自帶：success/loading 3000ms、error 5000ms、有 action 5000ms。容器內 toast 預設 `pointer-events: none`，僅帶 action 者可點（toast 位於卡片右下角，無條件可點會吃掉數秒點擊）。文案長度：`.toast__msg` 的 line-clamp:2 約在 29 全形寬靜默截斷；各類型的字數上限（例如 success/loading 16 全形寬、error 24、有 action 18）由使用端自訂；插值長度必須有界。',
    notes: [
        '（2026-08-13 使用者拍板）位置以實作為準：bottom 為 calc(24px + var(--dock/h, 48px) + 16px)、right 為 24px。原文件的固定 32px 會讓 toast 壓在底部工具列上；動態值在工具列高度變化時自動跟隨。',
        'undo 語意：使用者操作當下 API 已經成功寫入，toast 自動消失不代表「提交」，只是 UX 計時結束；onClick 的職責是呼叫還原 / undelete API。詳見 ds-patterns.js 的 action.confirm-destructive → reversibleToast。',
        '防重點：actionFired 一次性旗標擋下重複觸發；toast 被外部 dismiss 或元件 destroy 時清除 timer。',
    ],
    customTables: [
        {
            title: '視覺規格',
            columns: [
                '屬性',
                'M（預設）',
                'S',
            ],
            rows: [
                [
                    '寬度',
                    '333px',
                    '260px',
                ],
                [
                    '高度',
                    '56px',
                    '40px',
                ],
                [
                    'padding',
                    '8px 12px',
                    '6px 10px',
                ],
                [
                    'gap',
                    '16px',
                    '10px',
                ],
                [
                    'border-radius',
                    '10px',
                    '8px',
                ],
                [
                    'Icon',
                    'app-icon size="36"',
                    'app-icon size="24"',
                ],
                [
                    '訊息文字',
                    '16px / medium / white',
                    '14px / medium / white',
                ],
                [
                    '陰影',
                    '0px 0px 20px rgba(0,0,0,0.2)',
                    '同 M',
                ],
                [
                    'success 背景',
                    '#74ae3e（全色填滿）',
                    '同 M',
                ],
                [
                    'error 背景',
                    '#cc5252（全色填滿）',
                    '同 M',
                ],
                [
                    'action 按鈕',
                    '右側文字按鈕 · 14px / 600 / 白 · flex-shrink: 0',
                    '13px / 600 · msg flex-shrink: 1 讓出空間',
                ],
            ],
        },
        {
            title: '定位規範',
            columns: [
                '屬性',
                '值',
            ],
            rows: [
                [
                    'position',
                    'fixed',
                ],
                [
                    'bottom',
                    'calc(24px + var(--dock/h, 48px) + 16px)　工具列 48px 時 ≈ 88px',
                ],
                [
                    'right',
                    '24px',
                ],
                [
                    'z-index',
                    '600',
                ],
                [
                    '進場動畫',
                    'toastSlideIn 300ms cubic-bezier(0, 0, 0.2, 1)',
                ],
                [
                    '退場動畫',
                    'toastSlideOut 300ms cubic-bezier(0.4, 0, 1, 1)',
                ],
            ],
        },
    ],
};
