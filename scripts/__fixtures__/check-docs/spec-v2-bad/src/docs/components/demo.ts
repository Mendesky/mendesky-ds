import type { ComponentSpec } from '../component-spec.js';
export const demoSpec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  notes: [],
  anatomy: [{ name: '外框' }, { name: '#buton 圖示', description: '圖示' }],
  states: [{ name: '停用', description: '灰底' }, 'hover', { name: '(click) 按下', description: '底色變深' }],
  a11y: {
    keyboard: 'Enter 觸發',
    voice: ['說「按下」'],
    aria: ['用 [attr.aria-pressed] 綁定按下狀態'],
  },
  dos: [{ story: 'filled-primary' }, { text: '改用 #buton' }],
  donts: [{ text: '不要這樣', story: 'Filled Primary' }],
} as ComponentSpec;
