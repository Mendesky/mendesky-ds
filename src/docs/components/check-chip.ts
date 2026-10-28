import type { ComponentSpec } from '../component-spec.js';

export const checkChipSpec: ComponentSpec = {
  id: 'check-chip',
  name: 'Check Chip',
  group: '互動元件',
  when: '篩選條件多選、標籤多選、表單內單一 boolean 偏好（如同意條款、Email 通知開關）。禁止用 checkbox 自刻。text 可為使用者自由輸入（inline-add 自訂項目）時無需額外設定——chip 預設就會折行。',
  notes: [
    {
      type: 'info',
      content: '可以跟表單雙向綁定值：表單寫入值、元件回報變更與 touched、表單切換停用狀態都支援',
    },
    {
      type: 'info',
      content: '長文字折行是預設行為（white-space: normal + overflow-wrap: anywhere + max-width: 100%），短標籤在放得下時渲染不變。2026-08-04 起：原本的 white-space: nowrap 會讓 min-content ＝ 整串文字寬 → chip 作為 flex item 完全不可收縮 → 自由輸入的長選項（搭配 inline-add 的多選欄位）必定撐破卡片。',
    },
    {
      type: 'info',
      content: '折行的兩個必要配套（缺了只是半修好）：元件本身的元素是 <button>，UA 預設 text-align: center 會讓多行文字逐行居中、難讀，故需 text-align: left；.chip 是 flex 容器，文字折行撐高時 16px checkbox icon 會被 flex-shrink 壓成橢圓，故 icon 需 flex: none。',
    },
  ],
  a11y: {
    keyboard: ['Tab 移到勾選標籤，空白鍵或 Enter 切換選取。', '停用時 Tab 會跳過。'],
    focus: ['用鍵盤移到勾選標籤時，外圍出現 2 px 的淺藍色焦點框，距離標籤 2 px，顏色比 DS 共用的焦點框淺；用滑鼠點不會出現。'],
    screenReader: [
      '念出 text、按鈕角色，以及目前是否已選。勾選圖示不會被念出。',
      'text 單獨看不出意思時（例如好幾組都有「其他」），用 ariaLabel 給完整名稱。設了 ariaLabel 就不再念 text。',
    ],
    motion: ['選取時底色、框線、文字色變化 0.15 秒。目前不會因為使用者設定「減少動態」而停止。'],
    aria: [
      '用原生 button 元素，type="button"，用 aria-pressed 表示已選（"true"）或未選（"false"），跟 #radio-chip 一致。',
      '停用用原生 disabled。',
      'ariaLabel 輸出成 aria-label；沒設時不輸出。',
    ],
  },
  customTables: [
    {
      title: 'Theme 使用情境',
      columns: [
        'Theme',
        '未選中',
        '選中',
        '適用場景',
      ],
      rows: [
        [
          'default',
          '灰底（#e7e7e7）',
          '綠底白字（#74ae3e）',
          '表單多選主要用途',
        ],
        [
          'transparent',
          '透明',
          '綠字，無底色',
          '輕量標籤、緊湊篩選',
        ],
        [
          'transparent-grey',
          '透明',
          '深灰底白字（#7d7d7d）',
          '次要篩選、灰色系場景',
        ],
      ],
    },
  ],
};
