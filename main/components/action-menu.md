# Action Menu（action-menu）

分組：展示元件

右鍵或 More 按鈕展開的選單清單。選項一律用 [Button](button.md) variant="ghost"，禁止手刻 `<button>`/`<div>`。

## 用法

### Angular（v0.6.0）

`app-action-menu`

<ng-content> 投影選項（用 app-button variant="ghost"），內建 backdrop 點擊關閉

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/action-menu--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `autoCloseOnAction` | `boolean` | `true` | 點擊選單內部子元素時是否自動 emit closeMenu。簡單操作選單用預設 true；含輸入欄或多選的複雜篩選面板設 false。 |
| `align` | `'left' \| 'right' \| 'center'` | `'left'` | 選單相對觸發元素的水平對齊方向：left 左對齊 trigger、right 右對齊 trigger、center 水平置中 trigger。取代手動 style="right:0; left:auto" 寫法。**用綁定 [align]="'right'"，不要寫靜態 align="right"**：靜態屬性會留在 DOM，Chrome 當舊式 HTML 對齊，選單裡的純文字整個靠右（2026-10-02）。 |
| `anchorEl` | `HTMLElement \| null` | `null` | 外部 anchor element；用於 trigger 不是 host.parentElement 的情境（如 contenteditable 內的 inline chip）。傳入後走 element-anchored 模式，PortalPositioningService 自動 track scroll/resize 並即時 reposition。 |
| `fixedMode` | `boolean` | `false` | 改走座標定位（attachAtPoint）而非 element-anchored。有傳 fixedTop / fixedLeft 等任一座標值時自動走此模式。此模式不追蹤捲動。 |
| `fixedTop` | `number \| null` | `null` | fixedMode 的垂直座標，與 fixedBottom 二擇一。 |
| `fixedBottom` | `number \| null` | `null` | fixedMode 的垂直座標，與 fixedTop 二擇一。 |
| `fixedRight` | `number \| null` | `null` | fixedMode 的水平座標，與 fixedLeft 二擇一。 |
| `fixedLeft` | `number \| null` | `null` | fixedMode 的水平座標，與 fixedRight 二擇一。 |
| `fixedWidth` | `number \| null` | `null` | fixedMode 下指定選單寬度。 |
| `ancestorAnchorEl` | `HTMLElement \| null` | `null` | 巢狀 flyout 用：帶入父選單的 anchor 後，點此 flyout 內容時 click-outside 的 ancestor-protection 不會誤關父選單。 |
| `autoFocusFirst` | `boolean` | `true` | 打開時是否把焦點移到第一個選項。預設 true（More 選單：開了就用鍵盤選）。錨點是輸入框、使用者還要繼續打字時設 false（如搜尋框下方的「最近開啟」），否則游標會被搶進選單、打的字進不了輸入框；設 false 時由呼叫端負責鍵盤進入選單（如 ↓ 鍵聚焦第一項）。DS v0.1.7 起。 |
| `(closeMenu)` | `EventEmitter<void>` |  | 應關閉選單時觸發（點擊選單外部，或 autoCloseOnAction=true 時點擊選單內部） |

#### 事件

| 名稱 | 型別 | 說明 |
| --- | --- | --- |
| `closeMenu` | `EventEmitter<void>` | 點擊選單外部（backdrop）或 autoCloseOnAction=true 時點擊內部，發射此事件。父層用 @if 控制顯示，監聽此事件設為 false 即可關閉。 |

#### 程式碼範例

**More 操作選單（autoCloseOnAction 預設 true）**

```html
<!-- 父層需 position:relative -->
<div class="plan-header__more">
  <app-icon-btn (btnClick)="isPlanMenuOpen.set(true)">
    <app-icon name="More" size="16"></app-icon>
  </app-icon-btn>

  @if (isPlanMenuOpen()) {
    <app-action-menu (closeMenu)="isPlanMenuOpen.set(false)">
      <app-button variant="ghost" color="danger" size="S"
        leftIcon="Trash-Del" text="刪除此規劃">
      </app-button>
    </app-action-menu>
  }
</div>
```

