# Checkbox（checkbox）

分組：互動元件

單純的勾選框，三態：沒有／全有／部分。「部分」用在「一組裡選了一些」的地方（例：權限清單的分類列）。要「勾選框＋文字」的可點按鈕、只需兩態時，改用 [Check Chip](check-chip.md)。

## 用法

### Angular（v0.5.0）

`app-checkbox`

[checked] [indeterminate] · size: s|m|l · label · ariaLabel · [disabled] · (checkedChange) · CVA（ngModel）

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/checkbox--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | 全有 |
| `indeterminate` | `boolean` | `false` | 部分；為 true 時優先顯示「部分」，不管 checked 是什麼。只由呼叫端算出來，使用者點不出這個狀態 |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | s（框約 16.7px）／m（框 20px）／l（框約 23.3px） |
| `label` | `string` | `''` | 框右邊的文字；點文字也算點勾選框。可省略 |
| `ariaLabel` | `string` | `''` | 沒有 label 時一定要給，讀螢幕軟體才唸得出這是什麼（例：「使用者管理 整組檢視」） |
| `disabled` | `boolean` | `false` | 停用。與 ngModel 一起用時也能直接從 template 停用 |
| `(checkedChange)` | `EventEmitter<boolean>` |  | 使用者點擊後的新值。沒有 → true、全有 → false、部分 → true |

#### 程式碼範例

**分類列（部分勾選由呼叫端算）**

```html
<app-checkbox
  [checked]="allSelected()"
  [indeterminate]="someSelected()"
  label="使用者管理"
  (checkedChange)="toggleGroup($event)"
></app-checkbox>
```

**沒有文字時給 ariaLabel**

```html
<app-checkbox size="s" [(ngModel)]="selected" ariaLabel="選取這一列"></app-checkbox>
```

### Vue（試做）（v0.2.0）

`<DsCheckbox>`

checked indeterminate · size: s|m|l · label · ariaLabel · disabled · @checked-change · v-model

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.2.0/components/?path=/docs/checkbox--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | 全有 |
| `indeterminate` | `boolean` | `false` | 部分；為 true 時優先顯示「部分」，不管 checked 是什麼。只由呼叫端算出來，使用者點不出這個狀態 |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | s（框約 16.7px）／m（框 20px）／l（框約 23.3px） |
| `label` | `string` | `''` | 框右邊的文字；點文字也算點勾選框。可省略 |
| `ariaLabel` | `string` | `''` | 沒有 label 時一定要給，讀螢幕軟體才唸得出這是什麼（例：「使用者管理 整組檢視」） |
| `disabled` | `boolean` | `false` | 停用 |
| `v-model` | `boolean` |  | 雙向綁定（Angular 版的 ngModel）。跟 checked 擇一使用 |
| `@checked-change` | `(value: boolean) => void` |  | 使用者點擊後的新值。沒有 → true、全有 → false、部分 → true |

#### 程式碼範例

**分類列（部分勾選由呼叫端算）**

```vue
<DsCheckbox
  :checked="allSelected()"
  :indeterminate="someSelected()"
  label="使用者管理"
  @checked-change="toggleGroup($event)"
></DsCheckbox>
```

**沒有文字時給 ariaLabel**

```vue
<DsCheckbox size="s" v-model="selected" ariaLabel="選取這一列"></DsCheckbox>
```

## 注意事項

- 點擊後元件會先自己清掉 indeterminate，之後以呼叫端傳入的值為準。
- 顏色：沒有＝text/body；全有、部分＝Color/Green/80。不用 button/success（#74ae3e），因為白色勾放在上面只有 2.67:1，達不到 WCAG 1.4.11 的 3:1。
- 圖示與 [Check Chip](check-chip.md) 共用同一組 registry：CheckBox／CheckBoxOn／CheckBoxMixed。
