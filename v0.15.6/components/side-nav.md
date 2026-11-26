# Side Nav（side-nav）

分組：互動元件

系統的主要導覽，放在畫面最左邊，列出系統裡的各個功能入口。一個系統只放一份。頁面裡切換幾組內容不是導覽，用 [Tabs](tabs.md)。窄螢幕放不下側欄時，把同一份側欄用展開的寬度放進 [Drawer Shell](drawer-shell.md)。

## 部位

1. **頂端區**：可以不放。在項目上面，放切換寬度的按鈕或系統名稱。
2. **群組**：一組項目。展開時上面有群組標題；窄欄時群組之間有一條分隔線。
3. **群組標題**：可以不給。只在展開的寬度顯示，12px。
4. **項目**：一個功能入口，是一個連結。展開時是一列圖示加名稱，至少 36px 高，觸控裝置上至少 44px；窄欄時是 44px 的圓形，只有圖示。
5. **圖示**：[Icon](icon.md)。展開時 20px，窄欄時 24px。
6. **名稱**：展開時顯示在圖示右邊。窄欄時看不到，但報讀軟體照念，滑過或焦點時由提示顯示。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 平常 | 見「顏色」表。 |
| 滑過 | 展開的項目疊一層 5% 的深色，名稱和圖示加深一階；窄欄的項目換藍底白圖示。選中的項目滑過，展開時底色加深成綠 90，窄欄時不變。 |
| 焦點 | 用鍵盤停到項目時出現 2px 藍框。展開的項目框在內側；窄欄的圓形框在外側，隔 2px。展開時選中的項目是綠底，藍框在綠底上看不清楚，改成白框。 |
| 選中 | 目前所在的那一頁。見「顏色」表。 |
| 藏起來 | 寬度變成 0。整條側欄不能操作：Tab 進不去，報讀軟體不念，正在顯示的名稱提示也一起收掉。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 入口少的系統用窄欄和藏起來兩種，預設藏起來，讓內容區最寬。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.20.2/components/iframe.html?id=side-nav--rail&viewMode=story)）
- 入口多、有分群的系統用展開和窄欄兩種，預設展開，群組標題一直看得到。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.20.2/components/iframe.html?id=side-nav--expanded&viewMode=story)）
- 窄螢幕把同一份項目用展開的寬度放進 [Drawer Shell](drawer-shell.md)，點了項目就換頁並關掉抽屜。
- 把使用者上次選的寬度存起來，下次進來照用。

### 不要這樣做

- 項目用按鈕做。按鈕不能開新分頁，報讀軟體也不知道使用者在哪一頁。
- 藏起來只把寬度設成 0、透明度設成 0，項目還留在 Tab 順序裡。鍵盤使用者會停在看不見的項目上。
- 把切換按鈕放在會整條藏起來的側欄裡。藏起來以後就叫不回來了。
- 依入口數量自動換寬度。多開一個功能，整個版面就突然變了。

## 用法

### Angular（v0.20.2）

`app-side-nav`

[groups] · mode: expanded|rail|hidden · [currentId] · ariaLabel · (navigate)

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.20.2/components/?path=/docs/side-nav--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `groups` | `readonly SideNavGroup[]` |  | 必填。群組與項目：SideNavGroup 是 { id, heading?, items }，SideNavItem 是 { id, label, icon, href }。不分群就傳一個不給 heading 的群組 |
| `mode` | `'expanded' \| 'rail' \| 'hidden'` | `'expanded'` | 寬度：展開 200px、窄欄 56px、藏起來 0。藏起來時整條加 inert |
| `currentId` | `string \| null` | `null` | 目前頁的項目 id。對到的項目換成選中樣式，加 aria-current="page" |
| `ariaLabel` | `string` | `'主要導覽'` | 導覽地標的名稱 |
| `(navigate)` | `EventEmitter<SideNavItem>` |  | 左鍵單擊項目、沒按修飾鍵時送出；元件已擋掉瀏覽器換頁 |

