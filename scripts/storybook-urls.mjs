// 各框架範例網站（Storybook）的網址格式。
// 文件網站（site/.vitepress/theme/links.ts）與給 AI 讀的元件檔（export-llms.mjs）共用這一份，兩邊的範例連結才會一樣。
// 這支檔案不依賴 Node，文件網站的瀏覽器端也直接用。

/** 範例網站裡這個元件的說明頁；storybook 是範例網站的網址（site/frameworks.json 的 storybook，結尾有 /） */
export function storybookDocsUrl(id, storybook) {
  return `${storybook}?path=/docs/${encodeURIComponent(id)}--${encodeURIComponent('說明')}`;
}

/** 單一範例的網址（可嵌入 iframe）；storyId 是 `<元件id>--<範例代號>` */
export function storyUrl(storyId, storybook) {
  return `${storybook}iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`;
}
