# Modal Shell（modal-shell）

分組：浮層元件

所有自訂 Modal 的容器。禁止自刻 overlay + card 組合。

## 可以這樣做、不要這樣做

### 可以這樣做

- 把對話框的標題標成對話框標題。報讀軟體開窗就會念出來，使用者馬上知道開了什麼。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/iframe.html?id=modal-shell--default&viewMode=story)）
- 沒有標題的對話框設 ariaLabel，一兩個詞講清楚就好，例如「搜尋」。（範例：[Angular 版](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/iframe.html?id=modal-shell--search&viewMode=story)）
- 多步驟這類會換標題的對話框，每一步的標題都可以標，只要同一時間只存在一個。

### 不要這樣做

- 同一個對話框別同時標兩個標題。只會念最早建立的那一個，不一定是畫面上排在前面的，開發模式也會警告。
- 畫面上已經有標題，就不要再設 ariaLabel。設了之後只念 ariaLabel，哪天標題改字，兩邊很容易對不上。

## 用法

### Angular（v0.5.0）

`app-modal-shell`

[isOpen] width maxHeight variant: default|search|floating-right · overflowVisible · darkBackdrop · canDismiss · ariaLabelledBy · (backdropClick) · (escapePress) · <ng-content>

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/modal-shell--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | 控制顯示 / 隱藏；false 時觸發 leave 動畫後移除 DOM |
| `width` | `string` | `'580px'` | 卡片寬度（任何 CSS 長度值） |
| `maxHeight` | `string` | `'88vh'` | 卡片最大高度 |
| `variant` | `'default' \| 'search' \| 'floating-right'` | `'default'` | default：垂直置中；search：上方對齊 14vh；floating-right：右下角浮層（dock 上方 84px），backdrop 透明 pointer-events: none |
| `overflowVisible` | `boolean` | `false` | 讓卡片 overflow: visible，用於 stepper 浮在卡片上方的 wizard 模式 |
| `darkBackdrop` | `boolean` | `false` | 加深 backdrop 為 rgba(15,23,42,0.5)，用於需高度聚焦的彈窗（如版本更新公告）；預設用標準淺色 backdrop |
| `canDismiss` | `boolean` | `true` | 點 backdrop 是否可關（對齊 modal.dismissal）。dirty 時傳 false → backdrop 完全 inert（不 emit、不關）；只作用於 backdrop，ESC 不受此 gate。用法 [canDismiss]="!isDirty()" |
| `frostedGlass` | `boolean` | `false` | 啟用卡片毛玻璃效果。預設不透明，需 opt-in 啟用 |
| `animateContentHeight` | `boolean` | `false` | 內容高度變化時做動畫過渡。進場動畫結束後才啟用（避開開場）；尊重 prefers-reduced-motion。內容超過 max-height 時 card 固定高度、不觸發此動畫（改為 body 捲動） |
| `(backdropClick)` | `EventEmitter<void>` |  | 點擊遮罩時觸發（canDismiss=true 才 emit）；父層決定是否關閉 |
| `(escapePress)` | `EventEmitter<void>` |  | 按 ESC 時觸發（不受 canDismiss gate）；父層決定直接關或彈二次確認 |
| `ariaLabelledBy` | `string` | `''` | aria-labelledby 指向的元素 id（通常是 modal 標題），供螢幕報讀器朗讀 |
| `(afterLeave)` | `EventEmitter<void>` |  | 離場動畫結束後觸發（約 450ms）；用在要等動畫結束才清資料的情境 |

#### 程式碼範例

**基本用法**

```html
<app-modal-shell
  [isOpen]="showModal"
  width="580px"
  maxHeight="88vh"
  (backdropClick)="showModal = false"
>
  <!-- 任意內容透過 ng-content 投影 -->
  <div class="my-dialog-header">標題</div>
  <div class="my-dialog-body">內容</div>
</app-modal-shell>
```

**Wizard Pattern（stepper 浮在卡片上方）**

