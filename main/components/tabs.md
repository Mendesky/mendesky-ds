# Tabs（tabs）

分組：互動元件

同一個區塊裡有幾組內容，一次只看一組，用一排頁籤切換。例如一份資料的幾個版本、同一張表的幾種分類。切換只換掉下方顯示的內容，不送出、不存檔。要從幾個值裡選一個、而且這個值會被送出或存起來時，用 [Button Group](button-group.md)；頁籤多到一排放不下、或要換頁跳轉時，不要用 [Tabs](tabs.md)。

## 部位

1. **底線**：頁籤列底下的一條灰線，從頁籤列的最左邊延伸到最右邊，尾端的自訂內容底下也有。
2. **頁籤**：一個頁籤一顆按鈕，文字寫在 `items` 每一項的 `label`。選中的頁籤底下有一條深藍線，跟灰線一樣粗，蓋在灰線上。
3. **狀態標記**：`items` 某一項設了 `status` 才有，接在文字右邊，是一個紅色的圓形驚嘆號圖示，顏色跟 [Label](label.md) 的 Error 一樣。滑過圖示會顯示 `status` 的 `label`。用來標出「這一組內容裡有東西要處理」，不用點進去也看得到是哪一組。目前只有這一種紅色標記。
4. **尾端自訂內容**：可以不放。接在最後一個頁籤右邊，不算頁籤，例如「新增一組」的按鈕。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 未選中 | 灰字，底下只有灰線。 |
| 滑過 | 字色變深。 |
| 選中 | 深藍字加粗，底下的灰線換成同色的深藍線。字用深藍，是為了在白底上看得清楚；線跟字同色，一個頁籤只有一種藍。 |
| 焦點 | 用鍵盤移到頁籤上時，外圍會出現焦點框。 |
| 停用 | `items` 某一項設了 `disabled`：停用的灰字，滑過不變，點了、用方向鍵都不會選到它。有狀態標記時，標記也跟文字一樣變灰：不能操作的頁籤，不用紅色催人處理。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 狀態標記的 `label` 寫成看得懂的短句，例如「需處理」「資料不完整」。滑過圖示時顯示它，報讀軟體也念它；只放顏色，用報讀軟體或分不清紅綠的人會不知道有標記。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/iframe.html?id=tabs--with-status&viewMode=story)）
- 用了狀態標記，下方內容區一定要寫出原因。標記的文字只有滑鼠滑過圖示才看得到；用鍵盤或手機的人選到這個頁籤後，要能在內容裡看到為什麼有標記。
- 「新增一組」這類跟頁籤有關、但本身不是頁籤的按鈕，放進尾端自訂內容。它不會被當成頁籤念，方向鍵也不會停在它上面。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/iframe.html?id=tabs--with-trailing&viewMode=story)）
- 頁籤的文字盡量短，一兩個詞就好。內容的完整標題寫在下方內容區裡。

### 不要這樣做

- 不要用頁籤做「選一個值然後送出」的選擇，例如方案、頻率。那是表單欄位，用 [Button Group](button-group.md) 或 [Select](select.md)；頁籤切換不應該改變要送出的資料。
- 不要用頁籤換頁或跳轉網址。頁籤只換掉同一個區塊裡的內容；要換頁就用連結或導覽。
- 不要把狀態標記當成一般的提示或計數。它只表示「這一組有東西要處理」；數量和一般說明都寫在內容區。[Badge](badge.md) 只用來表示「有未讀」或「未讀幾則」，不要拿來放其他數量。
- 不要在頁籤文字裡加打勾、emoji 或自己畫的圓點表示狀態，用狀態標記。

## 用法

### Angular（v0.12.1）

`app-tabs`

items: TabItem[]（必填；{ value, label, disabled?, status?: { label } }）· [value] · ariaLabel（必填）· panelId · (valueChange) · 最後一個頁籤右邊可投影按鈕

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/?path=/docs/tabs--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `items` | `TabItem[]` |  | 頁籤，依序由左到右。每一項是 { value, label, disabled?, status? }：value 是這個頁籤代表的值（字串或數字，不能重複）；label 是頁籤上的文字；disabled 為 true 時停用；status 是狀態標記 { label }，有值時文字右邊顯示紅色驚嘆號，滑過顯示 label，報讀軟體把 label 接在文字後面念。必填。 |
| `value` | `string \| number \| null` | `null` | 選中的頁籤的 value。null 是都沒選中，這時 Tab 會停在第一個沒停用的頁籤。元件不會自己改這個值，要在 (valueChange) 裡改。 |
| `ariaLabel` | `string` | `''` | 頁籤列的名稱，輸出成 role="tablist" 的 aria-label，報讀軟體會念。必填。 |
| `panelId` | `string` | `''` | 內容外框的 id。給了的話每個頁籤輸出 aria-controls 指向它；內容外框要自己標 role="tabpanel"、id 設成同一個值，aria-labelledby 綁 selectedTabId。空字串不輸出。 |
| `(valueChange)` | `EventEmitter<string \| number>` |  | 選中另一個頁籤時觸發，帶出那個頁籤的 value：點擊、左右方向鍵、Home、End 都會觸發。點已選中的頁籤、點停用的頁籤不觸發。 |

#### 程式碼範例

**基本用法：頁籤切換下方內容，內容外框標成 tabpanel**

