import type { ComponentSpec } from '../component-spec.js';

export const templateEditorSpec: ComponentSpec = {
  id: 'template-editor',
  name: 'Template Editor',
  group: '表單元件',
  when: '含範本變數的可編輯文字欄位（如信件內容、備註）。與 #textarea 功能相似但支援 inline badge。',
  notes: [
    '%key% 標記渲染為藍色圓角 badge（background: rgba(58,156,205,0.1)），contenteditable="false" 讓 badge 成原子元素（整刪不能部分編輯）',
    'variableDefs 中有 options 的變數渲染為 .tpl--select chip（右側顯示下拉 caret），點擊展開 #action-menu；切換後以 atomic replace 更新該 chip textContent，不影響旁邊的純文字，並 emit optionSelect 事件',
    '使用者刪除 badge 後轉為普通文字，失去自動同步效果',
    '打 %% 觸發 inline autocomplete：游標旁彈出 template-var-panel，可打中文/英文過濾、↑↓ 移動、Enter/點擊 選取插入 chip（ⓘ 面板亦保留）；打字輸入已知 %Key% 也會即時轉 chip',
    '插入 chip 以明確 Range 插入「chip + 後置 text node」，確保末尾 contenteditable=false chip 之後有游標落點（勿用 execCommand insertHTML，末尾會卡游標）',
    'variables 變更時只更新 span.textContent，不重建 innerHTML（保留游標位置）',
    'paste 事件攔截，只貼純文字防 XSS',
    '支援 Enter 斷行（white-space: pre-wrap）',
    '變數清單與分組由使用端定義：變數面板的分組標題與順序、兩層選擇器的文字，都由使用端在 app 層設定一次',
  ],
  customTables: [],
};
