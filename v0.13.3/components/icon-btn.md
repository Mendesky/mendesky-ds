# Icon Button（icon-btn）

分組：互動元件

工具列、表格操作、純圖示互動。禁止用 div 包 icon 模擬按鈕。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 載入中 | 設了 `loading`，[Spinner](spinner.md) 取代圖示。按鈕不會變淡：停用時整顆按鈕淡成一半，轉圈的對比會掉到 3:1 以下。點了沒反應，點擊也不會傳到外層；滑過不變色。tooltip 照常顯示，可以把它改成「產生 PDF 中…」這類說明；tooltip 打開時換字，畫面上的 tooltip 會跟著換。 |

## 用法

### Angular（v0.16.0）

`app-icon-btn`

size: 12|16-|16|24|32|36|48 · propClass: Normal|Warning|CardBtn|CardBtnPdSmall|Modal|SectionBtn|Drag|Block|Block-Transparent|Icon+Text|PrimaryFilled · label · [active] [toggle] [disabled] [loading] loadingSize loadingLabel tooltip tooltipPos · ariaLabel · ariaHaspopup [ariaExpanded] · (btnClick)

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.16.0/components/?path=/docs/icon-btn--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `IconBtnSize` |  | '12' \| '16-' \| '16' \| '24' \| '32' \| '36' \| '48'（對應 icon px）。'12' 是 24×24，給 PrimaryFilled 用 |
| `propClass` | `IconBtnClass` | `'Normal'` | Normal \| Warning \| CardBtn \| CardBtnPdSmall \| Modal \| SectionBtn \| Drag \| Block \| Block-Transparent \| Icon+Text \| PrimaryFilled。PrimaryFilled 是實心主色、白色圖示、圓角方形，給頁面主要的新增入口，搭配 size="12"；外觀同全域 .app-action-cta-btn（滑過 85% 不透明、停用 40% 不透明）。**沒有 Floating**（2026-08-18 撤除）：DS 外部化成 @mendesky/ds-angular 後該 variant 不存在。要「浮在 backdrop 上的白底圓鈕」請用 SectionBtn（size=24 剛好 44×44、透明底），白底圓形與落影由消費端的 wrapper 出（外包一層白底圓形容器並加落影）。 |
| `active` | `boolean` |  | 啟用/高亮狀態（Normal / CardBtnPdSmall 轉綠） |
| `toggle` | `boolean` | `false` | 切換按鈕模式；啟用後輸出 aria-pressed（隨 active 同步 true/false）。用於格式化、filter on/off 等可切換開關。 |
| `disabled` | `boolean` |  | 禁用狀態（opacity 0.5，cursor not-allowed）。同時設了 loading 時以 disabled 為準 |
| `loading` | `boolean` | `false` | 載入中：轉圈取代圖示，點了不送出，click 也不會傳到外層。不加原生 disabled（焦點留在按鈕上），改輸出 aria-busy 與 aria-disabled；不淡化 |
| `loadingSize` | `'12' \| '16' \| '24' \| '36' \| null` | `null` | 轉圈大小；null＝跟 size 走（12→12、16-／16→16、24／32→24、36／48→36）。投影的圖示比 size 小時，指定成圖示的大小 |
| `loadingLabel` | `string` | `''` | 載入中念給報讀軟體聽的話（例：「產生 PDF 中…」）。設了就在按鈕外面放一個一直存在、看不見的 role="status"，載入中填字、結束清空。只換 tooltip 報讀軟體不會念 |
| `label` | `string` |  | 文字標籤（僅 Icon+Text 模式顯示） |
| `ariaLabel` | `string` |  | 無障礙標籤，建議每顆按鈕都設定 |
| `ariaHaspopup` | `IconBtnAriaHaspopup \| null` | `null` | 這顆按鈕會打開選單，套在內層 button 的 aria-haspopup。目前只接受 'menu'，用在打開放了 app-menu-item 的 app-action-menu 的按鈕，例如 More；null 不輸出。Safari 關閉選單後，要同時有它和 ariaExpanded 才認得出觸發鈕、把焦點還給它。 |
| `ariaExpanded` | `boolean \| null` | `null` | 選單現在開著沒，套在內層 button 的 aria-expanded。綁選單的開關狀態，true／false 照實輸出；null 不輸出。 |
| `tooltip` | `string` | `''` | tooltip 文字，有值才顯示 |
| `tooltipPos` | `'Down' \| 'Top' \| 'Left' \| 'Right'` | `'Down'` | tooltip 箭頭方向（Down = tooltip 在上方，Top = 在下方） |
| `shortcutHint` | `string` | `''` | 鍵盤快速鍵提示（e.g. "⌘N"），有值時自動 append 到 tooltip，顯示為「tooltip（shortcutHint）」。 |
| `(btnClick)` | `EventEmitter<void>` |  | 點擊事件（disabled 或 loading 時不觸發） |

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

