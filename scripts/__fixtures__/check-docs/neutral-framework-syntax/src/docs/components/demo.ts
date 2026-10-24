import type { ComponentSpec } from '../component-spec.js';
export const demoSpec: ComponentSpec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  when: '選項一律用 app-button。',
  notes: [
    { type: 'info', content: '主按鈕綁 [disabled]="!confirmed()"，支援 ngModel。' },
    '模板用 @defer 延遲載入編輯器。',
    '載入旗標是 Signal。',
    '寫測試時 Karma 的視窗比較窄。',
    '去重由父層 (add) handler 處理。',
    '左側控制項放進 [slot=left]。',
    '讀屏文字綁 [attr.aria-label]。',
  ],
};
