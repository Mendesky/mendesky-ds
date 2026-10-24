export const buttonGroupSpec = {
    id: 'button-group',
    name: 'Button Group',
    group: '互動元件',
    when: '2–5 個互斥選項，且視覺需連成一排時用。',
    notes: [
        'RWD 指引：手機版（< 768px）若選項文字過長（單一選項 > 4 個中文字，或 ≥ 3 選項且平均字數 > 3），應改用 #select 替代 button-group。做法：桌面版保留 button-group，手機版加平行的 #select，用 CSS class 切換顯示（.xxx-desktop-only / .xxx-mobile-only），共用同一組 options 和 change handler。短文字選項（如「月/年/次」「小/中/大」）維持 button-group 不變。',
        '鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 一律只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。',
    ],
    customTables: [],
};
