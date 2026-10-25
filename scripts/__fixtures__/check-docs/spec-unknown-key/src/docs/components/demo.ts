import type { ComponentSpec } from '../component-spec.js';
export const demoSpec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  notes: [],
  anatomies: [{ name: '外框', description: '可點擊的範圍' }],
  donts: [{ text: '不要這樣' }],
} as unknown as ComponentSpec;
