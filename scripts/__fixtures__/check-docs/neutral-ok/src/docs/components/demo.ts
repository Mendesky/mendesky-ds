import type { ComponentSpec } from '../component-spec.js';
export const demoSpec: ComponentSpec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  when: '要表達「示範」時用。需要勾選時改用 #demo（色碼 #ffffff 與 #fff 不算元件代號）。',
  notes: [
    { type: 'info', content: '參考 https://example.com/guide#warning；樣式 class .app-copy 是本體的 class。' },
    'disabled 設為「還沒勾選」時，主按鈕停用；點擊送出 btnClick 事件。',
    '同步兩件事：(a) 色票常數 (b) 測試斷言；面板分左右 (left)(right) 兩區。',
    '安裝後印出 [link-ds-angular]，原始碼見 `[mendesky-ds-angular](https://github.com/Mendesky/mendesky-ds-angular)`。',
    '函式呼叫 fs.existsSync(pkgDir) 與索引 list[index] 不是綁定。',
    '**禁止原生 `<button>`**，字型用 `noto-*`；a < b 不是標籤。',
    // 程式碼裡的 # 不是元件代號；行首的色碼框架網站會跳脫，不會變成標題
    '範本變數寫成 `#menu`。',
    '#ffffff 是白色底。',
  ],
  // 表格標題與欄名是純文字：標籤名與 * 照原樣顯示
  customTables: [{ title: '原生 <button> 的尺寸', columns: ['size', 'noto-*'], rows: [['M', '36px']] }],
};
