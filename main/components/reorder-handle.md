# Reorder Handle（reorder-handle）

分組：互動元件

使用者可以自己調整順序的清單，每個項目放一顆。它是一顆按鈕，做兩件事：按住拖曳換位置；點一下（或按 Enter、空白鍵）打開移動選單，用選的換位置。不能拖曳的人，或用鍵盤、報讀軟體的人，靠選單一樣排得出來。只是要依某一欄排序整份列表，用 [Sort Header](sort-header.md)，不用它。

## 部位

1. **按鈕**：24×24px，透明底，圖示 16px 置中。游標平常是可抓的手，按住時是抓住的手。
2. **圖示**：`DragDrop` 六點圖示。
3. **移動選單**：[Action Menu](action-menu.md) 加四個 [Menu Item](menu-item.md)，從握把下方打開。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 平常 | 圖示顏色見「外觀」表。 |
| 滑過 | 預設外觀的圖示變深一階；反白外觀加一層 16% 白色淡底，看得出按鈕範圍。 |
| 焦點 | 用鍵盤停到握把時，出現 2px 外框。預設外觀是藍框；反白外觀是白框，藍框放在深色底上看不清楚。 |
| 選單打開 | 選單開著時，握把加一層按下的底色，看得出選單是從哪一顆打開的：預設外觀是 `--color/grey/20` 底、圖示 `--text/body`；反白外觀是 16% 白色淡底，跟滑過相同。焦點已經在選單裡，握把不畫焦點框。 |
| 拖曳中 | 被拿起的項目跟著游標移動，原來的位置換成藍色虛線框。其他項目滑開讓出位置。 |
| 停用 | 清單只有一個項目，或使用端設了 `disabled`：跟 [Icon Button](icon-btn.md) 停用一樣淡成一半，不能拖，點了不開選單。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 白底的項目用預設外觀，深色標頭用反白外觀。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=reorder-handle--appearances&viewMode=story)）
- 巢狀清單每一層都放握把，各層的項目只在自己那一層移動。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=reorder-handle--nested&viewMode=story)）
- 收合區塊要能排序時，用 [Collapsible](collapsible.md) 的綠色外觀，握把放前置區、「⋯」放尾端區。綠色外觀會把前置區的握把換成白色，不用另外設反白。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=reorder-handle--in-collapsible&viewMode=story)）
- 用選單移動時，用 `captureReorder` 讓其他項目滑到新位置；拖曳放下用 `settleReorder`，只發光。

### 不要這樣做

- 只做拖曳、不放握把選單。不能拖曳的人就排不了，這不符合 WCAG 2.5.7。
- 把移動選項放進「⋯」，握把只能拖。同一頁有的清單在握把排、有的在「⋯」排，使用者要每份清單重新找。
- 把握把放進會開合的標題按鈕裡。按鈕裡面不能再放按鈕：點握把會順便開合，報讀軟體也念不出握把。
- 自己量高度畫一個落點。落點的高度在拖曳開始時就定了，之後才量出來的高度會讓其他項目讓錯位置。

## 用法

### Angular（v0.19.1）

`app-reorder-handle`

label · index · count · appearance: default|inverse · disabled · (move): ReorderMoveEvent

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/?path=/docs/reorder-handle--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 項目的完整名稱，必填。報讀念「移動『名稱』」，不要截斷 |
| `index` | `number` | `0` | 這個項目目前在第幾個（從 0 起），必填 |
| `count` | `number` | `0` | 清單共幾個項目，必填。小於 2 時握把停用 |
| `appearance` | `'default' \| 'inverse'` | `'default'` | 預設：白底用的灰色圖示（淺灰底上對比不足，不要用）。反白：深色標頭用的白色圖示，焦點框也改白 |
| `disabled` | `boolean` | `false` | 停用：不能拖，點了不開選單 |
| `(move)` | `EventEmitter<ReorderMoveEvent>` |  | 從選單移動時送出 { direction, previousIndex, currentIndex }。欄位名稱跟 CDK 的 cdkDropListDropped 事件相同 |

#### 程式碼範例

**一份清單：拖曳和選單用同一個處理函式**

```html
<div class="list ds-sortable" cdkDropList cdkDropListLockAxis="y" (cdkDropListDropped)="onMove($event)">
  @for (item of items(); track item.id; let i = $index) {
    <div class="row" cdkDrag cdkDragPreviewClass="ds-sortable-preview" [cdkDragStartDelay]="{ touch: 250, mouse: 0 }">
      <app-reorder-handle [label]="item.name" [index]="i" [count]="items().length" (move)="onMove($event)"></app-reorder-handle>
      {{ item.name }}
    </div>
  }
</div>
<app-reorder-status #status></app-reorder-status>

// component
@ViewChild('status') status!: ReorderStatusComponent;
onMove(e: { previousIndex: number; currentIndex: number }) {
  const before = this.items();
  const name = before[e.previousIndex].name;
  this.items.set(moveInArray(before, e.previousIndex, e.currentIndex));
  this.status.announce(reorderMessage({ name, from: e.previousIndex, to: e.currentIndex, count: before.length }));
  // 接著存檔；失敗時 this.items.set(before)
}
```

