# Number Input（number-input）

分組：表單元件

金額、數量等數字欄位。有加減鍵與格式化。

## 用法

### Angular（v0.5.0）

`app-number-input`

size: S|M|L · placeholder decimalPlaces min max step initialValue suffix errorMessage errorPosition: top|bottom · [disabled] [allowEmpty] · (valueChange: number|null) · (valueCommit: number|null)

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/number-input--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `NumberInputSize` | `'M'` | 'S' \| 'M' \| 'L' |
| `placeholder` | `string` | `'0'` | 佔位文字 |
| `decimalPlaces` | `number` | `0` | 小數位數（0 = 整數） |
| `min` | `number \| null` | `null` | 最小值；null = 無限制；離焦後自動 Clamp |
| `max` | `number \| null` | `null` | 最大值；null = 無限制；離焦後自動 Clamp |
| `step` | `number` | `1` | ↑↓ 步距；Shift+↑↓ 為 step×10 |
| `initialValue` | `number \| null` | `null` | 初始值（ngOnChanges 監聽，外部可響應式更新） |
| `suffix` | `string` | `''` | 數字後方的單位標籤，例如 "%" 或 "元"；空字串時隱藏 |
| `allowEmpty` | `boolean` | `true` | false = 必填欄位不可清空：隱藏清除鈕，且鍵盤刪空後 blur 自動還原為上次值（畫面永遠等於後端）。用於後端無法持久化空值的欄位（如必填的金額） |
| `disabled` | `boolean` | `false` | 禁用狀態 |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `(valueChange)` | `EventEmitter<number \| null>` |  | 值即時變更（每次 step / 打字 / 清空皆 emit）；用於即時計算總和顯示 |
| `(valueCommit)` | `EventEmitter<number \| null>` |  | 使用者完成輸入後才 emit（debounce 600ms）；打 API 請接這個，不要接 (inputBlur)。觸發時機：⑴ 連點/連按 ↑↓ → 600ms 後 ⑵ 失焦（blur flush）⑶ 元件銷毀（destroy flush）⑷ clearValue → 立即 emit null。 |
| `(inputBlur)` | `EventEmitter<void>` |  | 純失焦事件（focus 離開元件）。不再用於 commit；commit 請接 (valueCommit) |

#### 程式碼範例

**基本用法（接 valueCommit 打 API）**

```html
<app-number-input
  size="L"
  placeholder="0"
  [min]="0"
  [max]="9999"
  [step]="1"
  (valueChange)="onQtyChange($event)"
  (valueCommit)="onQtyCommit($event)"
></app-number-input>
```

**只需即時顯示（不打 API）**

```html
<app-number-input
  size="M"
  [initialValue]="discountValue()"
  (valueChange)="discountValue.set($event)"
></app-number-input>
```
