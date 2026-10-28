# Check Chip（check-chip）

分組：互動元件

篩選條件多選、標籤多選、表單內單一 boolean 偏好（如同意條款、Email 通知開關）。禁止用 checkbox 自刻。text 可為使用者自由輸入（inline-add 自訂項目）時無需額外設定——chip 預設就會折行。

## 用法

### Angular（v0.6.0）

`app-check-chip`

text size: s|m|xs · theme: default|transparent|transparent-grey · CVA 控制 selected/isDisabled · ariaLabel · 選取狀態自動輸出 aria-pressed · 長文字自動折行（不撐破容器）

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/check-chip--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 顯示文字；長內容自動折行（見 notes） |
| `size` | `CheckChipSize` | `'s'` | 'm' \| 's' \| 'xs' |
| `theme` | `CheckChipTheme` | `'default'` | 'default' \| 'transparent' \| 'transparent-grey' |
| `disabled` | `boolean` | `false` | template 直接 disable（權限 gating 用；CVA setDisabledState 之外的 additive 入口） |
| `ariaLabel` | `string` | `''` | 報讀軟體念的名稱，套在內層 button 的 aria-label；沒設時念 text。只在 text 單獨看不出意思時才設。 |

#### 程式碼範例

**多選群組（ReactiveForm）**

```html
<app-check-chip
  text="台北"
  theme="default"
  size="s"
  formControlName="taipei"
></app-check-chip>
```

**NgModel 雙向綁定**

```html
<app-check-chip
  text="已完成"
  theme="transparent-grey"
  [(ngModel)]="filterDone"
></app-check-chip>
```

#### Angular 注意事項

- **注意**：ariaLabel 要寫成元件的設定（ariaLabel="…" 或 [ariaLabel]="…"）。直接寫 aria-label 或 [attr.aria-label] 會留在外層 app-check-chip 上，到不了內層 button，報讀軟體讀不到。
- app-check-chip 實作 ControlValueAccessor（writeValue／registerOnChange／registerOnTouched／setDisabledState），可用 ngModel 或 formControlName 綁定。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 移到勾選標籤，空白鍵或 Enter 切換選取。
- **鍵盤**：停用時 Tab 會跳過。
- **焦點**：用鍵盤移到勾選標籤時，外圍出現 2 px 的淺藍色焦點框，距離標籤 2 px，顏色比 DS 共用的焦點框淺；用滑鼠點不會出現。
- **報讀軟體**：念出 text、按鈕角色，以及目前是否已選。勾選圖示不會被念出。
- **報讀軟體**：text 單獨看不出意思時（例如好幾組都有「其他」），用 ariaLabel 給完整名稱。設了 ariaLabel 就不再念 text。
- **動態**：選取時底色、框線、文字色變化 0.15 秒。目前不會因為使用者設定「減少動態」而停止。

### 網頁專屬

- **ARIA 與 HTML 語意**：用原生 button 元素，type="button"，用 aria-pressed 表示已選（"true"）或未選（"false"），跟 [Radio Chip](radio-chip.md) 一致。
- **ARIA 與 HTML 語意**：停用用原生 disabled。
- **ARIA 與 HTML 語意**：ariaLabel 輸出成 aria-label；沒設時不輸出。

## 注意事項

- 可以跟表單雙向綁定值：表單寫入值、元件回報變更與 touched、表單切換停用狀態都支援
- 長文字折行是預設行為（white-space: normal + overflow-wrap: anywhere + max-width: 100%），短標籤在放得下時渲染不變。2026-08-04 起：原本的 white-space: nowrap 會讓 min-content ＝ 整串文字寬 → chip 作為 flex item 完全不可收縮 → 自由輸入的長選項（搭配 inline-add 的多選欄位）必定撐破卡片。
- 折行的兩個必要配套（缺了只是半修好）：元件本身的元素是 `<button>`，UA 預設 text-align: center 會讓多行文字逐行居中、難讀，故需 text-align: left；.chip 是 flex 容器，文字折行撐高時 16px checkbox icon 會被 flex-shrink 壓成橢圓，故 icon 需 flex: none。

## 對照表

### Theme 使用情境

| Theme | 未選中 | 選中 | 適用場景 |
| --- | --- | --- | --- |
| default | 灰底（#e7e7e7） | 綠底白字（#74ae3e） | 表單多選主要用途 |
| transparent | 透明 | 綠字，無底色 | 輕量標籤、緊湊篩選 |
| transparent-grey | 透明 | 深灰底白字（#7d7d7d） | 次要篩選、灰色系場景 |
