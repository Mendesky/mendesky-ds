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

## 給 AI 讀的檔案

文件網站的每個版本另外附上給 AI 讀的 Markdown（參考 Ant Design 的 llms.txt 與元件 .md），給事務所其他產品的開發者與他們用的 AI 工具在用 DS 做畫面前閱讀：

- `llms.txt`：總表（[llmstxt.org](https://llmstxt.org/) 格式）。依分組列出每個元件與「何時用」的第一句，最後列出各框架的版本、範例網站與 repo
- `components/<元件id>.md`：一個元件一份，內容跟網站的元件頁相同：何時用、部位、狀態、可以／不要這樣做、各框架的用法（元件標籤、屬性、事件、程式碼範例、框架專屬注意事項）、無障礙、注意事項、對照表。提到其他元件時連到該元件的 .md

網址：`https://mendesky.github.io/mendesky-ds/<版本>/llms.txt`，`<版本>` 是 `main` 或正式版的版號（例如 `v0.1.0`）；元件檔在同一層的 `components/<元件id>.md`。

建置網站時產生（`scripts/export-llms.mjs`，由 `site/.vitepress/config.mts` 的 buildEnd 寫進網站目錄），建好後用 `npm run check:llms` 檢查。

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
- `@mendesky/ds/scripts/component-refs.mjs`：解析說明文字裡的 `#元件id`。框架套件用它換成自己的元件名稱（例如 Angular 換成 `app-xxx`），不要各自重寫規則

## 開發

```bash
npm ci
npm run build          # src/ → dist/（dist/ 要一起 commit）
npm run typecheck
npm test               # 工具程式的測試（Vitest，真的 Chromium）
npm run test:scripts   # 檢查腳本自身的測試
npm run check:docs     # 規格、token、字型、互動原則是否一致，而且只寫跨框架的內容（指元件寫 #元件id）
npm run check:dist     # dist/ 是否跟 src/ 的建置結果一致
npm run check:styles   # 元件共用樣式能編譯、規則都在 .ds-<元件> 底下
npm run check:guides   # 指南文字跟框架無關，框架範例都在分頁裡、也對得上各框架的元件（會取 site/frameworks.json 指定的框架 repo）
npm run site:dev       # 文件網站
npm run check:llms     # 建好網站後：llms.txt 與元件 .md 完整、連結都通、沒有漏值（預設檢查 site/.vitepress/dist）
```

要改什麼、放哪裡，見文件網站的[貢獻](https://mendesky.github.io/mendesky-ds/main/guide/contributing)。

## 授權

Copyright (c) 2026 嘉威聯合會計師事務所. All rights reserved. 見 [LICENSE](./LICENSE)；第三方授權見 [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)。