**複雜篩選面板（autoCloseOnAction="false"）**

```html
<div class="filter-wrap">
  <button (click)="toggleFilter('kanban', $event)">看板</button>

  <app-action-menu *ngIf="activeFilter() === 'kanban'"
    style="min-width:220px"
    [autoCloseOnAction]="false"
    (closeMenu)="activeFilter.set(null)">
    <!-- 含勾選、輸入等互動元素 -->
    <app-check-chip *ngFor="let s of columns" ...></app-check-chip>
    <app-button variant="elevated" size="S" text="還原預設"></app-button>
  </app-action-menu>
</div>
```

#### Angular 注意事項

- 本體說明裡負責 anchor 追蹤與 z-index 遞增的「浮層定位服務」，在 Angular 是 PortalPositioningService；app-action-menu 內部用它做定位與 anchor 追蹤。
- 父層不需要額外寫 @HostListener 處理 click-outside：PortalPositioningService 在 document 上以 capture-phase pointerdown 偵測外部點擊，點到外部時 app-action-menu emit (closeMenu)。
- z-index 的下限是 PortalPositioningService 裡的常數 Z_INDEX_FLOOR（9999），每開一個 portal +1。

## 注意事項

- （2026-08-13 使用者拍板）卡片底色與邊框以實作為準：底色 rgba(255,255,255,0.45)（不是 0.72）、邊框用 --border/white 純白（不是 0.85 半透明）。已寫進上方視覺規格表，勿再視為漂移回報。
- （2026-04 更新）元件自動 portal 到 document.body，父層不再需要 position:relative。使用 position:fixed 定位，解決 transform/overflow:hidden 容器裁切問題。anchor 追蹤由浮層定位服務以事件驅動完成（document capture-phase scroll、window resize、trigger 的 ResizeObserver、visualViewport 變化），非 rAF 輪詢；rAF 只用於 attach 後的單次初始定位與同帧節流。context-menu 模式（attachAtPoint）不追蹤捲動。
- autoCloseOnAction=true（預設）：適合點選即執行的 More 操作選單，點任何選項後自動關閉
- autoCloseOnAction=false：適合含輸入欄、多選 chip、套用按鈕的複雜篩選面板，讓使用者操作完再手動關閉
- 不需要在父層自己偵測外部點擊：浮層定位服務以 capture-phase pointerdown 偵測，點到外部時元件送出 closeMenu 事件，父層接這個事件關閉選單
- 鍵盤操作：ArrowUp/ArrowDown 在選項間移動、Escape 關閉並還原焦點到觸發元素

## 對照表

### 視覺規格

| 項目 | 值 |
| --- | --- |
| background | rgba(255,255,255,0.45) + backdrop-filter: blur(15px) |
| border | 1px solid var(--border/white)（＝#ffffff 純白，非半透明） |
| box-shadow | 0 4px 40px -10px rgba(0,0,0,0.28) |
| border-radius / padding | 10px / 5px |
| z-index / 定位 | 9999 起遞增（浮層定位服務以 inline style 指定，下限 9999、每開一個 portal +1；元件 CSS 的 z-index:1000 被 inline 蓋掉、不生效）/ position:fixed; portal 到 document.body，anchor 追蹤為事件驅動（非 rAF 輪詢） |
| 進場動畫 | opacity 0→1 + scale 0.97→1，150ms ease-out |
| 父層需求 | 無（portal 模式下父層無定位需求） |

### 內容元件規範

| 使用情境 | 元件 | 規格 |
| --- | --- | --- |
| 一般操作（清除篩選、還原預設） | [Button](button.md) | variant="elevated" size="S" |
| 搭配 check-chip 的確認動作 | [Button](button.md) | variant="filled" color="primary" size="S" |
| 危險操作（刪除、封存、撤回已送出的申請） | [Button](button.md) | variant="ghost" color="danger" size="S" leftIcon="Trash-Del" |
| 多選篩選項目 | [Check Chip](check-chip.md) | theme="transparent-grey" |
