# Date Picker（date-picker）

分組：表單元件

需要選取民國年、年月、期別（兩個月一期）或完整日期（年月日）的場景。只選年月時也用這個元件，不要自己組年、月兩個下拉。

## 用法

### Angular（v0.11.0）

`app-date-picker`

mode: year|month|period|day · size: S|M|L · minYear maxYear · [maxDate] [clearable] [emptyLabel] · ariaLabel · month/period/day 模式點標題年份展開年份清單快速跳年 · CVA 控制 value

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.11.0/components/?path=/docs/date-picker--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `mode` | `'year' \| 'month' \| 'period' \| 'day'` | `'month'` | 選取粒度：year=只選年、month=選年月、period=選期別（兩個月一期，值是那一期的起始月，'114-3' 代表 3~4 月）、day=選年月日 |
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | trigger 高度：S=28px、M=32px、L=40px（對齊 app-select L） |
| `placeholder` | `string` | `依 mode 自動推導` | 空值時顯示的 placeholder 文字；不傳時依 mode 推導：day='選擇日期'、month='選擇月份'、period='選擇期別'、year='選擇年度' |
| `minYear` | `number` | `110` | 可選最小民國年 |
| `maxYear` | `number` | `125` | 可選最大民國年 |
| `disabled` | `boolean` | `false` | 禁用狀態：灰底、不可點擊，支援 CVA setDisabledState |
| `maxDate` | `{ year: number; month: number; day: number } \| null` | `null` | 不允許選此日期之後的日期（民國年）。晚於它的月份格、日期格停用；期別格是起始月晚於它的那一期停用；年份清單中的未來年也停用。跟 maxYear＋maxMonth 都設時以 maxDate 為準。null 表示無限制。 |
| `clearable` | `boolean` | `false` | 顯示清除按鈕：有值且非 disabled 時於欄位內顯示 ✕ icon（data-testid="date-picker-clear"），點擊 emit 空字串清空。清除鈕念「清除＋欄位名稱」，例如「清除完成日期」；沒有欄位名稱時念「清除日期」。opt-in，用於空值合法的場景（如非必填的開始日期）。 |
| `ariaLabel` | `string` | `''` | 報讀軟體念的欄位名稱。直接寫在有 label 的 app-field 裡不用設，會自動念欄位標題；沒有欄位標題、或包在別的元件裡時才設（例如篩選列的開始、結束日期）。設了就只用它，不用欄位標題。按鈕念「名稱＋目前文字」，清除鈕念「清除＋名稱」；名稱跟按鈕上的文字一樣時（例如提示文字就寫「開始日期」）只念一次。同一個欄位裡放兩個（例如日期區間的開始與結束）時兩個都要設，不然兩顆清除鈕會念一樣的名稱。要寫 ariaLabel，不要寫 aria-label：aria-label 會留在外框上，按鈕還是念不出欄位名稱。 |
| `emptyLabel` | `string` | `''` | 空值時顯示的「實心」語意文字（深色，非灰色 placeholder）。用於空值本身有明確業務語意的情境（如開始日期空＝「審核通過後開始」）；點擊仍可開面板選日期。空字串時退回一般 placeholder 行為。 |
| `maxMonth` | `number \| null` | `null` | 不允許選超過此月份，需搭配 maxYear 一起用：maxYear 那一年，超過它的月份不能選；期別格是起始月超過它的那一期不能選。null 表示無限制。注意與 maxYear／maxDate 是不同層級的限制，勿誤以為 maxYear 已涵蓋 |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時欄位顯示錯誤樣式，並以錯誤提示顯示訊息 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤提示顯示在欄位上方或下方 |
| `yearOnly` | `boolean` | `false` | 已淘汰，請改用 mode="year"；為 true 時等同 mode="year" |

#### 程式碼範例

**選年月（預設）**

```html
<app-date-picker
  size="S"
  [ngModel]="startTime"
  (ngModelChange)="onStartTimeChange($event)">
</app-date-picker>
```

**只選年**

```html
<app-date-picker
  mode="year"
  size="L"
  placeholder="選擇過往年度"
  [maxYear]="currentRocYear"
  [ngModel]="year"
  (ngModelChange)="onYearChange($event)">
</app-date-picker>
```

**放在有標題的欄位裡：報讀軟體念「完成日期 114 年 3 月 15 日」，欄位必填時也會念出必填，不用另外設名稱**

```html
<app-field label="完成日期" [required]="true">
  <app-date-picker
    mode="day"
    size="L"
    [ngModel]="completedDate"
    (ngModelChange)="onCompletedDateChange($event)">
  </app-date-picker>
</app-field>
```

**沒有欄位標題時用 ariaLabel 給名稱（例：篩選列的日期區間）**

```html
<app-date-picker mode="day" size="S" ariaLabel="開始日期" placeholder="開始日期" [clearable]="true" [ngModel]="from" (ngModelChange)="onFromChange($event)"></app-date-picker>
<app-date-picker mode="day" size="S" ariaLabel="結束日期" placeholder="結束日期" [clearable]="true" [ngModel]="to" (ngModelChange)="onToChange($event)"></app-date-picker>
```

