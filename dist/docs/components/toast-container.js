export const toastContainerSpec = {
    id: 'toast-container',
    name: 'Toast Container 全域 Toast 容器',
    group: '浮層元件',
    when: 'app root 掛一次就好。任何要顯示 toast 的地方呼叫 toast 服務的 show() / update()，不要自建本地 toast stack——否則會出現兩套堆疊互相遮蓋。唯一例外是使用端自己的全域 API 錯誤浮層（若有，自有 9999 層）。',
    notes: [
        {
            type: 'info',
            content: '本元件沒有任何屬性與事件。它只從 toast 服務讀取目前的 toast 清單並逐一渲染，退場時呼叫 toast 服務的 removeById()。',
        },
        {
            type: 'info',
            content: '內部渲染 #process-toast 時固定把 stackMode 設為 true（位置交給容器排版）、duration 設為 999999999（實際時長由 toast 服務內部的 resolveDuration 函式決定，不讓子元件自己計時）。',
        },
        {
            type: 'warning',
            content: '容器整體 pointer-events: none，只有帶 action 的 toast 會加 --interactive 才可點。理由：toast 位在卡片右下角，無條件可點會吃掉底下 sticky footer 按鈕數秒的點擊。',
        },
        {
            type: 'info',
            content: 'z-index 2100（2026-08-13 定案），須壓過 doc-preview 與 template-var-panel 的 2000 層。',
        },
    ],
};
