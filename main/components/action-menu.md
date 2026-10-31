# Action Menu（action-menu）

分組：展示元件

右鍵或 More 按鈕展開的浮層，有兩種用法。當選單用時，每一項都放 [Menu Item](menu-item.md)。放了 [Menu Item](menu-item.md) 才是選單：報讀軟體會念出「選單」和 `ariaLabel` 設的名稱，鍵盤與焦點也改照選單的規則走，規則寫在下面的無障礙說明。當篩選面板這類一般浮層用時，裡面放 [Button](button.md)、[Check Chip](check-chip.md)、輸入框，鍵盤與焦點照一般浮層的規則走（見下方無障礙說明），不會被念成選單。兩種都不要自己手刻 `<button>`、`<div>` 當選項。

## 用法

### Angular（v0.7.0）

`app-action-menu`

<ng-content> 直接放 app-menu-item 就是選單（要寫在同一個範本；ariaLabel 取名、選單的鍵盤與焦點規則）；篩選面板放 app-button、app-check-chip。點外面會發 (closeMenu)，由父層關閉

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/action-menu--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `autoCloseOnAction` | `boolean` | `true` | 點擊選單內部子元素時是否自動 emit closeMenu。簡單操作選單用預設 true；含輸入欄或多選的複雜篩選面板設 false。放了 app-menu-item 時，只有點到可以用的選項才發，點到分隔線、空白處或停用的選項都不發。 |
| `align` | `'left' \| 'right' \| 'center'` | `'left'` | 選單相對觸發元素的水平對齊方向：left 左對齊 trigger、right 右對齊 trigger、center 水平置中 trigger。取代手動 style="right:0; left:auto" 寫法。**用綁定 [align]="'right'"，不要寫靜態 align="right"**：靜態屬性會留在 DOM，Chrome 當舊式 HTML 對齊，選單裡的純文字整個靠右（2026-10-02）。 |
| `anchorEl` | `HTMLElement \| null` | `null` | 外部 anchor element；用於 trigger 不是 host.parentElement 的情境（如 contenteditable 內的 inline chip）。傳入後走 element-anchored 模式，PortalPositioningService 自動 track scroll/resize 並即時 reposition。 |
| `fixedMode` | `boolean` | `false` | 改走座標定位（attachAtPoint）而非 element-anchored。有傳 fixedTop / fixedLeft 等任一座標值時自動走此模式。此模式不追蹤捲動。 |
| `fixedTop` | `number \| null` | `null` | fixedMode 的垂直座標，與 fixedBottom 二擇一。 |
| `fixedBottom` | `number \| null` | `null` | fixedMode 的垂直座標，與 fixedTop 二擇一。 |
| `fixedRight` | `number \| null` | `null` | fixedMode 的水平座標，與 fixedLeft 二擇一。 |
| `fixedLeft` | `number \| null` | `null` | fixedMode 的水平座標，與 fixedRight 二擇一。 |
| `fixedWidth` | `number \| null` | `null` | fixedMode 下指定選單寬度。 |
| `ancestorAnchorEl` | `HTMLElement \| null` | `null` | 巢狀 flyout 用：帶入父選單的 anchor 後，點此 flyout 內容時 click-outside 的 ancestor-protection 不會誤關父選單。 |
| `autoFocusFirst` | `boolean` | `true` | 打開時是否把焦點移到第一個選項。預設 true（More 選單：開了就用鍵盤選）。錨點是輸入框、使用者還要繼續打字時設 false（如搜尋框下方的「最近開啟」），否則游標會被搶進選單、打的字進不了輸入框；設 false 時由呼叫端負責鍵盤進入選單（如 ↓ 鍵聚焦第一項）。放了 app-menu-item 時，焦點停在 selected 為 true 的那一項，沒有選中項才停第一項；設 false 一樣不移。放了 app-menu-item、觸發鈕又是輸入框時，點外面關掉不會把焦點還給輸入框（游標不跳回去，一拿到焦點就打開的下拉也不會被重新打開），按 Esc 照樣還。DS v0.1.7 起。 |
| `ariaLabel` | `string` | `''` | 選單的名稱。放了 app-menu-item 時輸出成外框的 aria-label，報讀軟體打開選單會先念它；用畫面上看得到的字，例如「排序」「每頁顯示筆數」。沒放 app-menu-item 時不輸出。 |
| `(closeMenu)` | `EventEmitter<void>` |  | 應關閉選單時觸發：點選單外面、按 Esc，或 autoCloseOnAction=true 時點選單內部。放了 app-menu-item 時，按 Tab 也會觸發，點內部則只有點到可以用的選項才算。 |

