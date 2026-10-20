import { withBase } from 'vitepress';
import { data } from '../ds.data.mts';

/** 站內的元件頁；id 是元件規格的 id */
export function componentDocsUrl(id: string): string {
  return withBase(`/components/${encodeURIComponent(id)}`);
}

const defaultStorybook = (): string => data.frameworks.angular.storybook;

/** 範例網站（Storybook）裡這個元件的說明頁 */
export function storybookDocsUrl(id: string, storybook: string = defaultStorybook()): string {
  return `${storybook}?path=/docs/${encodeURIComponent(id)}--${encodeURIComponent('說明')}`;
}

/** 單一範例的網址（可嵌入 iframe）；預設用 Angular 版的範例網站 */
export function storyUrl(storyId: string, storybook: string = defaultStorybook()): string {
  return `${storybook}iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`;
}
