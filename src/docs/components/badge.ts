import type { ComponentSpec } from '../component-spec.js';

export const badgeSpec: ComponentSpec = {
  id: 'badge',
  name: 'Badge',
  group: '展示元件',
  when: '未讀徽章：疊在按鈕或項目的右上角，表示「有未讀」或「未讀幾則」。目前用在 header 通知鈴與版本更新入口鈕、版本更新視窗的左欄版本列。',
  notes: [
    '徽章以 position: absolute 凸出宿主，宿主必須自己是 position: relative。元件的 host 是 display: contents，不會在 flex/grid 裡多出一個項目。',
    '宿主若位在 overflow 非 visible 的容器（例如可捲動清單），容器上緣要留白 >= 6px，否則第一列的徽章會被裁掉。',
    '底色用 --badge/unread，不借用 --button/error：未讀既不是錯誤也不是警告，綁在一起日後改錯誤紅會連帶改到未讀點。',
    'class 前綴是 .ds-badge，不是 .badge——core.scss 已有一個全域 .badge 標籤工具類，撞名會在 border-box 下把 10px 圓點撐成 18px。',
  ],
  customTables: [],
};