#### 事件

| 名稱 | 型別 | 說明 |
| --- | --- | --- |
| `navigate` | `EventEmitter<SideNavItem>` | 左鍵單擊項目、沒按 Ctrl／⌘／Shift／Alt 時送出，元件已擋掉瀏覽器換頁。使用端在這裡用路由換頁 |

#### 程式碼範例

**窄欄和藏起來兩種，切換鈕放在側欄外面**

```html
<button type="button" aria-controls="main-nav" [attr.aria-expanded]="!hidden()" (click)="hidden.set(!hidden())">
  切換側欄
</button>
<app-side-nav
  id="main-nav"
  [groups]="groups"
  [mode]="hidden() ? 'hidden' : 'rail'"
  [currentId]="currentId()"
  (navigate)="router.navigateByUrl($event.href)">
</app-side-nav>
```

**展開和窄欄兩種，切換鈕放進頂端區**

```html
<app-side-nav [groups]="groups" [mode]="collapsed() ? 'rail' : 'expanded'" [currentId]="currentId()"
              (navigate)="router.navigateByUrl($event.href)">
  <button sideNavHeader type="button" [attr.aria-expanded]="!collapsed()" (click)="collapsed.set(!collapsed())">
    {{ collapsed() ? '展開側欄' : '收合側欄' }}
  </button>
</app-side-nav>
```

**窄螢幕：同一份項目用展開的寬度放進抽屜**

```html
<app-drawer-shell [isOpen]="drawerOpen()" side="left" width="min(280px, 85vw)" (close)="drawerOpen.set(false)">
  <app-side-nav style="width:100%;height:auto" [groups]="groups" mode="expanded" [currentId]="currentId()"
                (navigate)="router.navigateByUrl($event.href); drawerOpen.set(false)">
  </app-side-nav>
</app-drawer-shell>
```

#### Angular 注意事項

- 頂端區用 `sideNavHeader` 屬性標記要投影的元素。
- `currentId` 由使用端從路由算出來，例如網址開頭對到哪個項目的 href。
- 元件高度是外層的 100%，項目多到放不下時側欄自己捲動。
- 放進抽屜時，在外層對元件設 `width: 100%; height: auto;`，填滿抽屜寬度、高度跟著內容，捲動交給抽屜。元件不知道自己在抽屜裡，漏設就停在 200px 寬。
- 沒接 `(navigate)` 時，點項目照連結換頁（整頁重新載入）。用路由的系統都要接。
- 觸控裝置（`pointer: coarse`）上，展開的項目至少 44px 高；滑鼠操作維持 36px。
- `groups` 換成新陣列才會重畫（OnPush）。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 依序停在每個項目，Enter 開啟那一頁。
- **鍵盤**：項目之間只用 Tab 移動，沒有方向鍵。
- **焦點**：藏起來時 Tab 進不去，焦點會直接跳到側欄後面的內容。
- **焦點**：切換寬度不會搬動焦點。切換按鈕放在側欄外面，藏起來時焦點才不會落在看不見的地方。
- **報讀軟體**：側欄是一個導覽地標，名稱預設是「主要導覽」，可以換。
- **報讀軟體**：每個項目念出名稱和「連結」；目前那一頁另外念出「目前頁面」。窄欄時名稱一樣念得出來。
- **報讀軟體**：有群組標題的群組，進入時會念出群組標題。
- **動態**：換寬度時，寬度用 450ms、`var(--ease-enter)` 轉場（Panel 等級）。
- **動態**：使用者設了「減少動態」時，直接換到新的寬度，不播轉場。
- **觸控**：窄欄的項目是 44px 的圓形。展開的項目用滑鼠操作時至少 36px 高；觸控裝置（主要指標是手指）上至少 44px，手指點得準。
- **觸控**：觸控裝置不會出現名稱提示。只用觸控的系統，預設用展開的寬度，或讓使用者看得到名稱。

