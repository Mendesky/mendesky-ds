# Tooltip Directive (Portal)（tooltip-directive）

分組：浮層元件

替代 [Tooltips](tooltips.md) 元件的 portal 版本。hover/focus 時自動顯示 tooltip，portal 到 body 避免容器裁切。

## 用法

### Angular（v0.8.3）

`[appTooltip]`

[appTooltip]="text" · appTooltipDirection: top|bottom|left|right · appTooltipStyle: default|warning|grey · appTooltipOnlyWhenTruncated · appTooltipWrap

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.8.3/components/?path=/docs/tooltip-directive--%E8%AA%AA%E6%98%8E)

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
- 觸控裝置（手機、平板，沒有滑鼠的裝置）上 tooltip 不會出現，電腦不論視窗多窄都照常顯示。判斷條件是 (hover: none) and (pointer: coarse)，跟 mendesky-web 判斷觸控裝置的條件一樣。只靠 tooltip 傳達的資訊，在觸控裝置上要另外找地方放。
- **注意**：Karma 跑在有滑鼠的桌機 Chrome，tooltip 會正常出現，量得到尺寸。量尺寸的測試要加「寬度大於 0」的檢查：量到 0 代表 tooltip 被藏起來了，「寬度 ≤ N」這類斷言會恆真。

## 注意事項

- 動態建立 tooltip 浮層元素，portal 到 document.body，position:fixed
- 顯示延遲 300ms（mouseenter/focus 觸發），mouseleave/blur 立即隱藏
- 觸發元素捲出可視範圍時自動隱藏 tooltip
- 觸控裝置（手機、平板這類沒有滑鼠的裝置）上不顯示，tooltip 浮層的外層元素設為 `display:none !important`。判斷看的是有沒有滑鼠（`(hover: none) and (pointer: coarse)`），不是視窗寬度：電腦把視窗拉窄照樣顯示，iPad 不論直放橫放都不顯示。這個條件跟 mendesky-web 判斷觸控裝置的方式一樣。2026-11-04 起改成這樣，之前是寬度小於 1024px 就隱藏。只靠 tooltip 傳達的資訊，在觸控裝置上要另外找地方放
- 寫測試量 tooltip 尺寸時，要另外檢查寬度大於 0。tooltip 被藏起來時量到的是 0，「寬度 ≤ N」這類斷言會恆真、測試假綠
- [Icon Button](icon-btn.md) 已內建本 tooltip 支援（透過 tooltip、tooltipPos 屬性），disabled 狀態下 tooltip 仍正常顯示（綁在 wrapper div 上）
- 長內容：`.tooltip__text` 預設只有 `white-space: pre-line`（讓呼叫端字串裡的 `\n` 保留，多行 tooltip 如 [Button](button.md) 的 disabledMessage 靠它），**沒有 max-width**——一個 90 字的無空白 ASCII 檔名實測會撐到 1735px。長字串請開啟換行選項（2026-10-13 加回，選用、不改預設）：加上 `.tooltip__text--wrap`（`max-width:520px` + `overflow-wrap:anywhere`）
