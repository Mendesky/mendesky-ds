# Inline Add（inline-add）

分組：互動元件

在 chip 群組 / 清單尾端讓使用者新增「自訂項」。取代 native window.prompt；單行文字輸入不要在 modal 內再疊 dialog。

## 用法

### Angular（v0.9.0）

`app-inline-add`

[buttonText] [placeholder] [ariaLabel] [size:S|M] · (add: string) — ghost 觸發鈕原地變 inline 輸入框，Enter 提交

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.9.0/components/?path=/docs/inline-add--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `buttonText` | `string` | `'＋ 新增其他項目'` | 觸發鈕文字 |
| `placeholder` | `string` | `'輸入後按 Enter'` | inline 輸入框 placeholder |
| `size` | `'S' \| 'M'` | `'S'` | 尺寸，對齊相鄰 chip / button |
| `(add)` | `EventEmitter<string>` |  | Enter 提交時 emit trim 後的非空字串；去重 / 加入清單 / 勾選由父層處理 |
| `disabled` | `boolean` | `false` | 停用觸發鈕（權限控管用） |
| `ariaLabel` | `string` | `''` | 輸入框的報讀名稱，一律要設：放在有標題的 app-field 裡時用欄位標題；沒有欄位時，寫這一格要新增什麼。不設時報讀軟體只念提示文字。要寫 ariaLabel，不要寫 aria-label：aria-label 會留在外框上，輸入框還是只念提示文字。 |

#### 程式碼範例

**chip 群組新增自訂項**

```html
<app-field label="從哪裡得知這項活動">
  <div class="chip-wrap">
    @for (opt of options(); track opt) {
      <app-check-chip [text]="opt" [(ngModel)]="checked[opt]"></app-check-chip>
    }
    <!-- 內層輸入框不會念外層欄位標題，用 ariaLabel 設成欄位標題 -->
    <app-inline-add ariaLabel="從哪裡得知這項活動" (add)="addCustom($event)"></app-inline-add>
  </div>
</app-field>

// 父層：去重 + 加入清單 + 勾選（展示櫃原則，資料留在父層）
addCustom(name: string) {
  if (this.options().includes(name)) return;
  this.options.update(l => [...l, name]);
  this.onToggle(name, true); // 自動勾選 + fire API（optimistic）
}
```

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：輸入框裡按 Enter 送出，按 Esc 取消。方向鍵留在輸入框裡移動游標，不會跳到旁邊的選項。
- **鍵盤**：按住 Enter 只算一下：只新增一次，收起後也不會在觸發鈕上把輸入框再打開。
- **鍵盤**：用輸入法選字時按的 Enter、Esc 是給輸入法的，不會送出，也不會收起輸入框。
- **焦點**：點開後焦點直接進輸入框。
- **焦點**：按 Enter 或 Esc 收起後，焦點回到觸發鈕。
- **焦點**：點到別處或按 Tab 離開時，輸入框收起、內容丟掉，焦點不會被拉回觸發鈕。
- **報讀軟體**：輸入框不會念外層 [Field](field.md) 的標題，也不會念必填；不設 ariaLabel 時只念提示文字，聽不出這一格要填什麼。所以一律要設 ariaLabel：放在欄位裡時用欄位標題；沒有欄位時，寫這一格要新增什麼。
- **報讀軟體**：只給名稱、不標必填：外層欄位的必填指整組至少選一個，不是這一格一定要打字。

### 網頁專屬

- **ARIA 與 HTML 語意**：ariaLabel 輸出成內層輸入框的 aria-label；沒設時不輸出。內層輸入框寫在 [Inline Add](inline-add.md) 自己的模板裡，連不到外層 [Field](field.md)，所以沒有 aria-labelledby，也沒有 aria-required。

## 注意事項

- 展示櫃原則：本元件只管「輸入 affordance」，不持有清單 / 勾選。去重、加入清單、勾選由父層的 add 事件處理。
- 互動：僅 Enter 提交；按 Esc 或離開輸入框（點到別處、按 Tab）就取消，內容丟掉。例外：用輸入法選字時按的 Esc 是取消選字，不會收起輸入框。輸入態 keydown 已 stopPropagation，不會被 chip 群組方向鍵 roving focus 攔截。
