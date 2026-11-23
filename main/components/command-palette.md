# Command Palette（command-palette）

分組：浮層元件

從一大批資料裡找出一筆並開啟它：按一個按鈕或快速鍵，跳出一個對話框，上面是搜尋框，下面是結果，打字、用上下鍵選、按 Enter 就開。資料很少、一眼看得完時不需要它。列表上方跟著字篩選的搜尋框用 [Search Field](search-field.md)；從清單選一個值填進表單欄位用 [Autocomplete](autocomplete.md)。

## 部位

1. **對話框**：搜尋樣式的 [Modal Shell](modal-shell.md)：靠畫面上方，預設寬 680 px，最高到畫面高度的 72%。平板以下的螢幕，寬度由 [Modal Shell](modal-shell.md) 改成幾乎佔滿畫面，兩邊各留 8 到 12 px。
2. **搜尋列**：對話框樣式的 [Search Field](search-field.md)，固定在最上面。右邊留了一個位置給頁面放按鈕，例如「搜尋」。
3. **說明位置**：在搜尋列和清單之間，放頁面自己的一行說明。沒放就不佔空間。
4. **結果清單**：[Result List](result-list.md)。結果超過對話框高度時，只有這一塊會捲，搜尋列和按鍵提示不動。
5. **按鍵提示**：固定在最下面，靠右排三組：↑ ↓ 瀏覽、↵ 選取、esc 關閉。「選取」兩個字可以換成選了之後會發生的事，例如「開啟」。可以整列關掉。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 關著 | 畫面上沒有任何東西。 |
| 打開 | 對話框從上方滑進來，焦點在搜尋框，馬上可以打字。 |
| 清單的狀態 | 平常、載入中、沒有結果、載入失敗四種，畫法跟 [Result List](result-list.md) 一樣，由頁面指定。 |
| 觸控裝置 | 沒有鍵盤，按鍵提示不顯示。其他都一樣，用點的選。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 對話框的名稱寫清楚在找什麼。「搜尋項目」比「搜尋」好懂。
- 提示文字寫可以打什麼來找，例如「輸入名稱或編號」。
- 開啟一筆要等後端時，自己擋住重複觸發。使用者連按兩下 Enter，元件會通知兩次。
- 收到「字變成空的」時，把結果一起清掉，或換回還沒打字時的內容（例如最近開啟）。

### 不要這樣做

- 不要自己用 [Modal Shell](modal-shell.md)、[Search Field](search-field.md) 再組一個。鍵盤、焦點、報讀的接線有十幾處，每組一次就會漏幾處。
- 不要把一定要讓使用者知道的事只寫在按鍵提示裡。觸控裝置上看不到，報讀軟體也不念。
- 不要在結果列裡放按鈕或連結。整列已經是一個選項，要對某一筆做別的事，選了它之後再提供。
- 不要拿它當表單用。它只有一個搜尋框和一份結果，要填好幾個欄位用一般的對話框。

## 用法

### Angular（v0.19.1）

`app-command-palette`

isOpen · ariaLabel（必填） · inputLabel placeholder · [(query)] · groups state itemTemplate · [autoActivateFirst] [wrap] · listLabel loadingText emptyText errorTitle errorDescription retryText announcement · [showHints] selectHint · width maxHeight · (itemSelect) (querySubmit) (retry) (closeRequest) (afterLeave) · [paletteEnd] 投影到搜尋框右邊

