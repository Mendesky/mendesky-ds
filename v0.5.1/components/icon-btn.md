# Icon Button（icon-btn）

分組：互動元件

工具列、表格操作、純圖示互動。禁止用 div 包 icon 模擬按鈕。

## 用法

### Angular（v0.7.0）

`app-icon-btn`

size: 16-|16|24|32|36|48 · propClass: Normal|Warning|CardBtn|CardBtnPdSmall|Modal|SectionBtn|Drag|Block|Block-Transparent|Icon+Text · label · [active] [toggle] [disabled] tooltip tooltipPos · ariaLabel · ariaHaspopup [ariaExpanded] · (btnClick)

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/icon-btn--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `IconBtnSize` |  | '16-' \| '16' \| '24' \| '32' \| '36' \| '48'（對應 icon px） |
| `propClass` | `IconBtnClass` | `'Normal'` | Normal \| Warning \| CardBtn \| CardBtnPdSmall \| Modal \| SectionBtn \| Drag \| Block \| Block-Transparent \| Icon+Text。**沒有 Floating**（2026-08-18 撤除）：DS 外部化成 @mendesky/ds-angular 後該 variant 不存在。要「浮在 backdrop 上的白底圓鈕」請用 SectionBtn（size=24 剛好 44×44、透明底），白底圓形與落影由消費端的 wrapper 出（外包一層白底圓形容器並加落影）。 |
| `active` | `boolean` |  | 啟用/高亮狀態（Normal / CardBtnPdSmall 轉綠） |
| `toggle` | `boolean` | `false` | 切換按鈕模式；啟用後輸出 aria-pressed（隨 active 同步 true/false）。用於格式化、filter on/off 等可切換開關。 |
| `disabled` | `boolean` |  | 禁用狀態（opacity 0.5，cursor not-allowed） |
| `label` | `string` |  | 文字標籤（僅 Icon+Text 模式顯示） |
| `ariaLabel` | `string` |  | 無障礙標籤，建議每顆按鈕都設定 |
| `ariaHaspopup` | `IconBtnAriaHaspopup \| null` | `null` | 這顆按鈕會打開選單，套在內層 button 的 aria-haspopup。目前只接受 'menu'，用在打開放了 app-menu-item 的 app-action-menu 的按鈕，例如 More；null 不輸出。Safari 關閉選單後，要同時有它和 ariaExpanded 才認得出觸發鈕、把焦點還給它。 |
| `ariaExpanded` | `boolean \| null` | `null` | 選單現在開著沒，套在內層 button 的 aria-expanded。綁選單的開關狀態，true／false 照實輸出；null 不輸出。 |
| `tooltip` | `string` | `''` | tooltip 文字，有值才顯示 |
| `tooltipPos` | `'Down' \| 'Top' \| 'Left' \| 'Right'` | `'Down'` | tooltip 箭頭方向（Down = tooltip 在上方，Top = 在下方） |
| `shortcutHint` | `string` | `''` | 鍵盤快速鍵提示（e.g. "⌘N"），有值時自動 append 到 tooltip，顯示為「tooltip（shortcutHint）」。 |
| `(btnClick)` | `EventEmitter<void>` |  | 點擊事件（disabled 時不觸發） |

#### 程式碼範例

**基本用法**

```html
<app-icon-btn
  size="16"
  propClass="Normal"
  ariaLabel="編輯"
  (btnClick)="onEdit()">
  <app-icon name="Edit" size="16"></app-icon>
</app-icon-btn>
```

**打開選單的 More 按鈕：設 ariaHaspopup，ariaExpanded 綁選單開關**

```html
<app-icon-btn
  size="16"
  ariaLabel="更多操作"
  ariaHaspopup="menu"
  [ariaExpanded]="moreOpen()"
  (btnClick)="moreOpen.set(!moreOpen())">
  <app-icon name="More" size="16"></app-icon>
</app-icon-btn>
```

**Icon+Text 模式**

```html
<app-icon-btn
  size="32"
  propClass="Icon+Text"
  label="篩選"
  ariaLabel="篩選"
  (btnClick)="onFilter()">
  <app-icon name="Filter" size="32"></app-icon>
</app-icon-btn>
```

## 注意事項

- （2026-04 更新）tooltip 已綁在外層 wrapper div 而非 button 本身，disabled 狀態下 tooltip 仍正常顯示。內部使用 [Tooltip Directive (Portal)](tooltip-directive.md)（portal 模式）。
- 支援 :focus-visible focus ring（使用 `--focus-ring-*` tokens），僅鍵盤操作時顯示。
- 拿來打開選單時（例如 More），跟 [Button](button.md) 一樣設 `ariaHaspopup` 和 `ariaExpanded`，報讀軟體才知道它會打開選單、選單現在開著沒有。這兩個屬性落在裡面那顆按鈕上，Safari 關閉選單後也是靠這兩個屬性一起認出觸發鈕，少一個就認不出來。細節見 [Action Menu](action-menu.md) 的無障礙說明。