```html
<app-tabs #groupTabs ariaLabel="資料分組" panelId="group-panel"
  [items]="groups" [value]="activeGroup()" (valueChange)="activeGroup.set($event)"></app-tabs>

<div id="group-panel" role="tabpanel" [attr.aria-labelledby]="groupTabs.selectedTabId">
  <!-- activeGroup() 這一組的內容 -->
</div>
```

**狀態標記：有東西要處理的那一組，status 給 { label }**

```html
groups: TabItem[] = [
  { value: 'a', label: '第一組' },
  { value: 'b', label: '第二組', status: { label: '需處理' } },
  { value: 'c', label: '第三組', disabled: true },
];
// (valueChange) 帶出的值是 string | number，接它的 signal 用同一個型別
activeGroup = signal<string | number>('a');
```

**尾端放按鈕：投影的內容在最後一個頁籤右邊、頁籤清單外面**

```html
<app-tabs ariaLabel="資料分組" [items]="groups" [value]="activeGroup()"
  (valueChange)="activeGroup.set($event)">
  <app-button variant="ghost" color="neutral" size="S" leftIcon="Plus" text="新增一組"
    (btnClick)="addGroup()"></app-button>
</app-tabs>
```

#### Angular 注意事項

- TabItem 與狀態標記的型別 StatusMark 都從 @mendesky/ds-angular 匯出。
- selectedTabId 是元件上的唯讀屬性。用範本參考變數（例如 #groupTabs）取到元件，再把 groupTabs.selectedTabId 綁到內容外框的 aria-labelledby。都沒選中時是 null，aria-labelledby 就不輸出。
- **注意**：value 是單向輸入：元件發 (valueChange) 後不會自己改選中的頁籤，要使用端把新值傳回 [value]。沒傳回去的話，畫面上選中的頁籤不會變，但焦點已經移到新頁籤上。
- value 不能重複。重複的兩個頁籤會一起選中、一起取消；其中一個選中時，點另一個不會發 (valueChange)。Angular 17 不會報錯提醒，要使用端自己保證不重複。
- 頁籤放不下時，選中的頁籤一改變，頁籤列就自動捲到看得見它，包括使用端自己改 [value]（例如「新增一組」後選中新的那一組）。選中的沒變、只換了 items 時不捲，不會把使用者自己捲的位置拉回去。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：按 Tab 進到頁籤列時，焦點停在選中的頁籤；沒有選中的頁籤時，停在第一個沒停用的頁籤。再按一次 Tab 就離開頁籤列，到下一個可以操作的東西（通常是下方的內容或尾端的自訂內容）。
- **鍵盤**：左右方向鍵移到前一個、下一個頁籤，移過去就直接選中，下方內容跟著換。到了最後一個再按右方向鍵，回到第一個；第一個按左方向鍵，到最後一個。停用的頁籤會跳過。
- **鍵盤**：Home 移到第一個、End 移到最後一個沒停用的頁籤，一樣直接選中。
- **鍵盤**：焦點在頁籤上時按 Enter 或空白鍵，選中這個頁籤。
- **焦點**：頁籤列裡只有一個頁籤在 Tab 的順序裡（選中的那個），其他頁籤用方向鍵到。
- **焦點**：頁籤列左右捲動時，用鍵盤移到的頁籤會自動捲進看得到的範圍。
- **報讀軟體**：頁籤列念出 `ariaLabel` 和「頁籤清單」；每個頁籤念出文字、「頁籤」、已選取或未選取，以及「第幾個，共幾個」。
- **報讀軟體**：有狀態標記的頁籤，會把 `status` 的 `label` 接在文字後面一起念，例如「第二組，需處理，頁籤，未選取」。圖示本身不念。
- **報讀軟體**：方向鍵不會停在停用的頁籤上；報讀軟體逐行瀏覽時，才念得到它是停用的。

### 網頁專屬

- **ARIA 與 HTML 語意**：頁籤列是 role="tablist"，用 aria-label 取名字（`ariaLabel`）。每個頁籤是原生 `<button>`，role="tab"，用 aria-selected 標出選中；停用用 aria-disabled="true"。
- **ARIA 與 HTML 語意**：尾端自訂內容放在 role="tablist" 外面，所以裡面可以放一般按鈕。
- **ARIA 與 HTML 語意**：給了 `panelId` 時，每個頁籤用 aria-controls 指向它。內容外框要自己標 role="tabpanel"、id 設成同一個 `panelId`，並用 aria-labelledby 指向選中頁籤的 id；選中頁籤的 id 由元件提供，取法見各框架的說明。

## 注意事項

- 頁籤只負責切換，下方的內容由使用的頁面自己顯示。內容外框要標成對應的頁籤內容區，寫法見無障礙的 aria。
- 頁籤一排放不下時，頁籤列會左右捲動，不會換行，也不會收進「更多」選單。捲軸不顯示，所以看不出後面還有頁籤；只有滾輪的滑鼠也拉不到後面，要用觸控板、按住 Shift 滾，或用方向鍵。選中的頁籤一改變，頁籤列就自動捲到看得見它，包括頁面自己換掉選中的頁籤（例如「新增一組」後選中新的那一組）；選中的沒變時不捲，不會把使用者自己捲的位置拉回去。頁籤數量大概會超過一排時，改用 [Select](select.md) 這類能放很多選項的元件。
