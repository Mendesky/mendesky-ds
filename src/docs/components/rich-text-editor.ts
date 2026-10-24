import type { ComponentSpec } from '../component-spec.js';

export const richTextEditorSpec: ComponentSpec = {
  id: 'rich-text-editor',
  name: 'Rich Text Editor',
  group: '表單元件',
  when: '需要 rich text 輸入的場景（markdown 語法、表格、圖片由 wrapper 擴充）。純文字用 #textarea；含範本變數用 #template-editor；含圖片上傳時自行包一層 wrapper，透過 extraExtensions 與 extraToolbar 擴充。',
  notes: [
    {
      type: 'info',
      content: 'toolbar 格式按鈕：標題（H3 toggle）、粗體、斜體、底線、刪除線、文字顏色、項目符號、編號列表、插入表格',
    },
    {
      type: 'info',
      content: '文字顏色提供固定色票（預設＝清除，其餘為紅/橘/黃/綠/藍/紫/灰），點顏色鈕以 #action-menu portal 浮層選色，在 modal 內不被裁切；色票定義 SSOT 是各框架實作裡的色票常數 TEXT_COLORS（檔案位置見框架說明），實際色值以該常數為準',
    },
    {
      type: 'info',
      content: '可放入自訂內容的位置有三個：extraToolbar（toolbar 左側末尾）、toolbarRight（toolbar 右側）、default（body 底部，如 template-var-panel）',
    },
    {
      type: 'info',
      content: 'wrapper 可取得本元件的實例，呼叫 getEditor() 取得 Editor instance、runSuppressed(fn) 執行不觸發 valueChange 的操作',
    },
    {
      type: 'info',
      content: '基底 extension set：StarterKit（含 bold/italic/underline/strike/heading）+ Table/Row/Header/Cell + Placeholder + Link + TextStyle/Color；圖片/範本變數 extension 由 extraExtensions 注入',
    },
    {
      type: 'info',
      content: 'paste pipeline（2026-08-03 改版）分四段，順序有意義：①Excel 表格清洗（四個閘門全過才接手：meta 指紋確認是 Excel／schema 有 table node／clipboard 只有一張表／清洗後真的抽到內容）②有語意 HTML → 交還 ProseMirror 預設解析（Office 來源已先經 transformPastedHTML 正規化）③純圖片且使用端有監聽 imagePasted 事件才接手 ④markdown 純文字自動轉格式（fallback）',
    },
    {
      type: 'info',
      content: 'Office 正規化（transformPastedHTML → normalizeOfficeHtml，僅 isOfficeHtml 為真時作用）：<style> 內任意命名的 class 規則 inline 化（ProseMirror 明確忽略 <style>，Excel 的顏色/粗體都住在那裡）、Word 假清單（MsoListParagraph + mso-list style）重組成真 ul/ol 並移除外洩的字面項目符號、strip colgroup/col/align/mso-*/o:p、貼上的顏色吸附到 TEXT_COLORS 色票（無彩色→清除顏色）。macOS Mail／Google Docs／一般網頁刻意不介入',
    },
    {
      type: 'warn',
      content: 'paste 的硬規則：任何分支若產不出可插入內容，一律 return false 把控制權交還 ProseMirror。return true 等於告訴 PM「已處理」→ PM preventDefault 且不做預設貼上，所以「沒插入卻 return true」＝內容被靜默吃掉（2026-08-03 使用者回報 Word/Outlook 貼上完全沒反應，根因就是這個形狀：isExcelHtml 誤判 Office 共用的 xmlns:o → 抽不到表格回 null → 沒插入卻宣告已處理）',
    },
    {
      type: 'warn',
      content: 'Excel 判準不得用任何 xmlns：xmlns:o 是 Office 共用（Word/Outlook 都有），而 Word 產生的 email HTML 自己就宣告了 urn:schemas-microsoft-com:office:excel。可靠指紋只有 meta ProgId=Excel.Sheet 與 Generator=Microsoft Excel，且正則須 quote-agnostic（同一份真實 Excel HTML 內兩種引號方言並存）。class=xl## 亦不可用——實測 macOS Excel 不輸出該 class',
    },
    {
      type: 'warn',
      content: 'Office 正規化不得移除 font-weight:normal / 400 宣告：TipTap Bold 靠這兩個宣告才不會把 Google Docs 的 <b style="font-weight:normal"> 整段判成粗體。colwidth 與 align 則必須主動 strip——序列化層（serializeTableAsHtml）只存 colspan/rowspan，留著就是「編輯器看得到、reopen 變預設」的前後端不一致',
    },
    {
      type: 'info',
      content: '要轉成 Notion blocks 的欄位可直接使用 base：hiddenTools 隱藏 underline/color/table（Notion 轉換不支援），送出時以 proseMirrorToMarkdown 序列化；放在 eager 載入的元件裡（例如常駐 header 的 dialog）時，要延遲載入本元件，讓 TipTap 留在 lazy chunk',
    },
    {
      type: 'info',
      content: '需要圖片上傳與範本變數的欄位，可在此 base 外包一層 wrapper，封裝自己的 draft 格式、圖片上傳、template var panel；範本變數 chip 支援打 %% inline autocomplete、打字 %Key% 自動轉 chip（手寫 InputRule + nodePasteRule，未知 key 不轉）、chip 可拖曳重排（ProseMirror draggable + Dropcursor）',
    },
    {
      type: 'warn',
      content: 'tableStructureEditing 的「選單開啟時列/欄範圍高亮」必須用 ProseMirror Decoration 實作（rte-table-highlight.plugin），不可改用 classList——PM 管理的 cell DOM 上手動加 class 會被 wrapper 的 %% autocomplete plugin 在 blur 觸發的重繪連 nodeview 一起抹掉（2026-07-25 實證：class 加 5 次結束 0、無 remove）；且 component 單測無 wrapper 測不出，須真 app 目視',
    },
    {
      type: 'warn',
      content: 'RTE 文字色票 hex 為寫死值（contenteditable inline style 無法套 CSS var），與 DS token 為手動同步；SSOT 是各框架實作裡的色票常數 TEXT_COLORS（檔案位置見框架說明），改色時同步兩件事：(a) 該常數（component 與貼上顏色吸附的 snapPasteColor 都由它推導，改一處即生效）(b) 元件測試裡的色票斷言',
    },
  ],
  customTables: [],
};
