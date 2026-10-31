# List Tag（list-tag）

分組：展示元件

清單項目附帶徽章標記。

## 用法

### Angular（v0.7.0）

`app-list-tag`

itemNumber [showBadge] [showBadgeB] [showBadgeC] text

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/list-tag--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `itemNumber` | `string` | `'i'` | 編號徽章內的文字 |
| `showBadge` | `boolean` | `true` | 是否顯示編號徽章 |
| `showBadgeB` | `boolean` | `false` | 文字後方是否顯示「B」徽章 |
| `showBadgeC` | `boolean` | `false` | 文字後方是否顯示「C」徽章 |
| `text` | `string` | `'Text'` | 標籤文字 |

## 注意事項

- 用於 [List](list.md) 行中的標籤插槽，搭配 [Label](label.md) 使用。
