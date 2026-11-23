# Inline Edit（inline-edit）

分組：互動元件

畫面上已經有一段單行文字，使用者偶爾要改它，例如清單項目的名稱、區塊的標題。點文字就地變成輸入框，改完按 Enter 或點到別處就存，不用另開視窗。整張表單本來就是一格一格的輸入框時，直接用 [Input](input.md)，不要每一格都包成原地編輯。要在清單尾端新增一筆用 [Inline Add](inline-add.md)。多行文字不適用：離開就存很容易把寫到一半的內容存出去。

## 部位

1. **顯示文字**：平常看到的樣子：一顆沒有底色的文字按鈕，文字就是 `value`。寬度由外層決定，放不下時固定一行、尾端用刪節號。`value` 是空的時候顯示 `placeholder`；連 `placeholder` 也沒有時，仍留 40px 寬可以點。
2. **輸入框**：編輯時取代顯示文字的 [Input](input.md)，尺寸由 `size` 決定，內容帶入目前的值並全選。外層給了元件寬度就填滿它；沒給就用輸入框自己的寬度，最窄 160px；外層比 160px 還窄時跟著外層縮。
3. **轉圈**：`saving` 為真時接在顯示文字後面的 12px [Spinner](spinner.md)。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 顯示 | 只有文字，沒有邊框和底色。 |
| 滑過 | 出現 1px `--border/primary` 邊框與白底，看得出這段文字可以點。 |
| 焦點 | 用鍵盤停到顯示文字時，邊框換成 `--button/action`，底色變白。滑鼠同時停在上面時，顯示的還是焦點的邊框。強制色彩模式下改用系統醒目色的外框。 |
| 編輯中 | 顯示文字換成輸入框，游標在裡面，原本的文字全選。 |
| 編輯中有錯誤 | `errorMessage` 有值：輸入框進入錯誤狀態並顯示訊息，按 Enter 或離開都不會送出，要改到合格或按 Esc 放棄。 |
| 儲存中 | `saving` 為真：顯示剛送出的文字加轉圈。這時點文字、按 Enter 都進不了編輯。 |
| 停用 | `disabled`：文字照常顯示，滑過不變、點了沒反應。沒有編輯權限的人看到的就是一段普通文字。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- `ariaLabel` 寫這段文字是什麼，例如「名稱」。不要寫動作，「編輯」兩個字元件會自己加。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=inline-edit--default&viewMode=story)）
- 頁面要等伺服器成功才換新值時，等待期間設 `saving`，失敗時記得設回假並告訴使用者沒存成功。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=inline-edit--saving&viewMode=story)）
- 用 `errorMessage` 擋不合格的內容，訊息寫清楚哪裡不對，例如「名稱不能空白」。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=inline-edit--with-error&viewMode=story)）
- 外層給顯示文字一個最大寬度，旁邊的按鈕才不會被長文字擠掉。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=inline-edit--long-text&viewMode=story)）

### 不要這樣做

- 用在多行文字。離開就存，寫到一半點到別處就存出去了。多行文字給明確的儲存與取消按鈕。
- 把表單的每一格都換成原地編輯。使用者要一格一格點開，反而比直接填慢。
- 自己用 `<span>` 加點擊事件切換成輸入框。鍵盤停不到、報讀軟體念不出可以編輯，Esc 還會一路傳到外層把視窗關掉。
- 收到 `commit` 之後不存、也不告訴使用者。畫面看起來改了，重新整理又變回去。

## 用法

### Angular（v0.19.1）

`app-inline-edit`

[value] [ariaLabel] [placeholder] [size:S|M] [errorMessage] [saving] [disabled] [(editing)] · (commit: string) (cancel) (closed: key|blur) (draftChange: string) — 點文字原地變輸入框，Enter 或離開就送出，Esc 放棄

