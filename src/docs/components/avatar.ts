import type { ComponentSpec } from '../component-spec.js';

export const avatarSpec: ComponentSpec = {
  id: 'avatar',
  name: 'Avatar',
  group: '展示元件',
  when: '用戶頭像、個人資料。可點擊（例如右上角打開個人面板）時設 [clickable]="true" 並給 ariaLabel，點擊綁在外層 (click)。',
  notes: [
    '可點擊頭像不要再外包 div 或自己加 role="button"／tabindex：設 [clickable]="true" 就是原生按鈕。',
  ],
  customTables: [],
};
