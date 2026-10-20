import { defineConfig } from 'vitepress';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exportCoreDocs } from '../../scripts/export-docs.mjs';

// 元件頁的側欄：依規格的分組列出全部元件
const GROUPS = ['互動元件', '表單元件', '浮層元件', '展示元件', '工具'];
const specs = exportCoreDocs(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')).specs.map((s: { spec: { id: string; name: string; group: string } }) => s.spec);
const componentSidebar = [
  { text: '元件', items: [{ text: '總覽', link: '/components/' }] },
  ...GROUPS.map((g) => ({
    text: g,
    collapsed: true,
    items: specs.filter((s) => s.group === g).sort((a, b) => a.name.localeCompare(b.name)).map((s) => ({ text: s.name, link: `/components/${s.id}` })),
  })).filter((g) => g.items.length),
];

// 每個版本各建一次：DOCS_BASE 例如 /mendesky-ds/v0.1.0/，DOCS_VERSION 例如 v0.1.0 或 main。
// 本機開發（npm run site:dev）不設，base 為 /。
const base = process.env.DOCS_BASE ?? '/';
const version = process.env.DOCS_VERSION ?? 'dev';

// 中文沒有空白分詞：用 Intl.Segmenter 切成詞（「錯誤訊息」→「錯誤」「訊息」）。
// 不拆成單字、不開模糊比對：否則任何同一個字都會命中，無關的查詢也會有一堆結果。
function tokenize(text: string): string[] {
  const seg = new Intl.Segmenter('zh-Hant', { granularity: 'word' });
  return [...seg.segment(text)].filter((s) => s.isWordLike).map((s) => s.segment.toLowerCase());
}

export default defineConfig({
  lang: 'zh-Hant-TW',
  title: 'Mendesky Design System',
  description: 'Mendesky Design System：設計基礎、互動指南與各框架的元件庫',
  base,
  srcDir: '.',
  outDir: '.vitepress/dist',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Roboto+Mono:wght@400;500&display=swap' }],
  ],
  themeConfig: {
    docsVersion: version,
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '元件', link: '/components/', activeMatch: '/components/' },
      { text: '版本說明', link: 'https://github.com/Mendesky/mendesky-ds/releases' },
    ],
    sidebar: {
      '/components/': componentSidebar,
      '/guide/': [
        {
          text: '入門',
          items: [
            { text: '開始使用', link: '/guide/getting-started' },
            { text: '第一個畫面', link: '/guide/first-screen' },
          ],
        },
        {
          text: '設計基礎',
          items: [
            { text: '元件怎麼選', link: '/guide/choosing-components' },
            { text: '色彩與 token', link: '/guide/tokens' },
            { text: '字型與文字樣式', link: '/guide/typography' },
            { text: '動效', link: '/guide/motion' },
            { text: '圖示', link: '/guide/icons' },
          ],
        },
        {
          text: '互動指南',
          items: [
            { text: '浮層怎麼選', link: '/guide/overlays' },
            { text: '確認與破壞性動作', link: '/guide/confirmation' },
            { text: '表單與錯誤提示', link: '/guide/forms' },
            { text: '載入與回饋', link: '/guide/feedback' },
            { text: '表格的情境工具列', link: '/guide/table-toolbar' },
          ],
        },
        {
          text: '維護',
          items: [
            { text: '版本與升級', link: '/guide/versioning' },
            { text: '貢獻', link: '/guide/contributing' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Mendesky/mendesky-ds' }],
    outline: { level: [2, 3], label: '本頁內容' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外觀',
    sidebarMenuLabel: '目錄',
    returnToTopLabel: '回到頂端',
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: { tokenize },
          searchOptions: { tokenize, prefix: true, fuzzy: false, combineWith: 'AND' },
        },
        translations: {
          button: { buttonText: '搜尋', buttonAriaLabel: '搜尋' },
          modal: {
            noResultsText: '找不到結果',
            resetButtonTitle: '清除',
            footer: { selectText: '選擇', navigateText: '切換', closeText: '關閉' },
          },
        },
      },
    },
    footer: {
      message: '公開僅供檢視，未授權任何使用、複製、修改或散布。',
      copyright: 'Copyright (c) 2026 嘉威聯合會計師事務所. All rights reserved.',
    },
  },
});