**移動後的動態：選單移動時其他項目滑過去；拖曳放下只讓被移動的項目發光**

```html
onMove(e: ReorderMoveEvent | CdkDragDrop<unknown>, list: HTMLElement) {
  // 只有選單移動要記位置；拖曳放下時預覽已經滑回落點、其他項目也讓好位了
  const snap = 'direction' in e ? captureReorder(list, ':scope > .row') : null;
  const moved = list.querySelectorAll(':scope > .row')[e.previousIndex] as HTMLElement;
  this.items.set(moveInArray(this.items(), e.previousIndex, e.currentIndex));
  afterNextRender(() => (snap ? snap.play(moved) : settleReorder(moved)), { injector: this.injector });
}
```

**放在收合區塊的前置區**

```html
<app-collapsible appearance="accent" [title]="note.title">
  <app-reorder-handle collapsibleLeading [label]="note.title" [index]="i" [count]="notes().length" (move)="onMove($event)"></app-reorder-handle>
  ...
</app-collapsible>
```

#### Angular 注意事項

- 元件本身就是 CDK 的拖曳握把（帶了 cdkDragHandle），不用另外加 cdkDragHandle。要拖曳時，項目要有 cdkDrag、清單要有 cdkDropList；只要選單、不要拖曳時，不放 cdkDrag 也可以用。
- 清單容器加 class ds-sortable、cdkDrag 加 cdkDragPreviewClass="ds-sortable-preview"，落點與拖曳預覽的樣式才會一致。不要用 *cdkDragPlaceholder 自己畫落點：CDK 在拖曳開始時就量好落點高度，之後才變的高度會讓其他項目讓錯位置。
- 不要在可排序清單上加 appFlipReorder：它在項目被搬動時一律從舊位置滑過去，拖曳放下時其他項目已經讓好位，會再滑一次。選單移動用 captureReorder；拖曳放下用 settleReorder，只發光。拖曳放下不要用 captureReorder：放下的當下 CDK 已經把項目放回拖曳前的位置，量到的是舊位置，會從頭再滑一次。
- cdkDrag 設 [cdkDragStartDelay]="{ touch: 250, mouse: 0 }"：觸控時按住 250ms 才開始拖；滑鼠不用等。CDK 會把握把的 touch-action 設成 none，不設延遲的話，手指從握把一滑就變成拖曳，放開就改了順序。
- 捲動容器不是整頁時，在那個容器加 cdkScrollable，拖到邊緣才會自動捲動。
- 從選單移動後，選單關閉時焦點回到握把按鈕。@for 要用不會變的 track（項目的 id），項目被搬動時才是同一個元件；track $index 的話焦點會落在原位置的另一個項目上。
- 存檔失敗要退回順序時，項目會再被搬一次，焦點會掉到頁面上。只在焦點原本在握把上、或掉到頁面最外層（document.body）時放回：退回後先讓清單當場重畫（ChangeDetectorRef.detectChanges()），再呼叫該項目握把的 focusButton()。使用者已經移到別處（例如在編輯器裡打字），不要把焦點搶回來。不要等 afterNextRender：緊接著跳出的錯誤 toast 會先更新畫面，提早執行它，那時項目還沒搬回去。
- 巢狀清單：每一層各自是一個 cdkDropList，cdkDrag 不設 cdkDropListConnectedTo，項目就只在自己那一層移動。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 停到握把；Enter 或空白鍵打開移動選單。
- **鍵盤**：選單裡用上下鍵選、Enter 執行；Esc 關掉選單，焦點回到握把。
- **鍵盤**：不提供方向鍵直接移動：握把上的方向鍵照常捲動頁面，移動一律從選單選。
- **焦點**：用選單移動之後，焦點在被移動那個項目的握把上，可以接著再移一次。
- **焦點**：拖曳放下之後，焦點不變。
- **焦點**：停用時握把停不到。
- **報讀軟體**：握把念「移動『名稱』，按鈕」，並念出它會打開選單。名稱用項目的完整名稱，不截斷。
- **報讀軟體**：移動之後，由清單外面的 [Reorder Status](reorder-status.md) 念出結果。
- **動態**：拖曳中其他項目讓位、放下時滑回落點，都是 250ms、`var(--ease-enter)`。
- **動態**：選單移動時其他項目滑到新位置，300ms、`var(--ease-enter)`；被移動的項目發一次藍光，600ms。
- **動態**：使用者設了「減少動態」時，讓位、滑動直接到位，不發光。
- **觸控**：觸控螢幕上點一下打開選單；按住 250ms 才開始拖。手指從握把直接滑動不會開始拖曳，不會不小心改了順序。握把本身不能拿來捲動頁面（拖曳工具會關掉握把上的觸控捲動），捲動要滑項目的其他地方。滑鼠不用等，按下移動就開始拖。
- **觸控**：按鈕 24×24px，達到 WCAG 2.5.8 的最小觸控範圍。

