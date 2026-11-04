# Ctrl Bar（ctrl-bar）

分組：展示元件

頁面或區塊頂部的操作列，左側放篩選/toggle，右側放搜尋/切換。

## 用法

### Angular（v0.7.0）

`app-ctrl-bar`

slot=left · slot=right · flex 佈局容器，左右分佈操作列內容

[在範例網站看全部 1 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/ctrl-bar--%E8%AA%AA%E6%98%8E)

#### 屬性

沒有輸入屬性。

#### 程式碼範例

**基本用法**

```html
<app-ctrl-bar>
  <ng-container slot="left">
    <!-- 篩選、排序等左側控制項 -->
    <app-icon-btn propClass="Normal" size="24" ...></app-icon-btn>
  </ng-container>
  <ng-container slot="right">
    <!-- 搜尋、POV 切換等右側控制項 -->
    <app-input ...></app-input>
  </ng-container>
</app-ctrl-bar>
```

#### Angular 注意事項

- 左右兩區用內容投影放入：在元素加上 slot="left" 或 slot="right" 屬性（元件內是 <ng-content select="[slot=left]"> 與 <ng-content select="[slot=right]">），例如 <ng-container slot="left">。

## 對照表

### 放入位置

| 位置 | 說明 |
| --- | --- |
| left | 左對齊區塊，items flex-wrap，適合篩選 chips、toggle、排序按鈕 |
| right | 右對齊區塊，flex-shrink: 0，適合搜尋欄、視角切換 |
