# Menu Item（menu-item）

分組：互動元件

選單裡的每一項都用它。一項佔一列，可以是執行一個動作（編輯、封存、刪除），也可以是從幾個值裡選一個（排序方式、每頁筆數）。[Action Menu](action-menu.md) 要放了 [Menu Item](menu-item.md) 才算選單：報讀軟體會念出「選單」，方向鍵、Home、End、Tab 也改照選單的規則走，細節寫在 [Action Menu](action-menu.md) 的無障礙說明。另一種用法是放在選單外面，例如篩選視窗裡的排序區：那裡不是選單，但想跟選單裡的選項長得一樣，就用一排 [Menu Item](menu-item.md) 做成單選。至於有勾選、輸入框、套用按鈕的篩選面板，用 [Check Chip](check-chip.md)、[Button](button.md)，不要把 [Menu Item](menu-item.md) 放進去。

## 部位

1. **外框**：整列都可以點。放在 [Action Menu](action-menu.md) 裡會佔滿一整列；放在選單外面時，寬度跟著文字走。
2. **圖示**：`icon` 放 DS 的圖示名稱，顯示在文字左邊，可以不放。顏色跟著文字走。
3. **文字**：`label` 寫這一項要做什麼，或代表哪一個值，一定要給。
4. **說明**：`description` 顯示在文字下方，可以不放。加了它，文字會變成粗體標題，一般項目是深色，`tone` 設成 `danger` 時維持紅字；說明用較淺的灰色。滑過、按下時兩行都換成淺色字。說明一行最多約 16 個字，超過就換行，選單不會因為說明太長被撐得很寬；網址、編號這類一長串不能斷行的英數字也會斷開，不會超出說明框。停用的選項例外：標題不加粗，兩行都是停用的灰色，見下方的停用狀態。
5. **自訂內容**：接在文字後面，可以不放，例如標出類型或狀態的 [Label](label.md)。滑過、按下或選中時底色會變深，這時顏色設成 LightWhite 的 [Label](label.md) 會自動換成淺色字，不用自己另外寫樣式。其他顏色的 [Label](label.md)，還有自己寫死顏色的內容，都維持原本的字色。
6. **右箭頭**：設了 `opensPanel` 才有，放在最右邊，表示點了會在選單旁邊打開另一個面板，選單不會關。顏色跟著文字走。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 預設 | 灰字，沒有底色。 |
| 滑過 | 變成實心的灰底配淺色字。 |
| 按下 | 灰底再深一階，字一樣是淺色。 |
| 焦點 | 用鍵盤移到這一項時，外圍會出現焦點框。 |
| 選中 | `selected` 設成 true 時是深藍實心底配淺色字，滑過時藍底深一階，按下再深一階。選中只靠底色表示，不加打勾或其他符號。在 Windows 高對比這類強制色彩模式下，瀏覽器會換掉自訂的顏色，這時改用系統的選取色當底色，一樣是實心底。 |
| 危險 | `tone` 設成 `danger` 時是紅字，圖示也是紅色；加了 `description` 也一樣，只有下面那行說明維持灰色。滑過、按下跟 [Button](button.md) 的 ghost 危險按鈕一樣：滑過是實心的淺紅底，按下換成較深的紅底，字都變成淺色。 |
| 面板開著 | 設了 `opensPanel` 的選項，`panelOpen` 設成 true 時跟滑過一樣，是實心的灰底配淺色字；危險項目是滑過時的淺紅底；設了 `selected` 為 true 的項目維持選中的深藍底。滑鼠移進旁邊的面板以後，這一項還是亮著，看得出面板是哪一項打開的。停用的選項不會變成這樣。在強制色彩模式下，灰底會被瀏覽器換掉，這時改用系統的選取色當底色，跟選中一樣，危險項目、滑過、按下時也是；Windows 原生選單打開子選單時，那一項也是這樣。 |
| 停用 | 設了 `disabled` 就整項換成 `--color/grey/50`（#aaaaaa）：文字、圖示、說明都是這個灰，自訂內容裡顏色設成 LightWhite 的 [Label](label.md) 也跟著變成這個灰。文字一律是一般粗細，有說明也不加粗。比一般選項的灰字淺，看得出不能用，但原因還讀得清楚。沒有底色，滑過、按下都不會變。在選單裡鍵盤還是停得到，但點了、按了都沒反應，選單也不會關。強制色彩模式下改用系統的停用字色。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 從幾個值裡選一個時，每一項都設 `selected`：選中的那項設 true，其他設 false。這樣報讀軟體才念得出哪一項已選取，打開選單時焦點也會直接停在目前的值上。
- 跟這組單選不同類的動作，例如排序選單裡的「還原預設」，放在最後一列，上面用一條分隔線隔開，分隔線標成 role="separator"。
- 刪除、封存這類危險動作，`tone` 設成 `danger`，文字也要寫清楚會做什麼，不要只靠紅色讓人看出危險。
- 選項暫時不能用時設 `disabled`。停用的選項在選單裡鍵盤還停得到，用報讀軟體的人也聽得到有這一項。
- 停用時把原因寫在 `description`，例如「先完成上一步才能使用」。原因一直顯示在選項下方，不用滑過或點了才看得到；報讀軟體也會在名稱之後念出來。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.9.1/components/iframe.html?id=menu-item--disabled&viewMode=story)）
- 點了會在選單旁邊打開面板、選單要繼續開著的選項，設 `opensPanel`，並用 `panelOpen` 跟著面板開關。這樣才有右箭頭，點了也不會關選單。點擊要切換面板：關著就打開，開著就關，使用者再按一次才關得掉。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.9.1/components/iframe.html?id=menu-item--opens-panel&viewMode=story)）
- 要在文字後面標出類型或狀態，就把 [Label](label.md) 放進自訂內容。顏色設成 LightWhite 的標籤，底色變深時會自動變成淺色字，不用自己寫滑過、選中的樣式；GreyOutline、Transparent 這類灰字標籤不會跟著變，疊在深色底上會看不清楚。

