export const numberListSpec = {
    id: 'number-list',
    name: 'Number List',
    group: '展示元件',
    when: '報表數字展示列、檔案列（含檢視／下載／編輯／刪除）。寬度 1024px 以上：label 與 text 放不下截成「…」，**只有真的被截斷時**滑過／聚焦才顯示全文 tooltip；寬度小於 1024px：改換行完整顯示。手機（小於 768px）按鈕只留圖示，「label＋text＋按鈕」的列改兩行（見下方 note，2026-10-13）。',
    notes: [
        {
            type: 'info',
            content: '**條件式 tooltip 已恢復**（2026-10-13）：label 與 text 掛 #tooltip-directive，並開啟「只在截斷時顯示」（只在真的被截斷時顯示、才給 `tabindex=0`）與「換行」（tooltip 文字最寬 520px 換行）兩個選項。2026-08-18 撤除的那一版改在元件內部量測；這版把量測放進 #tooltip-directive，其他截斷文字元件也能直接用。消費端**不要**再自己對 `.nl-text` 掛 tooltip。',
        },
        {
            type: 'info',
            content: '**寬度小於 1024px（`bp.tablet-landscape-down`）label 與 text 換行完整顯示、不截斷**。斷點刻意與 tooltip 的隱藏斷點相同：tooltip 不出現的寬度就不能截斷，否則會「截斷又看不到全文」。代價是名稱長的列會變高。',
        },
        {
            type: 'info',
            content: '**「label＋text＋按鈕」的列（`.nl-row--labeled`）**：條件＝有 label、有按鈕，且沒有 number1／number2／avatar／subview。寬度 768px 以上：放不下折成兩行時，按鈕靠下對齊「text 那一行」並往上補 2px（不卡在兩行中間；text 自己也換成多行時對齊最後一行）。手機（`bp.tablet-down`，小於 768px）改兩行格線：第一行 label 獨佔整列，第二行 text＋按鈕。沒有 label 的列不受影響，維持置中。',
        },
        {
            type: 'info',
            content: '**手機（小於 768px）按鈕只留圖示**（S 寬 24px、M 寬 28px），文字隱藏；按鈕名稱由 `aria-label`（檢視／下載／編輯／刪除）提供給螢幕閱讀器。所有使用此元件的畫面都適用，含 #file-list 的消費端（2026-10-13 使用者選定「全部畫面一起改」）。',
        },
        {
            type: 'warn',
            content: '寫版面測試要自己設定視窗寬度：截斷／換行／手機排法都看 media query（視窗寬），不是元件寬。',
        },
    ],
    customTables: [],
};
