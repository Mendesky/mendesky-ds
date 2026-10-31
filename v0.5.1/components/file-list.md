# File List（file-list）

分組：展示元件

需要呈現已上傳檔案列表並提供操作時。支援「無類型模式」（例如 wizard 裡只收單一種文件）與「有類型模式」（依文件類型分類的附件，type 由父層傳入 FileItem.type）。disabled=true 為唯讀，只剩 view。**需要 download 或依檔案類型切換動作時不要用這支**——它沒有 actions 屬性；直接用 [Number List](number-list.md)（有 actions 屬性，NumberListAction 已含 download），需要下載的文件清單即如此。

## 用法

### Angular（v0.7.0）

`app-file-list`

已上傳檔案清單中間層元件，動作固定為 view / delete（**不可覆寫**），支援唯讀（disabled）模式與空狀態提示。與 app-upload-dropzone 搭配使用。

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/file-list--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `docs` | `FileItem[]` | `[]` | FileItem = { id, name, size, type?, url?, mimeType? }，size 單位 bytes；size 為 0 時只顯示檔名 |
| `disabled` | `boolean` | `false` | 唯讀模式，從 actions 濾掉 delete（預設情況即只剩 view）；用於「沿用其他來源的檔案」預覽等唯讀情境 |
| `emptyText` | `string` | `'尚未上傳任何檔案'` | 空狀態提示文字；空字串時不渲染 empty state div（避免佔位） |
| `removeFile` | `EventEmitter<string>` |  | 使用者點 delete 時 emit doc.id |
| `viewFile` | `EventEmitter<string>` |  | 使用者點 view 時 emit doc.id |

#### 程式碼範例

**基本用法（多檔上傳後列表）**

```html
<app-file-list
  [docs]="uploadedDocs()"
  emptyText="尚未上傳任何原始檔案"
  (removeFile)="removeDoc($event)"
  (viewFile)="viewDoc($event)">
</app-file-list>
```

**唯讀預覽（沿用其他來源的檔案）**

```html
<app-file-list
  [docs]="sourceDocs"
  [disabled]="true"
  emptyText="來源尚未上傳檔案">
</app-file-list>
```

**不顯示空狀態（用於卡片內）**

```html
<app-file-list
  [docs]="uploadedDocs()"
  emptyText=""
  (viewFile)="onDocAction($event, 'view')"
  (removeFile)="onDocAction($event, 'delete')">
</app-file-list>
```

#### Angular 注意事項

- FileItem interface 從 file-list.component.ts export，外層元件直接 import 使用。

## 注意事項

- 檔案資料的型別 FileItem 跟元件一起匯出，外層元件直接引用。
- 元件內部使用 [Number List](number-list.md) 渲染每列，type 欄位對應 label chip；type 空字串時不渲染 chip。
- **注意**：emptyText 設空字串時不渲染 empty state，避免在卡片等場景下產生多餘的 padding。
