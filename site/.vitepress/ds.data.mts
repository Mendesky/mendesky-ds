// 建置時讀說明正本，給指南頁的元件使用：
//   - 本體：元件規格、token、字型、動效、互動原則、圖示名稱（本 repo）
//   - 各框架：元件標籤、屬性、範例程式碼、框架專屬注意事項、互動原則的框架做法（site/frameworks.json 指定的框架 repo 版本）
// 指南不另抄規則：表格與原則內容都從這裡顯示，正本改了指南跟著變。
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { exportCoreDocs } from '../../scripts/export-docs.mjs';
import { loadFrameworkDocs } from '../../scripts/fetch-framework-docs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export default {
  watch: ['../../src/docs/**/*.ts', '../../dist/icons/icons.js', '../frameworks.json'],
  async load() {
    const core = exportCoreDocs(root);
    const frameworks = await loadFrameworkDocs(root);
    // 圖示的 SVG 內容取自建置好的 dist（跟使用端拿到的是同一份）
    const { ICON_REGISTRY } = await import(pathToFileURL(path.join(root, 'dist', 'icons', 'icons.js')).href);
    return {
      // 元件清單只用本體規格（跟框架無關）；各框架的元件標籤與屬性在 frameworks[框架].docs
      components: core.specs.map(({ spec }: { spec: { id: string } }) => spec),
      frameworks: Object.fromEntries(
        Object.entries(frameworks).map(([name, fw]) => [
          name,
          {
            label: fw.label,
            ref: fw.ref,
            storybook: fw.storybook,
            // 元件頁的「這個框架怎麼用」分頁：用法欄位＋範例清單
            docs: Object.fromEntries(fw.docs.map((d: { id: string }) => [d.id, d])),
            // 互動原則下方的「這個框架怎麼做」：原則 key → 注意事項
            patternNotes: fw.patternNotes,
            stories: fw.stories,
          },
        ]),
      ),
      tokens: core.tokens,
      typography: core.typography,
      motion: core.motion,
      patterns: core.patterns,
      icons: core.icons,
      iconSvgs: Object.fromEntries(core.icons.map((name: string) => [name, ICON_REGISTRY[name]])),
    };
  },
};