**選期別（兩個月一期）：值是那一期的起始月，選「3~4 月」送出 '114-3'**

```html
<app-field label="開始期別">
  <app-date-picker
    mode="period"
    size="L"
    [ngModel]="startPeriod"
    (ngModelChange)="onStartPeriodChange($event)">
  </app-date-picker>
</app-field>
```

**選年月日**

```html
<app-date-picker
  mode="day"
  size="M"
  [ngModel]="date"
  (ngModelChange)="onDateChange($event)">
</app-date-picker>
```

#### Angular 注意事項

- app-date-picker 實作 ControlValueAccessor，支援 ngModel。
- 鍵盤怎麼操作、焦點落在哪、報讀念什麼，都以本體規格的無障礙段為準。接下來三條只補 Angular 才有的部分。
- 面板開著時，Esc 由元件掛在 document 捕獲階段的監聽先接住，不再往外傳。外層在冒泡階段寫的 Esc 處理（例如在 document 上聽 keydown.escape）收不到，所以外層的視窗不會跟著關。
- 本體說的「面板開著時又打開對話框，面板先關閉」，在 Angular 指打開時呼叫 ModalStackService.register 登記的視窗，自己做的視窗呼叫它也算。DS 內建會登記的是 app-dialog、app-modal-shell、app-doc-preview；app-drawer-shell 不登記，打開時面板不會跟著關。
- 本體說的「標成已經碰過（touched）」，在 Angular 是呼叫 ControlValueAccessor 註冊的 onTouched，表單控制項因此變成 touched。
- 欄位標題和必填只認同一個模板裡直接包住它的 app-field（跟 app-input 一樣）。把 app-date-picker 包進自己寫的元件、再把那個元件放進 app-field，就念不到外層的標題和必填，這時要在自己的元件上接一個名稱再傳給 ariaLabel。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：在選擇器上按 Enter、空白鍵、↑ 或 ↓ 打開面板。
- **鍵盤**：方向鍵在格子之間移動，不會停在停用的格子或空白格上。往那個方向已經沒有能選的格子時，焦點留在原地，不會自己換年；換年用面板上方的「上一年」「下一年」。
- **鍵盤**：在格子上按 Enter 或空白鍵選取，面板關閉，焦點回到選擇器。有兩個例外，面板不關：選年月日時，選了月份會換成日期格；從標題打開的年份清單選了年份，會回到月份格或期別格。
- **鍵盤**：按 Esc 關閉面板，焦點回到選擇器，值不變。面板開著時，這個 Esc 只關面板，不會傳到外層，外層的對話框不會跟著關。按住 Esc 不放時，關掉面板之後的連發也不會傳出去，放開再按才會。面板關著時按 Esc，照常傳給外層。
- **鍵盤**：面板裡的 Enter、空白鍵不會傳給頁面的快捷鍵。按住 Enter 不放的連發只在「上一年」「下一年」上有效，可以連續換年；空白鍵要放開才算按一下，按住不會連續換年。在別的地方，連發不會接著選到下一層的格子，例如選了月份換成日期格之後，不會直接選到某一天。
- **鍵盤**：選擇器上的 Enter、空白鍵目前會傳到外層，頁面的快捷鍵收得到：包含打開面板的那一下，以及在格子上按住 Enter 選取、焦點回到選擇器之後的連發。連發不會再打開面板。
- **鍵盤**：Tab 依序經過面板上方的按鈕，再到格子；整片格子只佔一個 Tab 停點，格子之間用方向鍵移動。在格子上再按 Tab，面板關閉，焦點移到選擇器後面的下一個元素：可清除且有值時是清除鈕，否則是下一個欄位。在面板第一個停點按 Shift+Tab，面板關閉，焦點回到選擇器。
- **鍵盤**：欄位在這些時候標成已經碰過（touched），表單驗證照常觸發：點擊或按 Enter、空白鍵開關面板，按 ↑ 或 ↓，在選擇器上按 Tab 或 Shift+Tab，用 Tab 或 Shift+Tab 離開面板，按清除鈕。
- **焦點**：打開面板時，焦點移進格子：落在標成選中的格子（哪一格算選中見報讀段）；選年月日時，落在值所在的月份。那一格不能選、或沒有標成選中的格子時，落在第一個能選的格子。用滑鼠點開也一樣。
- **焦點**：正在看的這一年沒有能選的格子時（例如上限早於這一年），焦點留在選擇器，不會移進面板。這時按 Tab、Shift+Tab、Enter 或空白鍵會關閉面板，↑、↓ 沒有作用，只用鍵盤到不了「上一年」，要用滑鼠點。
- **焦點**：焦點在「上一年」或「下一年」上，按到上下限讓它停用時，焦點移到「選擇年份」，不會掉出面板。
- **焦點**：面板開著時又打開對話框（[Dialog](dialog.md)、[Modal Shell](modal-shell.md)、[Doc Preview 文件預覽](doc-preview.md)），面板先關閉，焦點回到選擇器。面板浮在所有視窗上面，不關會蓋在對話框上。
- **焦點**：[Dialog](dialog.md)、[Modal Shell](modal-shell.md) 打開後會接手焦點，下一個 Esc 關的是對話框。[Doc Preview 文件預覽](doc-preview.md) 不移焦點，焦點留在預覽底下的選擇器：這時按 ↓、Enter 或空白鍵會再打開面板，面板蓋在預覽上面，下一個 Esc 關的是面板。
- **報讀軟體**：選擇器念「名稱＋目前文字」，例如「完成日期 114 年 3 月 15 日」。目前文字是值；沒有值時是空值文字，再沒有就是提示文字（預設依模式是「選擇年度」「選擇月份」「選擇期別」「選擇日期」）。名稱跟目前文字一樣時（例如提示文字就寫「開始日期」），只念一次。
- **報讀軟體**：名稱先用 `ariaLabel`，沒設時用直接包住它的 [Field](field.md) 標題；兩個都沒有時，只念目前文字。只認直接包住它的 [Field](field.md)：把它包進別的元件、再把那個元件放進 [Field](field.md)，就念不到標題，這時由那個元件把名稱傳給 `ariaLabel`。
- **報讀軟體**：直接包住它的 [Field](field.md) 標了必填時，報讀軟體也會念出必填。
- **報讀軟體**：清除鈕念「清除＋名稱」，例如「清除完成日期」；沒有名稱時念「清除日期」。同一個欄位放兩個選擇器時（例如開始與結束日期），兩個都要設 `ariaLabel`，不然兩顆清除鈕會念一樣的名稱。
- **報讀軟體**：面板上方的按鈕念「上一年」「選擇年份」「下一年」；「選擇年份」不念目前是哪一年。選年月日的日期格上方是「返回月份」。格子念格子上的文字（例如「3 月」「3~4 月」「15」），標成選中的格子會念出已選取。
- **報讀軟體**：哪一格標成選中：月份格、期別格、日期格是值所在的那一格，值在別的年份或月份時，正在看的這一頁沒有選中的格子；選年月日的月份格不標選中。年份格標的是正在看的那一年，不一定是值：沒有值時是今年，用「上一年」「下一年」換過年再打開年份清單時，是換到的那一年。

