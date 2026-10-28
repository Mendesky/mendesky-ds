# Empty State（empty-state）

分組：展示元件

列表/查詢無資料時顯示。

## 用法

### Angular（v0.6.0）

`app-empty-state`

message · ng-content default slot（投影 CTA 按鈕或自訂內容）

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/empty-state--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `message` | `string` | `'目前無資料'` | 插圖下方文字；空字串時不顯示 |

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

#### Angular 注意事項

- 自訂內容走預設的 ng-content slot（不需 select）：直接寫在 <app-empty-state> 標籤內，就會投影到 message 文字下方。

## 注意事項

- 可以放入任意自訂內容（按鈕、含 inline CTA 的訊息段落等），放入的內容顯示在 message 文字下方。
