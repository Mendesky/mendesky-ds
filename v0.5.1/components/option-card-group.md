# Option Card Group（option-card-group）

分組：表單元件

一組互斥的插圖選擇卡（版面樣式 / 主題外觀等）。取代各處手刻的卡片 grid 與鍵盤 handler。

## 用法

### Angular（v0.7.0）

`app-option-card-group`

options: OptionCardItem[] · value · ariaLabel · [disabledValues]: string[] · (valueChange) — role=radiogroup、方向鍵 roving focus、@for track value

[在範例網站看全部 3 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/option-card-group--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `options` | `OptionCardItem[]` | `[]` | 卡片資料 { value; label; description?; illustration?; disabled? } |
| `value` | `string \| null` | `null` | 目前選中的 value（完全受控，元件不持有內部選取狀態） |
| `ariaLabel` | `string` | `''` | radiogroup 的 aria-label |
| `disabledValues` | `string[]` | `[]` | 額外停用的 value（疊加在 option.disabled 之上，供名額已滿 / 條件不符等情境） |
| `(valueChange)` | `EventEmitter<string>` |  | 選取啟用卡片時 emit 其 value；停用卡片不 emit |

#### 程式碼範例

**版面樣式（含手機 fallback）**

```html
<!-- Desktop / Tablet：卡片 -->
<app-option-card-group
  class="layout-card-group"
  ariaLabel="版面樣式"
  [options]="layoutOptions"
  [value]="selectedLayout"
  [disabledValues]="disabledLayoutValues"
  (valueChange)="onLayoutSelect($event)">
</app-option-card-group>

<!-- Mobile：app-select fallback（卡片在 tablet-down 隱藏，consumer 必配） -->
<div class="layout-mobile-select">
  <app-select [options]="enabledOptions" [ngModel]="selectedLayout"
    (ngModelChange)="onLayoutSelect($event)"></app-select>
</div>
```

## 注意事項

- **注意**：群組在 tablet-down 會 display:none（由 consumer 的 .layout-card-group + scss 斷點規則控制）→ 每個 consumer 都必須額外配一個 [Select](select.md) 作手機 fallback，否則手機完全無法選取。（曾有頁面因漏配而在手機上無法選取。）
- 完全受控元件：只吃 value、只 emit valueChange，不持有內部選取狀態。父層取消變更時直接保持 value 不變即可讓卡片還原（[Select](select.md) fallback 因點選即內部 set value，取消需 remount 還原）。
- 方向鍵 ←/↑/→/↓ 在啟用卡片間 roving focus（wrap）；卡片清單以 option.value 當識別鍵，避免重複 key。