### 網頁專屬

- **ARIA 與 HTML 語意**：選擇器是 `role="combobox"`，帶 `aria-expanded` 與 `aria-haspopup="listbox"`。有 [Field](field.md) 標題、又沒設 `ariaLabel` 時，用 `aria-labelledby` 指向欄位標題和目前文字（兩者一樣時只指向標題）；其他情況用 `aria-label`。直接包住它的 [Field](field.md) 標了必填時，帶 `aria-required="true"`。
- **ARIA 與 HTML 語意**：格子區是 `role="listbox"`，每一格是 `role="option"` 的按鈕，標成選中的帶 `aria-selected="true"`（哪一格算選中見報讀段），不能選的是停用的按鈕。整片格子只有一格的 `tabindex` 是 0，其餘是 -1。

## 注意事項

- 值格式：year='114'、month='114-3'、period='114-3'、day='114-3-15'，空值 ''；可以跟表單雙向綁定值。period 的值是那一期的起始月：'114-3' 代表 3~4 月。元件送出的值一定是單數月；收到的值可能是雙數月（例如舊資料的 '114-4'），元件原樣保留。
- 顯示文字：year → '114 年'；month → '114 年 3 月'；period → '114 年 3~4 月'；day → '114 年 3 月 15 日'。period 收到雙數月的值（例如 '114-4'）時，顯示成它所屬的那一期（114 年 3~4 月）並標成選中；元件不改寫這個值，也不會因此送出新值。
- 行為規格：點擊 trigger → portal 到 body 的浮動 panel，dropdown 寬度與 trigger 同寬。year 模式：直接顯示 2 欄年份 grid，點擊年份即選取。month 模式：← 年 → 導覽 + 3×4 月份 grid，點擊月份即選取。period 模式：← 年 → 導覽 + 3×2 期別 grid（1~2 月、3~4 月……11~12 月），點擊即選取；起始月晚於上限的那一期不能選。上限來自 maxDate，或 maxYear 加 maxMonth：maxMonth 只在 maxYear 那一年生效，兩者都設時以 maxDate 為準。day 模式：先選月份（← 年 → 導覽 + 3×4 月份 grid），選月後切換至日期 grid（← 返回 + 標題 + 7 欄星期 + 日期按鈕），點擊日期即選取。點擊 trigger 外 → 關閉 panel；鍵盤怎麼開關、焦點去哪，見無障礙段。disabled 時點擊 trigger 不開啟 panel。
- （2026-07 更新）快速跳年：month、period、day 模式的標題年份為可點按鈕（帶下箭頭），點擊展開可捲動的年份清單（minYear..maxYear，開啟時自動聚焦/捲到目前年），選年後回到月份或期別 grid 繼續選——用於 minYear 距今較遠（如出生日期民國40年起）時免逐年點箭頭。year 模式的年份清單是根視圖、選年即最終值（emit），行為不變。
- **注意**：元件本身的元素已設定 display: block，放入 flex 容器時會自動伸展；需固定寬度時請在父層設定 width。