[在範例網站看全部 8 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/?path=/docs/inline-edit--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | 目前的值，由使用端持有。收到 (commit) 存好之後，把新值給回來 |
| `ariaLabel` | `string` | `''` | 這段文字是什麼，例如「名稱」。一律要設：顯示時按鈕念成「編輯名稱，目前是…」，編輯時輸入框的名稱就是它。不要寫成「編輯名稱」，「編輯」元件會自己加。要寫 ariaLabel，不要寫 aria-label |
| `placeholder` | `string` | `''` | value 是空的時候顯示的提示文字，也是輸入框的提示文字 |
| `size` | `'S' \| 'M'` | `'S'` | 輸入框尺寸。顯示文字的最小高度跟著它（S 32px、M 36px），切換時那一列不會跳 |
| `errorMessage` | `string` | `''` | 有值就擋住送出：按 Enter 或離開輸入框都不發 (commit)，輸入框留著並顯示這段訊息，報讀軟體也會念出這段訊息。Esc 照樣可以放棄。通常由 (draftChange) 算出來 |
| `saving` | `boolean` | `false` | 使用端正在存檔。顯示剛送出的文字加轉圈，這段時間進不了編輯，報讀軟體念「<ariaLabel>儲存中」；變回 false 後顯示 value。先換值、失敗才退回的使用端不用設 |
| `disabled` | `boolean` | `false` | 停用：文字照常顯示，點了沒反應 |
| `editing` | `boolean` | `false` | 是否在編輯中，可以用 [(editing)] 雙向綁定。入口不在文字上（例如從選單的「重新命名」進入）時設為 true。存檔中或停用時設 true 不會打開，元件會發 (editingChange) false 把它改回來（一建立就是 true 也一樣） |
| `(commit)` | `EventEmitter<string>` |  | Enter 或離開輸入框時發出去頭尾空白後的字串。跟 value 相同（含只差頭尾空白）不發。空字串會發，要擋就用 errorMessage |
| `(cancel)` | `EventEmitter<void>` |  | 按 Esc 放棄時發出 |
| `(draftChange)` | `EventEmitter<string>` |  | 輸入框內容每次變動時發出目前的字串（沒有去空白） |
| `(closed)` | `EventEmitter<'key' \| 'blur'>` |  | 編輯收起時發出收起的原因：key 是按 Enter 或 Esc，blur 是焦點離開輸入框（點到別處、按 Tab）。內容沒變也會發。排在 (commit)、(cancel) 之後、(editingChange) 之前 |
| `(editingChange)` | `EventEmitter<boolean>` |  | 進入或離開編輯時發出。離開時排在 (commit)、(cancel)、(closed) 之後，是最後一個 |

#### 程式碼範例

**先換值、失敗才退回**

```html
<app-inline-edit ariaLabel="名稱" [value]="name()" (commit)="rename($event)"></app-inline-edit>

async rename(next: string) {
  const previous = this.name();
  this.name.set(next);                 // 畫面先換
  try {
    await this.api.rename(next);
  } catch {
    this.name.set(previous);           // 失敗退回，並告訴使用者
    this.toast.show({ type: 'error', message: '名稱儲存失敗' });
  }
}
```

**等伺服器成功才換值：用 saving**

```html
<app-inline-edit ariaLabel="名稱" [value]="name()" [saving]="saving()" (commit)="rename($event)"></app-inline-edit>

async rename(next: string) {
  this.saving.set(true);               // 顯示剛送出的文字加轉圈
  try {
    await this.api.rename(next);
    this.name.set(next);
  } catch {
    this.toast.show({ type: 'error', message: '名稱儲存失敗' });
  } finally {
    this.saving.set(false);            // 失敗時 value 沒變，顯示會回到原值
  }
}
```

**擋不合格的內容**

```html
<app-inline-edit ariaLabel="名稱" [value]="name()"
  [errorMessage]="error()"
  (draftChange)="draft.set($event)"
  (editingChange)="draft.set(name())"
  (commit)="rename($event)">
</app-inline-edit>

// 進入編輯時元件不會發 draftChange，所以進入與離開時都把草稿設回目前的值；
// 不然一打開就帶著上一次的錯誤，或還沒打字就顯示「不能空白」
readonly draft = signal(this.name());
readonly error = computed(() => this.draft().trim() ? '' : '名稱不能空白');
```

**從選單進入：只在編輯時才放上畫面**

```html
@if (renamingId() === item.id) {
  <app-inline-edit ariaLabel="標題" [value]="item.title" [editing]="true"
    (commit)="rename(item.id, $event)"
    (closed)="onRenameClosed(item.id, $event)">
  </app-inline-edit>
} @else {
  <span>{{ item.title }}</span>
}

onRenameClosed(id: string, reason: 'key' | 'blur') {
  this.renamingId.set(null);
  // 按 Enter／Esc 收起：輸入框被拿掉，焦點沒有地方去，放回入口（等畫面換回一般的樣子再放）。
  // 點到別處收起：焦點已經在使用者點的地方，不要搶
  if (reason === 'key') requestAnimationFrame(() => this.focusMenuButton(id));
}
```

#### Angular 注意事項

- 顯示文字沿用外層的字型、字重和顏色。要粗體標題的樣子，就把字級 class 加在 app-inline-edit 或它的外層上。
- 寬度由外層決定：給 app-inline-edit 一個 max-width，長文字會用刪節號截斷，旁邊的按鈕不會被擠掉。
- 輸入框的寬度：給了 app-inline-edit 寬度（width）就填滿它；沒給就用輸入框自己的寬度，最窄 160px；外層比 160px 還窄時跟著外層縮。
- saving 是給「送出之後」用的。編輯中把 saving 設為 true，輸入框不會自己收起；要鎖住就同時把 editing 設為 false。
- 值是空的又沒給 placeholder 時，顯示文字仍留 40px 寬可以點。能給 placeholder 就給，使用者才知道這裡有東西可以填。
- 使用端只在編輯時才放這個元件的寫法（上面最後一個範例），收起後顯示文字不在畫面上，焦點要由使用端自己放回入口。看 (closed) 的原因：key 才放，blur 不放。不要用「焦點是不是在 body」來判斷：使用者點空白處、或在 Safari 點按鈕時，焦點也在 body，照這個判斷會把焦點搶走。
- 輸入框裡的 Enter、Esc 與用來進入編輯的那一下 Enter、空白鍵都不往外傳。
- 放在會聽 Esc 關閉的視窗裡不用另外處理：輸入框裡的 Enter、Esc 已經 stopPropagation 並 preventDefault；收起之後同一個鍵按住不放的連發，元件會在 document 上吃掉，直到放開為止。使用端把元件拿掉之後也一樣。
- 切到別的視窗或分頁不算離開輸入框：不送出，留在編輯中，回來時焦點還在輸入框。
- 編輯中 value 被使用端換掉（例如別人改了同一筆）時，輸入框改顯示新值，使用者打到一半的字會被換掉。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：焦點在顯示文字上時，按 Enter 或空白鍵進入編輯。這一下按鍵不會再傳給外層。
- **鍵盤**：輸入框裡按 Enter 存檔，按 Esc 放棄修改。這兩個按鍵不會再傳給外層，所以在視窗裡按 Esc 只會收起輸入框，不會把視窗關掉。
- **鍵盤**：按住 Enter 只算一下，按住 Esc 也只算一下。收起之後、放開按鍵之前，同一個鍵的連發都不往外傳；頁面把元件拿掉之後也一樣。所以按住 Esc 不會把外層的視窗關掉，按住 Enter 不會把輸入框再打開。
- **鍵盤**：用輸入法選字時按的 Enter、Esc 是給輸入法的，不會存檔，也不會收起輸入框。
- **鍵盤**：按 Tab 離開輸入框等於點到別處，會存檔。
- **焦點**：進入編輯時焦點直接進輸入框，原本的文字全選，直接打字就是整段換掉。
- **焦點**：按 Enter 或 Esc 收起後，焦點回到顯示文字。
- **焦點**：點到別處或按 Tab 離開時，焦點已經被使用者移走，不會被拉回來。
- **焦點**：由頁面把 `editing` 設為真進入編輯、收起後顯示文字不在畫面上的情況，焦點要由頁面自己放回入口（例如那顆「⋯」）。看 `closed` 給的原因：按 Enter 或 Esc 收起才放；焦點離開輸入框而收起時不要搶焦點。
- **焦點**：切到別的視窗或分頁再回來，焦點還在輸入框。
- **報讀軟體**：顯示文字念成「編輯」加上 `ariaLabel`，再加目前的值，以及「按鈕」。例如「編輯名稱，目前是第一季，按鈕」。
- **報讀軟體**：輸入框的名稱就是 `ariaLabel`。
- **報讀軟體**：開始儲存時念出 `ariaLabel` 加「儲存中」，例如「名稱儲存中」。按鈕同時標成忙碌，轉圈本身不另外念。
- **報讀軟體**：有錯誤訊息時按 Enter 或離開輸入框，送出被擋下，這時念出錯誤訊息。[Input](input.md) 自己的錯誤提示目前不會跟輸入框一起念，所以由這個元件念。使用者改字之後不重複念。
- **動態**：滑過與焦點的邊框用 150ms 淡入；使用者設了「減少動態」時直接出現。轉圈的動態照 [Spinner](spinner.md)。

### 網頁專屬

- **ARIA 與 HTML 語意**：顯示文字是原生 `<button>`，aria-label 由 `ariaLabel` 與 `value` 組成。
- **ARIA 與 HTML 語意**：儲存中加 aria-busy="true" 與 aria-disabled="true"；按鈕還是停得到，報讀軟體才念得出它在忙。
- **ARIA 與 HTML 語意**：停用用原生 disabled。
- **ARIA 與 HTML 語意**：元件裡有一個一直存在、畫面上看不到的 role="status" 區域。平常是空的；`saving` 為真時填「儲存中」那句，結束後清空；送出被錯誤訊息擋下時填錯誤訊息，使用者改字或收起就清空。它不跟著轉圈或錯誤提示一起出現：區域跟文字同一刻插入，報讀軟體常常不念。

## 注意事項

- 元件只管「顯示、進入編輯、送出或取消」。值放在頁面：頁面把目前的值給 `value`，收到 `commit` 後自己存，存好再把新值給回來。
- 離開輸入框就存，跟 [Inline Add](inline-add.md) 的離開就取消相反。[Inline Add](inline-add.md) 是新增，打到一半離開多半是不要了；這裡是修改，打完離開多半是改好了。
- 切到別的視窗或分頁不算離開輸入框：不存，輸入框留著，回來時游標還在裡面，打到一半的字也還在。
- 內容沒變就不發 `commit`，只差前後空白也算沒變。頁面不用自己再比一次。
- 要不要擋空白、字數上限由頁面決定：頁面聽 `draftChange` 算出錯誤訊息，給 `errorMessage`。有錯誤訊息時按 Enter 或離開都不會送出，輸入框留著並顯示錯誤。
- `saving` 是給送出之後用的；編輯中把它設為真，輸入框不會自己收起。
- 存檔要等伺服器回應、成功才換新值的頁面，等待時把 `saving` 設為真。元件會先顯示剛送出的文字加一個 [Spinner](spinner.md)，使用者不會看到文字跳回舊值。等到 `saving` 變回假，顯示的就是 `value`：成功是新值，失敗是原來的值。先換新值、失敗才退回的頁面不用設 `saving`。
- 顯示的文字沿用外層的字型、字重和顏色，元件不自己定。放在標題裡就是標題的樣子，放在清單列裡就是清單的樣子。
- 入口不在文字上的情況（例如從「⋯」選單的「重新命名」進入），由頁面把 `editing` 設為真。只在編輯時才把元件放上畫面也可以，元件一出現就是編輯狀態時會直接聚焦。存檔中或停用時設為真不會打開，元件會把它改回假。
- 離開編輯時依序發出：`commit` 或 `cancel`（內容沒變就沒有這一個）、`closed`、`editingChange`。`closed` 帶著收起的原因：按 Enter 或 Esc 收起，還是焦點離開輸入框。頁面可以在 `editingChange` 統一收尾。
- 編輯中 `value` 被頁面換掉（例如別人改了同一筆）時，輸入框改顯示新的值，使用者打到一半的字會被換掉。
- `ariaLabel` 一律要設，寫這段文字是什麼（例如「名稱」「標題」）。顯示時的按鈕名稱和編輯時的輸入框名稱都靠它。
