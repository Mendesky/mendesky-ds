# Input（input）

分組：表單元件

單行文字輸入。禁止原生 `<input>`。type='password' 時自動顯示 eye toggle。電話、編號等純數字欄位用 inputMode="numeric" sanitize="digits"。

## 可以這樣做、不要這樣做

### 可以這樣做

- 直接放進有標題的 [Field](field.md)：欄位標題就是報讀名稱，不用另外設。
- 沒有欄位標題時設 ariaLabel，例如表格列裡的輸入框、唯讀的分享連結。
- 帳號密碼欄設 autocomplete。登入本站用 username 和 current-password；別的平台的帳密，帳號欄用 off、密碼欄用 new-password，瀏覽器比較不會把本站的帳密填進去。
- 密碼明文不存在前端的話，接 passwordVisibilityChange，等使用者切成明文再跟後端拿。

### 不要這樣做

- 不要只靠提示文字說明這格要填什麼：填了值之後提示文字就不見了，日期這類輸入框更是從頭到尾都不顯示；報讀軟體念出的範例值也聽不懂。
- 不要在元件上寫 id 讓外面的 `<label>` 指過來：id 會落在外框上，連不到輸入框。改用 inputId。

## 用法

### Angular（v0.5.0）

`app-input`

size: S|M|L · placeholder type inputMode sanitize initialValue errorMessage errorPosition: top|bottom · [disabled] [readonly] · (valueChange) (blur)

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/input--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `InputSize` | `'M'` | 'S' \| 'M' \| 'L' |
| `placeholder` | `string` | `'Placeholder'` | 佔位文字 |
| `type` | `string` | `'text'` | HTML input type（text / date / email / number / password / tel 等）；type='password' 時自動顯示 eye toggle，clear 按鈕隱藏 |
| `inputMode` | `InputMode` | `'text'` | 透傳至原生 inputmode，影響行動裝置鍵盤型態。'numeric' 跳出數字鍵盤（無符號）；'tel' 跳出電話鍵盤（含 + * #）。電話/手機/純數字欄位搭配 sanitize="digits" 一起用。 |
| `sanitize` | `'none' \| 'digits'` | `'none'` | 輸入時自動過濾字元。'digits' = 只保留數字，非數字（英文、符號、連字號）在 input event 中即時被 strip，含 paste 情境；cursor 位置自動修正。 |
| `initialValue` | `string` | `''` | 預填值；外部可透過此 Input 同步更新欄位內容（ngOnChanges 監聽） |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態並顯示在下方 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `disabled` | `boolean` | `false` | 禁用狀態 |
| `readonly` | `boolean` | `false` | 唯讀狀態：不可編輯、隱藏清空鈕，但文字維持正常色、可聚焦選取（展示型欄位用，如分享連結）。與 disabled 不同——disabled 文字轉淡灰且不可聚焦。 |
| `(valueChange)` | `EventEmitter<string>` |  | 值變更事件 |
| `(blur)` | `EventEmitter<string>` |  | blur 事件，帶出當前值；用於需要 blur 後觸發邏輯的場景（如地址郵遞區號 lookup） |

#### 程式碼範例

**搭配 app-field 提供標題與必填標示**

```html
<app-field label="項目名稱" [required]="true">
  <app-input
    size="L"
    placeholder="請輸入項目名稱"
    [errorMessage]="form.nameError"
    (valueChange)="onNameChange($event)"
  ></app-input>
</app-field>
```

**預填值（例：從 API 回填）**

```html
<app-input
  size="M"
  [initialValue]="prefillValue"
  (valueChange)="prefillValue = $event"
></app-input>
```

**日期 input**

```html
<app-input type="date" size="M" (valueChange)="onDateChange($event)"></app-input>
```

**唯讀展示（如分享連結，不可編輯但可讀可選取）**

```html
<app-input size="M" [initialValue]="shareUrl" [readonly]="true"></app-input>
```

### Vue（試做）（v0.2.0）

`<DsInput>`

size: S|M|L · placeholder type inputMode sanitize initialValue errorMessage errorPosition: top|bottom · disabled readonly · @value-change @blur

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.2.0/components/?path=/docs/input--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `InputSize` | `'L'` | 'S' \| 'M' \| 'L' |
| `placeholder` | `string` | `'Placeholder'` | 佔位文字 |
| `type` | `string` | `'text'` | HTML input type（text / date / email / number / password / tel 等）；type='password' 時自動顯示 eye toggle，clear 按鈕隱藏 |
| `inputMode` | `InputMode` | `'text'` | 透傳至原生 inputmode，影響行動裝置鍵盤型態。'numeric' 跳出數字鍵盤（無符號）；'tel' 跳出電話鍵盤（含 + * #）。電話/手機/純數字欄位搭配 sanitize="digits" 一起用。 |
| `sanitize` | `'none' \| 'digits'` | `'none'` | 輸入時自動過濾字元。'digits' = 只保留數字，非數字（英文、符號、連字號）在 input event 中即時被 strip，含 paste 情境；cursor 位置自動修正。 |
| `initialValue` | `string` | `''` | 預填值；外部可透過此 Input 同步更新欄位內容（ngOnChanges 監聽） |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態並顯示在下方 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `disabled` | `boolean` | `false` | 禁用狀態 |
| `readonly` | `boolean` | `false` | 唯讀狀態：不可編輯、隱藏清空鈕，但文字維持正常色、可聚焦選取（展示型欄位用，如分享連結）。與 disabled 不同——disabled 文字轉淡灰且不可聚焦。 |
| `@value-change` | `(value: string) => void` |  | 值變更事件 |
| `@blur` | `(value: string) => void` |  | blur 事件，帶出當前值；用於需要 blur 後觸發邏輯的場景（如地址郵遞區號 lookup） |

