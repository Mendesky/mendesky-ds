# Autocomplete（autocomplete）

分組：表單元件

搜尋後動態篩選選項的輸入框。

## 用法

### Angular（v0.6.0）

`app-autocomplete`

size: S|M|L · placeholder options: AutocompleteOption[] value errorMessage errorPosition: top|bottom · [disabled] [singleSelect] [clearable] · (selectionChange)

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/autocomplete--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `AutocompleteSize` | `'L'` | 'S' \| 'M' \| 'L' |
| `placeholder` | `string` | `'Placeholder'` | 未選擇時的佔位文字 |
| `options` | `AutocompleteOption[]` | `[]` | 所有可選項目 { value, label } |
| `value` | `AutocompleteOption[]` | `[]` | 外部傳入已選項目（可選） |
| `errorMessage` | `string` | `''` | 錯誤訊息；有值時切換 error 狀態 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `disabled` | `boolean` | `false` | 禁用狀態 |
| `singleSelect` | `boolean` | `false` | 單選模式：選新值直接取代舊值（不累加 chip） |
| `clearable` | `boolean` | `true` | 是否允許清空已選值。false 會同時關掉三條清空路徑：右側「清除全部」X 鈕、每個 chip 的移除鈕、輸入框為空時按 Backspace。用於「後端欄位 required 且無 clear 路由」的情境——清空在後端無法表達時 UI 就不該提供，否則畫面空但後端留舊值、reopen 又跑回來。命名對齊 app-select 同名 prop |
| `(selectionChange)` | `EventEmitter<AutocompleteOption[]>` |  | 已選項目變更時觸發 |

#### 程式碼範例

**搭配 app-field 提供標題與必填標示**

```html
<app-field label="縣市" [required]="true">
  <app-autocomplete
    size="L"
    placeholder="搜尋縣市"
    [options]="cityOptions"
    [errorMessage]="form.cityError"
    (selectionChange)="onCityChange($event)"
  ></app-autocomplete>
</app-field>
```
