# Year Month Picker（year-month-picker）

分組：表單元件

需要選取民國年 / 年月 / 期別（1 期 = 2 個月）的場景。值為純字串，可以跟表單雙向綁定值。單純選年月時優先用此元件，不要自組年月下拉。

## 用法

### Angular（v0.7.0）

`app-year-month-picker`

size: S|M|L · [yearOnly] [mode: month|period] · minYear maxYear · [disabled] · CVA 控制 value

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/year-month-picker--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `size` | `'S' \| 'M' \| 'L'` | `'S'` | trigger 尺寸 |
| `placeholder` | `string` | `'選擇年月'` | 空值時顯示的 placeholder 文字 |
| `minYear` | `number` | `110` | 可選最小民國年 |
| `maxYear` | `number` | `125` | 可選最大民國年 |
| `yearOnly` | `boolean` | `false` | true：只選年度，值格式為 '114'；false（預設）：選年月，值格式為 '114-3' |
| `mode` | `'month' \| 'period'` | `'month'` | 'month'（預設）：選年月；'period'：1 期 = 2 個月，startMonth ∈ {1,3,5,7,9,11} |
| `disabled` | `boolean` | `false` | true：唯讀（不可開啟面板、不可選），additive、向後相容 |

#### 程式碼範例

**選年月（預設）**

```html
<app-year-month-picker
  size="S"
  [ngModel]="period"
  (ngModelChange)="onPeriodChange($event)">
</app-year-month-picker>
```

**只選年**

```html
<app-year-month-picker
  [yearOnly]="true"
  size="L"
  placeholder="選擇年度"
  [ngModel]="year"
  (ngModelChange)="onYearChange($event)">
</app-year-month-picker>
```

**選期別（1 期 = 2 個月）**

```html
<app-year-month-picker
  mode="period"
  size="M"
  [ngModel]="taxPeriod"
  (ngModelChange)="onTaxPeriodChange($event)">
</app-year-month-picker>
```

#### Angular 注意事項

- app-year-month-picker 實作 ControlValueAccessor，值為純字串，透過 ngModel 綁定。

## 注意事項

- 值格式：yearOnly='114'、month='114-3'、period 起始月為單月（'114-3' 代表 3~4 月），空值 ''；可以跟表單雙向綁定值。
- 顯示文字：yearOnly → '114 年'；month → '114 年 3 月'；period → '114 年 3~4月'。
- 行為規格：點擊 trigger → portal 到 body 的浮動面板，點擊面板外或選取後關閉。disabled=true 時點擊不開啟面板。
