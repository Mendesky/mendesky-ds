# Input（input）

分組：表單元件

單行文字輸入。禁止原生 `<input>`。type='password' 時自動顯示 eye toggle。電話、編號等純數字欄位用 inputMode="numeric" sanitize="digits"。

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

## 注意事項

- Suffix icon（eye toggle、clear 等）統一使用 size="16"，不可用其他尺寸。