### 網頁專屬

- **ARIA 與 HTML 語意**：外層是原生 `<nav>`，帶 aria-label。
- **ARIA 與 HTML 語意**：項目是原生 `<a href>`。目前那一頁加 aria-current="page"。窄欄時名稱放在 aria-label。
- **ARIA 與 HTML 語意**：有標題的群組是 role="group"：展開時用 aria-labelledby 指向群組標題；窄欄時用 aria-label 放群組標題。沒有標題的群組不包成 group。
- **ARIA 與 HTML 語意**：藏起來時整條加上 `inert`。
- **ARIA 與 HTML 語意**：分隔線加 aria-hidden，報讀軟體不念。

## 注意事項

- 寬度有三種：展開、窄欄、藏起來，見下方「寬度」表。每個系統挑兩種讓使用者切換，並決定預設是哪一種。入口少的系統挑窄欄和藏起來，需要時再叫出來；入口多、又分成好幾群的系統挑展開和窄欄，名稱和群組標題一直看得到。
- 寬度由頁面給，元件不會自己記住，也不會因為入口變多就自己變寬。要記住使用者上次選哪一種，由頁面存。
- 放進 [Drawer Shell](drawer-shell.md) 時，頁面要讓側欄填滿抽屜的寬度、高度跟著內容，捲動交給抽屜。元件不知道自己在抽屜裡，頁面沒設就停在展開的 200px，捲動也留在側欄自己身上。
- 切換寬度的按鈕由頁面放。按鈕放在側欄裡面時放進頂端區；側欄會整條藏起來的系統，按鈕要放在側欄外面，不然藏起來就按不到了。
- 每個項目都是連結，要給網址。使用者按住 Ctrl、⌘ 或 Shift 點、或用滑鼠中鍵點，會照瀏覽器原本的做法開新分頁或新視窗；一般的點一下，元件會通知頁面換頁；頁面沒有接這個通知時，照連結換頁。
- 目前在哪一頁由頁面告訴元件。那一項會換成選中的樣子，報讀軟體也會念出「目前頁面」。
- 有分群時，展開的寬度顯示群組標題，窄欄只在群組之間畫一條分隔線。不分群就傳一個不給標題的群組。
- 名稱只顯示一行，放不下用刪節號截斷。展開的寬度大約放得下 11 個中文字，名稱寫短一點。
- 顏色不能自己改：滑過、選中、焦點框三組顏色是一起配的，換一個，對比就可能不夠。例如展開的項目滑過時，底色疊了一層深色，名稱要跟著加深一階，對比才夠。

## 對照表

### 寬度

| 寬度 | 樣子 | 名稱怎麼看 | 適合 |
| --- | --- | --- | --- |
| 展開 `expanded` | 200px，圖示加名稱，有群組標題 | 直接看得到 | 入口多、有分群；放進窄螢幕的抽屜 |
| 窄欄 `rail` | 56px，只有圓形圖示 | 滑過或用鍵盤停在項目上，右邊出現 [Tooltip Directive (Portal)](tooltip-directive.md) | 入口少，或使用者想讓內容區寬一點 |
| 藏起來 `hidden` | 寬度 0，整條看不到 | 看不到，鍵盤也進不去 | 入口很少，平常不需要導覽 |

### 顏色

| 位置 | 平常 | 滑過 | 選中 |
| --- | --- | --- | --- |
| 展開的項目 | 名稱 `--text/body`；圖示 `--text/body-light`（旁邊有名稱，圖示只是輔助） | 疊一層 5% 的深色，底色跟著外面；名稱換 `--text/secondary`、圖示換 `--icon/body` | `--color/green/85` 底，名稱和圖示白色、名稱中等粗；滑過換 `--color/green/90` |
| 窄欄的項目 | 白底圓形，圖示 `--icon/body` | `--button/action` 底，白色圖示 | `--color/green/85` 底，白色圖示 |
| 群組標題 | `--text/body` | — | — |
