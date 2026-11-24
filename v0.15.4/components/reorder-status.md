# Reorder Status（reorder-status）

分組：工具

可排序清單的報讀區。看不到畫面的人移動項目之後，靠它聽到「移到哪裡了」。每份用 [Reorder Handle](reorder-handle.md) 的清單外面放一個；巢狀清單整組放一個就好。畫面上看不到它。

## 可以這樣做、不要這樣做

### 可以這樣做

- 放在清單容器的旁邊，跟清單包在同一個外層裡。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/iframe.html?id=reorder-status--default&viewMode=story)）

### 不要這樣做

- 用條件判斷，等到要念的時候才把它放上頁面。報讀軟體常常不念同一刻出現的區域。
- 用 toast 告訴報讀軟體排好了。toast 會自己消失，也不一定念得到；排序已存檔的 toast 照常跳，報讀用這個。

## 用法

### Angular（v0.19.1）

`app-reorder-status`

announce(text) · clear()

[在範例網站看全部 1 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/?path=/docs/reorder-status--%E8%AA%AA%E6%98%8E)

#### 屬性

沒有輸入屬性。

#### 程式碼範例

**放在清單旁邊，移動後念結果**

```html
<div class="wrap">
  <div class="list ds-sortable" cdkDropList (cdkDropListDropped)="onMove($event)">…</div>
  <app-reorder-status #status></app-reorder-status>
</div>

// component
@ViewChild('status') status!: ReorderStatusComponent;
this.status.announce(reorderMessage({ name, from, to, count }));
```

#### Angular 注意事項

- 用 @ViewChild 取得元件，呼叫 announce(句子) 念、clear() 清空。不要包在 @if 裡：它要比句子先出現在頁面上。
- 「離開」以它的父元素為準：焦點移到父元素外面，或滑鼠移出父元素，就清空。所以父元素要包住整份清單（巢狀清單包住最外層）。
- 在 app-modal-shell 裡的清單，把它放在 modal 的內容裡，不要放到 body。
- 測試：announce 之後馬上讀元素的文字；元件不開計時器，fakeAsync 不用另外 flush。

## 無障礙

### 網頁和 APP 都要做到

- **報讀軟體**：移動之後念一次結果，例如「『項目一』已從第 1 個移到第 3 個，共 4 個」。
- **報讀軟體**：不打斷正在念的內容，念完目前那句才念。

### 網頁專屬

- **ARIA 與 HTML 語意**：元素帶 role="status"（等於 aria-live="polite"），視覺上隱藏，但不是 display: none，報讀軟體才讀得到。
- **ARIA 與 HTML 語意**：「離開」以放它的那個容器為準：焦點移到容器外面的元素（focusin），或滑鼠移出容器（pointerleave）。

## 注意事項

- 它一直在頁面上，平常是空的。移動之後，使用端呼叫 announce 填一句話，報讀軟體就會念。區域跟文字同一刻出現的話，報讀軟體常常不念，所以它不能放在跟著出現的容器裡。
- 放在清單外面、跟清單同一層，不要放在項目裡。項目會被搬來搬去，區域跟著被搬走，那一句可能就不念了。
- 在對話框裡的清單，它要放在對話框裡面。對話框外面的報讀區，報讀軟體可能不念。
- 句子用本體的 `reorderMessage` 產生，格式全站一致。
- 同一句連續念兩次（兩次移動產生的句子一字不差）時，元件會在句尾交替加一個看不見的空白，讓報讀軟體再念一次。
- 使用者離開這份清單（焦點移到放它的容器外面，或滑鼠移出那個容器）時清空，之後逐項往下讀不會再讀到舊的那一句。不用計時器清。