#### 事件

| 名稱 | 型別 | 說明 |
| --- | --- | --- |
| `closeMenu` | `EventEmitter<void>` | 點選單外面（backdrop）、按 Esc，或 autoCloseOnAction=true 時點選單內部，發射此事件；放了 app-menu-item 時按 Tab 也會發。父層用 @if 控制顯示，監聽此事件設為 false 即可關閉。 |

#### 程式碼範例

**More 操作選單：選項用 app-menu-item（autoCloseOnAction 預設 true）**

```html
<div class="plan-header__more">
  <app-icon-btn size="16" ariaLabel="更多操作" ariaHaspopup="menu" [ariaExpanded]="isPlanMenuOpen()"
    (btnClick)="isPlanMenuOpen.set(!isPlanMenuOpen())">
    <app-icon name="More" size="16"></app-icon>
  </app-icon-btn>

  @if (isPlanMenuOpen()) {
    <app-action-menu ariaLabel="更多操作" (closeMenu)="isPlanMenuOpen.set(false)">
      <app-menu-item label="編輯此規劃" icon="Edit" (itemClick)="editPlan()"></app-menu-item>
      <app-menu-item label="刪除此規劃" icon="Trash-Del" tone="danger" (itemClick)="deletePlan()"></app-menu-item>
    </app-action-menu>
  }
</div>
```

