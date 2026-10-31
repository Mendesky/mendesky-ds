# Dialog（dialog）

分組：浮層元件

不可逆操作前確認（刪除、封存），或錯誤提示 alert（showCancel:false）。禁止自刻 modal 做確認。title 顏色固定使用 --text/title (#1c1c2e)，禁止 hardcode hex。Warning 只代表「紅色嚴重度」、不等於「刪除動作」：trash 圖示已與 propClass 解耦，僅真正刪除/移除實體才保留預設 Trash-Del，告知型 alert 與非刪除確認（取消封存、復原、送出、匯入）一律 confirmIcon=""。

## 用法

### Angular（v0.7.0）

`app-dialog`

[isOpen] header content propClass: Warning|Normal confirmText confirmIcon showCancel cancelText loading · (cancel) (confirm)

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/dialog--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `isOpen` | `boolean` |  | 控制顯示/隱藏 |
| `header` | `string` |  | 標題文字 |
| `content` | `string` |  | 內容說明文字 |
| `propClass` | `'Warning' \| 'Normal'` |  | Warning：紅色危險按鈕；Normal：藍色主要按鈕。注意 Warning 僅控制顏色，圖示由 confirmIcon 決定 |
| `confirmText` | `string` |  | 確認按鈕文字 |
| `confirmIcon` | `string` | `'Trash-Del'` | Warning 按鈕的 leftIcon。預設垃圾桶供刪除類使用；告知型/非刪除確認 dialog 傳 "" 移除圖示（紅色仍保留） |
| `showCancel` | `boolean` | `true` | 是否顯示取消（次要）按鈕；設為 false 可做單按鈕 alert 模式 |
| `cancelText` | `string` | `'取消並關閉'` | 取消（次要）按鈕文字。預設「取消並關閉」維持既有外觀；可依情境覆寫（如 wizard 取消新建確認改「繼續新建」） |
| `loading` | `boolean` | `false` | 確認按鈕顯示 loading spinner（API 飛行中），同時 disabled；取消按鈕不受影響 |
| `(cancel)` | `EventEmitter<void>` |  | 取消/關閉事件 |
| `(confirm)` | `EventEmitter<void>` |  | 確認事件 |

#### 程式碼範例

**基本用法（confirm 模式）**

```html
<app-dialog
  [isOpen]="showDialog"
  header="確認刪除"
  content="此操作無法復原，確定要刪除這筆資料嗎？"
  propClass="Warning"
  confirmText="刪除"
  (cancel)="showDialog=false"
  (confirm)="onDelete()"
></app-dialog>
```

**Alert 模式（單按鈕）**

```html
<app-dialog
  [isOpen]="showErrorDialog()"
  header="登入失敗"
  [content]="errorMsg()"
  propClass="Normal"
  confirmText="重新登入"
  [showCancel]="false"
  (cancel)="closeDialog()"
  (confirm)="closeDialog()"
></app-dialog>
```

### Vue（試做）（v0.3.0）

`<DsDialog>`

isOpen header content propClass: Warning|Normal confirmText confirmIcon showCancel cancelText loading · @cancel @confirm

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.3.0/components/?path=/docs/dialog--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `isOpen` | `boolean` |  | 控制顯示/隱藏 |
| `header` | `string` |  | 標題文字 |
| `content` | `string` |  | 內容說明文字 |
| `propClass` | `'Warning' \| 'Normal'` |  | Warning：紅色危險按鈕；Normal：藍色主要按鈕。注意 Warning 僅控制顏色，圖示由 confirmIcon 決定 |
| `confirmText` | `string` |  | 確認按鈕文字 |
| `confirmIcon` | `string` | `'Trash-Del'` | Warning 按鈕的 leftIcon。預設垃圾桶供刪除類使用；告知型/非刪除確認 dialog 傳 "" 移除圖示（紅色仍保留） |
| `showCancel` | `boolean` | `true` | 是否顯示取消（次要）按鈕；設為 false 可做單按鈕 alert 模式 |
| `cancelText` | `string` | `'取消並關閉'` | 取消（次要）按鈕文字。預設「取消並關閉」維持既有外觀；可依情境覆寫（如 wizard 取消新建確認改「繼續新建」） |
| `loading` | `boolean` | `false` | 確認按鈕顯示 loading spinner（API 飛行中），同時 disabled；取消按鈕不受影響 |
| `@cancel` | `() => void` |  | 取消/關閉事件 |
| `@confirm` | `() => void` |  | 確認事件 |

#### 程式碼範例

**基本用法（confirm 模式）**

```vue
<DsDialog
  :isOpen="showDialog"
  header="確認刪除"
  content="此操作無法復原，確定要刪除這筆資料嗎？"
  propClass="Warning"
  confirmText="刪除"
  @cancel="showDialog=false"
  @confirm="onDelete()"
></DsDialog>
```

**Alert 模式（單按鈕）**

```vue
<DsDialog
  :isOpen="showErrorDialog()"
  header="登入失敗"
  :content="errorMsg()"
  propClass="Normal"
  confirmText="重新登入"
  :showCancel="false"
  @cancel="closeDialog()"
  @confirm="closeDialog()"
></DsDialog>
```

## 對照表

### Dual-Blur 視覺規格

| 選擇器 | 屬性 | 值 |
| --- | --- | --- |
| .dialog-backdrop | background | rgba(0, 0, 0, 0.2) |
| .dialog-backdrop | backdrop-filter | blur(8px) |
| .dialog-card | background | rgba(255, 255, 255, 0.8) |
| .dialog-card | backdrop-filter | blur(10px) |
