export const docPreviewSpec = {
    id: 'doc-preview',
    name: 'Doc Preview 文件預覽',
    group: '浮層元件',
    when: '預覽已上傳的附件（表單檔案、掃描文件）。可傳多份，元件自帶前後切換。PDF 與圖片可混在同一份清單，元件依 mimeType 或副檔名自行分派渲染方式。不負責下載或刪除，那些由呼叫端的清單元件處理。',
    notes: [
        {
            type: 'info',
            content: 'z-index 2000。低於 app-toast-container 的 2100（2026-08-13 定案：預覽開著時的操作回饋必須看得到），低於 tooltip 與使用端全域 API 錯誤浮層的 9999。',
        },
        {
            type: 'warning',
            content: 'PDF 渲染依賴 pdfjs worker，路徑寫死為 assets/pdf.worker.min.js。該檔沒被 build 進 assets 時 PDF 會空白（圖片仍正常），且不會拋錯——換 build 設定後要實測一份 PDF。',
        },
        {
            type: 'info',
            content: '同一個 url 的 PDF 有 cache（pdfCache），來回切換不重新下載；元件銷毀時一併 destroy。',
        },
        {
            type: 'info',
            content: '注入 ModalStackService，所以它算在 modal 堆疊裡：ESC 只關最上層、開啟時外層 modal 不會同時被關。',
        },
    ],
};