#### 程式碼範例

**搭配 DsField 提供標題與必填標示**

```vue
<DsField label="項目名稱" :required="true">
  <DsInput
    size="L"
    placeholder="請輸入項目名稱"
    :errorMessage="form.nameError"
    @value-change="onNameChange($event)"
  ></DsInput>
</DsField>
```

**預填值（例：從 API 回填）**

```vue
<DsInput
  size="M"
  :initialValue="prefillValue"
  @value-change="prefillValue = $event"
></DsInput>
```

**日期 input**

```vue
<DsInput type="date" size="M" @value-change="onDateChange($event)"></DsInput>
```

**唯讀展示（如分享連結，不可編輯但可讀可選取）**

```vue
<DsInput size="M" :initialValue="shareUrl" :readonly="true"></DsInput>
```

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 移到輸入框。密碼欄的眼睛按鈕接在輸入框後面，也在 Tab 順序裡，按 Enter 或空白鍵切換顯示明文或遮罩。輸入框停用或唯讀時，眼睛按鈕照樣可以按。
- **鍵盤**：清除鈕不在 Tab 順序裡：它只在輸入框有焦點又有值時出現，焦點移開就消失，密碼欄與唯讀欄不會出現。要用鍵盤清空，就全選再刪掉。
- **焦點**：輸入框有焦點時，整個框會亮起焦點框，滑鼠點進去也一樣。有錯誤訊息時外框維持紅色，目前不顯示焦點框，聚焦時只看得到游標。
- **焦點**：眼睛按鈕用鍵盤移到時，在按鈕內側顯示焦點框。
- **報讀軟體**：名稱先看 ariaLabel，沒有再用外層 [Field](field.md) 的標題；兩個都沒有時，再看外面有沒有用 inputId 連過來、或直接包住元件的 `<label>`。這些都沒有，瀏覽器才拿提示文字（placeholder）當名稱；日期這類輸入框連提示文字都不拿，會完全沒有名稱。設了 ariaLabel 就只念它，欄位標題和外面的 `<label>` 都不念。
- **報讀軟體**：只有直接寫在 [Field](field.md) 裡的輸入框會連到欄位標題。輸入框寫在別的元件的模板裡（例如 [Inline Add](inline-add.md)），就不會連到外層欄位，名稱要由那個元件自己給。
- **報讀軟體**：提示文字不適合當名稱：「02」「12345678」這類範例值，念出來聽不懂這格要填什麼。
- **報讀軟體**：沒設 ariaLabel、沒有欄位標題、也沒設 inputId，提示文字又是空的、是預設值 `Placeholder`、或輸入框是日期這類不拿提示文字的類型時，開發模式會在 console 警告。只在第一次渲染時檢查一次；用 `<label>` 直接包住元件也會被警告，這時改設 inputId。
- **報讀軟體**：外層 [Field](field.md) 標了必填時，報讀軟體會念出必填。
- **報讀軟體**：眼睛按鈕念「顯示密碼」，並念出按下（目前是明文）或未按下（目前是遮罩）。
- **報讀軟體**：錯誤訊息目前不會跟輸入框一起念出，報讀軟體使用者聽不到哪裡填錯。

### 網頁專屬

- **ARIA 與 HTML 語意**：用原生 `<input>`。ariaLabel 輸出成 aria-label。沒設 ariaLabel、外層 [Field](field.md) 有標題時，改輸出 aria-labelledby 指向欄位標題。兩個不會同時出現。
- **ARIA 與 HTML 語意**：外層 [Field](field.md) 標了必填時，輸出 aria-required="true"。
- **ARIA 與 HTML 語意**：autocomplete、name、inputId 都輸出在裡面的 `<input>` 上，inputId 輸出成 id。這幾個屬性要是落在外框上，瀏覽器和密碼管理員不會看，所以元件把它們轉到裡面的 `<input>`。
- **ARIA 與 HTML 語意**：眼睛按鈕是原生 `<button>`，type="button"，用 aria-pressed 標出按下狀態。

## 注意事項

- Suffix icon（eye toggle、clear 等）統一使用 size="16"，不可用其他尺寸。
