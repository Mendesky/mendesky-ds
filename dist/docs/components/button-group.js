export const buttonGroupSpec = {
    id: 'button-group',
    name: 'Button Group',
    group: '互動元件',
    when: '2–5 個互斥選項，且視覺需連成一排時用。也用在同一份資料換一種呈現方式（例：表格、看板），這時用 view 型；要換成另一組內容時用 #tabs。',
    notes: [
        'RWD 指引：手機版（< 768px）若選項文字過長（單一選項 > 4 個中文字，或 ≥ 3 選項且平均字數 > 3），應改用 #select 替代 button-group。做法：桌面版保留 button-group，手機版加平行的 #select，用 CSS class 切換顯示（.xxx-desktop-only / .xxx-mobile-only），共用同一組 options 和 change handler。短文字選項（如「月/年/次」「小/中/大」）維持 button-group 不變。',
        '選中的顏色看這組選項拿來做什麼，不看喜好。綠色留給跟填寫進度有關的作答，form 型不設 color 就是綠色，想在程式裡寫明也可以設 color="progress"。選了之後畫面上顯示的東西會變（篩掉一部分資料、換一種排法）就用 color="primary" 的深藍 #1a6489，跟主要按鈕按下時同色；單位、字級這類只是偏好的設定用 color="neutral" 的深灰 #686868。form 型與 view 型都照這個分法；view 型不設 color 是深灰，設 progress 也一樣是深灰，因為 view 型不拿來作答。同一個畫面上兩種用途並存時，顏色幫使用者分出哪一組會改變畫面、哪一組只是設定；但顏色只是輔助，選項的名稱還是要講清楚它做什麼。切換呈現方式跟 #tabs 的差別：呈現方式是同一份資料換一種排法（表格、看板），內容不變；#tabs 是換成另一組內容。',
        'view 型的選項可以只放圖示（選項的 icon）。這時 label 仍然必填：它是報讀軟體念的名稱，也是滑過時的提示。只放圖示適合大家已經熟悉的圖示（例：表格、看板）；意思不明顯的選項要放文字。只放圖示的選項不要停用（單一選項或整組都算）：停用的按鈕滑鼠碰不到、鍵盤停不上去，提示出不來，看畫面的人就不知道它叫什麼。要停用的選項改放文字。',
        '鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 一律只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。',
    ],
    customTables: [],
};
