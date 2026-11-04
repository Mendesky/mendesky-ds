# Button（button）

分組：互動元件

畫面上能點的操作都用它，不要自己寫原生的 `<button>`。只有選單裡的選項例外，那裡改用 [Menu Item](menu-item.md)，要在選項文字後面放標籤也是放在 [Menu Item](menu-item.md) 裡。打開 `loading` 後，轉圈會取代圖示，按鈕變成灰色的停用狀態，點了也沒反應。如果不給 `text`、自己放內容，**裡面的文字顏色一定要繼承按鈕**，寫 `color: inherit`。寫死顏色的話，ghost 和 elevated 在滑過、按下時的文字色會套不上。之前就出過這種事：ghost 滑過後變成深灰底配黑字。

## 部位

1. **外框**：整顆按鈕都可以點。高度跟著 `size` 走，XXS 17、XS 24、S 32、M 36、L 40 px。
2. **左側圖示**：用 `leftIcon` 放，可以不放。顏色會跟著按鈕的文字走，只有加了說明時例外，細節看「說明」那一項。
3. **左側標籤**：文字前面的小標籤，用 `leftLabel`、`centerLabel` 放，可以不放。畫出來的是 [Label](label.md)。
4. **文字**：`text` 寫這顆按鈕要做什麼。不給 `text` 的話，這裡可以改放你自己的內容。
5. **說明**：`description` 會顯示在文字下方，可以不放。加了它，整顆按鈕會改成靠左對齊，文字換成較深的標題色，說明是較淺的灰色，圖示則維持按鈕原本的顏色；滑過時，文字和說明都換回按鈕的文字色。版面也會跟著變：左側的圖示和標籤跑到文字上面一行，右側的標籤、圖示和快速鍵提示排到說明下面一行，所以按鈕可能不只兩行。
6. **右側標籤**：文字右邊的小標籤，用 `rightLabel` 放，可以不放。
7. **右側圖示**：用 `rightIcon` 放，可以不放。顏色規則跟左側圖示一樣。
8. **快速鍵提示**：`shortcut` 只是一段提示文字，按鈕不會幫你綁快速鍵。選單裡的選項要用 [Menu Item](menu-item.md)，它沒有快速鍵提示。
9. **載入轉圈**：只在 `loading` 時出現。這時按鈕上只剩轉圈和 `loadingText`，其他部位都會先藏起來。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 預設 | 底色和文字色由 `variant` 和 `color` 決定。 |
| 滑過 | filled 的底色會深一階。tonal、outlined、ghost 會變成實心底配淺色字，只有 outlined 的 success 不一樣，它維持白底、框線變綠。elevated 則是浮起來，多一層陰影。 |
| 按下 | 底色再深一階。有兩個例外：outlined 的 neutral 和 elevated 會變成藍底配淺色字，elevated 的陰影也會消失；outlined 的 success 則從白底變成實心綠底配淺色字。 |
| 焦點 | 用鍵盤移過來時，按鈕外圍會出現焦點框。用滑鼠點的話不會有。 |
| 停用 | 設了 `disabled` 就是灰底灰字，點了沒反應，鍵盤也移不過來。 |
| 停用但可點 | `disabled` 再加上 `clickableWhenDisabled`。看起來跟停用一樣，但還是點得到、鍵盤也移得過來。點下去不會執行操作，而是在按鈕上方顯示 `disabledMessage`，告訴使用者為什麼不能按；這段說明會一直留著，直到按鈕恢復可用。 |
| 載入中 | 設了 `loading` 會換成停用的灰底，轉圈和文字是深灰色。有給 `loadingText` 就顯示它，沒給就只剩轉圈，其他部位都不顯示。這段時間點了沒反應，鍵盤也移不過來。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 載入中記得給 `loadingText`，像「儲存中…」這樣。不然畫面上只剩一個轉圈，用報讀軟體的人根本不知道按鈕在忙什麼。
- 按鈕暫時不能用、又想讓使用者知道原因，就打開 `clickableWhenDisabled`，再配一句 `disabledMessage`。按鈕一樣是灰的，但點下去會在上方跳出你寫的原因，總比讓人對著一顆沒反應的按鈕猛點好。
- 想讓按鈕跟外層一樣寬，加 `fullWidth` 就好。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/iframe.html?id=button--full-width&viewMode=story)）
- 做成切換鈕（按一下開、再按一下關）時，用 `ariaPressed` 告訴報讀軟體現在是按下還是沒按下。如果按鈕代表清單裡「目前這一項」，改用 `ariaCurrent`。
- 按鈕會打開放了 [Menu Item](menu-item.md) 的選單時，`ariaHaspopup` 設成 `menu`，`ariaExpanded` 跟著選單開關設成 true 或 false。這樣報讀軟體才知道按下去會跳出選單；在 Safari 上，選單關掉後也是靠 `ariaHaspopup` 和 `ariaExpanded` 一起認出這顆按鈕、把焦點還給它，少一個就認不出來。

