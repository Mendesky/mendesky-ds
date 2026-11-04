# Tooltips（tooltips）

分組：浮層元件

hover 時顯示說明文字。

## 用法

### Angular（v0.7.0）

`app-tooltips`

propClass: Down|Top|Left|Right · styles: Default|Dark · text

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/tooltips--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `propClass` | `'Left' \| 'Down' \| 'Top' \| 'Right'` | `'Down'` | 箭頭位置（決定 tooltip 顯示方向） |
| `styles` | `'Default' \| 'Warning' \| 'Grey'` | `'Default'` | 外觀主題 |
| `text` | `string` | `'Description'` | tooltip 顯示內容 |

#### 程式碼範例

**出現在觸發元素上方，白色樣式**

```html
<app-tooltips
  propClass="Down"
  styles="Default"
  text="這是提示說明文字"
></app-tooltips>
```

## 注意事項

- **注意**：（2026-04 更新）新開發建議改用 [Tooltip Directive (Portal)](tooltip-directive.md)（portal 模式），自動 portal 到 document.body 避免 overflow:hidden 裁切。[Tooltips](tooltips.md) 保留向後相容，但新功能不再使用。

## 對照表

### 樣式說明

| styles | 背景 | 文字色 |
| --- | --- | --- |
| Default | #ffffff（白色） | #686868（--text/body） |
| Grey | #939393（--button/neutral） | #ffffff |
| Warning | #cc5252（--icon/warning） | #ffffff |

### 方向說明（propClass）

| 值 | 箭頭位置 | tooltip 相對觸發元素的位置 |
| --- | --- | --- |
| Top | 頂部 | 出現在元素下方 |
| Down | 底部 | 出現在元素上方 |
| Left | 左側 | 出現在元素右側 |
| Right | 右側 | 出現在元素左側 |
