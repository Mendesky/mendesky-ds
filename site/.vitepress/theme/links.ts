import { data } from '../ds.data.mts';

// 元件的說明頁與可操作範例目前放在 Angular 版的範例網站（Storybook），網址由 site/frameworks.json 設定。
const storybook = (): string => data.frameworks.angular.storybook;

/** 元件說明頁（Storybook）的網址；id 是元件規格的 id */
export function componentDocsUrl(id: string): string {
  return `${storybook()}?path=/docs/${encodeURIComponent(id)}--${encodeURIComponent('說明')}`;
}

/** 單一範例的網址（可嵌入 iframe） */
export function storyUrl(storyId: string): string {
  return `${storybook()}iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`;
}

/** 元件總覽（Storybook 首頁） */
export function componentsHomeUrl(): string {
  return storybook();
}
