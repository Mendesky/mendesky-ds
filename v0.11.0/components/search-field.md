# Search Field（search-field）

分組：表單元件

在列表上方打關鍵字篩選，或放在搜尋對話框最上面那一列。左邊有放大鏡，有字就出現清除鈕，Esc、Enter 和輸入法都已經處理好。表單裡要填寫的一般文字欄位用 [Input](input.md)。

## 部位

1. **外框**：`outline` 才有。高度跟著 `size` 走：S 32、M 36、L 40 px，跟 [Input](input.md) 一樣。`embedded` 沒有外框，改成整列：上下 16 px、左右 24 px 的留白，底下一條 2 px 的線。
2. **放大鏡**：在最左邊，`outline` 是 16 px，`embedded` 是 20 px。只是告訴使用者「這是搜尋框」，點它等於點輸入框，報讀軟體不念。
3. **輸入框**：打字的地方。提示文字預設是「搜尋」，可以用 `placeholder` 換掉。字的大小：`outline` 14 px，`embedded` 16 px。
4. **清除鈕**：只要框裡有字就出現，不用先點進框裡。按下去會清空，焦點回到輸入框，可以直接重打。
5. **右側位置**：`embedded` 才有，排在清除鈕右邊，放頁面自己的東西。沒放東西時不佔空間。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 空的 | 顯示提示文字，沒有清除鈕。 |
| 滑過 | `outline` 的外框變深一點。`embedded` 不變。 |
| 有字 | 右邊出現清除鈕。`outline` 的外框比空的時候深一階。 |
| 焦點 | 游標在輸入框裡時，`outline` 的外框外圍亮起藍色焦點框，滑鼠點進去也一樣；`embedded` 則是底下那條線變藍。焦點移到清除鈕上時，換成清除鈕自己亮焦點框。 |
| 停用 | 設了 `disabled`，字和放大鏡都變淡，沒有清除鈕，點不進去，按 Esc 也不會清空。`outline` 的底色會變灰。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- `ariaLabel` 寫清楚在搜什麼。「搜尋人員」比「搜尋」好懂，報讀軟體使用者一聽就知道這個框能找什麼。
- 搜尋對話框最上面那一列用 `embedded`，「搜尋」按鈕、快速鍵提示這類東西放進右側位置，不要在搜尋框旁邊再自己刻一列。
- 列表上方的搜尋框跟旁邊的篩選鈕用同一個尺寸，工具列通常都是 S。

### 不要這樣做

- 不要拿 [Input](input.md) 當搜尋框。它的清除鈕要先點進框裡才出現，鍵盤也按不到；Esc 清空、輸入法選字都要自己再寫一次。
- 不要在旁邊再放一顆清除鈕，也不要自己再寫一次「Esc 清空」。這兩件事元件已經做了。
- 不要在搜尋框下面掛跟著字篩選的下拉清單。這種清單按 Esc 應該先關清單，但元件有字時第一下 Esc 會直接清空，沒辦法讓清單先處理。要讓使用者從清單裡選一個值，用 [Autocomplete](autocomplete.md)；真的需要搜尋框加下拉清單，先提出來，元件再加對應的做法。
- 不要把 `embedded` 放在工具列或表單裡。它沒有外框，離開對話框最上面那一列，就看不出這裡可以打字。

## 用法

### Angular（v0.12.1）

`app-search-field`

ariaLabel（必填） · appearance: outline|embedded · size: S|M|L · placeholder value [disabled] · (valueChange) (searchSubmit) · focus() · [searchFieldEnd]

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/?path=/docs/search-field--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `ariaLabel` | `string` |  | 必填。報讀軟體念的名稱，落在內層 input 的 aria-label。寫這個框在搜什麼，例如「搜尋人員」。 |
| `appearance` | `SearchFieldAppearance` | `'outline'` | 'outline' \| 'embedded'。outline 有外框，放工具列與表單；embedded 是搜尋對話框最上面那一列，沒有外框，元件自己畫留白與底線。 |
| `size` | `SearchFieldSize` | `'M'` | 'S' \| 'M' \| 'L'，高 32／36／40 px，跟 app-input 一樣。只對 outline 有效；embedded 的高度由留白決定。 |
| `placeholder` | `string` | `'搜尋'` | 提示文字。不能拿來代替 ariaLabel。 |
| `value` | `string` | `''` | 框裡的字。頁面改它會同步到輸入框；跟 valueChange 一起可以寫成 [(value)]。 |
| `disabled` | `boolean` | `false` | 停用：不能打字、沒有清除鈕，按 Esc 也不清空。 |
| `(valueChange)` | `EventEmitter<string>` |  | 每次輸入、清除都送出目前的字。用輸入法選字時不送，選好字送一次。Android 例外：那邊的鍵盤打英文也算選字，所以每打一個字都送，選字中的注音、拼音也會送出去。 |
| `(searchSubmit)` | `EventEmitter<string>` |  | 按 Enter 時送出目前的字（空字串也送）。選字中、按住連發不送。Enter 事件照常往外傳。 |

