# Radio Chip（radio-chip）

分組：互動元件

篩選條件單選、可取消的選項。

## 用法

### Angular（v0.5.0）

`app-radio-chip`

text size: s|m · [showRadio] [showCancel] · (cancelClick) · CVA 控制 selected/isDisabled

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/radio-chip--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 顯示文字 |
| `size` | `RadioChipSize` | `'s'` | 'm' \| 's' \| 'xs' |
| `showRadio` | `boolean` | `true` | 是否顯示左側 Radio 圓圈圖示 |
| `showCancel` | `boolean` | `false` | 選中後右側顯示 × 取消按鈕 |
| `(cancelClick)` | `EventEmitter<void>` |  | 點擊 × 按鈕時觸發，由父層清空選中值 |

#### 程式碼範例

**單選篩選群組**

```html
<app-radio-chip
  *ngFor="let opt of statusOptions"
  [text]="opt.label"
  [showCancel]="true"
  [(ngModel)]="opt.selected"
  (cancelClick)="clearStatus()"
></app-radio-chip>

// 清除群組：
clearStatus() { this.statusOptions.forEach(o => o.selected = false); }
```

## 注意事項

- [Radio Chip](radio-chip.md) 實作單選語意：點擊後 selected → true，不支援自身再次點擊取消（Radio 語意）。若需取消選中，showCancel 設為 true，並監聽 cancelClick 事件由父元件清空整個群組的選中值。
