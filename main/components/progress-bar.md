# Progress Bar（progress-bar）

分組：展示元件

顯示一件分批進行的工作做到哪裡（例：批次授權「處理中 12 / 40」）。只畫比例，不內建文字；「處理中 12 / 40」這類說明由呼叫端排在旁邊。還不知道總量、或對方不回報進度時（例：上傳檔案但伺服器沒給百分比），把 value 設為 `null`，進度條改成不定狀態，表示「正在進行，但不知道還要多久」。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 有進度 | 填色的長度是 value 佔 max 的比例。value 改變時，填色在 0.2 秒內滑到新的長度。 |
| 不定狀態 | value 設為 `null`。一段佔整條 40% 長的色段由左往右滑過去，1.5 秒一輪，一直重複，不表示任何比例。value 改回數字就回到有進度的樣子。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 每條進度條都設 ariaLabel，寫「什麼的進度」，例如「批次授權進度」。

### 不要這樣做

- 還不知道總量時，不要傳 0 或估一個百分比。改用不定狀態，使用者才不會以為卡在 0%，或看到進度倒退。

## 用法

### Angular（v0.9.0）

`app-progress-bar`

[value] [max] · ariaLabel · size: M|S

[在範例網站看全部 8 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.9.0/components/?path=/docs/progress-bar--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `value` | `number \| null` | `0` | 目前完成量，與 max 同單位；會被夾在 0～max 之間。null ＝ 不定狀態：還不知道總量或對方不回報進度，色段由左往右滑，不輸出 aria-valuenow |
| `max` | `number` | `100` | 總量。直接傳百分比時不用另外設；≤ 0 時一律視為 0% |
| `ariaLabel` | `string` | `''` | 讀屏文字，例：「批次授權進度」。進度條本身沒有可見文字，建議一定要給 |
| `size` | `'M' \| 'S'` | `'M'` | 粗細：M＝8px；S＝6px，給空間比較擠的地方（例：表單裡的上傳進度） |

#### 程式碼範例

**基本用法**

```html
<app-progress-bar [value]="done" [max]="total" ariaLabel="批次授權進度"></app-progress-bar>
<span>處理中 {{ done }} / {{ total }}</span>
```

**不定狀態：還不知道百分比時傳 null**

```html
<app-progress-bar [value]="uploadPercent" size="S" ariaLabel="上傳進度"></app-progress-bar>
<!-- uploadPercent 為 null 時跑不定狀態，有數字時顯示比例 -->
```

## 無障礙

### 網頁和 APP 都要做到

- **報讀軟體**：念出名稱、進度條角色和目前的進度。不定狀態沒有進度可念。
- **報讀軟體**：進度條本身沒有文字，名稱只來自 ariaLabel。沒設時報讀軟體聽不出這是什麼的進度。
- **報讀軟體**：進度改變、或進度條剛出現時，報讀軟體不一定會主動告訴使用者，各家做法不同。需要確實通知時，由使用端另外處理。
- **動態**：有進度時，填色長度的變化約 0.2 秒。使用者設定「減少動態」時直接跳到新的長度。
- **動態**：不定狀態的色段一直由左往右滑。使用者設定「減少動態」時色段不動，停在正中間：停在最左邊的話，看起來會像已經做到 40%。

### 網頁專屬

- **ARIA 與 HTML 語意**：role="progressbar"，aria-valuemin 是 0，aria-valuemax 是 max；max ≤ 0 時 aria-valuemax 是 0。
- **ARIA 與 HTML 語意**：有進度時 aria-valuenow 是夾在 0～max 之間的 value；不定狀態時不輸出 aria-valuenow。
- **ARIA 與 HTML 語意**：ariaLabel 輸出成 aria-label；沒設時不輸出。

## 注意事項

- value 是 `null` 時是不定狀態，見下方「狀態」。max ≤ 0、或 value 是其他不是有限數字的值（例如 `NaN`）時一律顯示 0%，呼叫端還沒算出總數（total = 0）也不會出現 NaN 寬度。
- 不內建文字，是因為每個情境的措辭與單位（項、人、檔案）都不同。
- 有兩種粗細：預設 8 px；size 設為 S 是 6 px，給空間比較擠的地方，例如表單裡的上傳進度。
