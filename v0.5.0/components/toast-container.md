# Toast Container 全域 Toast 容器（toast-container）

分組：浮層元件

app root 掛一次就好。任何要顯示 toast 的地方呼叫 toast 服務的 show() / update()，不要自建本地 toast stack——否則會出現兩套堆疊互相遮蓋。唯一例外是使用端自己的全域 API 錯誤浮層（若有，自有 9999 層）。

## 用法

### Angular（v0.6.0）

`app-toast-container`

無 @Input / @Output · 資料來自 ToastService.toasts() · 整個 app 只掛一次（app root）· 內部固定以 stackMode 渲染 app-process-toast · z-index 2100

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/toast-container--%E8%AA%AA%E6%98%8E)

#### 屬性

沒有輸入屬性。

#### 程式碼範例

**app root 掛載（只需一次）**

```html
<!-- app.component.html -->
<router-outlet />
<app-toast-container />
```

**呼叫端**

```html
// 不直接用這個元件，透過 service
private readonly toast = inject(ToastService);

this.toast.show({ type: 'success', message: '已儲存' });
```

#### Angular 注意事項

- 本體說的「toast 服務」在 Angular 是 ToastService：以 inject(ToastService) 取得後呼叫 show() / update()。
- app-toast-container 沒有任何 @Input / @Output；資料來自 ToastService 的 toasts()。

## 注意事項

- 本元件沒有任何屬性與事件。它只從 toast 服務讀取目前的 toast 清單並逐一渲染，退場時呼叫 toast 服務的 removeById()。
- 內部渲染 [Process Toast](process-toast.md) 時固定把 stackMode 設為 true（位置交給容器排版）、duration 設為 999999999（實際時長由 toast 服務內部的 resolveDuration 函式決定，不讓子元件自己計時）。
- **注意**：容器整體 pointer-events: none，只有帶 action 的 toast 會加 --interactive 才可點。理由：toast 位在卡片右下角，無條件可點會吃掉底下 sticky footer 按鈕數秒的點擊。
- z-index 2100（2026-08-13 定案），須壓過 doc-preview 與 template-var-panel 的 2000 層。
