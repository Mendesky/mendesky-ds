# Footer（footer）

分組：展示元件

登入頁與 Shell 共用頁尾。禁止自刻 `<footer>` 複製文字。

## 用法

### Angular（v0.5.0）

`app-footer`

（無 Input/Output）· CSS 自訂屬性：--footer-padding --footer-font-size --footer-word-break --footer-overflow-wrap

[在範例網站看全部 3 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/footer--%E8%AA%AA%E6%98%8E)

#### 屬性

沒有輸入屬性。

#### 程式碼範例

**基本用法**

```html
<!-- 基本用法 -->
<app-footer />

<!-- RWD 覆寫（在父元件 SCSS 中，不需 ::ng-deep） -->
@include bp.tablet-down {
  app-footer {
    --footer-padding: 12px 10px;
    --footer-font-size: 12px;
    --footer-word-break: keep-all;
    --footer-overflow-wrap: break-word;
  }
}
```

#### Angular 注意事項

- 父層在自己的 SCSS 對 app-footer 設定 --footer-* CSS 自訂屬性即可覆寫 RWD 樣式，不需 ::ng-deep。

## 注意事項

- 全域版權頁尾，登入頁與 Shell 共用。父層可用 CSS 自訂屬性覆寫 RWD 樣式，不需要穿透元件的樣式封裝。

## 對照表

### CSS 自訂屬性（父層可覆寫）

| 屬性 | 預設值 | 說明 |
| --- | --- | --- |
| --footer-padding | 10px 10px 20px | 整體 padding |
| --footer-font-size | 1em | 字體大小 |
| --footer-word-break | normal | 換行規則 |
| --footer-overflow-wrap | normal | 溢出換行 |