#### 程式碼範例

**列表上方的工具列：篩選放左邊、搜尋放右邊，打字就篩選**

```html
<app-ctrl-bar>
  <ng-container slot="left">
    <app-button variant="outlined" color="neutral" size="S" text="部門" rightIcon="DownArrow"></app-button>
  </ng-container>
  <ng-container slot="right">
    <app-search-field size="S" ariaLabel="搜尋人員" placeholder="搜尋姓名、編號"
      style="width: 240px" [(value)]="keyword"></app-search-field>
  </ng-container>
</app-ctrl-bar>
```

**按 Enter 才查：資料要從後端拿時**

```html
<app-search-field ariaLabel="搜尋檔案名稱" [(value)]="keyword"
  (searchSubmit)="load($event)"></app-search-field>
```

**搜尋對話框最上面那一列：embedded，右側位置放「搜尋」按鈕**

```html
<app-modal-shell [isOpen]="open" variant="search" ariaLabel="搜尋人員"
  (backdropClick)="open = false" (escapePress)="open = false">
  <app-search-field appearance="embedded" ariaLabel="搜尋人員" [(value)]="keyword"
    (searchSubmit)="load($event)">
    <app-button searchFieldEnd variant="outlined" color="primary" size="M" text="搜尋"
      (btnClick)="load(keyword)"></app-button>
  </app-search-field>
  <!-- 搜尋結果 -->
</app-modal-shell>
```

#### Angular 注意事項

- 右側位置用屬性 searchFieldEnd 投影，只在 appearance="embedded" 時顯示；outline 不會顯示投影進來的內容。
- **注意**：頁面會改值（例如換頁時清空）就用 [(value)]，不要只用 [value]。只綁單向時，使用者打字後頁面的值沒跟著變；頁面再設成同一個值，Angular 認為沒變，輸入框不會更新。
- 輸出叫 searchSubmit，不叫 search：type="search" 的原生 search 事件會冒泡到元件外層，同名輸出會觸發兩次。
- 放在 app-modal-shell 裡不用另外處理 Esc：焦點在輸入框或清除鈕上、框裡有字時，元件攔下 Esc 只清空，空了才讓 app-modal-shell 的 escapePress 收到。焦點在右側位置的按鈕上時，元件不處理 Esc，對話框會直接關。
- **注意**：放在 app-modal-shell 裡不用自己放焦點：對話框打開約 0.45 秒後，會把焦點放到第一個能用 Tab 停的地方，搜尋框在最上面，就是它。iPhone 例外：對話框在 iPhone 上只把一般文字框、密碼框、下拉選單和多行文字框當成能停的地方，搜尋框不算，焦點不會自動進去，使用者要自己點一下。不要在打開時呼叫 focus()：打開的同一輪輸入框還沒畫出來，沒有作用；畫出來之後、0.45 秒之前呼叫，對話框會把搜尋框當成打開前的焦點，關掉後焦點回不到原本的按鈕。
- 搜尋框下面掛跟著字篩選的下拉清單時，Esc 應該先關清單。元件目前沒辦法讓清單先處理：有字時第一下 Esc 會直接清空。要讓使用者從清單裡選一個值，用 app-autocomplete；真的需要搜尋框加下拉清單，先提出來，元件再加對應的做法。
- 寬度跟著外層走。放在 app-ctrl-bar 右邊時給固定寬度，例如 width: 240px；放在會伸縮的 flex 列裡時，在 app-search-field 上給 flex 與 min-width，例如 flex: 0 1 240px、min-width: 140px。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 先停在輸入框。框裡有字時，再按一次 Tab 會停在清除鈕，按 Enter 或空白鍵清空。Safari 預設 Tab 只停文字框，要按 Option+Tab 才會停在清除鈕；在 Safari 上用 Esc 清空比較快。
- **鍵盤**：焦點在輸入框或清除鈕上、框裡有字時，按 Esc 會清空，這一下不會傳到外層。所以放在對話框裡時，第一下 Esc 只清空，對話框不會跟著關；已經空了再按 Esc，才交給外層，例如把對話框關掉。焦點在右側位置的按鈕上時，元件不處理 Esc，有字也直接交給外層。
- **鍵盤**：按住 Esc 不放，只會清空一次。放開之前連發的 Esc 都不會傳出去，免得清空之後順手把對話框也關了。
- **鍵盤**：按 Enter 會送出 `searchSubmit`，帶著目前框裡的字。Enter 照常往外傳，頁面要擋就自己擋。按住 Enter 連發，只算第一下。
- **鍵盤**：用輸入法選字時按的 Esc、Enter 是給輸入法的：不清空、不送出，Esc 也不會傳到外層把對話框關掉。
- **焦點**：`outline` 在游標進到輸入框時，整個外框亮起焦點框。`embedded` 沒有外框，改成底下那條線變藍。在 Windows 高對比這類強制色彩模式下，瀏覽器會換掉自訂的顏色，這時那條線改用系統的醒目色。
- **焦點**：點清除鈕或用鍵盤按它清空之後，焦點回到輸入框。
- **焦點**：放在 [Modal Shell](modal-shell.md) 裡不用自己放焦點：對話框打開約 0.45 秒後，會把焦點放到第一個能用 Tab 停的地方，搜尋框在最上面，就是它。iPhone 例外：對話框在 iPhone 上只把一般文字框、密碼框、下拉選單和多行文字框當成能停的地方，搜尋框不算，焦點不會自動進去，使用者要自己點一下。不要在打開時呼叫元件的 `focus` 方法：打開的同一輪輸入框還沒畫出來，沒有作用；畫出來之後、0.45 秒之前呼叫，對話框會把搜尋框當成打開前的焦點，關掉後焦點回不到原本的按鈕。
- **報讀軟體**：`ariaLabel` 一定要給，寫這個框在搜什麼，例如「搜尋人員」。提示文字一打字就不見了，報讀軟體念出來的範例字也聽不出用途，不能拿來當名稱。
- **報讀軟體**：清除鈕念「清除搜尋」。放大鏡不念。
- **報讀軟體**：篩選後剩幾筆，元件不會念。要讓報讀軟體使用者知道結果有幾筆，由頁面自己處理。
- **動態**：`outline` 的外框換色有 0.15 秒的過渡。使用者在系統裡開了「減少動態」，就直接換色。
- **觸控**：清除鈕是 24 px，比手機建議的觸控範圍小。iOS 建議 44 點、Android 建議 48 dp。

