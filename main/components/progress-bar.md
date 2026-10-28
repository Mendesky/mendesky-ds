# Progress Bar（progress-bar）

分組：展示元件

顯示一件分批進行的工作做到哪裡（例：批次授權「處理中 12 / 40」）。只畫比例，不內建文字；「處理中 12 / 40」這類說明由呼叫端排在旁邊。

## 用法

### Angular（v0.6.0）

`app-progress-bar`

[value] [max] · ariaLabel

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/progress-bar--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `value` | `number` | `0` | 目前完成量，與 max 同單位；會被夾在 0～max 之間 |
| `max` | `number` | `100` | 總量。直接傳百分比時不用另外設；≤ 0 時一律視為 0% |
| `ariaLabel` | `string` | `''` | 讀屏文字，例：「批次授權進度」。進度條本身沒有可見文字，建議一定要給 |

#### 程式碼範例

**基本用法**

```html
<app-progress-bar [value]="done" [max]="total" ariaLabel="批次授權進度"></app-progress-bar>
<span>處理中 {{ done }} / {{ total }}</span>
```

## 注意事項

- max ≤ 0 或 value 不是有限數字時一律顯示 0%，呼叫端還沒算出總數（total = 0）也不會出現 NaN 寬度。
- 不內建文字，是因為每個情境的措辭與單位（項、人、檔案）都不同。
