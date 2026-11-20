import type { ComponentSpec } from '../component-spec.js';

export const buttonGroupSpec: ComponentSpec = {
  id: 'button-group',
  name: 'Button Group',
  group: '互動元件',
  when: '2–5 個互斥選項，且視覺需連成一排時用。',
  notes: [
    'RWD 指引：手機版（< 768px）若選項文字過長（單一選項 > 4 個中文字，或 ≥ 3 選項且平均字數 > 3），應改用 #select 替代 button-group。做法：桌面版保留 button-group，手機版加平行的 #select，用 CSS class 切換顯示（.xxx-desktop-only / .xxx-mobile-only），共用同一組 options 和 change handler。短文字選項（如「月/年/次」「小/中/大」）維持 button-group 不變。',
    '選中的顏色依用途選，不依喜好：表單裡的作答用 form 型（綠色）；切換畫面的呈現方式這類功能操作，用 view 型加 color="primary"（深藍 #1a6489，同主要按鈕按下時的顏色）；字級、排版方式這類中性的設定，用 view 型的預設深灰。同一個畫面上兩種用途並存時，顏色就能告訴使用者哪一組會改變畫面、哪一組只是設定。',
    'view 型的選項可以只放圖示（選項的 icon）。這時 label 仍然必填：它是報讀軟體念的名稱，也是滑過時的提示。只放圖示適合大家已經熟悉的圖示（例：表格、看板）；意思不明顯的選項要放文字。',
    '鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 一律只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。',
  ],
  customTables: [],
};
