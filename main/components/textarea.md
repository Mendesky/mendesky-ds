# Textarea（textarea）

分組：表單元件

備注、描述等多行輸入。禁止原生 `<textarea>`。

## 用法

### Angular（v0.5.0）

`app-textarea`

size: M|L · placeholder errorMessage errorPosition: top|bottom · [disabled] [autoResize] · (valueChange) (blur)

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/textarea--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `TextareaSize` | `'L'` | 'M' \| 'L' |
| `placeholder` | `string` | `'Placeholder'` | 佔位文字 |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態並顯示在下方 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `disabled` | `boolean` | `false` | 禁用狀態（禁止 resize） |
| `autoResize` | `boolean` | `false` | 高度隨內容自動撐開（禁用手動 resize handle）。適用於系統組合的長文字，如由多段範本拼成的說明內容 |
| `initialValue` | `string` | `''` | 初始值（外部設定，支援非同步綁定）。同族 app-input 亦有此 prop，兩者行為一致 |
| `(valueChange)` | `EventEmitter<string>` |  | 值變更事件（每次輸入） |
| `(blur)` | `EventEmitter<string>` |  | 失焦時 emit 當前值；供「blur 才存檔」的欄位綁定（對齊 app-input） |

#### 程式碼範例

**搭配 app-field 提供標題與必填標示**

```html
<app-field label="備註說明" [required]="true">
  <app-textarea
    size="L"
    placeholder="請輸入備註說明"
    [errorMessage]="form.noteError"
    (valueChange)="onNoteChange($event)"
  ></app-textarea>
</app-field>
```
