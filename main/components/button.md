# Button（button）

分組：互動元件

任何可點擊操作。禁止原生 `<button>`。loading=true 時 spinner 取代 icon、改成停用的灰底、點擊無效。**放入自訂內容（不給 text，例如選單選項放「標籤＋名稱」）時，裡面的文字顏色寫 color: inherit**，否則 ghost／elevated 的滑過、按下文字色套不到（2026-10-02：寫死深色字 → ghost 滑過變深灰底配黑字）。

## 部位

1. **外框**：可以點的範圍。高度依 size：XXS 17、XS 24、S 32、M 36、L 40 px。
2. **左側圖示**：leftIcon，選填。顏色跟著按鈕的文字色（有說明時例外，見「說明」）。
3. **左側標籤**：leftLabel、centerLabel，選填。文字前面的小標籤，用 [Label](label.md) 顯示。
4. **文字**：text，說明這個操作。沒有 text 時，這個位置可以放入自訂內容。
5. **說明**：description，選填。顯示在文字下方，整個按鈕改成靠左對齊。文字改用較深的標題色，說明用較淺的灰色，圖示維持按鈕原本的顏色；滑過時文字與說明都改用按鈕的文字色。左側的圖示與標籤排在文字上一行，右側的標籤、圖示與快速鍵提示排在說明下一行，所以按鈕可能超過兩行。
6. **右側標籤**：rightLabel，選填。
7. **右側圖示**：rightIcon，選填。顏色跟著按鈕的文字色（有說明時例外，見「說明」）。
8. **快速鍵提示**：shortcut，選填。只顯示提示文字，不會綁定快速鍵；主要用在 [Action Menu](action-menu.md) 的選項。
9. **載入轉圈**：只在 loading 時出現。載入中只顯示轉圈與 loadingText，其他部位都不顯示。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 預設 | 底色與文字色依 variant 與 color。 |
| 滑過 | filled 的底色變深一階；tonal、outlined、ghost 變成實心底配淺色字（outlined 的 success 例外：維持白底、框線變綠）；elevated 浮起並出現陰影。 |
| 按下 | 底色再深一階。例外：outlined 的 neutral 與 elevated 變成藍底配淺色字，elevated 的陰影也消失；outlined 的 success 從白底變成實心綠底配淺色字。 |
| 焦點 | 用鍵盤移到按鈕時，外圍出現焦點框；用滑鼠點不會出現。 |
| 停用 | disabled。灰底灰字，點了沒有反應，鍵盤也移不到上面。 |
| 停用但可點 | disabled 加 clickableWhenDisabled。外觀同停用，但仍能點、鍵盤也移得到；點了不執行操作，改在按鈕上方顯示 disabledMessage 說明原因，直到按鈕恢復可用。 |
| 載入中 | loading。改成停用的灰底，轉圈與文字是深灰色；有 loadingText 時顯示 loadingText，沒有時只剩轉圈，其他部位都不顯示。點了沒有反應，鍵盤也移不到上面。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 載入中給 loadingText（例如「儲存中…」）。只剩轉圈時，報讀軟體念不出按鈕在做什麼。
- 要讓使用者知道為什麼不能按時，用 clickableWhenDisabled 加 disabledMessage：按鈕看起來停用，點了會在上方說明原因。
- 需要撐滿容器寬度時用 fullWidth。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/iframe.html?id=button--full-width&viewMode=story)）
- 切換鈕（按一下開、再按一下關）用 ariaPressed 標出按下狀態；清單中的目前這一項用 ariaCurrent 標出。

### 不要這樣做

- 只有圖示、沒有文字時，不要省略 ariaLabel：報讀軟體會念不出名稱。這種按鈕優先改用 [Icon Button](icon-btn.md)；要保留按鈕外觀時，一定要設 ariaLabel。
- 不要在按鈕裡放另一個可以點的東西（連結、按鈕、勾選框）。鍵盤與報讀軟體無法分別操作按鈕裡面的東西。
- 不要以為設了 shortcut，按快速鍵就會觸發。它只顯示提示，快速鍵要另外綁定。

## 用法

### Angular（v0.5.0）

`app-button`

variant: filled|tonal|outlined|ghost|elevated · color: primary|success|danger|neutral · size: XXS|XS|S|M|L · leftIcon/rightIcon · [disabled] [fullWidth] [loading] · [clickableWhenDisabled] [disabledMessage] · (btnClick) (disabledClick)

[在範例網站看全部 19 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/button--%E8%AA%AA%E6%98%8E)

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

#### Angular 注意事項

