import * as pdfjsLib from 'pdfjs-dist';
export interface PdfLoadParams {
    data: ArrayBuffer | Uint8Array;
    isEvalSupported?: boolean;
}
/**
 * 所有 PDF 載入都必須經過 loadPdfDocument()；安全參數集中在這裡。
 * isEvalSupported:false 關閉 pdf.js 以 new Function 編譯字型路徑的行為。
 * pdfjs-dist ≤ 4.1.392 在預設值 true 下，惡意 PDF 可在本站執行任意 JavaScript
 * （CVE-2024-4367／GHSA-wgrm-67xf-hhpq）。升級 pdfjs 後仍保留，作為縱深防禦。
 */
export declare function buildPdfLoadParams(data: ArrayBuffer | Uint8Array): PdfLoadParams;
export declare function loadPdfDocument(data: ArrayBuffer | Uint8Array): Promise<pdfjsLib.PDFDocumentProxy>;
/**
 * 把 PDF blob render 成「每頁一張 JPEG data URL」，供與文件預覽一致的頁面圖卡片呈現
 * （不用瀏覽器原生 iframe PDF viewer）。
 * scale=2、toDataURL('image/jpeg') 對齊 doc-preview.component；單頁 render 失敗則略過該頁。
 */
export declare function renderPdfBlobToImages(blob: Blob, scale?: number): Promise<string[]>;
