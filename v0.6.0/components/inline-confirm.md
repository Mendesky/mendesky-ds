# Inline Confirm（inline-confirm）

分組：互動元件

前提依賴型確認（contextualInline）：父層需要使用者在主操作前先勾選「已確認 XXX」。對應 ds-patterns action.precondition-acknowledge.scenarios[0]。

## 用法

### Angular（v0.7.0）

`app-inline-confirm`

label / description / checkLabel · requirement: required|optional · [(confirmed)] model signal · <ng-content select="[inlineConfirmDetails]"> 投影 bullets

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/inline-confirm--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `label` | `string` | `(required)` | 前提聲明主訴，宣告句式不用問句 |
| `description` | `string` | `undefined` | 補充說明（選填） |
| `checkLabel` | `string` | `(required)` | 勾選項文案，宣告句式「我已確認 XXX」 |
| `requirement` | `'required' \| 'optional'` | `'required'` | required = 父層主按鈕依賴簽名；optional = 複核式，元件額外渲染「（選填）」 |
| `confirmed` | `ModelSignal<boolean>` | `false` | 雙向綁定 [(confirmed)]；父層職責：進頁面時 signal.set(false) 重置 |
| `size` | `'md' \| 'lg'` | `'md'` | lg = 16px 字體 + 較大 padding，用於主要流程確認步驟 |
| `fullWidth` | `boolean` | `false` | 勾選按鈕撐滿父層寬度 |
| `hideRequiredIcon` | `boolean` | `false` | 隱藏 required 模式的 Alert icon（已有其他警示元素時使用） |
| `disabled` | `boolean` | `false` | 整個元件 disabled（前置條件未滿足時） |
| `error` | `boolean` | `false` | 驗證失敗時切換為警示色框（var(--button/error)）；各 inline-confirm 獨立綁定，不共用外框 |
| `errorMessage` | `string` | `''` | 欄位驗證錯誤訊息；有值時顯示 tooltip（位置見 errorPosition，預設下方；空字串 = 不顯示）。與 error prop 通常一起使用。 |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤提示位置。欄位錯誤統一預設在下方；只有版面放不下（下方緊接其他內容會被遮住）時才改 top（2026-10-14 定案） |

#### 程式碼範例

**Required — 阻塞主按鈕**

```html
<app-inline-confirm
  requirement="required"
  label="發布前請確認內容已經過審核"
  description="未確認前無法發布。"
  checkLabel="我已確認內容經過審核"
  [(confirmed)]="approved">
</app-inline-confirm>
<app-button text="下一步" [disabled]="!approved()"></app-button>
```

**Optional — 複核式（bullets 用 ng-content）**

```html
<app-inline-confirm
  requirement="optional"
  label="送出前確認設定"
  checkLabel="我已複核以上設定"
  [(confirmed)]="reviewed">
  <ul inlineConfirmDetails>
    <li>金額：<strong>NT$ 120,000</strong></li>
    <li>連絡窗口：王小姐</li>
    <li>條款：<a href="...">標準版</a></li>
  </ul>
</app-inline-confirm>
<app-button text="確認送出"></app-button>
```

#### Angular 注意事項

- 外部主按鈕的 disabled 由消費者自己綁，例如 [disabled]="!confirmed()"，confirmed 是父層用 [(confirmed)] 雙向綁定的 signal。
- bullets 用 <ng-content select="[inlineConfirmDetails]"> 投影：在要放進去的元素加上 inlineConfirmDetails 屬性（例如 <ul inlineConfirmDetails>），內容支援超連結 / <strong> / <app-label> 等 rich markup。
- **注意**：父層職責：離開頁面再回來必須對綁在 [(confirmed)] 的 signal 呼叫 set(false) 清空 stale state；元件不自動重置。

## 注意事項

- 元件不控制外部主按鈕 disabled，消費者自行把主按鈕的 disabled 設為「還沒勾選」（confirmed 為 false 時停用）
- bullets 以放入自訂內容的方式提供，支援超連結 / `<strong>` / [Label](label.md) 等 rich markup
- **注意**：父層職責：離開頁面再回來必須把 confirmed 重設為 false，清空 stale state；元件不自動重置

## 對照表

### requirement 使用情境

| requirement | 視覺 | 主按鈕 | 適用場景 |
| --- | --- | --- | --- |
| required | 淡灰底 + Alert icon + label 加重 | 還沒勾選時 disabled | 阻塞型前提：發布前確認已審核、匯入前確認格式、同意條款後才能繼續 |
| optional | 透明底 + 細邊框 + 「（選填）」suffix | 常 enabled | 複核式提醒：送出前逐項 review、風險提示 |
