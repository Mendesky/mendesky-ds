// storybook-urls.mjs 的型別：讓文件網站的 TypeScript（site/.vitepress/theme/links.ts）可以直接 import。

/** 範例網站裡這個元件的說明頁 */
export function storybookDocsUrl(id: string, storybook: string): string;

/** 單一範例的網址（可嵌入 iframe） */
export function storyUrl(storyId: string, storybook: string): string;
