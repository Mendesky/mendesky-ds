# Cell Button（cell-btn）

分組：互動元件

日期/年月選擇器內部的格子按鈕。高密度網格選取場景（年份格、月份格、日期格）。

## 用法

### Angular（v0.5.0）

`app-cell-btn`

[text] [selected] [disabled] [empty] · (cellClick)

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/cell-btn--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 顯示文字，如 "113 年"、"3 月"、"15" |
| `selected` | `boolean` | `false` | 選中態（藍底白字） |
| `disabled` | `boolean` | `false` | 停用態（低透明度，不可點擊） |
| `empty` | `boolean` | `false` | 空白佔位格，渲染 span 非 button（日曆前幾格） |
| `(cellClick)` | `EventEmitter<void>` |  | 點擊時觸發（disabled/empty 時不觸發） |

#### 程式碼範例

**月份格**

```html
<app-cell-btn [text]="m + ' 月'" [selected]="isSelected(m)" (cellClick)="selectMonth(m)"></app-cell-btn>
```

**年份格**

```html
<app-cell-btn [text]="y + ' 年'" [selected]="y === initYear" (cellClick)="selectYear(y)"></app-cell-btn>
```

**空白佔位**

```html
<app-cell-btn [empty]="true" text=""></app-cell-btn>
```

## 注意事項

- display: contents — 外殼透明，父層 grid 直接作用在內部 button 上，不破壞 grid 佈局
- hover 效果為元件內建（:hover 偽類），不需額外屬性
- selected + hover 時 hover 不覆蓋 selected 態