### 網頁專屬

- **ARIA 與 HTML 語意**：握把是原生 `<button>`，aria-haspopup="menu"，aria-expanded 標出選單開著沒有。
- **ARIA 與 HTML 語意**：選單裡做不到的項目用 aria-disabled="true"：報讀軟體念得出它停用，焦點也停得到。
- **ARIA 與 HTML 語意**：停用的握把用原生 disabled。

## 注意事項

- 移動選單固定四項：上移、下移、移到最上、移到最下。做不到的項目停用，不隱藏，例如第一個項目的「上移」。項目位置固定，使用者不用每次重找。
- 清單只有一個項目時，握把停用：不能拖，點了也不開選單。四項都做不到，打開只會看到一份全部停用的選單。
- 元件只告訴你「從第幾個移到第幾個」，不改資料。使用端搬好陣列、送後端、存檔失敗時退回原本的順序，都是使用端的事。拖曳放下和選單移動送出的位置格式相同，可以用同一個處理函式。
- 巢狀清單（例如分組底下有子分組、子分組底下有項目）每一層各自是一份清單，項目只能在自己那一層移動。要不要讓項目跨到別的清單，由使用端的拖曳設定決定；移動選單只在同一份清單裡移動。
- 每份清單外面放一個 [Reorder Status](reorder-status.md)，移動之後把結果念給報讀軟體聽。句子用本體的 `reorderMessage` 產生：「『名稱』已從第 2 個移到第 1 個，共 4 個」。名稱會跟著位置改變（例如重新編號）時，把新名稱也傳進去，句尾會加「，現在是『新名稱』」。
- 用選單移動時，選單關閉後焦點回到被移動那個項目的握把，使用端不用處理。存檔失敗、把項目搬回原位時，焦點可能會掉，要由使用端放回握把。只在焦點原本在握把上、或掉到頁面最外層時放回；使用者已經移到別處（例如在編輯器裡打字），不要把焦點搶回來。
- 用選單移動時，其他項目要從舊位置滑到新位置，不然畫面是一瞬間換掉，使用者看不出移了什麼。用本體的 `captureReorder`：改順序之前記下位置，畫面更新之後呼叫 play，並把被移動的項目傳進去，它會發一次光。拖曳放下改用 `settleReorder`，只讓被移動的項目發光：放下時預覽已經滑回落點，其他項目也讓好位了。拖曳放下不要用 `captureReorder`，放下的當下拖曳工具已經把項目放回拖曳前的位置，量到的是舊位置，畫面會從頭再滑一次。
- 一個項目只放一顆握把。項目還有「⋯」選單時，「⋯」放其他動作（例如刪除），移動的四項只在握把的選單裡。同一頁的清單都這樣做，使用者才知道要排序就找握把。
- 拖曳本身用各框架的拖曳工具做（Angular 用 CDK）。清單容器加 class `ds-sortable`、拖著跑的預覽加 class `ds-sortable-preview`，落點、讓位、放下時預覽滑回落點的樣式就會跟 DS 一致。預覽會被搬到 body，不在清單容器裡，所以一定要加 `ds-sortable-preview`，不然放下時預覽不會滑回去，而是當場消失。觸控時要按住一下才開始拖，見「無障礙」的觸控。落點是被拿起那個項目的複製品，高度、間距、圓角都跟原項目一樣，只換成藍色虛線框、白底；拿起的當下，其他項目不會跳。

## 對照表

### 外觀

| 外觀 | 用在哪 | 圖示顏色 | 滑過 |
| --- | --- | --- | --- |
| 預設 `default` | 白底的項目。淺灰底（例如 `--color/white/20`）上只有 2.77:1，不到 3:1，不要用 | `--text/body-light`（白底 3.07:1） | `--text/body` |
| 反白 `inverse` | 深色標頭，例如深灰、標籤色的標頭 | 白色（金色標籤底上 3.09:1） | 白色，加 16% 白色淡底 |
