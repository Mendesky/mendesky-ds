# Badge（badge）

分組：展示元件

未讀徽章：疊在按鈕或項目的右上角，表示「有未讀」或「未讀幾則」。目前用在 header 通知鈴與版本更新入口鈕、版本更新視窗的左欄版本列。

## 用法

### Angular（v0.6.0）

`app-badge`

[count] [max] variant: auto|dot · overflow: plus|dot · ariaLabel

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/badge--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `count` | `number \| null` | `null` | 未讀數。null 或 <= 0 不渲染（variant="dot" 除外） |
| `max` | `number` | `99` | 超過這個數就走 overflow 規則。站內通知之類可調高 |
| `variant` | `'auto' \| 'dot'` | `'auto'` | 'dot' 只表示「有未讀」，不顯示數量 |
| `overflow` | `'plus' \| 'dot'` | `'plus'` | 超過 max 時：顯示 `99+` 或退回圓點。通知鈴用 'dot' |
| `ariaLabel` | `string` | `''` | 讀屏文字。圓點模式沒有文字，一定要給 |

#### 程式碼範例

**有未讀（圓點）**

```html
<span class="host">   <!-- 宿主需 position: relative -->
  <app-icon name="Sparkle" size="24"></app-icon>
  <app-badge variant="dot" ariaLabel="有未讀的版本更新"></app-badge>
</span>
```

**未讀數（超過 99 退回圓點）**

```html
<app-badge
  [count]="unreadCount()"
  overflow="dot"
  [ariaLabel]="unreadCount() + ' 則未讀通知'">
</app-badge>
```

## 注意事項

- 徽章以 position: absolute 凸出宿主，宿主必須自己是 position: relative。元件本身的元素是 display: contents，不會在 flex/grid 裡多出一個項目。
- 宿主若位在 overflow 非 visible 的容器（例如可捲動清單），容器上緣要留白 >= 6px，否則第一列的徽章會被裁掉。
- 底色用 --badge/unread，不借用 --button/error：未讀既不是錯誤也不是警告，綁在一起日後改錯誤紅會連帶改到未讀點。
- class 前綴是 .ds-badge，不是 .badge——core.scss 已有一個全域 .badge 標籤工具類，撞名會在 border-box 下把 10px 圓點撐成 18px。
