# Inline Add（inline-add）

分組：互動元件

在 chip 群組 / 清單尾端讓使用者新增「自訂項」。取代 native window.prompt；單行文字輸入不要在 modal 內再疊 dialog。

## 用法

### Angular（v0.6.0）

`app-inline-add`

[buttonText] [placeholder] [size:S|M] · (add: string) — ghost 觸發鈕原地變 inline 輸入框，Enter 提交

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/inline-add--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `buttonText` | `string` | `'＋ 新增其他項目'` | 觸發鈕文字 |
| `placeholder` | `string` | `'輸入後按 Enter'` | inline 輸入框 placeholder |
| `size` | `'S' \| 'M'` | `'S'` | 尺寸，對齊相鄰 chip / button |
| `(add)` | `EventEmitter<string>` |  | Enter 提交時 emit trim 後的非空字串；去重 / 加入清單 / 勾選由父層處理 |
| `disabled` | `boolean` | `false` | 停用觸發鈕（權限控管用） |

#### 程式碼範例

**chip 群組新增自訂項**

```html
<div class="chip-wrap">
  @for (opt of options(); track opt) {
    <app-check-chip [text]="opt" [(ngModel)]="checked[opt]"></app-check-chip>
  }
  <app-inline-add (add)="addCustom($event)"></app-inline-add>
</div>

// 父層：去重 + 加入清單 + 勾選（展示櫃原則，資料留在父層）
addCustom(name: string) {
  if (this.options().includes(name)) return;
  this.options.update(l => [...l, name]);
  this.onToggle(name, true); // 自動勾選 + fire API（optimistic）
}
```

## 注意事項

- 展示櫃原則：本元件只管「輸入 affordance」，不持有清單 / 勾選。去重、加入清單、勾選由父層的 add 事件處理。
- 互動：僅 Enter 提交；Esc / blur 一律取消（最不意外）。輸入態 keydown 已 stopPropagation，不會被 chip 群組方向鍵 roving focus 攔截。