**複雜篩選面板（autoCloseOnAction="false"）：不放 app-menu-item，不會變成選單**

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
- 「是不是選單」不用另外設定：app-menu-item 透過注入（MENU_CONTEXT）向外層的 app-action-menu 登記，有一個登記就進選單模式。哪些 app-menu-item 登記得到，見下一條。
- **注意**：只有跟 app-action-menu 寫在同一個範本、包在它標籤裡面的 app-menu-item 才會登記（包在 @if、@for、*ngFor 裡也算）。下面三種不會登記，app-menu-item 會變回選單外的按鈕，外框也不會變成選單：寫在你自己元件的範本裡、再把那個元件放進 app-action-menu；用 ng-template 宣告在 app-action-menu 外面、再用 ngTemplateOutlet 插進去；用 ViewContainerRef.createComponent 或 NgComponentOutlet 動態建立。要做選單時，app-menu-item 直接寫在 app-action-menu 裡。
- **注意**：選單的名稱寫成元件設定 ariaLabel。沒放 app-menu-item 時 ariaLabel 不會輸出，外框也沒有角色。
- 放了 app-menu-item 的選單關掉後，焦點要還給觸發鈕。Safari 用滑鼠點按鈕時不會把焦點給它，這時要靠 aria-haspopup 和 aria-expanded 認出觸發鈕，兩個都要設：觸發鈕是 app-button 或 app-icon-btn 就設 ariaHaspopup="menu" 和 [ariaExpanded]（屬性會落在它們裡面那顆 button 上），原生 <button> 直接寫 aria-haspopup="menu" 和 [attr.aria-expanded]，aria-expanded 跟著選單開關變。認的範圍是 app-action-menu 原本的上一層元素；有傳 anchorEl 時改成 anchorEl 本身與它裡面，anchorEl 本身就是 aria-haspopup 為 menu 或 true 的按鈕時直接用它。範圍裡認的是 aria-haspopup 為 menu 或 true、選單開著時標著 aria-expanded="true" 的那顆；打開對話框（dialog）、清單（listbox）的按鈕不算。同時有好幾顆標著時（例如同一個外層裡另一個選單也開著），取打開前有焦點的那顆；打開前的焦點不在其中任何一顆上，就不從裡面挑。只有一顆標著、但打開前的焦點在範圍裡別的地方時，也不認它：例如上一層的浮層一直開著，打開浮層的按鈕（aria-haspopup 是 menu）一直標著，這個選單是從浮層裡的元素打開的。焦點停在包著那顆標著的按鈕的外框上，不算別的地方：只開一個選單時，Safari 點觸發鈕，焦點會停在這種外框上（例如加了 tabindex="-1" 的 role="gridcell" 格子）。這一條要打開前的焦點落在打開選單的元素上才認得出來，也就是用 Chrome 滑鼠點、用鍵盤打開，或點的是 tabindex="0" 這類 Safari 也會給焦點的元素。Safari 用滑鼠點、iPhone 用手指點原生按鈕時，按鈕拿不到焦點，這一條認不出來，焦點可能跳到打開浮層的按鈕。所以打開選單的按鈕一定要照規格設 aria-expanded：設了就有兩顆標著，照前面好幾顆標著的規則挑，不會還到打開浮層的按鈕。認出來的觸發鈕優先於打開前有焦點的元素：Safari 點按鈕時，焦點會落到外面那層點得到焦點的元素（例如 tabindex="-1" 的對話框卡片），打開前有焦點的可能是那一層。認不出來時，才還給打開前有焦點的元素；Safari 用滑鼠點、打開前沒有元素有焦點時，焦點就不還。沒有一顆標著 aria-expanded="true" 就不猜，範圍裡只有一顆選單按鈕也一樣，因為用 fixedMode 放在範本最外層、由鍵盤快捷鍵或右鍵打開的選單，那顆可能跟它無關。用 Chrome 滑鼠點、或用鍵盤打開時，打開前焦點就在觸發鈕上，漏設 aria-expanded 看不出來，要用 Safari 滑鼠點來驗。同一個外層裡放好幾個選單、用同一個狀態切換（打開 B 就關掉 A）時，按 B 的觸發鈕關掉 A 不會把焦點拉回 A 的觸發鈕，B 關掉後焦點回到 B 的觸發鈕。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：放了 [Menu Item](menu-item.md) 的選單：上下方向鍵只在選單項目之間移動，停用的項目也停得到；在最後一項按下會回到第一項，在第一項按上會跳到最後一項。Home、End 分別跳到第一項、最後一項。
- **鍵盤**：放了 [Menu Item](menu-item.md) 的選單：Enter 或空白鍵執行目前這一項。按住不放也只執行一次：放開之前的連發不會讓打開選單的按鈕再打開選單，也不會按到接著拿到焦點的按鈕（例如選的那一項打開的對話框裡的按鈕）。Esc 關閉選單，焦點回到打開選單的按鈕。Tab 也會關閉選單，焦點接著移到打開選單那顆按鈕的下一個元素。
- **鍵盤**：沒放 [Menu Item](menu-item.md) 的浮層（篩選面板、選項還是 [Button](button.md) 的選單）：上下方向鍵在可以按的按鈕之間移動，焦點在輸入框裡時方向鍵照常移動游標；Enter 或空白鍵觸發目前這一項，按住不放也只觸發一次：用鍵盤快捷鍵打開浮層時按著沒放，連發不會按到浮層裡的第一項，放開之前的連發也不會按到接著拿到焦點的按鈕；Esc 關閉，焦點還給打開前有焦點的元素。Tab 不會關閉浮層，Home、End 也沒有特別的作用。
- **焦點**：沒放 [Menu Item](menu-item.md) 的浮層，打開時焦點移到第一個可以按的項目。`autoFocusFirst` 設成 false 時不移，由呼叫端自己帶進去，例如錨點是輸入框、打開後還要繼續打字的時候。
- **焦點**：放了 [Menu Item](menu-item.md) 的選單，打開時焦點停在 `selected` 為 true 的那一項；沒有選中項才停在第一項。`autoFocusFirst` 設成 false 時一樣不移，由呼叫端自己帶進去。
- **焦點**：放了 [Menu Item](menu-item.md) 的選單，選完一項或點外面空白處關掉之後，焦點回到打開選單的按鈕。要是焦點已經被別的東西拿走，例如選的那一項打開了對話框，就不會把焦點搶回來。點外面時按到的是別的按鈕、連結、輸入框這類可以操作的元素，也當成使用者換去操作那個東西，焦點交給瀏覽器處理，不拉回打開選單的按鈕。選單是被這樣一個元素的動作關掉的也一樣，例如同一排工具列裡另一個選單的按鈕，打開它的時候把這個選單關掉；按的是打開這個選單的那顆按鈕本身時，焦點照樣回到它。點到對話框卡片這類外框裡的空白處，就算瀏覽器把焦點給了外框，也當成點空白處，焦點照樣還給打開選單的按鈕。按下去那一刻焦點本來就不在選單裡時也一樣不拉回，例如 `autoFocusFirst` 設成 false、焦點一直留在錨點的輸入框。打開選單的是輸入框時，點外面關掉一律不把焦點還給它：使用者是點走了，游標不該跳回輸入框，一拿到焦點就打開的下拉也不會被重新打開；按 Esc 關掉時照樣還。
- **焦點**：放了 [Menu Item](menu-item.md) 的選單開著時，項目全被拿掉（例如清單重新載入後變成空的），外框就不再是選單、接不住焦點，焦點還給打開選單的按鈕。
- **焦點**：點外面關掉、把焦點還給打開選單的按鈕時，頁面不會跟著捲動，按鈕已經捲出畫面也不會被捲回來。Esc、Tab 或選完一項關掉時，頁面照常捲到看得到那顆按鈕，用鍵盤的人才知道焦點在哪。
- **焦點**：焦點要還給哪顆按鈕，先認跟選單放在同一個外層元素裡、aria-haspopup 是 menu 或 true，而且選單開著時標著 aria-expanded="true" 的那顆；打開對話框、清單的按鈕（aria-haspopup 是 dialog、listbox 等）不算。有另外指定錨點元素（`anchorEl`）時，改認錨點元素本身和它裡面，錨點元素本身就是這種按鈕時直接用它。同時有好幾顆標著 aria-expanded="true" 時（例如同一個外層裡另一個選單也開著），取打開前有焦點的那顆；打開前的焦點不在其中任何一顆上，就不從裡面挑。只有一顆標著、但打開前的焦點在外層裡別的地方時，也不認它：例如上一層的浮層一直開著，打開浮層的按鈕（aria-haspopup 是 menu）一直標著，這個選單是從浮層裡的元素打開的。焦點停在包著那顆標著的按鈕的外框上，不算別的地方：只開一個選單時，Safari 點觸發鈕，焦點會停在這種外框上（例如加了 tabindex="-1" 的 role="gridcell" 格子）。這一條要打開前的焦點落在打開選單的元素上才認得出來，也就是用 Chrome 滑鼠點、用鍵盤打開，或點的是 tabindex="0" 這類 Safari 也會給焦點的元素。Safari 用滑鼠點、iPhone 用手指點原生按鈕時，按鈕拿不到焦點，這一條認不出來，焦點可能跳到打開浮層的按鈕。所以打開選單的按鈕一定要照規格設 aria-expanded：設了就有兩顆標著，照前面好幾顆標著的規則挑，不會還到打開浮層的按鈕。這樣認出來的按鈕優先於打開選單前有焦點的元素：Safari 用滑鼠點按鈕時按鈕不會取得焦點，焦點會落到外面那層點得到焦點的元素（例如 tabindex="-1" 的對話框卡片），打開前有焦點的可能是那一層。認不出來時，才把焦點還給打開前有焦點的元素；Safari 用滑鼠點按鈕、打開前沒有元素有焦點時，焦點就不還。沒有一顆標著 aria-expanded="true" 時不猜，外層裡只有一顆 aria-haspopup 是 menu 的按鈕也一樣：用鍵盤快捷鍵、右鍵打開的選單，那顆按鈕可能跟它無關。用 Chrome 滑鼠點、或用鍵盤打開時，打開前焦點就在按鈕上，漏設 aria-expanded 看不出來，要用 Safari 滑鼠點來驗。
- **焦點**：放了 [Menu Item](menu-item.md) 的選單，點到分隔線或空白處時不會關閉，焦點留在選單外框上，方向鍵照樣能用。外框接得住焦點，但不在 Tab 順序裡。
- **報讀軟體**：放了 [Menu Item](menu-item.md) 的選單，報讀軟體會念出「選單」和它的名稱。名稱來自 `ariaLabel`，用畫面上看得到的字，例如「排序」「每頁顯示筆數」。
- **報讀軟體**：沒放 [Menu Item](menu-item.md) 的浮層不會被念成選單：外框沒有角色也沒有名稱，報讀軟體照裡面每個元件自己的角色念。
- **報讀軟體**：打開選單的按鈕要讓報讀軟體知道它會打開選單、選單現在開著沒有。用 [Button](button.md) 或 [Icon Button](icon-btn.md) 當觸發鈕時，設 `ariaHaspopup` 和 `ariaExpanded`。

