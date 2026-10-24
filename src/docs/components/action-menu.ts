import type { ComponentSpec } from '../component-spec.js';

export const actionMenuSpec: ComponentSpec = {
  id: 'action-menu',
  name: 'Action Menu',
  group: '展示元件',
  when: '右鍵或 More 按鈕展開的選單清單。選項一律用 #button variant="ghost"，禁止手刻 <button>/<div>。',
  notes: [
    '（2026-08-13 使用者拍板）卡片底色與邊框以實作為準：底色 rgba(255,255,255,0.45)（不是 0.72）、邊框用 --border/white 純白（不是 0.85 半透明）。已寫進上方視覺規格表，勿再視為漂移回報。',
    '（2026-04 更新）元件自動 portal 到 document.body，父層不再需要 position:relative。使用 position:fixed 定位，解決 transform/overflow:hidden 容器裁切問題。anchor 追蹤由浮層定位服務以事件驅動完成（document capture-phase scroll、window resize、trigger 的 ResizeObserver、visualViewport 變化），非 rAF 輪詢；rAF 只用於 attach 後的單次初始定位與同帧節流。context-menu 模式（attachAtPoint）不追蹤捲動。',
    'autoCloseOnAction=true（預設）：適合點選即執行的 More 操作選單，點任何選項後自動關閉',
    'autoCloseOnAction=false：適合含輸入欄、多選 chip、套用按鈕的複雜篩選面板，讓使用者操作完再手動關閉',
    '不需要在父層自己偵測外部點擊：浮層定位服務以 capture-phase pointerdown 偵測，點到外部時元件送出 closeMenu 事件，父層接這個事件關閉選單',
    '鍵盤操作：ArrowUp/ArrowDown 在選項間移動、Escape 關閉並還原焦點到觸發元素',
  ],
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
          '一般操作（清除篩選、還原預設）',
          '#button',
          'variant="elevated" size="S"',
        ],
        [
          '搭配 check-chip 的確認動作',
          '#button',
          'variant="filled" color="primary" size="S"',
        ],
        [
          '危險操作（刪除、封存、撤回已送出的申請）',
          '#button',
          'variant="ghost" color="danger" size="S" leftIcon="Trash-Del"',
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
