# Select（select）

分組：表單元件

固定選項下拉選擇。禁止原生 `<select>`。

## 用法

### Angular（v0.12.1）

`app-select`

options: SelectOption[]（{ value, label, disabled?, status?: { label } }）· placeholder size: S|M|L · [clearable] errorMessage errorPosition: top|bottom · CVA 控制 value/isDisabled

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/?path=/docs/select--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | `[]` | 選項列表：{ value, label, disabled?, status? }。status 是狀態標記 { label }，有值時這個選項的文字右邊顯示紅色驚嘆號，滑過顯示 label，報讀軟體把 label 接在文字後面念；選中這個選項後，選取框文字右邊也會顯示。 |
| `placeholder` | `string` | `'請選擇'` | 未選中時的佔位文字 |
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | L=40px、M=36px、S=32px（觸發框高度） |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `clearable` | `boolean` | `false` | 為 true 時，select 有選中值的情況下右側顯示清除 icon（No-X-Cancel 16px）；點擊清除會將值設為 null |
| `searchable` | `boolean` | `false` | 觸發區改成可輸入的搜尋框，邊打字邊篩選選項 |
| `disabled` | `boolean` | `false` | 停用；停用時不能開啟下拉 |

#### 程式碼範例

**搭配 app-field 使用**

```html
<app-field label="部門" [required]="true">
  <app-select
    [options]="departmentOptions"
    placeholder="請選擇部門"
    [errorMessage]="form.departmentError"
    formControlName="department"
  ></app-select>
</app-field>
```

**options 格式**

```html
// component.ts
departmentOptions: SelectOption[] = [
  { value: 'design',      label: '設計部' },
  { value: 'engineering', label: '工程部' },
  { value: 'admin',       label: '行政部', disabled: true },
];
```

**狀態標記：有東西要處理的選項，status 給 { label }**

```html
groupOptions: SelectOption[] = [
  { value: 'a', label: '第一組', status: { label: '需處理' } },
  { value: 'b', label: '第二組' },
  { value: 'c', label: '第三組', status: { label: '需處理' } },
];
```

#### Angular 注意事項

- app-select 實作 CVA（ControlValueAccessor），可直接接 formControlName 或 [(ngModel)]。
- 狀態標記的型別 StatusMark 從 @mendesky/ds-angular 匯出，跟 app-tabs 的狀態標記是同一個型別。
- 可輸入模式（[searchable]="true"）打開下拉、正在打字時，選取框的驚嘆號先藏起來；關上後再顯示。選項上的驚嘆號照常顯示。
- 停用的選項或選取框，驚嘆號跟停用的文字一樣變灰。
- **注意**：標記的文字只有滑鼠滑過驚嘆號才看得到；下拉清單裡用方向鍵移動時，報讀軟體也念不到選項上的標記。用了標記，選中後的畫面一定要另外寫出原因。
- status 只有 label 改變時，選項也會重畫；內容完全相同的新陣列不會重畫。

### Vue（試做）（v0.3.0）

`<DsSelect>`

options: SelectOption[] · placeholder size: S|M|L · clearable errorMessage errorPosition: top|bottom · v-model 控制值 · disabled

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.3.0/components/?path=/docs/select--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `v-model` | `unknown` |  | 選中的值（選項的 value；沒選是 null）。Angular 版用 ngModel／表單控制項 |
| `options` | `SelectOption[]` | `[]` | 選項列表：{ value, label, disabled? } |
| `placeholder` | `string` | `'請選擇'` | 未選中時的佔位文字 |
| `size` | `'S' \| 'M' \| 'L'` | `'L'` | L=40px、M=36px、S=32px（觸發框高度） |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `clearable` | `boolean` | `false` | 為 true 時，select 有選中值的情況下右側顯示清除 icon（No-X-Cancel 16px）；點擊清除會將值設為 null |
| `searchable` | `boolean` | `false` | 觸發區改成可輸入的搜尋框，邊打字邊篩選選項 |
| `disabled` | `boolean` | `false` | 停用；停用時不能開啟下拉 |

#### 程式碼範例

**搭配 DsField 使用**

```vue
<DsField label="部門" :required="true">
  <DsSelect
    :options="departmentOptions"
    placeholder="請選擇部門"
    :errorMessage="form.departmentError"
    v-model="form.department"
  ></DsSelect>
</DsField>
```

**options 格式**

```vue
// <script setup lang="ts">
const departmentOptions: SelectOption[] = [
  { value: 'design',      label: '設計部' },
  { value: 'engineering', label: '工程部' },
  { value: 'admin',       label: '行政部', disabled: true },
];
```

## 注意事項

- 本元件是 Combobox（可輸入搜尋的下拉選單）。Panel 以 Portal 方式掛載到 document.body，避免被 overflow:hidden 或 transform 祖先裁切。可以跟表單雙向綁定值。
- Suffix icon（DownArrow 等）統一使用 size="16"，不可用其他尺寸。與 [Input](input.md) 的 suffix icon 規範一致。
- 選項可以帶狀態標記：文字右邊一個紅色的圓形驚嘆號，顏色跟 [Label](label.md) 的 Error 一樣，滑過顯示標記的文字。選中有標記的選項後，選取框文字右邊也會顯示同一個驚嘆號，報讀軟體念選取框時會念出標記文字；可輸入模式打開下拉、正在打字時先藏起來。停用的選項或選取框，標記跟文字一樣變灰。下拉清單裡用方向鍵移動時，報讀軟體念不到選項，標記也念不到。標記的文字只有滑鼠滑過才看得到，所以用了標記，選中後的畫面一定要另外寫出原因。用法跟 [Tabs](tabs.md) 的狀態標記相同，只用來標出「這一項有東西要處理」，不當一般提示或計數。