- app-button 用 Angular 預設的樣式封裝（Emulated），內部的 .btn 等 class 帶有元件專屬的屬性選擇器；使用端要覆寫按鈕內部樣式，寫在使用端元件自己的樣式裡碰不到這些 class；要寫在全域樣式表並讓權重高於元件內的規則，或在元件樣式裡用 ::ng-deep。

### Vue（試做）（v0.2.0）

`<DsButton>`

variant: filled|tonal|outlined|ghost|elevated · color: primary|success|danger|neutral · size: XXS|XS|S|M|L · leftIcon/rightIcon · disabled fullWidth loading · clickableWhenDisabled disabledMessage · @btn-click @disabled-click

[在範例網站看全部 19 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.2.0/components/?path=/docs/button--%E8%AA%AA%E6%98%8E)

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

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 移到按鈕，Enter 或空白鍵觸發。
- **鍵盤**：停用與載入中的按鈕，Tab 會跳過。停用但可點的按鈕，Tab 仍會停留，按 Enter 會顯示不能用的原因。
- **焦點**：用鍵盤移到按鈕時，外圍顯示焦點框（DS 共用的焦點框樣式）。
- **報讀軟體**：念出按鈕上的文字與「按鈕」。圖示不會被念出。
- **報讀軟體**：只有圖示、沒有文字時，名稱只來自 ariaLabel；沒設的話報讀軟體念不出名稱，開發模式會在 console 警告。
- **報讀軟體**：設了 ariaLabel 時，報讀軟體只念 ariaLabel，不念按鈕上的文字，載入中的 loadingText 也不念。有文字的按鈕只在文字單獨看不出意思時才設 ariaLabel。
- **報讀軟體**：設了 ariaPressed 時，念出按下或未按下。ariaCurrent 設成 false 以外的值時，念出這是目前這一項。
- **報讀軟體**：載入中沒有 loadingText 時只剩轉圈；沒設 ariaLabel 的話，報讀軟體念不出名稱。
- **報讀軟體**：停用但可點時，報讀軟體會念出停用狀態，但仍然可以按。按了之後出現的原因說明，報讀軟體不會念出。
- **動態**：載入轉圈每 0.6 秒轉一圈。目前不會因為使用者設定「減少動態」而停止。
- **觸控**：高度 XXS 17、XS 24、S 32、M 36、L 40 px，都小於 iOS 建議的 44 點與 Android 建議的 48 dp 觸控範圍。

### 網頁專屬

- **ARIA 與 HTML 語意**：用原生 button 元素，type="button"，放在表單裡不會送出表單。
- **ARIA 與 HTML 語意**：停用與載入中用原生 disabled。停用但可點時改用 aria-disabled="true"，保留焦點與點擊。
- **ARIA 與 HTML 語意**：ariaLabel、ariaPressed、ariaCurrent 分別輸出成內層 button 的 aria-label、aria-pressed、aria-current；沒設時不輸出。

## 注意事項

- Icon 一律使用 color:currentColor，不可寫死顏色。尺寸對應：XXS/XS → size="12"，S/M → size="16"，L → size="24"。
- **注意**：驗證重點：hover 時所有 icon 顏色應與文字同步變白，不得保留灰色。若 icon 有 style="color:#686868" 寫死，hover 不會變色 — 請改為 style="color:currentColor" 或 color:inherit。

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
| 逆流程 / 危險操作（選單列表項目） | ghost / danger | 紅色文字，無背景，適合選單密集排列 | Action Menu 內的刪除、封存 |
| 完成階段任務（里程碑） | filled / success | 綠底實心，傳達「達成」與「正向推進」 | 送出申請、發布、完成並開始填寫 |
| 一般往下推進 / 搜尋 / 主要動作 | filled / primary | 藍底實心，主要動作視覺重量最高 | 下一步、套用、登入、查詢 |
| 情境捷徑（卡片內輔助操作） | tonal / neutral | 灰底軟質感，hover 變灰實心，低調工具感，不與 CTA 競爭 | 同上方地址、從範本匯入、套用預設值 |
| inline 新增（＋新增項目） | ghost / primary | 藍色文字，無背景，適合內容中插入的輕量操作 | ＋ 新增其他項目、全部已讀 |
| 並排時的次要選項 | outlined / primary | 藍色邊框，重量低於 filled，適合與 filled/primary 並排 | 查看全部通知、Microsoft 365 登入（與「登入」並列） |
| 中性導覽（非業務動作） | outlined / neutral | 灰色邊框，低調，不干擾主要流程 | 登出平台、歷史搜尋詞 |
