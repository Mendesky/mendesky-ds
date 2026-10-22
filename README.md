# @mendesky/ds

Mendesky Design System 的本體：跟框架無關的部分。

- 色彩與字型等 CSS 變數、字級 class、共用動畫、SCSS 工具（`styles/`）
- 圖示資料（`src/icons/`）
- 跟框架無關的工具程式與資料格式（`src/utils/`、`src/models/`）
- 元件規格：何時用、注意事項、選用表格（`src/docs/components/`）
- 設計基礎與互動原則的說明（`src/docs/foundations/`、`src/docs/patterns.ts`）
- 文件網站（`site/`）：https://mendesky.github.io/mendesky-ds/

元件本身由各框架的套件實作，並依賴本套件：

| 框架 | 套件 | repo |
|---|---|---|
| Angular | `@mendesky/ds-angular` | [mendesky-ds-angular](https://github.com/Mendesky/mendesky-ds-angular) |
| Vue（試做中，8 個元件，不供專案安裝） | `@mendesky/ds-vue` | [mendesky-ds-vue](https://github.com/Mendesky/mendesky-ds-vue) |

本體不依賴任何框架，加新框架只要開一個新的框架 repo、依賴本套件。

## 使用端怎麼裝

使用端專案只要裝自己框架的套件，本套件會依框架套件指定的版本自動一起裝。步驟見文件網站的[開始使用](https://mendesky.github.io/mendesky-ds/main/guide/getting-started)與[版本與升級](https://mendesky.github.io/mendesky-ds/main/guide/versioning)。

框架套件在自己的 `package.json` 依賴本套件：

```json
{
  "dependencies": {
    "@mendesky/ds": "github:Mendesky/mendesky-ds#vX.Y.Z"
  }
}
```

對外出口：

- `import { ICON_REGISTRY, printPdfBlob, COMPONENT_SPECS } from '@mendesky/ds'`：圖示、工具程式、元件規格（`dist/`）
- `@use '@mendesky/ds/styles/core'`：全域樣式；`@use '@mendesky/ds/styles/mixins'`、`'@mendesky/ds/styles/breakpoints'`：SCSS 工具
- `@use '@mendesky/ds/styles/components/<元件>'`：元件的共用樣式（Vue 版試做中，目前有 icon、label、button、input、field、checkbox、select、dialog）。整份包在 `.ds-<元件>` 底下，各框架元件在根元素加上這個 class；Angular 版目前仍用自己的元件樣式
- `@mendesky/ds/scripts/export-docs.mjs`：匯出元件規格、基礎說明、互動原則、圖示名稱（框架套件的說明匯出與使用端的 AI 協作索引會用）

## 開發

```bash
npm ci
npm run build          # src/ → dist/（dist/ 要一起 commit）
npm run typecheck
npm test               # 工具程式的測試（Vitest，真的 Chromium）
npm run test:scripts   # 檢查腳本自身的測試
npm run check:docs     # 規格、token、字型、互動原則是否一致
npm run check:dist     # dist/ 是否跟 src/ 的建置結果一致
npm run check:styles   # 元件共用樣式能編譯、規則都在 .ds-<元件> 底下
npm run site:dev       # 文件網站
```

要改什麼、放哪裡，見文件網站的[貢獻](https://mendesky.github.io/mendesky-ds/main/guide/contributing)。

## 授權

Copyright (c) 2026 嘉威聯合會計師事務所. All rights reserved. 見 [LICENSE](./LICENSE)；第三方授權見 [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)。