### 不要這樣做

- 不要在放了 [Menu Item](menu-item.md) 的 [Action Menu](action-menu.md) 裡，再放 [Button](button.md) 或其他可以按的東西。方向鍵只在選單項目之間移動，按 Tab 又會把選單關掉，用鍵盤的人走不到它們。「還原預設」這類動作也做成一個 [Menu Item](menu-item.md)。
- 不要加打勾符號或 emoji 來表示選中。選中只看深藍實心底，報讀軟體靠 `selected` 念出已選取。
- 不要用 `selected` 做可以同時選好幾項的多選。放在選單裡時，報讀軟體會把它當成「一組裡只能選一個」來念。要多選就用 [Check Chip](check-chip.md)。
- 不要在選單外面拿它當一般的操作按鈕，例如送出、取消。選單外只用在想跟選單長得一樣的一組單選，其他操作用 [Button](button.md)。
- 不要在點了就關掉選單的選項上設 `opensPanel`，例如執行完就結束的動作，或關掉選單、改打開置中 [Dialog](dialog.md) 的選項。右箭頭告訴使用者「選單會留著，旁邊多一個面板」，用錯地方會讓人以為選單還在。
- 使用者沒有權限的選項不要放進選單，也不要用停用表示。停用留給「現在不能用，但做完某件事就能用」的情況，並在說明寫出原因；沒有權限的人看到一個永遠不能按的選項，只會多一個干擾。

## 用法

### Angular（v0.9.1）

`app-menu-item`

label（必填）· description · icon · tone: neutral|danger · [disabled] · [selected]: boolean|null（null＝一般動作）· opensPanel: 'dialog'|null · [panelOpen] · (itemClick) · 文字後面可投影 app-label

