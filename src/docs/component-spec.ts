/**
 * 元件規格的格式（跟框架無關的部分）。
 *
 * 每個元件在 `src/docs/components/<id>.ts` 放一份規格：何時用、注意事項、選用表格。
 * 各框架套件（mendesky-ds-angular、mendesky-ds-vue…）在元件旁邊另放「這個框架怎麼用」
 * 的說明（元件標籤、屬性、範例程式碼），以同一個 `id` 對應。文件網站與使用端的 AI 協作
 * 索引把兩份合併後呈現。
 */
export type DocGroup = '互動元件' | '表單元件' | '浮層元件' | '展示元件' | '工具';

export interface DocNote {
  type: 'info' | 'warn' | 'warning';
  content: string;
}

export interface DocTable {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface ComponentSpec {
  /** 規格的識別字；互動原則以 `#<id>` 引用，各框架的用法說明以同一個 id 對應 */
  id: string;
  name: string;
  /** 文件網站側欄分組 */
  group: DocGroup;
  /** 何時使用／禁止用法 */
  when?: string;
  description?: string;
  /** 字串為無分類的備註 */
  notes: Array<DocNote | string>;
  customTables?: DocTable[];
}
