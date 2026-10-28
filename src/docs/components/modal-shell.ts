import type { ComponentSpec } from '../component-spec.js';

export const modalShellSpec: ComponentSpec = {
  id: 'modal-shell',
  name: 'Modal Shell',
  group: '浮層元件',
  when: '所有自訂 Modal 的容器。禁止自刻 overlay + card 組合。',
  notes: [
    {
      type: 'info',
      content: '（2026-08-13 使用者拍板）毛玻璃卡片底色以實作為準＝rgba(255,255,255,0.8)（不是 0.85）。此值只在 frostedGlass=true 時生效；預設卡片是不透明 #ffffff。',
    },
    {
      type: 'info',
      content: '#dialog 適合固定格式的小型確認對話框；#modal-shell 適合需要自訂 header / body / footer 的大型 Modal（例：多步驟精靈、詳情面板）。',
    },
    {
      type: 'warning',
      content: 'modal-shell 會把元件本身的元素搬到 document.body（防止 overflow:hidden 裁切 backdrop-filter），因此父層穿透元件樣式封裝的寫法無法打到 .modal-card 內部樣式。如需修改卡片行為請用元件屬性（例：overflowVisible）。',
    },
  ],
  a11y: {
    keyboard: [
      'Tab 與 Shift+Tab 只在對話框裡面繞，不會跑到後面的頁面。',
      '按 Esc 時只有最上層的對話框收得到。要直接關、還是先跳二次確認，由使用的畫面決定。',
    ],
    focus: [
      '進場動畫結束後（約 0.45 秒），焦點移進對話框，預設停在第一個可以用 Tab 移到的元素。',
      '關閉時，等離場動畫結束，焦點回到開窗前所在的元素。開不到 0.45 秒就關掉的話，焦點不會移動。',
    ],
    screenReader: [
      '開窗時念出對話框的名稱與「對話框」。名稱就是標成對話框標題的那段文字，各框架怎麼標寫在用法說明裡。',
      '搜尋視窗這類畫面上沒有標題的對話框，名稱來自 ariaLabel。',
      '標題和 ariaLabel 都沒有的話，報讀軟體念不出這是什麼對話框；開發模式會在進場動畫結束時於 console 警告。',
    ],
    aria: [
      '卡片是 role="dialog"，加上 aria-modal="true"。',
      '名稱只輸出一種屬性。設了 ariaLabel 就輸出 aria-label；沒設時輸出 aria-labelledby，有 ariaLabelledBy 就指向它，沒有就指向標成對話框標題的元素。',
      '標成對話框標題的元素沒有 id 時，會自動產生一個。',
    ],
  },
  dos: [
    { text: '把對話框的標題標成對話框標題。報讀軟體開窗就會念出來，使用者馬上知道開了什麼。', story: 'default' },
    { text: '沒有標題的對話框設 ariaLabel，一兩個詞講清楚就好，例如「搜尋」。', story: 'search' },
    { text: '多步驟這類會換標題的對話框，每一步的標題都可以標，只要同一時間只存在一個。' },
  ],
  donts: [
    { text: '同一個對話框別同時標兩個標題。只會念最早建立的那一個，不一定是畫面上排在前面的，開發模式也會警告。' },
    { text: '畫面上已經有標題，就不要再設 ariaLabel。設了之後只念 ariaLabel，哪天標題改字，兩邊很容易對不上。' },
  ],
  customTables: [
    {
      title: '視覺規格',
      columns: [
        '屬性',
        '值',
      ],
      rows: [
        [
          '卡片背景',
          'rgba(255,255,255,0.8) / backdrop-filter: blur(7.5px)（僅 frostedGlass=true 時；預設卡片為不透明 #ffffff）',
        ],
        [
          '邊框 / 圓角',
          'border: 1px solid #fff / border-radius: 16px',
        ],
        [
          '陰影',
          '0px 4px 40px -10px rgba(0,0,0,0.2)',
        ],
        [
          '動畫 Tier',
          'Panel — 450ms / 進場: cubic-bezier(0,0,0.2,1) / 退場: cubic-bezier(0.4,0,1,1)',
        ],
      ],
    },
  ],
};