[在範例網站看全部 9 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.9.1/components/?path=/docs/menu-item--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `label` | `string` |  | 這一項要做什麼，或代表哪一個值。必填。 |
| `description` | `string` | `''` | 顯示在文字下方的說明。有值時文字變成粗體標題（一般項目是深色，tone 是 danger 時維持紅字），說明用淺灰色；一行最寬 16em（約 16 個字），超過就換行。內層按鈕用 aria-describedby 指向它，不算進名稱。停用時用它寫原因。空字串不顯示。 |
| `icon` | `string` | `''` | 文字左邊的圖示，填 DS 圖示名稱（例如 Trash-Del、Archive）。顏色跟著文字走，報讀軟體不念。空字串不顯示。 |
| `tone` | `MenuItemTone` | `'neutral'` | 'neutral' \| 'danger'。danger 是紅字的危險動作，滑過、按下跟 ghost 危險按鈕一樣。 |
| `disabled` | `boolean` | `false` | 停用。內層按鈕用 aria-disabled="true"，不用原生 disabled，所以在選單裡方向鍵還停得到；點了、按 Enter 都不會發 itemClick，選單也不會關。整項換成灰 50（--color/grey/50），標題不加粗；原因寫在 description。 |
| `selected` | `boolean \| null` | `null` | 不設（null）是一般動作；設成 true／false 就是一組單選裡的一個值，true 是選中（深藍實心底）。在 app-action-menu 裡輸出 role="menuitemradio" 與 aria-checked；在選單外輸出 aria-pressed。 |
| `opensPanel` | `MenuItemPanel \| null` | `null` | 點了會在旁邊打開面板時設 'dialog'（面板裡是按鈕、輸入框這類一般內容）。右邊加 RightArrow 箭頭，內層按鈕輸出 aria-haspopup 與 aria-expanded。在 app-action-menu 裡點了不關選單，焦點留在這一項；焦點在上面時按右方向鍵也會發 itemClick。面板已經開著時按右方向鍵不發，改成把焦點移進面板（面板要用 fixedMode 加固定座標打開、ancestorAnchorEl 指回這一項）。 |
| `panelOpen` | `boolean` | `false` | 旁邊的面板開著沒。設了 opensPanel 才有作用：輸出成 aria-expanded，true 時跟滑過一樣亮著（危險項目是淺紅底）。面板開關由使用端自己管。 |
| `(itemClick)` | `EventEmitter<void>` |  | 點一下，或焦點在上面時按 Enter、空白鍵就會觸發；停用時不觸發。 |

#### 程式碼範例

**從幾個值裡選一個（排序選單）：觸發鈕標 ariaHaspopup、ariaExpanded，選單用 ariaLabel 取名**

```html
<div class="sort-wrap">
  <app-button variant="ghost" color="neutral" size="S" text="排序"
    ariaHaspopup="menu" [ariaExpanded]="sortOpen()"
    (btnClick)="sortOpen.set(!sortOpen())"></app-button>

  @if (sortOpen()) {
    <app-action-menu ariaLabel="排序" (closeMenu)="sortOpen.set(false)">
      @for (opt of sortOptions; track opt.value) {
        <app-menu-item [label]="opt.label" [selected]="sort() === opt.value"
          (itemClick)="sort.set(opt.value)"></app-menu-item>
      }
      <app-divider role="separator"></app-divider>
      <app-menu-item label="還原預設" (itemClick)="sort.set('newest')"></app-menu-item>
    </app-action-menu>
  }
</div>
```

**執行動作的選單：圖示、停用（原因寫在說明）、危險動作**

```html
<app-action-menu ariaLabel="更多操作" (closeMenu)="moreOpen.set(false)">
  <app-menu-item label="編輯項目" icon="Edit" (itemClick)="edit()"></app-menu-item>
  <app-menu-item label="封存項目" icon="Archive" [disabled]="!!archiveBlockedReason()"
    [description]="archiveBlockedReason()" (itemClick)="archive()"></app-menu-item>
  <app-menu-item label="刪除項目" icon="Trash-Del" tone="danger" (itemClick)="remove()"></app-menu-item>
</app-action-menu>
```

**在旁邊打開面板：選項設 opensPanel、panelOpen，點擊切換面板開關；面板是另一個 app-action-menu，標成對話框，ancestorAnchorEl 傳那一項的元素**

```html
<app-action-menu ariaLabel="更多操作" (closeMenu)="closeAll()">
  <app-menu-item #exportItem label="匯出" icon="Download" opensPanel="dialog"
    [panelOpen]="exportOpen()" (itemClick)="toggleExport()"></app-menu-item>
  <app-menu-item label="編輯項目" icon="Edit" (itemClick)="edit()"></app-menu-item>
</app-action-menu>

@if (exportOpen()) {
  <!-- 打開時焦點移進面板（app-action-menu 預設會移，內容載入中就等內容出來）；
       面板裡按 Esc 只關面板，焦點回到「匯出」；按「匯出」以外的地方照常關面板。
       名稱用原生 aria-label 屬性：面板裡沒放 app-menu-item，ariaLabel 不會輸出 -->
  <app-action-menu role="dialog" aria-label="匯出" [autoCloseOnAction]="false"
    [fixedMode]="true" [fixedTop]="exportTop()" [fixedLeft]="exportLeft()"
    [ancestorAnchorEl]="exportItemEl()?.nativeElement ?? null" (closeMenu)="exportOpen.set(false)">
    <!-- 面板內容：app-button-group、app-button -->
  </app-action-menu>
}
```

**文字後面放標籤（自訂內容）**

```html
<app-menu-item [label]="item.name" (itemClick)="open(item.id)">
  <app-label color="Grey70" size="XXS" [text]="item.typeLabel"></app-label>
  @if (item.archived) {
    <app-label color="LightWhite" size="XXS" text="已封存"></app-label>
  }
</app-menu-item>
```

**放在選單外的一組單選（篩選視窗的排序區）：外層標成群組並給名稱**

```html
<div role="group" aria-label="排序">
  @for (opt of sortOptions; track opt.value) {
    <app-menu-item [label]="opt.label" [selected]="sort() === opt.value"
      (itemClick)="sort.set(opt.value)"></app-menu-item>
  }
</div>
```

#### Angular 注意事項

- app-menu-item 透過注入（MENU_CONTEXT）找外層的 app-action-menu 登記：直接寫在 app-action-menu 的內容裡（包在 @if、@for、*ngFor 裡也可以），那個動作選單就變成選單模式；寫在 app-action-menu 外面就是選單外的單選按鈕。只找同一個範本：寫在你自己元件範本裡的 app-menu-item，就算那個元件被放進 app-action-menu，也一樣是選單外的按鈕，不會把外面的浮層變成選單；用 ViewContainerRef.createComponent 或 NgComponentOutlet 動態建立的也一樣。
- **注意**：要聽 (itemClick)，不要在 app-menu-item 上聽 (click)。停用的項目沒有用原生 disabled，裡面按鈕的 click 事件照樣會冒到外框，(click) 在停用時也會觸發。
- 投影進來的 app-label 用 LightWhite 時，字色來自 CSS 變數 --text/body-light。滑過、按下、選中、面板開著時元件會把這個變數改成淺色，所以標籤字會跟著變白；停用時改成灰 50，跟標題一樣。其他寫死顏色的自訂內容不會變。
- ancestorAnchorEl 要的是元素，不是元件。用 viewChild('exportItem', { read: ElementRef }) 取到 ElementRef，傳它的 nativeElement（app-menu-item 的元素）；不傳的話，點面板裡面會把外面的選單當成點外面關掉，再按一次「匯出」也會先關掉面板、放開時又打開。
- 文字後面的自訂內容放在內層按鈕裡、沒有 aria-hidden，報讀軟體會把它接在 label 後面一起念進名稱，例如「項目 C 圖片 已封存」。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：放在 [Action Menu](action-menu.md) 裡時，用上下方向鍵移到這一項，按 Enter 或空白鍵執行。Home、End、Tab、Esc 的作用寫在 [Action Menu](action-menu.md) 的無障礙說明。
- **鍵盤**：停用的選項在選單裡方向鍵還是停得到，按 Enter 或空白鍵不會有反應。
- **鍵盤**：設了 `opensPanel` 的選項在選單裡按右方向鍵，跟按 Enter 一樣會打開旁邊的面板。面板已經開著、焦點還在這一項時，按右方向鍵把焦點移進面板，面板不會被關掉；這要面板用 [Action Menu](action-menu.md) 的 `fixedMode` 加固定座標打開、把 `ancestorAnchorEl` 設成這一項，而且面板裡已經有可以操作的東西，不然沒有反應（例如內容還在載入）。選項停用時也沒有反應。其他選項按左右方向鍵都沒有作用。
- **鍵盤**：旁邊的面板是另一個 [Action Menu](action-menu.md)，用 `fixedMode` 加固定座標打開，`ancestorAnchorEl` 設成這一項（沒走固定座標時這個值不生效），裡面放什麼由使用的頁面決定。打開面板時焦點移進面板，規則跟 [Action Menu](action-menu.md) 一樣：先到第一顆按鈕，沒有按鈕才到第一個欄位或連結；內容還在載入時，等內容出來再移，在這之前使用者把焦點移到別處就不移。面板裡按 Esc 時，建議只關面板，焦點回到打開它的那一項，選單繼續開著。
- **鍵盤**：放在選單外面時，它就是一般的按鈕：Tab 移過來，按 Enter 或空白鍵觸發。
- **焦點**：用鍵盤移到這一項時，外圍會出現焦點框。
- **焦點**：放在 [Action Menu](action-menu.md) 裡時，選單一打開，焦點就停在 `selected` 為 true 的那一項；沒有選中項才停在第一項。[Action Menu](action-menu.md) 的 `autoFocusFirst` 設成 false 時，焦點不會移進選單，由呼叫端自己帶進去。關掉之後焦點回到哪裡，看 [Action Menu](action-menu.md) 的無障礙說明。
- **報讀軟體**：放在 [Action Menu](action-menu.md) 裡時，念出 `label` 和「選單項目」。設了 `selected` 的單選項，另外念出已選取或未選取。
- **報讀軟體**：接在文字後面的自訂內容也算進名稱，報讀軟體會接在 `label` 後面一起念，例如「項目 C 已封存」。
- **報讀軟體**：放在選單外面時，設了 `selected` 的會念成切換按鈕，並念出已按下或未按下；沒設的就念成一般按鈕。
- **報讀軟體**：`description` 不算進名稱，報讀軟體會在名稱之後把它當成補充說明念出來。
- **報讀軟體**：設了 `opensPanel` 的選項會另外念出「有彈出視窗」，面板開著時再念出「已展開」，關著時念出「已收合」。
- **報讀軟體**：圖示和右箭頭都不會念。停用的選項會念出它是停用的。

### 網頁專屬

- **ARIA 與 HTML 語意**：裡面是原生 `<button>`。放在 [Action Menu](action-menu.md) 裡時，元件外框是 role="none"，`<button>` 是 role="menuitem"；設了 `selected` 就改成 role="menuitemradio"，用 aria-checked 標出 "true" 或 "false"。
- **ARIA 與 HTML 語意**：放在選單外面時，`<button>` 不加角色；設了 `selected` 就用 aria-pressed 標出按下或未按下。
- **ARIA 與 HTML 語意**：停用用 aria-disabled="true"，不用原生 disabled，所以在選單裡方向鍵還停得到。
- **ARIA 與 HTML 語意**：有 `description` 時，`<button>` 用 aria-describedby 指向說明文字。
- **ARIA 與 HTML 語意**：設了 `opensPanel` 時，`<button>` 用 aria-haspopup 標出面板的種類，用 aria-expanded 跟著 `panelOpen` 標出 "true" 或 "false"。目前只有 `dialog` 一種：面板裡是按鈕、輸入框這類一般內容，不是另一個選單。面板外框要自己標 role="dialog"，並直接寫 aria-label 屬性取名字，名字跟這一項的 `label` 一樣。不要用 [Action Menu](action-menu.md) 的 `ariaLabel`：面板裡沒放 [Menu Item](menu-item.md)，`ariaLabel` 不會輸出，會得到一個沒有名字的對話框。