[在範例網站看全部 3 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/?path=/docs/command-palette--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | 開關，由使用端管。收到 closeRequest 或選好一項之後自己設成 false。 |
| `ariaLabel` | `string` |  | 必填。對話框的報讀名稱，例如「搜尋項目」。輸入框沒另外設 inputLabel 時也用它。 |
| `inputLabel` | `string` | `''` | 輸入框的報讀名稱。不設就用 ariaLabel。 |
| `placeholder` | `string` | `'搜尋'` | 輸入框的提示文字：寫可以打什麼來找。 |
| `query` | `string` | `''` | 輸入框裡的字；跟 queryChange 寫成 [(query)]。 |
| `groups` | `readonly ResultListGroup[]` | `[]` | 要列出來的結果，格式跟 app-result-list 的 groups 一樣。還沒打字時也可以給，例如一組「最近開啟」。 |
| `state` | `ResultListState` | `'ready'` | 'ready' \| 'loading' \| 'empty' \| 'error'，跟 app-result-list 的 state 一樣。 |
| `itemTemplate` | `TemplateRef<ResultListItemContext> \| null` | `null` | 每一列的內容範本，直接交給 app-result-list。 |
| `autoActivateFirst` | `boolean` | `false` | 有結果就先選中第一列。 |
| `wrap` | `boolean` | `false` | 上下鍵到頭尾時繞回另一端。 |
| `listLabel` | `string` | `'搜尋結果'` | 清單的報讀名稱。 |
| `loadingText` | `string` | `'搜尋中'` | 載入中顯示與念出來的字。 |
| `emptyText` | `string` | `'找不到結果'` | 沒有結果時顯示與念出來的字。 |
| `errorTitle` | `string` | `'載入失敗'` | 載入失敗的標題。 |
| `errorDescription` | `string` | `''` | 載入失敗的說明。 |
| `retryText` | `string` | `'重試'` | 重試鈕的字。 |
| `announcement` | `string \| null` | `null` | ready 時報讀軟體念的字。不設念「找到 N 筆」，設空字串不念。 |
| `showHints` | `boolean` | `true` | 底部要不要畫按鍵提示（↑↓ 瀏覽、↵ 選取、esc 關閉）。觸控裝置一律不畫。 |
| `selectHint` | `string` | `'選取'` | 按鍵提示裡 Enter 後面的字，寫選了之後會怎樣，例如「開啟」。 |
| `width` | `string` | `'min(680px, calc(100vw - 32px))'` | 對話框寬度。平板以下的螢幕由 app-modal-shell 改成幾乎佔滿畫面寬度，這個設定不生效。 |
| `maxHeight` | `string` | `'72vh'` | 對話框最高多高。結果超過時，搜尋列與提示列不動，中間的清單自己捲。 |
| `(queryChange)` | `EventEmitter<string>` |  | 輸入框的字變了，含清空。關掉面板時如果還有字，也會送一次空字串。 |
| `(itemSelect)` | `EventEmitter<ResultListItem>` |  | 選了一列：選中時按 Enter，或點那一列。面板不會自己關，要關就把 isOpen 設成 false。 |
| `(querySubmit)` | `EventEmitter<string>` |  | 沒選中任何一列就按 Enter，帶目前的字。輸入法選字中、按住連發不送。 |
| `(retry)` | `EventEmitter<void>` |  | 按了載入失敗的重試鈕。有綁這個事件，重試鈕才會出現。 |
| `(closeRequest)` | `EventEmitter<CommandPaletteCloseReason>` |  | 使用者想關面板：'escape'（沒字的時候按 Esc）或 'backdrop'（點背景）。收到後把 isOpen 設成 false。 |
| `(afterLeave)` | `EventEmitter<void>` |  | 退場動畫跑完之後。 |

#### 程式碼範例

**打字就查：字變了去查，結果回來給 groups 與 state**

```html
<app-button variant="outlined" color="neutral" size="M" text="搜尋項目" leftIcon="Search"
  (btnClick)="open.set(true)"></app-button>

<app-command-palette ariaLabel="搜尋項目" placeholder="輸入名稱或編號"
  [isOpen]="open()" [query]="keyword()" [groups]="groups()" [state]="state()"
  [emptyText]="'找不到「' + keyword() + '」的相關結果'"
  errorTitle="搜尋失敗" errorDescription="請再試一次"
  (queryChange)="search($event)"
  (itemSelect)="openItem($event); open.set(false)"
  (retry)="search(keyword())"
  (closeRequest)="open.set(false)">
</app-command-palette>
```

**還沒打字時列出最近開啟；列的內容自己畫；右邊放一顆按鈕**

```html
<ng-template #row let-item>
  <app-label color="GreyOutline" size="S" [text]="item.data.code"></app-label>
  <span class="row-name">{{ item.label }}</span>
</ng-template>

<app-command-palette ariaLabel="搜尋項目" [isOpen]="open()" [(query)]="keyword"
  [groups]="keyword ? results() : [{ id: 'recent', label: '最近開啟', items: recent() }]"
  [state]="state()" [itemTemplate]="row" selectHint="開啟"
  (itemSelect)="openItem($event)" (querySubmit)="openOnlyResult()"
  (closeRequest)="open.set(false)">
  <app-button paletteEnd variant="outlined" color="primary" size="M" text="搜尋"
    (btnClick)="openOnlyResult()"></app-button>
</app-command-palette>
```

#### Angular 注意事項

- 元件不打後端，也不決定搜什麼、用哪個快速鍵打開。要用 ⌘K 打開就在頁面自己聽按鍵；⌘N、⌘T、⌘W 這些瀏覽器不讓網頁攔的不要用。
- 焦點：打開的那一輪畫面更新完就在輸入框，使用者一打開就能打字。關掉、退場動畫結束後，焦點回到打開前的那個元素；這時焦點已經被使用者移到別的元素就不搶。不要自己在打開或關閉時呼叫 focus()。
- Esc：輸入框有字時第一下只清空，不會發 closeRequest；沒字才發。焦點在 paletteEnd 的按鈕上時按 Esc 會直接發 closeRequest。
- 關掉面板時元件會把字清空、把選中清掉，並送一次 queryChange 空字串，重開不會看到上一次的字。你那邊的結果也要跟著清：收到空字串時把 groups 清掉或換回還沒打字時的內容。
- **注意**：itemSelect 之後面板不會自己關。開啟那一筆要等後端時，自己擋住重複觸發（例如加一個「開啟中」的旗標）：使用者連按兩下 Enter 會收到兩次 itemSelect。
- 「只有一筆結果時按 Enter 直接開」這類規則由使用端在 querySubmit 裡決定，元件不做。
- 面板要一直留在範本裡，用 isOpen 開關。用 @if 把整個面板拿掉的話，關閉時的清空通知（queryChange 空字串）送不出來，退場動畫也不會跑。
- 按了重試鈕之後，焦點會回到輸入框：重試鈕接著會消失，焦點不放回去會掉出面板。
- 不放在 paletteEnd 的投影內容會出現在清單上面，適合放一行說明，例如可以搜尋的範圍。
- 測試：對話框有 0.45 秒的進場與退場計時器，await fixture.whenStable() 會等它。要驗「打開當下」的狀態就只呼叫 fixture.detectChanges()。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：焦點在搜尋框時：↓、↑ 在結果裡移動選中，焦點不離開搜尋框。
- **鍵盤**：有選中的列時按 Enter，選取那一列。沒有選中時按 Enter，元件通知頁面「送出查詢」並帶上目前的字，由頁面決定要做什麼，例如只有一筆結果時直接開。這兩種 Enter 都不會再傳到頁面。同時按著 Ctrl、⌘ 或 Alt 的 Enter 不算，元件不處理，也不攔。
- **鍵盤**：框裡有字時按 Esc，第一下只清空，對話框不關，這一下也不會傳到頁面。框裡沒字時按 Esc，元件通知頁面想關；這一下是 [Modal Shell](modal-shell.md) 在整頁的層級接的，頁面上其他聽整頁按鍵的地方也收得到。
- **鍵盤**：用輸入法選字時按的 ↓、↑、Enter、Esc 是給輸入法的，元件不處理。按住 Enter 不放只算第一下。
- **鍵盤**：焦點在清除鈕或右邊的按鈕上時，↓、↑、Enter 不會去動清單：在按鈕上按 Enter 就是按那顆按鈕。
- **鍵盤**：焦點在清除鈕上按 Esc，跟在搜尋框裡一樣是清空，焦點回到搜尋框。焦點在右邊的按鈕上按 Esc，會直接通知頁面想關，有字也一樣。
- **鍵盤**：Tab 在對話框裡繞：搜尋框、清除鈕（有字才有）、右邊的按鈕、載入失敗時的重試鈕。結果列用 Tab 停不到，要用上下鍵選；結果多到要捲動時，捲動的那一塊也不是 Tab 停點。
- **焦點**：一打開，焦點就在搜尋框，不用等進場動畫跑完，所以打開後馬上打的字不會漏掉。
- **焦點**：關掉、退場動畫跑完之後，焦點回到打開前的那個元素，通常是打開它的按鈕。如果這段時間使用者已經把焦點移到別的元素上，就不搶回來。
- **焦點**：頁面不用、也不要自己在打開或關閉時放焦點。
- **焦點**：按了載入失敗的重試鈕之後，焦點回到搜尋框。重試鈕接著會消失，焦點不放回去會掉出對話框。
- **焦點**：關掉後退場動畫還沒跑完就重開，元件記得最早那個元素，下一次關掉還是把焦點還給它。
- **報讀軟體**：對話框一定要有名稱，寫它在找什麼，例如「搜尋項目」。搜尋框預設用同一個名稱，也可以另外給。
- **報讀軟體**：搜尋框會告訴報讀軟體：它控制下面那個清單、清單現在有沒有列可以選、目前選到哪一列。
- **報讀軟體**：載入中、找到幾筆、找不到、載入失敗，由 [Result List](result-list.md) 的報讀區念出來。
- **報讀軟體**：按鍵提示只是畫面上的提醒，報讀軟體不念。
- **動態**：進場和退場各約 0.45 秒，是 [Modal Shell](modal-shell.md) 的動畫。
- **觸控**：觸控裝置上不顯示按鍵提示。判斷方式是「沒有滑過、指標是粗的」，接了鍵盤的平板也不會顯示。

### 網頁專屬

- **ARIA 與 HTML 語意**：對話框是 `role="dialog"`、`aria-modal="true"`，名稱用 `aria-label`。
- **ARIA 與 HTML 語意**：搜尋框是 `role="combobox"`，`aria-controls` 指到清單，`aria-autocomplete="list"`；`aria-expanded` 在清單有列可以選時是 `true`；`aria-activedescendant` 指到選中那一列，沒選中時沒有這個屬性。
- **ARIA 與 HTML 語意**：按鍵提示整列是 `aria-hidden="true"`。

## 注意事項

- 它是三個元件組起來的：搜尋樣式的 [Modal Shell](modal-shell.md)、對話框樣式的 [Search Field](search-field.md)、[Result List](result-list.md)，最下面再加一列按鍵提示。鍵盤、焦點和報讀的接線都已經做好，頁面只要給資料。
- 元件不打後端，也不決定搜什麼。字變了它通知頁面，頁面去查，再把結果和狀態（平常、載入中、沒有結果、載入失敗）交回來。要等使用者停下來才查，由頁面自己做。
- 開關由頁面管。使用者按 Esc 或點背景時，元件只通知「想關」，並說是哪一種；選了一列之後元件也不會自己關，因為開啟那一筆可能要等後端，要不要先關由頁面決定。
- 還沒打字時可以先放東西，例如一組「最近開啟」。它跟搜尋結果是同一種清單，一樣可以用上下鍵選。清單上面也可以放一行頁面自己的說明，例如可以搜尋的範圍。
- 關掉時，元件會把框裡的字清空、把選中清掉，並通知頁面字變成空的。重新打開不會看到上一次的字和結果。退場動畫那段時間焦點還在搜尋框，但這時打的字、按的鍵元件都不再理會。
- 用哪個快速鍵打開由頁面決定，元件不聽全站的按鍵。⌘K（Windows 是 Ctrl+K）是瀏覽器願意讓網頁接的；⌘N、⌘T、⌘W 這些接不到，不要用。