### 不要這樣做

- 只放圖示，卻沒給 `ariaLabel`。報讀軟體會念不出這顆按鈕叫什麼，開發模式下 console 也會警告你。這種按鈕通常直接用 [Icon Button](icon-btn.md) 就好；真的要用按鈕的外觀，`ariaLabel` 一定要補上。
- 在按鈕裡面再塞連結、按鈕或勾選框。用鍵盤或報讀軟體的人，沒辦法單獨操作裡面那一個。
- 以為設了 `shortcut`，按快速鍵就會觸發。它只會在按鈕上顯示一段提示文字，真正的快速鍵要自己另外綁。

## 用法

### Angular（v0.7.0）

`app-button`

variant: filled|tonal|outlined|ghost|elevated · color: primary|success|danger|neutral · size: XXS|XS|S|M|L · leftIcon/rightIcon · [disabled] [fullWidth] [loading] · [clickableWhenDisabled] [disabledMessage] · ariaLabel [ariaPressed] [ariaCurrent] · ariaHaspopup [ariaExpanded] · (btnClick) (disabledClick)

[在範例網站看全部 19 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/button--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | `'filled'` | filled \| tonal \| outlined \| ghost \| elevated |
| `color` | `ButtonColor` | `'primary'` | primary \| success \| danger \| neutral（elevated 不需指定） |
| `size` | `ButtonSize` | `'M'` | XXS(17px) \| XS(24px) \| S(32px) \| M(36px) \| L(40px) |
| `text` | `string` | `''` | 按鈕文字 |
| `leftIcon` | `string` |  | 左側 icon 名稱（icon registry） |
| `rightIcon` | `string` |  | 右側 icon 名稱 |
| `disabled` | `boolean` | `false` | 禁用狀態 |
| `fullWidth` | `boolean` | `false` | 撐滿父容器寬度 |
| `loading` | `boolean` | `false` | 載入中狀態；底色不變，spinner 取代 icon，點擊無效 |
| `loadingText` | `string` | `''` | loading=true 時顯示的替換文字（選填） |
| `description` | `string` | `''` | 雙行模式：名稱下方的說明文字。有值時 height:auto、文字靠左。選單裡的選項改用 app-menu-item 的 description |
| `shortcut` | `string` | `''` | 鍵盤快速鍵提示（e.g. "⌘N"），顯示在按鈕右側，參考 Fluent UI secondaryContent 模式。只顯示提示，不綁定快速鍵行為。選單裡的選項要用 app-menu-item，它沒有這個設定。 |
| `clickableWhenDisabled` | `boolean` | `false` | true 時改用 aria-disabled 取代原生 disabled，讓點擊事件仍可穿透。適用於「需顯示 disabled 原因」的主動作按鈕。 |
| `disabledMessage` | `string \| string[]` | `[]` | clickableWhenDisabled=true 且 disabled=true 時，點擊按鈕上方顯示的 tooltip 訊息。單條傳 string，多條傳 string[]（以 bullet list 呈現）。 |
| `ariaLabel` | `string` | `''` | 報讀軟體念的名稱，套在內層 button 的 aria-label。只有圖示、沒有文字時必填；沒填時開發模式會在 console 警告。 |
| `ariaPressed` | `boolean \| null` | `null` | 切換鈕的按下／未按下狀態，套在內層 button 的 aria-pressed。null 表示不是切換鈕，不輸出。 |
| `ariaCurrent` | `ButtonAriaCurrent \| null` | `null` | 清單或導覽中的「目前這一項」，套在內層 button 的 aria-current。值為 'page' \| 'step' \| 'location' \| 'date' \| 'time' \| 'true' \| 'false'；null 不輸出。 |
| `ariaHaspopup` | `ButtonAriaHaspopup \| null` | `null` | 這顆按鈕會打開選單，套在內層 button 的 aria-haspopup。目前只接受 'menu'，用在打開放了 app-menu-item 的 app-action-menu 的按鈕；null 不輸出。Safari 關閉選單後，要同時有它和 ariaExpanded 才認得出觸發鈕、把焦點還給它。 |
| `ariaExpanded` | `boolean \| null` | `null` | 選單現在開著沒，套在內層 button 的 aria-expanded。綁選單的開關狀態，true／false 照實輸出；null 不輸出。 |
| `(btnClick)` | `EventEmitter` |  | 正常點擊事件輸出 |
| `(disabledClick)` | `EventEmitter` |  | clickableWhenDisabled=true 且 disabled=true 時，點擊觸發。父層監聽後可執行 scroll 到第一個欄位錯誤等操作。 |
| `leftLabel` | `BtnLabelConfig \| null` | `null` | leftIcon 之後、文字之前的 app-label；null 為不顯示。格式 { text, color, size? } |
| `centerLabel` | `BtnLabelConfig \| null` | `null` | leftLabel 之後、文字之前的第二個 app-label；null 為不顯示 |
| `rightLabel` | `BtnLabelConfig \| null` | `null` | 文字之後、rightIcon 之前的 app-label；null 為不顯示 |

#### 程式碼範例

**基本用法**

```html
<app-button
  variant="filled"
  color="primary"
  size="M"
  text="確認"
  leftIcon="Done-OK"
  [disabled]="false"
  [fullWidth]="false"
  (btnClick)="onConfirm()"
></app-button>
```

**只有圖示時給名稱**

```html
<app-button
  variant="outlined"
  color="neutral"
  size="XS"
  leftIcon="LeftArrow"
  ariaLabel="上一頁"
  (btnClick)="goToPrevPage()"
></app-button>
```

**清單中標示目前這一項**

```html
<app-button
  [text]="item.label"
  [ariaCurrent]="item.id === currentId ? 'true' : null"
  (btnClick)="select(item.id)"
></app-button>
```

**打開選單的按鈕（例：每頁筆數）**

```html
<div class="page-size-wrap">
  <app-button
    variant="outlined"
    color="neutral"
    size="XS"
    [text]="'' + pageSize()"
    [ariaLabel]="'每頁顯示筆數 ' + pageSize()"
    ariaHaspopup="menu"
    [ariaExpanded]="pageSizeMenuOpen()"
    (btnClick)="pageSizeMenuOpen.set(!pageSizeMenuOpen())"
  ></app-button>
  @if (pageSizeMenuOpen()) {
    <app-action-menu ariaLabel="每頁顯示筆數" (closeMenu)="pageSizeMenuOpen.set(false)">
      @for (n of pageSizeOptions; track n) {
        <app-menu-item [label]="'' + n" [selected]="pageSize() === n" (itemClick)="pageSize.set(n)"></app-menu-item>
      }
    </app-action-menu>
  }
</div>
```

#### Angular 注意事項

- **注意**：ariaLabel 要寫成元件的設定（ariaLabel="…" 或 [ariaLabel]="…"）。直接寫 aria-label 或 [attr.aria-label] 會留在外層 app-button 上，到不了內層 button，報讀軟體讀不到。
- app-button 用 Angular 預設的樣式封裝（Emulated），內部的 .btn 等 class 帶有元件專屬的屬性選擇器；使用端要覆寫按鈕內部樣式，寫在使用端元件自己的樣式裡碰不到這些 class；要寫在全域樣式表並讓權重高於元件內的規則，或在元件樣式裡用 ::ng-deep。

### Vue（試做）（v0.3.0）

`<DsButton>`

variant: filled|tonal|outlined|ghost|elevated · color: primary|success|danger|neutral · size: XXS|XS|S|M|L · leftIcon/rightIcon · disabled fullWidth loading · clickableWhenDisabled disabledMessage · ariaLabel ariaPressed ariaCurrent · @btn-click @disabled-click

[在範例網站看全部 19 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.3.0/components/?path=/docs/button--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | `'filled'` | filled \| tonal \| outlined \| ghost \| elevated |
| `color` | `ButtonColor` | `'primary'` | primary \| success \| danger \| neutral（elevated 不需指定） |
| `size` | `ButtonSize` | `'M'` | XXS(17px) \| XS(24px) \| S(32px) \| M(36px) \| L(40px) |
| `text` | `string` | `''` | 按鈕文字 |
| `leftIcon` | `string` |  | 左側 icon 名稱（icon registry） |
| `rightIcon` | `string` |  | 右側 icon 名稱 |
| `disabled` | `boolean` | `false` | 禁用狀態 |
| `fullWidth` | `boolean` | `false` | 撐滿父容器寬度 |
| `loading` | `boolean` | `false` | 載入中狀態；底色不變，spinner 取代 icon，點擊無效 |
| `loadingText` | `string` | `''` | loading=true 時顯示的替換文字（選填） |
| `description` | `string` | `''` | 雙行模式：名稱下方的說明文字。有值時 height:auto、文字靠左，適合 action-menu 列表項目 |
| `shortcut` | `string` | `''` | 鍵盤快速鍵提示（e.g. "⌘N"），顯示在按鈕右側。主要用於 action-menu 選項，參考 Fluent UI secondaryContent 模式。只顯示提示，不綁定快速鍵行為。 |
| `clickableWhenDisabled` | `boolean` | `false` | true 時改用 aria-disabled 取代原生 disabled，讓點擊事件仍可穿透。適用於「需顯示 disabled 原因」的主動作按鈕。 |
| `disabledMessage` | `string \| string[]` | `[]` | clickableWhenDisabled=true 且 disabled=true 時，點擊按鈕上方顯示的 tooltip 訊息。單條傳 string，多條傳 string[]（以 bullet list 呈現）。 |
| `ariaLabel` | `string` | `''` | 報讀軟體念的名稱，套在內層 button 的 aria-label。只有圖示、沒有文字時必填；沒填時開發模式會在 console 警告。寫成 aria-label 屬性也會被當成這個 prop，落在內層 button。 |
| `ariaPressed` | `boolean \| null` | `null` | 切換鈕的按下／未按下狀態，套在內層 button 的 aria-pressed。null 表示不是切換鈕，不輸出。 |
| `ariaCurrent` | `ButtonAriaCurrent \| null` | `null` | 清單或導覽中的「目前這一項」，套在內層 button 的 aria-current。值為 'page' \| 'step' \| 'location' \| 'date' \| 'time' \| 'true' \| 'false'；null 不輸出。 |
| `@btn-click` | `() => void` |  | 正常點擊事件輸出 |
| `@disabled-click` | `() => void` |  | clickableWhenDisabled=true 且 disabled=true 時，點擊觸發。父層監聽後可執行 scroll 到第一個欄位錯誤等操作。 |
| `leftLabel` | `BtnLabelConfig \| null` | `null` | leftIcon 之後、文字之前的 DsLabel；null 為不顯示。格式 { text, color, size? } |
| `centerLabel` | `BtnLabelConfig \| null` | `null` | leftLabel 之後、文字之前的第二個 DsLabel；null 為不顯示 |
| `rightLabel` | `BtnLabelConfig \| null` | `null` | 文字之後、rightIcon 之前的 DsLabel；null 為不顯示 |

#### 程式碼範例

**基本用法**

```vue
<DsButton
  variant="filled"
  color="primary"
  size="M"
  text="確認"
  leftIcon="Done-OK"
  :disabled="false"
  :fullWidth="false"
  @btn-click="onConfirm()"
></DsButton>
```

**只有圖示時給名稱**

```vue
<DsButton
  variant="outlined"
  color="neutral"
  size="XS"
  leftIcon="LeftArrow"
  ariaLabel="上一頁"
  @btn-click="goToPrevPage()"
></DsButton>
```

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 移到按鈕上，按 Enter 或空白鍵觸發。
- **鍵盤**：停用和載入中的按鈕，Tab 會直接跳過。停用但可點的按鈕還是停得下來，按 Enter 會跳出不能用的原因。
- **焦點**：用鍵盤移過來時，外圍會出現焦點框，樣式跟 DS 其他元件共用同一套。
- **報讀軟體**：報讀軟體會念出按鈕上的文字，再告訴使用者這是按鈕。圖示不會念。
- **報讀軟體**：只放圖示、沒有文字的按鈕，名稱只能靠 `ariaLabel`。沒設的話報讀軟體念不出它叫什麼，開發模式下 console 會警告。
- **報讀軟體**：一旦設了 `ariaLabel`，報讀軟體就只念它，按鈕上的文字和載入中的 `loadingText` 都不念。所以有文字的按鈕，除非文字單獨看不出意思，不然不用設。
- **報讀軟體**：設了 `ariaPressed`，會念出現在是按下還是沒按下。`ariaCurrent` 只要不是 false，就會念出這是目前這一項。
- **報讀軟體**：設了 `ariaHaspopup`，報讀軟體會念出按下這顆按鈕會打開選單；`ariaExpanded` 則念出選單現在是開著還是關著。
- **報讀軟體**：載入中又沒給 `loadingText` 時，畫面上只剩轉圈；這時如果也沒設 `ariaLabel`，報讀軟體就念不出名稱。
- **報讀軟體**：停用但可點的按鈕，報讀軟體會念出它是停用的，但使用者還是按得下去。按了之後跳出來的原因說明，報讀軟體不會念。
- **動態**：載入轉圈 0.6 秒轉一圈。使用者在系統裡開了「減少動態」，它目前還是會轉。
- **觸控**：每個尺寸都比手機建議的觸控範圍小。iOS 建議 44 點、Android 建議 48 dp，按鈕最高的 L 也只有 40 px。

### 網頁專屬

- **ARIA 與 HTML 語意**：裡面用的是原生 `button` 元素，`type="button"`，所以放在表單裡也不會不小心送出表單。
- **ARIA 與 HTML 語意**：停用和載入中用的是原生 `disabled`。停用但可點則改用 `aria-disabled="true"`，這樣焦點和點擊都還在。
- **ARIA 與 HTML 語意**：`ariaLabel`、`ariaPressed`、`ariaCurrent`、`ariaHaspopup`、`ariaExpanded` 會分別變成內層 button 的 `aria-label`、`aria-pressed`、`aria-current`、`aria-haspopup`、`aria-expanded`，沒設就不會出現。

## 注意事項

- 自己在按鈕裡放圖示時，顏色寫 `color: currentColor`，別寫死，這樣圖示才會跟著按鈕的文字變色。尺寸照按鈕大小挑：XXS、XS、S 用 `size="12"`，M 用 `size="16"`，L 用 `size="24"`，跟按鈕內建的左右圖示一樣。
- **注意**：改完記得把滑鼠移上去看一眼，圖示應該跟文字一起變色，不能停在原本的灰色。如果圖示上寫死了 `style="color:#686868"`，滑過就不會變，改成 `color: currentColor` 或 `color: inherit` 就好。

## 對照表

### Icon size 對應表

| 按鈕尺寸 | Icon size | Icon px | 說明 |
| --- | --- | --- | --- |
| XXS (17px) | size="12" | 12×12 | 極小按鈕，僅容圖示 |
| XS (24px) | size="12" | 12×12 | 小型操作按鈕 |
| S (32px) | size="12" | 12×12 | 標準輔助按鈕 |
| M (36px) | size="16" | 16×16 | 主要操作按鈕（預設） |
| L (40px) | size="24" | 24×24 | 大型主要按鈕 |

### 語意選用指引（Semantic Usage Guide）

| 操作語意 | variant / color | 視覺特徵 | 實際範例 |
| --- | --- | --- | --- |
| 取消 / 關閉 / 還原 / 清除 | elevated | 白底毛玻璃，低視覺重量，暗示「可退出」 | 取消、清除篩選、重設、上一步 |
| 逆流程 / 危險操作（表單確認按鈕） | filled / danger | 紅底實心，高警示感 | 刪除確認、封存確認（Dialog 內） |
| 逆流程 / 危險操作（選單列表項目） | 不用按鈕，改用 [Menu Item](menu-item.md)，tone 設 danger | 紅色文字，無背景，適合選單密集排列 | [Action Menu](action-menu.md) 裡的刪除、封存 |
| 完成階段任務（里程碑） | filled / success | 綠底實心，傳達「達成」與「正向推進」 | 送出申請、發布、完成並開始填寫 |
| 一般往下推進 / 搜尋 / 主要動作 | filled / primary | 藍底實心，主要動作視覺重量最高 | 下一步、套用、登入、查詢 |
| 情境捷徑（卡片內輔助操作） | tonal / neutral | 灰底軟質感，hover 變灰實心，低調工具感，不與 CTA 競爭 | 同上方地址、從範本匯入、套用預設值 |
| inline 新增（＋新增項目） | ghost / primary | 藍色文字，無背景，適合內容中插入的輕量操作 | ＋ 新增其他項目、全部已讀 |
| 並排時的次要選項 | outlined / primary | 藍色邊框，重量低於 filled，適合與 filled/primary 並排 | 查看全部通知、Microsoft 365 登入（與「登入」並列） |
| 中性導覽（非業務動作） | outlined / neutral | 灰色邊框，低調，不干擾主要流程 | 登出平台、歷史搜尋詞 |
