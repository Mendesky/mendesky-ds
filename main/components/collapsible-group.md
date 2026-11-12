# Collapsible Group（collapsible-group）

分組：互動元件

把幾個 [Collapsible](collapsible.md) 包成一組，一次只開一段。例如幾組設定一起打開會太長，使用者一次也只改一組。每段各自開合的話不用包。

## 部位

1. **收合區塊**：一個以上的 [Collapsible](collapsible.md)，依序排下來。群組本身不畫外框、不加間距，排法由頁面決定。

## 狀態

| 狀態 | 長怎樣、什麼時候出現 |
| --- | --- |
| 全部收合 | 每段都收著。 |
| 一段展開 | 設了 `single` 時，使用者打開另一段，這段會跟著收起來。 |

## 可以這樣做、不要這樣做

### 可以這樣做

- 一次只會改一組的設定，包進群組並設 `single`，畫面不會一路長下去。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/iframe.html?id=collapsible-group--single&viewMode=story)）

### 不要這樣做

- 使用者常常要對照兩段內容時還設 `single`。他打開第二段，第一段就被收走了。

## 用法

### Angular（v0.12.1）

`app-collapsible-group`

[single] · 包住 app-collapsible（可以隔著卡片等元素）

[在範例網站看全部 1 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/?path=/docs/collapsible-group--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `single` | `boolean` | `false` | 一次只開一段。設了之後，使用者打開一段時，同一組裡原本開著的段落收起來，並各自發 (expandedChange) 帶出 false；打開的那段最後才發 true。 |

#### 程式碼範例

**一次只開一段**

```html
<app-collapsible-group single>
  <app-collapsible title="第一組設定">…</app-collapsible>
  <app-collapsible title="第二組設定">…</app-collapsible>
  <app-collapsible title="第三組設定">…</app-collapsible>
</app-collapsible-group>
```

**段落包在卡片裡也算同一組**

```html
<app-collapsible-group single>
  @for (item of items; track item.id) {
    <div class="card">
      <app-collapsible appearance="card" [title]="item.name">…</app-collapsible>
    </div>
  }
</app-collapsible-group>
```

#### Angular 注意事項

- app-collapsible 往外找最近的群組，中間隔著幾層元素都算。段落內容裡再放的 app-collapsible 不算這一組，打開它不會收掉外層。
- **注意**：「往外找」看的是 app-collapsible 寫在哪個範本，不是畫面上的位置。自己寫的包裝元件用 <ng-content> 把內容投影進 app-collapsible 時，內容裡的 app-collapsible 寫在頁面範本裡、跟段落同一層，會被算成同一組，打開它就收掉外層。這種寫法不要用群組，由頁面自己控制開合。
- **注意**：群組只在使用者打開一段時收起其他段。頁面自己用 [(expanded)] 打開某一段時，群組不會收其他段，要一次只開一段就由頁面自己把其他段設成 false。
- 停用的段落不會被群組收起來，維持原來的開合。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 依序停在每段的標題按鈕，跟單獨的 [Collapsible](collapsible.md) 一樣；沒有方向鍵。
- **報讀軟體**：每段的標題按鈕各自念出已展開或已收合。因為打開另一段而被收起來的那段，不會另外通知。

## 注意事項

- 設了 `single`，使用者打開一段時，原本開著的那段會自己收起來。沒設的話跟沒包一樣，各段各自開合。
- 被收起來的段落先各自通知收合，使用者打開的那段最後才通知展開。頁面用一個值記「現在開著哪一段」時，最後記到的就是打開的那段。
- 可以全部收起來，不會硬留一段開著。
- 頁面自己改 `expanded` 打開某一段時，群組不會收其他段。這時要一次只開一段，由頁面自己把其他段關掉。
- 停用的段落不會被群組收起來，維持原來的開合。
- 段落包在卡片之類的元素裡也算同一組。段落內容裡再放的 [Collapsible](collapsible.md) 不算這一組，打開它不會收掉外層。
- 群組認的是程式碼寫在哪裡，不是畫面上的位置。用自己寫的包裝元件把內容投影進段落時，內容裡再放的 [Collapsible](collapsible.md) 在程式碼裡跟段落同一層，會被算成同一組，打開它就收掉外層。這種寫法不要用群組，由頁面自己控制開合。
- 群組只管「一次開幾段」。外觀、箭頭位置、停用都在每個 [Collapsible](collapsible.md) 上設。
