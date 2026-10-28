# List（list）

分組：展示元件

階層式資料展示。

## 用法

### Angular（v0.5.0）

`app-list`

level: 1|2|3|4 · title value itemNumber · [showItemNumber] [showTitle] [showValue] [hasChildren] status: Default|Hover

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/list--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `level` | `'1'\|'2'\|'3'\|'4'` |  | 層級縮排深度 |
| `title` | `string` |  | 左側標題文字 |
| `value` | `string` |  | 右側數值文字 |
| `itemNumber` | `number` |  | 序號（showItemNumber=true 時顯示） |
| `showItemNumber` | `boolean` |  | 是否顯示序號 |
| `showTitle` | `boolean` |  | 是否顯示標題 |
| `showValue` | `boolean` |  | 是否顯示數值 |
| `hasChildren` | `boolean` |  | 是否有子項目（展開 icon） |
| `status` | `'Default'\|'Hover'` |  | 視覺狀態 |
