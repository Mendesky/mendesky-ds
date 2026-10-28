# Field（field）

分組：表單元件

所有表單欄位外層包裝。提供一致的 label 排版。標題只放欄位名稱（中粗 500）；單位（元）、限制（單檔上限 50MB）、提示（可複選）一律放 hint（標題旁淺灰說明），不要寫進 label 文字。跟畫面重複的說明（例如按鈕已列出的選項）直接不寫。

## 用法

### Angular（v0.5.0）

`app-field`

label hint [required] [emphasis]

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/field--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 標題文字（中粗 500，v0.1.9 起）；只放欄位名稱，不含單位或說明；空字串時不顯示標題列 |
| `hint` | `string` | `''` | 標題旁的說明文字（一般 400、淺灰），排在標題與「必填」之間；放單位（元）、限制、提示，盡量精簡 |
| `required` | `boolean` | `false` | 顯示「必填」badge（SoftBlue，XXS） |
| `emphasis` | `boolean` | `false` | 強調樣式：label 加粗（700）+ 標題色（--text/title）+ label 下方 1px 分隔線；用於唯讀展示區塊（如信件的收件人 / 說明） |

#### 程式碼範例

**必填欄位**

```html
<app-field label="項目名稱" [required]="true">
  <app-input placeholder="請輸入項目名稱" [errorMessage]="form.nameError"></app-input>
</app-field>
```

**一般欄位（選填不標示）**

```html
<app-field label="備註">
  <app-textarea placeholder="選填說明"></app-textarea>
</app-field>
```

**無標題（僅包裹 input，不顯示 label row）**

```html
<app-field>
  <app-input placeholder="搜尋"></app-input>
</app-field>
```

**強調樣式（唯讀展示）**

```html
<app-field label="收件人" [emphasis]="true">
  <div class="readonly-value noto-14-regular">{{ recipientText }}</div>
</app-field>
```

#### Angular 注意事項

- app-field 用 <ng-content> 投影欄位：把 app-input、app-textarea、app-autocomplete 等直接寫在 <app-field> 標籤內即可。

### Vue（試做）（v0.2.0）

`<DsField>`

label hint required emphasis

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.2.0/components/?path=/docs/field--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 標題文字（中粗 500，v0.1.9 起）；只放欄位名稱，不含單位或說明；空字串時不顯示標題列 |
| `hint` | `string` | `''` | 標題旁的說明文字（一般 400、淺灰），排在標題與「必填」之間；放單位（元）、限制、提示，盡量精簡 |
| `required` | `boolean` | `false` | 顯示「必填」badge（SoftBlue，XXS） |
| `emphasis` | `boolean` | `false` | 強調樣式：label 加粗（700）+ 標題色（--text/title）+ label 下方 1px 分隔線；用於唯讀展示區塊（如信件的收件人 / 說明） |

#### 程式碼範例

**必填欄位**

```vue
<DsField label="項目名稱" :required="true">
  <DsInput placeholder="請輸入項目名稱" :errorMessage="form.nameError"></DsInput>
</DsField>
```

**一般欄位（選填不標示）**

```vue
<DsField label="備註">
  <DsInput placeholder="選填說明"></DsInput>
</DsField>
```

**無標題（僅包裹 input，不顯示 label row）**

```vue
<DsField>
  <DsInput placeholder="搜尋"></DsInput>
</DsField>
```

**強調樣式（唯讀展示）**

```vue
<DsField label="收件人" :emphasis="true">
  <div class="readonly-value noto-14-regular">{{ recipientText }}</div>
</DsField>
```

## 無障礙

### 網頁和 APP 都要做到

- **報讀軟體**：直接寫在欄位裡的 [Input](input.md) 沒設 ariaLabel 時，標題就是它的報讀名稱。欄位標了必填時，報讀軟體也會念出必填。標題旁的說明文字（hint）與必填標記不算進名稱。
- **報讀軟體**：hint 目前也不會在聚焦輸入框時念出，單位、限制這類說明，報讀軟體使用者聽不到。
- **報讀軟體**：[Input](input.md) 寫在別的元件的模板裡（例如 [Inline Add](inline-add.md)）時，不會連到外層欄位的標題，也不會標必填，名稱要由那個元件自己給。
- **報讀軟體**：目前只有 [Input](input.md) 會自動連到標題。[Textarea](textarea.md)、[Select](select.md) 等其他控制項放進來，報讀軟體還念不出欄位標題。

### 網頁專屬

- **ARIA 與 HTML 語意**：標題元素有自動產生的 id。直接寫在欄位裡的 [Input](input.md) 沒設 ariaLabel 時，用 aria-labelledby 指向它；欄位標了必填時，[Input](input.md) 輸出 aria-required="true"。標題是空的或只有空白時，就不會連過去。

## 注意事項

- [Field](field.md) 是表單欄位的包裝元件，負責統一管理標題列與必填 badge。把 [Input](input.md)、[Textarea](textarea.md)、[Autocomplete](autocomplete.md) 等表單元件放進它裡面即可。選填欄位不加任何 badge，只顯示 label 文字。
