// 建置時讀說明正本，給指南頁的元件使用：
//   - 本體：元件規格、token、字型、動效、互動原則、圖示名稱（本 repo）
//   - 各框架：元件標籤、屬性、範例程式碼（site/frameworks.json 指定的框架 repo 版本）
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
    // 元件清單以本體規格為準；用法欄位（selector 等）目前取 Angular 版
    const angular = new Map(frameworks.angular.docs.map((d: { id: string }) => [d.id, d]));
    return {
      components: core.specs.map(({ spec }: { spec: { id: string } }) => ({ ...spec, ...(angular.get(spec.id) ?? {}) })),
      frameworks: Object.fromEntries(
        Object.entries(frameworks).map(([name, fw]) => [
          name,
          {
            label: fw.label,
            ref: fw.ref,
            storybook: fw.storybook,
            // 元件頁的「這個框架怎麼用」分頁：用法欄位＋範例清單
            docs: Object.fromEntries(fw.docs.map((d: { id: string }) => [d.id, d])),
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
