// @mendesky/ds 對外出口：跟框架無關的圖示資料、工具程式、資料格式、元件規格。
// 樣式在 styles/（SCSS），由各框架套件或使用端以 @use／@forward 引入。
export * from './icons/icons.js';

export * from './models/prosemirror.model.js';
export * from './models/template-var.model.js';

export * from './utils/avatar-color.util.js';
export * from './utils/clipboard.util.js';
export * from './utils/inline-trigger.js';
export * from './utils/pdf-render.util.js';
export * from './utils/print-pdf.util.js';
export * from './utils/safe-uuid.util.js';
export * from './utils/template-text.util.js';
export * from './utils/template-var-key.js';

export type { ComponentSpec, DocGroup, DocNote, DocTable } from './docs/component-spec.js';
export { COMPONENT_SPECS } from './docs/components/index.js';
