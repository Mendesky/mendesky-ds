# Modal Close Button（modal-close-btn）

分組：浮層元件

所有 modal / dialog 的關閉 X 鈕。放進各 modal 自己的 header，關閉決策交 parent。禁止自刻 X button 或散用 [Icon Button](icon-btn.md) 當關閉鈕。

## 用法

### Angular（v0.7.0）

`app-modal-close-btn`

ariaLabel · disabled · (closeClick) — 統一的 modal 關閉 X 鈕（No-X-Cancel + propClass="Modal"）

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/modal-close-btn--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | `'關閉'` | 無障礙標籤；情境特定可覆寫（如「關閉費用設定」） |
| `disabled` | `boolean` | `false` | 停用（如 saving 中不可關）；傳給內部 icon-btn |
| `(closeClick)` | `EventEmitter<void>` |  | 點擊時觸發；parent 決定 dirty 時直接關還是彈二次確認 |

#### 程式碼範例

**基本用法**

```html
<app-modal-close-btn (closeClick)="requestClose()"></app-modal-close-btn>
```

**saving 中停用**

```html
<app-modal-close-btn [disabled]="saving()" (closeClick)="requestClose()"></app-modal-close-btn>
```

#### Angular 注意事項

- 搭配 app-modal-shell 時寫 [canDismiss]="!isDirty()"（backdrop 受 dirty gate），X 鈕綁 (closeClick)。

## 注意事項

- 搭配 [Modal Shell](modal-shell.md) 的 canDismiss（設為「沒有未儲存的變更」）：backdrop 受 dirty gate，X 鈕走 closeClick。X/ESC 行為分層（小 modal 直接關 / 大 wizard 二次確認）見 pattern modal.dismissal。
