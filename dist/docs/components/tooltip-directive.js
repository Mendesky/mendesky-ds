export const tooltipDirectiveSpec = {
    id: 'tooltip-directive',
    name: 'Tooltip Directive (Portal)',
    group: '浮層元件',
    when: '替代 #tooltips 元件的 portal 版本。hover/focus 時自動顯示 tooltip，portal 到 body 避免容器裁切。',
    notes: [
        '動態建立 tooltip 浮層元素，portal 到 document.body，position:fixed',
        '顯示延遲 300ms（mouseenter/focus 觸發），mouseleave/blur 立即隱藏',
        '觸發元素捲出可視範圍時自動隱藏 tooltip',
        '觸控裝置（手機、平板這類沒有滑鼠的裝置）上不顯示，tooltip 浮層的外層元素設為 `display:none !important`。判斷看的是有沒有滑鼠（`(hover: none) and (pointer: coarse)`），不是視窗寬度：電腦把視窗拉窄照樣顯示，iPad 不論直放橫放都不顯示。這個條件跟 mendesky-web 判斷觸控裝置的方式一樣。2026-11-04 起改成這樣，之前是寬度小於 1024px 就隱藏。只靠 tooltip 傳達的資訊，在觸控裝置上要另外找地方放',
        '寫測試量 tooltip 尺寸時，要另外檢查寬度大於 0。tooltip 被藏起來時量到的是 0，「寬度 ≤ N」這類斷言會恆真、測試假綠',
        '#icon-btn 已內建本 tooltip 支援（透過 tooltip、tooltipPos 屬性），disabled 狀態下 tooltip 仍正常顯示（綁在 wrapper div 上）',
        '長內容：`.tooltip__text` 預設只有 `white-space: pre-line`（讓呼叫端字串裡的 `\\n` 保留，多行 tooltip 如 #button 的 disabledMessage 靠它），**沒有 max-width**——一個 90 字的無空白 ASCII 檔名實測會撐到 1735px。長字串請開啟換行選項（2026-10-13 加回，選用、不改預設）：加上 `.tooltip__text--wrap`（`max-width:520px` + `overflow-wrap:anywhere`）',
    ],
    customTables: [],
};