**頁面主要的新增入口：PrimaryFilled，ariaLabel 用滑過時提示的同一句話**

```html
<app-icon-btn
  size="12"
  propClass="PrimaryFilled"
  ariaLabel="新增項目"
  (btnClick)="onAdd()">
  <app-icon name="Plus" size="12"></app-icon>
</app-icon-btn>
```

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：載入中按 Enter 或空白鍵不會觸發。
- **焦點**：載入中焦點留在按鈕上。如果改用停用，焦點所在的按鈕一停用，焦點就會掉到頁面最上面，鍵盤使用者要從頭找回來。
- **報讀軟體**：載入中會念出按鈕名稱，再念「忙碌中」「無法使用」。轉圈是裝飾用，不另外念。
- **報讀軟體**：要讓報讀軟體念出在等什麼，設 `loadingLabel`（例如「產生 PDF 中…」）。載入中時這段文字會主動念出來；載入結束就清空。只改 tooltip 不夠：tooltip 只在滑過或聚焦時出現，換字也不會被念出來。
- **動態**：載入轉圈跟 [Spinner](spinner.md) 一樣：0.8 秒轉一圈；使用者在系統裡開了「減少動態」，改成 2.4 秒轉一圈。

### 網頁專屬

- **ARIA 與 HTML 語意**：載入中時內層按鈕加 `aria-busy="true"` 與 `aria-disabled="true"`，不加原生 `disabled`，焦點才留得住。同時設了 `disabled` 時，以 `disabled` 為準。
- **ARIA 與 HTML 語意**：`loadingLabel` 放在按鈕外面一個一直存在的 `role="status"` 區域裡，視覺上隱藏。放在按鈕裡面不行：按鈕裡的內容只會被當成按鈕名稱，不會被當成狀態念出。區域要一直存在，內容改變時報讀軟體才會念。

## 注意事項

- （2026-04 更新）tooltip 已綁在外層 wrapper div 而非 button 本身，disabled 狀態下 tooltip 仍正常顯示。內部使用 [Tooltip Directive (Portal)](tooltip-directive.md)（portal 模式）。
- 支援 :focus-visible focus ring（使用 `--focus-ring-*` tokens），僅鍵盤操作時顯示。
- 拿來打開選單時（例如 More），跟 [Button](button.md) 一樣設 `ariaHaspopup` 和 `ariaExpanded`，報讀軟體才知道它會打開選單、選單現在開著沒有。這兩個屬性落在裡面那顆按鈕上，Safari 關閉選單後也是靠這兩個屬性一起認出觸發鈕，少一個就認不出來。細節見 [Action Menu](action-menu.md) 的無障礙說明。
- 按下去要等結果時（例如等後端產生 PDF），打開 `loading`，不要自己把轉圈放進按鈕。載入中時 [Spinner](spinner.md) 取代圖示，大小跟著 `size`：12 用 12 px；16- 與 16 用 16 px；24 與 32 用 24 px；36 與 48 用 36 px。放進按鈕的圖示比這個小時，用 `loadingSize` 指定轉圈大小，轉圈才不會比原本的圖示大。有文字標籤的外觀保留文字。
- 頁面上主要的新增入口（例如頁首的新增鈕）用實心主色：propClass 設為 PrimaryFilled，主色底、白色圖示、圓角方形，size 搭配 12（圖示 12 px，按鈕 24×24）。它只有圖示，一律要設 `ariaLabel`，用滑過時提示的同一句話，報讀軟體才念得出這顆按鈕要做什麼。
