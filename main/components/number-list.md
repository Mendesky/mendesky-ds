# Number List（number-list）

分組：展示元件

報表數字展示列、檔案列（含檢視／下載／編輯／刪除）。寬度 1024px 以上：label 與 text 放不下截成「…」，**只有真的被截斷時**滑過／聚焦才顯示全文 tooltip；寬度小於 1024px：改換行完整顯示。手機（小於 768px）按鈕只留圖示，「label＋text＋按鈕」的列改兩行（見下方 note，2026-10-13）。

## 用法

### Angular（v0.7.0）

`app-number-list`

size: S|M|L · background: white|grey · label text number1 number2 avatarText actions: NumberListAction[] · (actionClick)

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/number-list--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `NumberListSize` | `'S'` | S \| M |
| `background` | `NumberListBackground` | `'white'` | hover 底色：white \| grey10 \| grey20 |
| `label` | `string` | `''` | 左側 chip 文字；空字串時不顯示。放不下時截成「…」，被截斷時才給 tooltip 與 tab 停點；小於 1024px 換行 |
| `text` | `string` | `''` | 主文字；規則同 label（≥1024 截斷＋截斷才給 tooltip，<1024 換行） |
| `number1` | `string` | `''` | 右側數字（Inter SemiBold，靠右） |
| `number2` | `string` | `''` | 次要數字（較深色） |
| `actions` | `NumberListAction[]` | `['download']` | view \| download \| edit \| delete \| subview。右側按鈕固定依 檢視／下載／編輯／刪除 排列，與陣列順序無關 |
| `avatarText` | `string` | `''` | 非空時顯示 Avatar，傳入使用者姓名 |
| `(actionClick)` | `EventEmitter<NumberListAction>` |  | 按鈕點擊，回傳 action 類型 |

#### 程式碼範例

**基本用法**

```html
<app-number-list
  size="S"
  background="grey10"
  label="簡報"
  text="季度簡報.pdf"
  number1="1,234"
  [actions]="['download', 'delete']"
  (actionClick)="onAction($event)"
></app-number-list>
```

#### Angular 注意事項

- label 與 text 掛的是 [appTooltip] ＋ [appTooltipOnlyWhenTruncated]（只在真的被截斷時顯示、才給 tabindex=0）＋ [appTooltipWrap]（tooltip 文字最寬 520px 換行）；其他截斷文字元件也能照這組寫法直接用。消費端不要再自己對 .nl-text 掛 tooltip。
- **注意**：寫 app-number-list 的版面測試時：Karma 在 iframe 裡跑、預設約 800px（已落在 <1024），量截斷的測試要先把 window.frameElement 設寬（DS spec 的 setViewportWidth() 做法，見 number-list.component.spec.ts）。

## 注意事項

- **條件式 tooltip 已恢復**（2026-10-13）：label 與 text 掛 [Tooltip Directive (Portal)](tooltip-directive.md)，並開啟「只在截斷時顯示」（只在真的被截斷時顯示、才給 `tabindex=0`）與「換行」（tooltip 文字最寬 520px 換行）兩個選項。2026-08-18 撤除的那一版改在元件內部量測；這版把量測放進 [Tooltip Directive (Portal)](tooltip-directive.md)，其他截斷文字元件也能直接用。消費端**不要**再自己對 `.nl-text` 掛 tooltip。
- **寬度小於 1024px（`bp.tablet-landscape-down`）label 與 text 換行完整顯示、不截斷**。斷點刻意與 tooltip 的隱藏斷點相同：tooltip 不出現的寬度就不能截斷，否則會「截斷又看不到全文」。代價是名稱長的列會變高。
- **「label＋text＋按鈕」的列（`.nl-row--labeled`）**：條件＝有 label、有按鈕，且沒有 number1／number2／avatar／subview。寬度 768px 以上：放不下折成兩行時，按鈕靠下對齊「text 那一行」並往上補 2px（不卡在兩行中間；text 自己也換成多行時對齊最後一行）。手機（`bp.tablet-down`，小於 768px）改兩行格線：第一行 label 獨佔整列，第二行 text＋按鈕。沒有 label 的列不受影響，維持置中。
- **手機（小於 768px）按鈕只留圖示**（S 寬 24px、M 寬 28px），文字隱藏；按鈕名稱由 `aria-label`（檢視／下載／編輯／刪除）提供給螢幕閱讀器。所有使用此元件的畫面都適用，含 [File List](file-list.md) 的消費端（2026-10-13 使用者選定「全部畫面一起改」）。
- **注意**：寫版面測試要自己設定視窗寬度：截斷／換行／手機排法都看 media query（視窗寬），不是元件寬。
