# Divider（divider）

分組：展示元件

區塊分隔。

## 用法

### Angular（v0.5.0）

`app-divider`

display: Row|Column · propClass: White|Grey20|Grey30|Grey40 · [showLabel] labelText

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/divider--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `display` | `'Row' \| 'Column'` |  | 水平或垂直分隔線 |
| `propClass` | `DividerClass` | `'Grey20'` | White \| Grey20 \| Grey30 \| Grey40。**沒有 Grey10**（2026-08-18 撤除，DS 外部化後不存在）——需要更淡時只能用 Grey20 |
| `showLabel` | `boolean` |  | 是否顯示中間文字 |
| `labelText` | `string` |  | 中間顯示文字 |

#### 程式碼範例

**帶標籤的水平分隔線**

```html
<app-divider
  display="Row"
  propClass="Grey20"
  [showLabel]="true"
  labelText="或"
></app-divider>
```
