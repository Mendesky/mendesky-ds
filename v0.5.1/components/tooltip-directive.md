# Tooltip Directive (Portal)（tooltip-directive）

分組：浮層元件

替代 [Tooltips](tooltips.md) 元件的 portal 版本。hover/focus 時自動顯示 tooltip，portal 到 body 避免容器裁切。

## 用法

### Angular（v0.7.0）

`[appTooltip]`

[appTooltip]="text" · appTooltipDirection: top|bottom|left|right · appTooltipStyle: default|warning|grey · appTooltipOnlyWhenTruncated · appTooltipWrap

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/tooltip-directive--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `appTooltip` | `string` |  | tooltip 顯示文字，空字串時不顯示 |
| `appTooltipDirection` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 顯示方向（溢出時自動翻轉） |
| `appTooltipStyle` | `'default' \| 'warning' \| 'grey'` | `'default'` | 外觀主題 |
| `appTooltipOnlyWhenTruncated` | `boolean` | `false` | 只在 host 文字真的被截斷（scrollWidth > clientWidth）時顯示，也只在那時給 host `tabindex=0`。host 自己負責 ellipsis。用 ResizeObserver＋MutationObserver 追蹤寬度與文字變化（2026-10-13） |
| `appTooltipWrap` | `boolean` | `false` | 長文字換行：tooltip 文字最寬 520px，沒有空白的長字串也會斷行。給檔名、使用者自填標題這類可能很長的文字（2026-10-13） |

#### 程式碼範例

**基本用法**

```html
<app-icon-btn
  [appTooltip]="'編輯此項目'"
  appTooltipDirection="top"
  (btnClick)="onEdit()">
  <app-icon name="Edit" size="16"></app-icon>
</app-icon-btn>
```

**警告樣式**

```html
<span
  [appTooltip]="'此欄位為必填'"
  appTooltipStyle="warning"
  appTooltipDirection="bottom">
  必填欄位
</span>
```

#### Angular 注意事項

- app-icon-btn 已內建 appTooltip：透過它的 tooltip 與 tooltipPos 兩個 input 設定；disabled 狀態下 tooltip 仍正常顯示，因為 appTooltip 綁在 app-icon-btn 的 wrapper div 上。
- 本體說的 tooltip「換行選項」在 Angular 是 appTooltipWrap：長字串（檔名、使用者自填標題）在 host 加上 [appTooltipWrap]="true"（2026-10-13 加回，選用、預設 false）。
- **注意**：Angular 的單元測試在 Karma 裡跑，視窗比 $bp-desktop 窄；量 tooltip 尺寸的測試要先解除平板以下的自動隱藏（:host { display:none !important }），否則量到的一律是 0。

## 注意事項

- 動態建立 tooltip 浮層元素，portal 到 document.body，position:fixed
- 顯示延遲 300ms（mouseenter/focus 觸發），mouseleave/blur 立即隱藏
- 觸發元素捲出可視範圍時自動隱藏 tooltip
- 平板以下尺寸（tablet-landscape-down）自動隱藏——tooltip 浮層本身的外層元素設為 `display:none !important`。寫測試量尺寸時要先解除，否則測試執行環境的視窗比桌機斷點（$bp-desktop）窄，量到的一律是 0，「寬度 ≤ N」這類斷言會恆真假綠
- [Icon Button](icon-btn.md) 已內建本 tooltip 支援（透過 tooltip、tooltipPos 屬性），disabled 狀態下 tooltip 仍正常顯示（綁在 wrapper div 上）
- 長內容：`.tooltip__text` 預設只有 `white-space: pre-line`（讓呼叫端字串裡的 `\n` 保留，多行 tooltip 如 [Button](button.md) 的 disabledMessage 靠它），**沒有 max-width**——一個 90 字的無空白 ASCII 檔名實測會撐到 1735px。長字串請開啟換行選項（2026-10-13 加回，選用、不改預設）：加上 `.tooltip__text--wrap`（`max-width:520px` + `overflow-wrap:anywhere`）
