import type { ComponentSpec } from '../component-spec.js';
// 不合說明文字格式的寫法：直接寫標籤名、沒收尾的反引號、落單的 **、粗體以外的 *、Markdown 連結、
// 行首的清單、#元件id 緊貼程式碼、有命名空間的標籤、表格標題與欄名用了格式
export const demoSpec: ComponentSpec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  when: '要表達「示範」時用。禁止原生 <button>。',
  notes: [
    '貼上時移除 <b style="font-weight:normal">。',
    '寫 `color: inherit 沒收尾。',
    '**重點** 與落單的 ** 混在一起。',
    '原始碼見 [mendesky-ds](https://github.com/Mendesky/mendesky-ds)。',
    '1. 先選類型，再填內容。',
    '用 `<x>`#demo 包起來。',
    'Word 貼上的 <o:p> 要移除。',
  ],
  anatomy: [{ name: '<span> 外框', description: '可以點的範圍' }],
  customTables: [{ title: '**尺寸**', columns: ['`size`', '高度'], rows: [['M', '36px']] }],
};