### 網頁專屬

- **ARIA 與 HTML 語意**：輸入框用原生 `<input>`，type 是 search，並設 `enterkeyhint="search"`，手機鍵盤上的 Enter 會顯示成「搜尋」。瀏覽器自帶的清除鈕藏起來，只留元件自己的那一顆，免得出現兩個 ✕。
- **ARIA 與 HTML 語意**：`ariaLabel` 輸出成輸入框的 `aria-label`。放大鏡標成 `aria-hidden="true"`。
- **ARIA 與 HTML 語意**：清除鈕是原生 `<button>`，`type="button"`，`aria-label="清除搜尋"`，放在表單裡按它也不會送出表單。
- **ARIA 與 HTML 語意**：元件不加 `role="search"`。要把整個搜尋區（搜尋框加旁邊的篩選鈕）標成搜尋區，由頁面在外層包。

## 注意事項

- 有兩種外觀，用 `appearance` 選。預設的 `outline` 有外框，高度、顏色都跟 [Input](input.md) 一樣，放在列表上方的工具列或表單裡。`embedded` 給搜尋對話框最上面那一列用：沒有外框，字大一級，元件自己畫左右留白和底下那條線，游標進到輸入框時，那條線變藍。
- 寬度跟著外層走，元件本身不設寬度。放在 [Ctrl Bar](ctrl-bar.md) 右邊時由頁面給固定寬度，例如 240px；放在會伸縮的列裡時，再給一個最窄寬度，例如 140px。
- 每打一個字就送一次 `valueChange`。用輸入法選字時不送，選好字才送一次。Android 例外：那邊的鍵盤打英文也算選字，等選好字才送的話，要打完整個字列表才會篩選，所以 Android 上每打一個字都送，選字中的注音、拼音也會送出去。資料要從後端查的話，頁面自己等使用者停下來再送，不要每個字都查一次。只想在按 Enter 時才查，就接 `searchSubmit`。
- `embedded` 的右邊預留了一個位置，放頁面自己的東西，例如「搜尋」按鈕或快速鍵提示。`outline` 沒有這個位置，要放按鈕就放在搜尋框旁邊。
