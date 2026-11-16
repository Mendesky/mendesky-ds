# Empty State（empty-state）

分組：展示元件

區塊沒有內容可以顯示時，在原地說明為什麼沒有。有兩種版本：讀到了但沒有資料（例如列表、查詢沒有結果），用預設的空狀態；內容讀取失敗，把 variant 設為 error，用錯誤版本取代讀不到的內容，規則見互動原則「區塊載入失敗」（`loading.load-failure-inline`）。沒有讀取權限不算讀取失敗，不用錯誤版本。

## 部位

1. **插圖**：空狀態才有。200 × 158 px 的插圖，放大鏡一直左右擺動。
2. **文字**：空狀態才有。插圖下方的灰色說明，內容是 message；message 是空字串時不顯示。
3. **圖示**：錯誤版本才有。24 px 的 `Alert-Info` 圖示，顏色是 `--icon/warning`（#cc5252）。
4. **標題**：錯誤版本才有。寫哪一塊沒載入，字型 `noto-14-medium`，顏色 `--text/title`。
5. **說明**：錯誤版本才有，選填。寫下一步怎麼做，字型 `noto-12-regular`，顏色 `--text/body`。說明是這個區塊唯一的下一步指示，顏色要讓白底對比達到 4.5:1，不用更淡的 `--text/body-light`。
6. **重試鈕**：錯誤版本、而且使用端接了 retry 事件時才有。[Button](button.md) 的外框樣式（outlined）、中性色（neutral）、S 尺寸，左邊是 `Refresh` 圖示。
7. **自訂內容**：兩種版本都可以放，在最下方。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 空狀態 | 預設。顯示插圖和 message。 |
| 錯誤 | variant 是 error。圖示、標題、說明、重試鈕由上往下置中排列。重試鈕可以按，按下送出 retry 事件。 |
| 重試中 | variant 是 error，retrying 設為「正在重試」。重試鈕顯示載入圈和「重試中」，按了沒有反應。圖示、標題、說明不變。retrying 改回來時，重試鈕恢復可以按。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 標題寫哪一塊沒載入，例如「附件清單載入失敗」。不知道是哪一塊時，才用預設的「載入失敗」。
- 說明寫下一步：先請使用者重試，再寫重試沒用時找誰，例如「請重試。如果一直失敗，請聯絡系統管理員。」
- 用 `--es-min-height` 把錯誤版本撐到跟正常內容一樣高，外框也照正常內容加。

### 不要這樣做

- 讀取失敗時不要顯示空狀態的「目前無資料」。使用者會以為真的沒有資料。
- 標題和說明不要寫錯誤代碼、API 名稱這類使用者看不懂、也處理不了的詞。
- 重試中不要把區塊換回骨架或載入畫面。版面會閃一下，使用者也看不出重試還在進行。
- 沒有讀取權限時不要用錯誤版本。那是確定的結果，重試也不會變。

## 用法

### Angular（v0.12.1）

`app-empty-state`

variant（empty／error）· message · title · description · retryText · retrying · (retry) · ng-content default slot（投影 CTA 按鈕或自訂內容）

