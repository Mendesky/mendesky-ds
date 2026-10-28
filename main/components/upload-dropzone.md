# Upload Dropzone（upload-dropzone）

分組：互動元件

任何需要讓使用者上傳單一檔案的場景。不要自刻拖放區或使用原生 input type="file" 裸露呈現。

## 用法

### Angular（v0.6.0）

`app-upload-dropzone`

上傳拖放區標準元件，含動畫插畫 + 檔案類型/大小驗證。所有上傳介面統一使用。

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/upload-dropzone--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `acceptedTypes` | `string[]` | `[]` | 可接受的副檔名陣列，如 ['.pdf', '.jpg']；空陣列表示不限制類型 |
| `maxSize` | `number` | `20` | 單一檔案大小上限（MB） |
| `disabled` | `boolean` | `false` | 停用狀態，停用時拖放區不可點擊，插畫仍顯示但不可互動 |
| `disabledHint` | `string` | `''` | 停用時顯示的提示文字，取代主說明文字 |
| `errorMessage` | `string` | `''` | 欄位驗證錯誤訊息；有值時顯示 tooltip（位置見 errorPosition，預設下方）＋ 框線轉錯誤紅（--border/error，與 app-input 錯誤框線同 token；hover/drag-over 期間錯誤紅優先）。空字串 = 無錯誤狀態（2026-07-08 一致化） |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤提示位置。欄位錯誤統一預設在下方；只有版面放不下（下方緊接其他內容會被遮住）時才改 top（2026-10-14 定案） |
| `fileSelected` | `EventEmitter<File[]>` |  | 選到有效檔案後 emit（陣列，支援多檔同時拖入或點選；每個檔案均已通過大小與類型驗證） |
| `fileError` | `EventEmitter<string>` |  | 檔案驗證失敗時 emit 錯誤訊息字串 |

#### 程式碼範例

**基本用法（限 PDF/圖片，20MB）**

```html
<app-upload-dropzone
  [acceptedTypes]="['.pdf', '.jpg', '.jpeg', '.png']"
  [maxSize]="20"
  (fileSelected)="onFile($event)"
  (fileError)="onError($event)">
</app-upload-dropzone>
```

**停用狀態（先完成前置條件）**

```html
<app-upload-dropzone
  [disabled]="!conditionMet()"
  disabledHint="請先選擇文件類型"
  [acceptedTypes]="['.pdf']"
  (fileSelected)="onFile($event)"
  (fileError)="onError($event)">
</app-upload-dropzone>
```

## 注意事項

- 元件內建動畫插畫（檔案放入資料夾，兩狀態 cross-fade），不需傳入 icon。
- 元件只負責選擇單一檔案並驗證，不含進度條或上傳列表。進度模擬由父元件處理。
- **注意**：acceptedTypes 需包含點號，如 '.pdf'，不要寫 'pdf'。