```html
<!-- 1. overflowVisible 讓子元素可逃出卡片邊界 -->
<app-modal-shell
  [isOpen]="isOpen"
  [overflowVisible]="steps().length > 1"
  width="560px"
  maxHeight="85vh"
  (backdropClick)="onCancel()"
>
  <!-- 2. stepper 放第一個子元素，SCSS 用 position:absolute + translateY(-100%) 拉到卡片上方 -->
  @if (steps().length > 1) {
    <div class="wizard__stepper">
      <app-stepper variant="horizontal" [steps]="stepLabels()" [currentStep]="currentStepIndex()" (stepClick)="onStepClick($event)"></app-stepper>
    </div>
  }
  <div class="wizard__header">...</div>
  <div class="wizard__body">...</div>
  <div class="wizard__footer">...</div>
</app-modal-shell>

/* SCSS：wizard__stepper 絕對定位浮在卡片上方 */
.wizard__stepper {
  position: absolute;
  top: 0; left: 0; right: 0;
  transform: translateY(-100%);
  padding: 0 24px 12px;
}
```

#### Angular 注意事項

- **注意**：app-modal-shell 會把 host element 搬到 document.body，所以父層的 ::ng-deep 打不到 .modal-card 內部樣式；如需修改卡片行為請用 @Input（例：overflowVisible）。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 與 Shift+Tab 只在對話框裡面繞，不會跑到後面的頁面。
- **鍵盤**：按 Esc 時只有最上層的對話框收得到。要直接關、還是先跳二次確認，由使用的畫面決定。
- **焦點**：進場動畫結束後（約 0.45 秒），焦點移進對話框，預設停在第一個可以用 Tab 移到的元素。
- **焦點**：關閉時，等離場動畫結束，焦點回到開窗前所在的元素。開不到 0.45 秒就關掉的話，焦點不會移動。
- **報讀軟體**：開窗時念出對話框的名稱與「對話框」。名稱就是標成對話框標題的那段文字，各框架怎麼標寫在用法說明裡。
- **報讀軟體**：搜尋視窗這類畫面上沒有標題的對話框，名稱來自 ariaLabel。
- **報讀軟體**：標題和 ariaLabel 都沒有的話，報讀軟體念不出這是什麼對話框；開發模式會在進場動畫結束時於 console 警告。

### 網頁專屬

- **ARIA 與 HTML 語意**：卡片是 role="dialog"，加上 aria-modal="true"。
- **ARIA 與 HTML 語意**：名稱只輸出一種屬性。設了 ariaLabel 就輸出 aria-label；沒設時輸出 aria-labelledby，有 ariaLabelledBy 就指向它，沒有就指向標成對話框標題的元素。
- **ARIA 與 HTML 語意**：標成對話框標題的元素沒有 id 時，會自動產生一個。

## 注意事項

- （2026-08-13 使用者拍板）毛玻璃卡片底色以實作為準＝rgba(255,255,255,0.8)（不是 0.85）。此值只在 frostedGlass=true 時生效；預設卡片是不透明 #ffffff。
- [Dialog](dialog.md) 適合固定格式的小型確認對話框；[Modal Shell](modal-shell.md) 適合需要自訂 header / body / footer 的大型 Modal（例：多步驟精靈、詳情面板）。
- **注意**：modal-shell 會把元件本身的元素搬到 document.body（防止 overflow:hidden 裁切 backdrop-filter），因此父層穿透元件樣式封裝的寫法無法打到 .modal-card 內部樣式。如需修改卡片行為請用元件屬性（例：overflowVisible）。

## 對照表

### 視覺規格

| 屬性 | 值 |
| --- | --- |
| 卡片背景 | rgba(255,255,255,0.8) / backdrop-filter: blur(7.5px)（僅 frostedGlass=true 時；預設卡片為不透明 #ffffff） |
| 邊框 / 圓角 | border: 1px solid #fff / border-radius: 16px |
| 陰影 | 0px 4px 40px -10px rgba(0,0,0,0.2) |
| 動畫 Tier | Panel — 450ms / 進場: cubic-bezier(0,0,0.2,1) / 退場: cubic-bezier(0.4,0,1,1) |
