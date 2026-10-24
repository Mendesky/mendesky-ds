import type { ComponentSpec } from '../component-spec.js';

export const datePickerSpec: ComponentSpec = {
  id: 'date-picker',
  name: 'Date Picker',
  group: '表單元件',
  when: '需要選取民國年、年月、或完整日期（年月日）的場景。',
  notes: [
    {
      type: 'info',
      content: "值格式：year='114'、month='114-3'、day='114-3-15'，空值 ''；可以跟表單雙向綁定值",
    },
    {
      type: 'info',
      content: '行為規格：點擊 trigger → portal 到 body 的浮動 panel，dropdown 寬度與 trigger 同寬。year 模式：直接顯示 2 欄年份 grid，點擊年份即選取。month 模式：← 年 → 導覽 + 3×4 月份 grid，點擊月份即選取。day 模式：先選月份（← 年 → 導覽 + 3×4 月份 grid），選月後切換至日期 grid（← 返回 + 標題 + 7 欄星期 + 日期按鈕），點擊日期即選取。Escape / 點擊 trigger 外 → 關閉 panel。',
    },
    {
      type: 'info',
      content: '（2026-07 更新）快速跳年：month/day 模式的標題年份為可點按鈕（帶下箭頭），點擊展開可捲動的年份清單（minYear..maxYear，開啟時自動聚焦/捲到目前年），選年後回到月份 grid 繼續選月/日——用於 minYear 距今較遠（如出生日期民國40年起）時免逐年點箭頭。year 模式的年份清單是根視圖、選年即最終值（emit），行為不變。',
    },
    {
      type: 'info',
      content: "（2026-04 更新）鍵盤操作：Enter/Space 開關 panel、Tab/Shift+Tab 關閉 panel 並標記 touched（讓表單驗證正確觸發）、Escape 關閉 panel。trigger 設定 role='combobox' + aria-expanded + aria-haspopup='listbox'。",
    },
    {
      type: 'warning',
      content: '元件本身的元素已設定 display: block，放入 flex 容器時會自動伸展；需固定寬度時請在父層設定 width。',
    },
  ],
  customTables: [],
};
