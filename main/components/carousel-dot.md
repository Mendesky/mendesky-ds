# Carousel Dot（carousel-dot）

分組：互動元件

圖片輪播指示、kanban 分頁點。多步驟 wizard 請改用 [Stepper](stepper.md)。

## 用法

### Angular（v0.7.0）

`app-carousel-dot`

variant: Dot|Line|Text · [active] text · (dotClick)

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/carousel-dot--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `variant` | `'Dot' \| 'Line'` | `'Dot'` | 基礎形狀 |
| `active` | `boolean` | `false` | 選中狀態（深藍膠囊） |
| `text` | `string` | `''` | 有值時啟用 hover 展開文字行為 |
| `(dotClick)` | `EventEmitter<void>` |  | 點擊時觸發 |

#### 程式碼範例

**Dot，無文字**

```html
<app-carousel-dot [active]="i === currentIndex" (dotClick)="currentIndex = i"></app-carousel-dot>
```

**Line，無文字**

```html
<app-carousel-dot variant="Line" [active]="i === currentIndex" (dotClick)="currentIndex = i"></app-carousel-dot>
```

**Dot + text（hover 展開膠囊）**

```html
<app-carousel-dot
  [text]="col.label"
  [active]="i === currentIndex"
  (dotClick)="currentIndex = i"
></app-carousel-dot>
```