### 網頁專屬

- **ARIA 與 HTML 語意**：放了 [Menu Item](menu-item.md) 時，外框是 role="menu"，`ariaLabel` 輸出成 aria-label，外框也加上 tabindex="-1"。沒放時這三個都不會出現。
- **ARIA 與 HTML 語意**：選單裡的分隔線要標 role="separator"。
- **ARIA 與 HTML 語意**：打開選單的按鈕標 aria-haspopup="menu"，再用 aria-expanded 跟著選單開關變。

## 注意事項

- （2026-08-13 使用者拍板）卡片底色與邊框以實作為準：底色 rgba(255,255,255,0.45)（不是 0.72）、邊框用 --border/white 純白（不是 0.85 半透明）。已寫進上方視覺規格表，勿再視為漂移回報。
- （2026-04 更新）元件自動 portal 到 document.body，父層不再需要 position:relative。使用 position:fixed 定位，解決 transform/overflow:hidden 容器裁切問題。anchor 追蹤由浮層定位服務以事件驅動完成（document capture-phase scroll、window resize、trigger 的 ResizeObserver、visualViewport 變化），非 rAF 輪詢；rAF 只用於 attach 後的單次初始定位與同帧節流。context-menu 模式（attachAtPoint）不追蹤捲動。
- autoCloseOnAction=true（預設）：適合點選即執行的 More 操作選單，點任何選項後自動關閉。放了 [Menu Item](menu-item.md) 的選單只有點到可以用的選項才關，點到分隔線、空白處或停用的選項都不會關。
- autoCloseOnAction=false：適合含輸入欄、多選 chip、套用按鈕的複雜篩選面板，讓使用者操作完再手動關閉
- 不需要在父層自己偵測外部點擊：浮層定位服務以 capture-phase pointerdown 偵測，點到外部時元件送出 closeMenu 事件，父層接這個事件關閉選單

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
| 選單的選項（執行一個動作，或從幾個值裡選一個） | [Menu Item](menu-item.md) | 一般動作不設 selected；單選項選中的設 selected 為 true，其他設 false |
| 危險操作（刪除、封存、撤回已送出的申請） | [Menu Item](menu-item.md) | tone="danger" icon="Trash-Del" |
| 篩選面板的一般操作（清除篩選） | [Button](button.md) | variant="elevated" size="S" |
| 搭配 check-chip 的確認動作 | [Button](button.md) | variant="filled" color="primary" size="S" |
| 多選篩選項目 | [Check Chip](check-chip.md) | theme="transparent-grey" |