[在範例網站看全部 7 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/?path=/docs/empty-state--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `variant` | `'empty' \| 'error'` | `'empty'` | empty 顯示插圖與 message；error 是內容讀取失敗，改顯示紅色圖示、標題、說明與重試鈕 |
| `message` | `string` | `'目前無資料'` | 插圖下方文字；空字串時不顯示。只有 empty 版本顯示 |
| `title` | `string` | `'載入失敗'` | error 版本的標題：寫哪一塊沒載入 |
| `description` | `string` | `''` | error 版本的說明：寫下一步；空字串時不顯示 |
| `retryText` | `string` | `'重試'` | error 版本重試鈕的文字 |
| `retrying` | `boolean` | `false` | error 版本：true 時重試鈕顯示載入圈與「重試中」，再按不會送出 (retry) |
| `(retry)` | `EventEmitter<void>` |  | error 版本按下重試鈕時 emit。有綁這個事件，重試鈕才會出現 |

#### 事件

| 名稱 | 型別 | 說明 |
| --- | --- | --- |
| `retry` | `EventEmitter<void>` | 按下錯誤版本的重試鈕時發射。retrying 為 true 時不發射。元件以 retry.observed 判斷要不要顯示重試鈕，所以不能重試的地方不要綁。 |

#### 程式碼範例

**預設文字**

```html
<app-empty-state></app-empty-state>
```

**自訂文字**

```html
<app-empty-state message="查無符合的項目"></app-empty-state>
```

**不顯示文字**

```html
<app-empty-state message=""></app-empty-state>
```

**投影 CTA 按鈕**

```html
<app-empty-state message="尚無資料">
  <app-button variant="filled" color="primary" size="M"
    text="新增" leftIcon="Plus"
    (btnClick)="onAdd()"></app-button>
</app-empty-state>
```

**讀取失敗、可以重試**

```html
@if (loadFailed()) {
  <div class="attachments-frame">
    <app-empty-state variant="error"
      title="附件清單載入失敗"
      description="請重試。如果一直失敗，請聯絡系統管理員。"
      [retrying]="retrying()"
      (retry)="retryLoad()"></app-empty-state>
  </div>
} @else {
  <!-- 正常的附件清單 -->
}
```

**讀取失敗、不能重試（不綁 retry，不出現重試鈕）**

```html
<app-empty-state variant="error"
  title="附件清單載入失敗"
  description="請聯絡系統管理員。"></app-empty-state>
```

#### Angular 注意事項

- 自訂內容走預設的 ng-content slot（不需 select）：直接寫在 <app-empty-state> 標籤內，就會投影到最下方。empty 與 error 兩種版本都會顯示。
- 跟正常內容對齊高度：在外框的 CSS 設 app-empty-state { --es-min-height: 306px; }（數值量正常內容的高度），錯誤版本會撐到這個高度、內容上下置中。只對 error 版本生效。
- 重試流程：(retry) 裡把 retrying 設為 true、只重讀失敗的那一段；失敗時設回 false，錯誤版本留著；成功時等內容全部讀完才把 @if 切回正常內容，中間不切回骨架。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Enter 或空白鍵：按重試鈕。
- **焦點**：錯誤版本出現時，焦點不自動移過去：使用者可能正在操作別的區塊。
- **焦點**：重試中，重試鈕暫時不能按，接不住焦點。焦點原本在重試鈕上時，移到錯誤區塊本身，不掉出區塊。重試失敗、按鈕恢復時，焦點還停在錯誤區塊上的話，移回重試鈕，使用者再按一次 Enter 就能再試。
- **焦點**：重試成功、錯誤版本被換成正常內容時，元件管不到焦點。焦點原本在錯誤區塊裡的話，使用端把焦點移到新內容的開頭；整塊被移除或整頁換掉時，移到接手的內容。
- **報讀軟體**：錯誤版本是狀態訊息：標題或說明改變時，報讀軟體念完目前的內容才念，不打斷使用者。
- **報讀軟體**：錯誤版本跟文字一起出現的那一刻，有些報讀軟體不會念，各家做法不同。使用者移到區塊時一定念得到標題和說明。
- **報讀軟體**：圖示只是裝飾，不念。

### 網頁專屬

- **ARIA 與 HTML 語意**：錯誤版本的外層是 role="status"，空狀態不設角色。
- **ARIA 與 HTML 語意**：錯誤版本的外層有 tabindex="-1"，讓焦點在重試中可以停在區塊上；按 Tab 不會停在這裡。
- **ARIA 與 HTML 語意**：圖示加 aria-hidden="true"。

## 注意事項

- 可以放入任意自訂內容（按鈕、含 inline CTA 的訊息段落等）。兩種版本都可以放，放入的內容顯示在最下方。
- 錯誤版本不顯示插圖和 message，改顯示紅色圖示、標題（title）、說明（description）和重試鈕。title 預設是「載入失敗」，description 預設不顯示，重試鈕的文字（retryText）預設是「重試」。
- 重試鈕只在使用端接了 retry 事件時才出現。重讀也不會成功的地方不要接，畫面就不會出現按了沒用的按鈕。
- retrying 設為「正在重試」時，重試鈕顯示載入圈和「重試中」，再按也不會送出 retry。區塊維持錯誤版本，不換回骨架或載入畫面。
- **注意**：錯誤版本沒有外框，也不撐高。使用端照被取代的正常內容加外框，並用樣式變數 `--es-min-height` 設成跟正常內容一樣高；內容在這個高度裡上下置中。重試成功、換回正常內容時，版面才不會跳。
