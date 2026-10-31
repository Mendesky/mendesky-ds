# Drawer Shell（drawer-shell）

分組：浮層元件

所有 Drawer 的容器。提供毛玻璃背景、透明 overlay、進出場動畫（Panel 450ms enter / 300ms exit）、ESC 關閉。禁止各 Drawer 自刻 overlay + panel + animation。

## 用法

### Angular（v0.7.0）

`app-drawer-shell`

[isOpen] side: left|right|bottom · width · (close) · <ng-content>

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/drawer-shell--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | 控制顯示 / 隱藏；false 時觸發 leave 動畫（300ms）後移除 DOM |
| `side` | `'left' \| 'right' \| 'bottom'` | `'right'` | 面板滑出方向；bottom 時面板佔滿寬度，不看 width |
| `width` | `string` | `'280px'` | 面板寬度（任何 CSS 長度值，如 'min(280px, 85vw)'） |
| `(close)` | `EventEmitter<void>` |  | 點擊 overlay 或按 ESC 時觸發；父層負責將 isOpen 設為 false |

#### 程式碼範例

**基本用法**

```html
<app-drawer-shell
  [isOpen]="isOpen"
  side="right"
  width="280px"
  (close)="isOpen = false"
>
  <!-- 任意內容透過 ng-content 投影 -->
  <div class="my-drawer-content">內容</div>
</app-drawer-shell>
```

#### Angular 注意事項

- 各 Drawer 元件只需在 <app-drawer-shell> 標籤內放自己的內容（ng-content 投影），不需要自己寫 isClosing、setTimeout 或 @HostListener 監聽 ESC——這些 app-drawer-shell 內部已處理。

## 注意事項

- 內部已處理 ESC 關閉、enter/leave 動畫狀態切換、overlay 點擊。各 Drawer 元件只需把自己的內容放進 [Drawer Shell](drawer-shell.md)，不需要自行處理關閉中狀態、延遲計時、ESC 鍵監聽。

## 對照表

### 視覺規格

| 屬性 | 值 |
| --- | --- |
| 面板背景 | rgba(255,255,255,0.3) / backdrop-filter: blur(20px) |
| 邊框 (right) | border-left: 1px solid #fff |
| 邊框 (left) | border-right: 1px solid #fff |
| 陰影 | 0px 0px 250px 0px rgba(0,0,0,0.2) |
| 動畫 Tier | Panel — 450ms enter / 300ms exit |
| 進場 easing | cubic-bezier(0,0,0.2,1) |
| 退場 easing | cubic-bezier(0.4,0,1,1) |
| Overlay | 透明（position:fixed;inset:0）/ z-index: 300 / panel: 301 |
