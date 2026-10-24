import type { ComponentSpec } from '../component-spec.js';
export const demoSpec: ComponentSpec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  notes: [],
  anatomy: [
    { name: '外框', description: '可點擊的範圍' },
    { name: '文字', description: '說明這個操作，例如「儲存」' },
  ],
  states: [{ name: '停用', description: '灰底，點了沒有反應' }],
  a11y: {
    keyboard: ['Enter 或空白鍵觸發'],
    screenReader: ['念出文字與「按鈕」'],
    aria: ['停用時加 aria-disabled="true"'],
  },
  dos: [{ text: '一個畫面只放一個主要按鈕', story: 'filled-primary' }],
  donts: [{ text: '不要用 #demo 包另一個 #demo' }],
};
