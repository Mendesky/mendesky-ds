import type { ComponentSpec } from '../component-spec.js';

export const toggleSpec: ComponentSpec = {
  id: 'toggle',
  name: 'Toggle',
  group: '互動元件',
  when: '即時生效的開/關設定。',
  notes: [],
  a11y: {
    keyboard: ['Tab 移到開關，空白鍵或 Enter 切換開或關。', '停用時 Tab 仍會停在開關上，但按了沒有反應。'],
    focus: ['用鍵盤移到開關時，外圍出現 2 px 的淺藍色焦點框，距離開關 2 px，顏色比 DS 共用的焦點框淺；用滑鼠點不會出現。'],
    screenReader: [
      '念出名稱、「開關」角色，以及目前是開或關。停用時也會念出停用狀態。',
      '開關本身沒有文字，名稱只來自 ariaLabel。沒設 ariaLabel 時，報讀軟體念不出這是什麼開關。',
    ],
    motion: ['切換時圓鈕滑動、底色變化，約 0.15 秒。目前不會因為使用者設定「減少動態」而停止。'],
    touch: ['開關寬 36、高 22 px，小於 iOS 建議的 44 點與 Android 建議的 48 dp 觸控範圍。'],
    aria: [
      '用原生 button 元素，role="switch"，用 aria-checked 表示開或關。',
      '停用用 aria-disabled="true"，不用原生 disabled，所以鍵盤仍停得到。',
      'ariaLabel 輸出成 aria-label；沒設時不輸出。',
    ],
  },
  dos: [
    { text: '每個開關都給 ariaLabel，用旁邊說明這個設定的文字，例如「Email 通知」。' },
  ],
  donts: [
    { text: '不要把會跟著開關改變的文字當名稱，例如「已開啟通知」／「未開啟通知」。名稱要固定，開或關由報讀軟體從開關狀態念出。' },
  ],
  customTables: [],
};
