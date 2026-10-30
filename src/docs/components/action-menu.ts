import type { ComponentSpec } from '../component-spec.js';

export const actionMenuSpec: ComponentSpec = {
  id: 'action-menu',
  name: 'Action Menu',
  group: '展示元件',
  when: '右鍵或 More 按鈕展開的浮層，有兩種用法。當選單用時，每一項都放 #menu-item。放了 #menu-item 才是選單：報讀軟體會念出「選單」和 `ariaLabel` 設的名稱，鍵盤與焦點也改照選單的規則走，規則寫在下面的無障礙說明。當篩選面板這類一般浮層用時，裡面放 #button、#check-chip、輸入框，鍵盤與焦點照一般浮層的規則走（見下方無障礙說明），不會被念成選單。兩種都不要自己手刻 `<button>`、`<div>` 當選項。',
  notes: [
    '（2026-08-13 使用者拍板）卡片底色與邊框以實作為準：底色 rgba(255,255,255,0.45)（不是 0.72）、邊框用 --border/white 純白（不是 0.85 半透明）。已寫進上方視覺規格表，勿再視為漂移回報。',
    '（2026-04 更新）元件自動 portal 到 document.body，父層不再需要 position:relative。使用 position:fixed 定位，解決 transform/overflow:hidden 容器裁切問題。anchor 追蹤由浮層定位服務以事件驅動完成（document capture-phase scroll、window resize、trigger 的 ResizeObserver、visualViewport 變化），非 rAF 輪詢；rAF 只用於 attach 後的單次初始定位與同帧節流。context-menu 模式（attachAtPoint）不追蹤捲動。',
    'autoCloseOnAction=true（預設）：適合點選即執行的 More 操作選單，點任何選項後自動關閉。放了 #menu-item 的選單只有點到可以用的選項才關，點到分隔線、空白處或停用的選項都不會關。',
    'autoCloseOnAction=false：適合含輸入欄、多選 chip、套用按鈕的複雜篩選面板，讓使用者操作完再手動關閉',
    '不需要在父層自己偵測外部點擊：浮層定位服務以 capture-phase pointerdown 偵測，點到外部時元件送出 closeMenu 事件，父層接這個事件關閉選單',
  ],
  a11y: {
    keyboard: [
      '放了 #menu-item 的選單：上下方向鍵只在選單項目之間移動，停用的項目也停得到；在最後一項按下會回到第一項，在第一項按上會跳到最後一項。Home、End 分別跳到第一項、最後一項。',
      '放了 #menu-item 的選單：Enter 或空白鍵執行目前這一項。Esc 關閉選單，焦點回到打開選單的按鈕。Tab 也會關閉選單，焦點接著移到打開選單那顆按鈕的下一個元素。',
      '沒放 #menu-item 的浮層（篩選面板、選項還是 #button 的選單）：上下方向鍵在可以按的按鈕之間移動，焦點在輸入框裡時方向鍵照常移動游標；Enter 或空白鍵觸發目前這一項；Esc 關閉，焦點還給打開前有焦點的元素。Tab 不會關閉浮層，Home、End 也沒有特別的作用。',
    ],
    focus: [
      '沒放 #menu-item 的浮層，打開時焦點移到第一個可以按的項目。`autoFocusFirst` 設成 false 時不移，由呼叫端自己帶進去，例如錨點是輸入框、打開後還要繼續打字的時候。',
      '放了 #menu-item 的選單，打開時焦點停在 `selected` 為 true 的那一項；沒有選中項才停在第一項。`autoFocusFirst` 設成 false 時一樣不移，由呼叫端自己帶進去。',
      '放了 #menu-item 的選單，選完一項或點外面空白處關掉之後，焦點回到打開選單的按鈕。要是焦點已經被別的東西拿走，例如選的那一項打開了對話框，就不會把焦點搶回來。點外面時按到的是別的按鈕、連結、輸入框這類可以操作的元素，也當成使用者換去操作那個東西，焦點交給瀏覽器處理，不拉回打開選單的按鈕。點到對話框卡片這類外框裡的空白處，就算瀏覽器把焦點給了外框，也當成點空白處，焦點照樣還給打開選單的按鈕。按下去那一刻焦點本來就不在選單裡時也一樣不拉回，例如 `autoFocusFirst` 設成 false、焦點一直留在錨點的輸入框。打開選單的是輸入框時，點外面關掉一律不把焦點還給它：使用者是點走了，游標不該跳回輸入框，一拿到焦點就打開的下拉也不會被重新打開；按 Esc 關掉時照樣還。',
      '放了 #menu-item 的選單開著時，項目全被拿掉（例如清單重新載入後變成空的），外框就不再是選單、接不住焦點，焦點還給打開選單的按鈕。',
      '點外面關掉、把焦點還給打開選單的按鈕時，頁面不會跟著捲動，按鈕已經捲出畫面也不會被捲回來。Esc、Tab 或選完一項關掉時，頁面照常捲到看得到那顆按鈕，用鍵盤的人才知道焦點在哪。',
      '瀏覽器沒有記到打開選單的按鈕時（Safari 用滑鼠點按鈕，按鈕不會取得焦點），改找跟選單放在同一個外層元素裡、aria-haspopup 是 menu 或 true 的按鈕，把焦點還給它；打開對話框、清單的按鈕（aria-haspopup 是 dialog、listbox 等）不算。有另外指定錨點元素（`anchorEl`）時，改找錨點元素本身和它裡面。符合的按鈕不只一顆時，用選單開著時標著 aria-expanded="true" 的那顆；都沒標就認不出是哪顆，焦點不還，不亂猜。打開前有焦點的元素不在這個範圍裡時（例如從另一個選單直接點過來），也先照這個方式找，找不到才把焦點還給那個元素。',
      '放了 #menu-item 的選單，點到分隔線或空白處時不會關閉，焦點留在選單外框上，方向鍵照樣能用。外框接得住焦點，但不在 Tab 順序裡。',
    ],
    screenReader: [
      '放了 #menu-item 的選單，報讀軟體會念出「選單」和它的名稱。名稱來自 `ariaLabel`，用畫面上看得到的字，例如「排序」「每頁顯示筆數」。',
      '沒放 #menu-item 的浮層不會被念成選單：外框沒有角色也沒有名稱，報讀軟體照裡面每個元件自己的角色念。',
      '打開選單的按鈕要讓報讀軟體知道它會打開選單、選單現在開著沒有。用 #button 或 #icon-btn 當觸發鈕時，設 `ariaHaspopup` 和 `ariaExpanded`。',
    ],
    aria: [
      '放了 #menu-item 時，外框是 role="menu"，`ariaLabel` 輸出成 aria-label，外框也加上 tabindex="-1"。沒放時這三個都不會出現。',
      '選單裡的分隔線要標 role="separator"。',
      '打開選單的按鈕標 aria-haspopup="menu"，再用 aria-expanded 跟著選單開關變。',
    ],
  },
  customTables: [
    {
      title: '視覺規格',
      columns: [
        '項目',
        '值',
      ],
      rows: [
        [
          'background',
          'rgba(255,255,255,0.45) + backdrop-filter: blur(15px)',
        ],
        [
          'border',
          '1px solid var(--border/white)（＝#ffffff 純白，非半透明）',
        ],
        [
          'box-shadow',
          '0 4px 40px -10px rgba(0,0,0,0.28)',
        ],
        [
          'border-radius / padding',
          '10px / 5px',
        ],
        [
          'z-index / 定位',
          '9999 起遞增（浮層定位服務以 inline style 指定，下限 9999、每開一個 portal +1；元件 CSS 的 z-index:1000 被 inline 蓋掉、不生效）/ position:fixed; portal 到 document.body，anchor 追蹤為事件驅動（非 rAF 輪詢）',
        ],
        [
          '進場動畫',
          'opacity 0→1 + scale 0.97→1，150ms ease-out',
        ],
        [
          '父層需求',
          '無（portal 模式下父層無定位需求）',
        ],
      ],
    },
    {
      title: '內容元件規範',
      columns: [
        '使用情境',
        '元件',
        '規格',
      ],
      rows: [
        [
          '選單的選項（執行一個動作，或從幾個值裡選一個）',
          '#menu-item',
          '一般動作不設 selected；單選項選中的設 selected 為 true，其他設 false',
        ],
        [
          '危險操作（刪除、封存、撤回已送出的申請）',
          '#menu-item',
          'tone="danger" icon="Trash-Del"',
        ],
        [
          '篩選面板的一般操作（清除篩選）',
          '#button',
          'variant="elevated" size="S"',
        ],
        [
          '搭配 check-chip 的確認動作',
          '#button',
          'variant="filled" color="primary" size="S"',
        ],
        [
          '多選篩選項目',
          '#check-chip',
          'theme="transparent-grey"',
        ],
      ],
    },
  ],
};
