/**
 * 元件規格的格式（跟框架無關的部分）。
 *
 * 每個元件在 `src/docs/components/<id>.ts` 放一份規格：何時用、注意事項、選用表格。
 * 各框架套件（mendesky-ds-angular、mendesky-ds-vue…）在元件旁邊另放「這個框架怎麼用」
 * 的說明（元件標籤、屬性、範例程式碼），以同一個 `id` 對應。文件網站與使用端的 AI 協作
 * 索引把兩份合併後呈現。
 *
 * 寫法（本體、互動原則 patterns.ts、基礎說明 foundations/ 都適用；`npm run check:docs` 會檢查）：
 * 1. 指其他元件寫 `#元件id`（例：「改用 #check-chip」）。各處自己換成名稱：文件網站顯示元件名稱加連結，
 *    Angular 換成 app-check-chip，Vue 換成 <DsCheckChip>。不寫 app-xxx、<DsXxx>、XxxComponent。
 * 2. 屬性與事件只寫名稱（disabled、closeClick），不寫綁定語法（[x]=、(x)、:x=、@x=）。
 *    值用文字描述，例如「disabled 設為『還沒勾選』」。
 * 3. 跟表單雙向綁定值：寫「可以跟表單雙向綁定值」；ngModel、v-model 這類寫法放各框架說明檔的 usageNotes。
 * 4. 放入自訂內容：寫用途與能放什麼；ng-content、slot 的語法放各框架的 usageNotes。
 * 5. 服務：寫「toast 服務」「modal 堆疊服務」「浮層定位服務」與它能做什麼；類別名稱與取得方式放各框架的
 *    usageNotes。方法名稱（show、update）可以保留。
 * 6. 框架的語法與生命週期（Angular 的 signal、@if、ngOnChanges、::ng-deep、inject…）不寫進本體：
 *    使用端要知道的放各框架的 usageNotes；元件內部做法寫在框架的元件程式碼註解。
 * 7. 網頁專屬細節（DOM、CSS、z-index、ARIA）目前保留在本體，但不用框架語法描述。
 * 互動原則的框架實作步驟放在各框架的 pattern-notes（Angular：src/docs/pattern-notes.ts），以原則的 key 對應。
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
    /** 規格的識別字；說明文字與互動原則以 `#<id>` 引用，各框架的用法說明以同一個 id 對應 */
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
