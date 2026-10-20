# 貢獻

這篇說明修改設計系統時，內容放在哪個 repo、要補哪些檔案、送出 PR 前在本機跑哪些檢查，以及 CI 會擋下什麼。要改設計系統時讀這篇。

## 本體與框架套件各放什麼

設計系統分成本體 repo 與各框架的 repo。同一份內容只放一個地方，文件網站從這些檔案產生，不要在別處另外維護一份。

| 內容 | 放在哪裡 |
|---|---|
| 元件規格（何時用、注意事項、選用表格） | 本體：`src/docs/components/<id>.ts`，格式見 `src/docs/component-spec.ts` |
| 色彩與 token、字型、動效 | 本體：樣式在 `styles/core.scss`，說明在 `src/docs/foundations/` |
| 互動原則 | 本體：`src/docs/patterns.ts` |
| 圖示 | 本體：`src/icons/icons.ts` |
| 跟框架無關的工具程式與資料格式 | 本體：`src/utils/`、`src/models/` |
| 指南文章 | 本體：`site/guide/*.md` |
| 元件程式、這個框架的用法說明（元件標籤、屬性、範例程式碼）、範例頁、元件測試 | 各框架 repo，例如 [mendesky-ds-angular](https://github.com/Mendesky/mendesky-ds-angular)；做法見該 repo 的 README |

元件規格與框架的用法說明用同一個 `id` 對應。文件網站與使用端的 AI 協作索引會把兩份合併後呈現。

## 不放業務內容

設計系統只放畫面與前端的規則和邏輯。使用端產品的業務規則、業務用詞、資料結構，不放進設計系統。

判斷方式：換成另一個產品，這段內容還成立嗎？成立就屬於設計系統；不成立就屬於使用端，由使用端自己的文件與程式碼管理。

- 元件不內建業務文字或業務資料。需要的文字與清單（例如分組名稱、選擇器標題）由使用端傳入。
- 規格、範例頁、指南、測試的示範資料用中性內容，不用某個產品的實際欄位或客戶名稱。
- 互動原則與註解不寫「出自使用端哪個檔案、哪一頁」，只寫畫面上的情境。
- 哪些欄位要套用某種樣式（例如哪些金額用等寬字型）是產品規則，寫在使用端；設計系統只提供樣式本身。

## 新增或修改元件規格

規格放在 `src/docs/components/<id>.ts`，檔名就是 `id`，export 一個 `ComponentSpec` 物件。要寫：

- `name`：元件名稱。
- `group`：文件網站上的分組，只能是 `互動元件`、`表單元件`、`浮層元件`、`展示元件`、`工具` 其中之一。
- `when`：什麼時候用、禁止哪些用法。
- `notes`：注意事項。
- `customTables`：選用的對照表（例如變體怎麼選）。

```ts
import type { ComponentSpec } from '../component-spec.js';

export const fieldSpec: ComponentSpec = {
  id: 'field',
  name: 'Field',
  group: '表單元件',
  when: '所有表單欄位外層包裝。提供一致的標題排版。…',
  notes: [],
};
```

新增規格時，在 `src/docs/components/index.ts` 的總表加一行。說明檢查會比對總表與檔案是否一致。

規格只能 `import type`，不能在執行期 import 其他檔案：文件網站與匯出腳本會直接讀這些檔案。

## 樣式、token、字型

改了 `styles/core.scss` 裡的 token 或字型 class，要同步改 `src/docs/foundations/`。文件網站的 token 與字型表格是從 `foundations` 產生的，說明檢查會比對兩邊的名稱與值。

## 工具程式與圖示

`src/` 底下的程式（圖示、工具程式、資料格式、規格總表）會建置成 `dist/`。`dist/` 要跟原始碼一起 commit：使用端從 GitHub 的 tag 安裝時，不會幫我們建置。

```bash
npm run build          # 重建 dist/
```

工具程式的測試放在旁邊的 `*.spec.ts`，用 Vitest 在真的 Chromium 裡跑。

## 寫指南文章

指南文章放在 `site/guide/*.md`。文章只寫說明；表格與互動原則的內容在建置時從上面的正本讀出，不要把規則抄進文章。

連到元件說明頁用 `<ComponentLink id="..." />`，嵌入範例用 `<StoryEmbed id="..." />`。元件的用法與可操作範例來自 `site/frameworks.json` 指定的框架版本。`ComponentLink` 或互動原則的 id 寫錯、找不到對象時，指南的冒煙測試會失敗。

## 本機檢查

送出 PR 前在本機跑一次：

```bash
npm run typecheck      # 型別檢查
npm run check:docs     # 規格、token、字型、互動原則是否一致
npm run check:dist     # dist/ 是否跟原始碼的建置結果一致
npm test               # 工具程式的測試（Chromium）
npm run test:scripts   # 檢查腳本自身的測試
DOCS_REPO_BASE=/ npm run site:build -- main                  # 建文件網站
node scripts/smoke-guides.mjs site/.vitepress/dist /main/   # 指南逐頁冒煙測試
```

冒煙測試是逐頁打開網站，確認每頁都畫得出來、沒有錯誤。

邊寫邊看文件網站：

```bash
npm run site:dev
```

## CI 會擋什麼

每次 push 與每個發到 `main` 的 PR，CI 都會跑下面幾項，任何一項失敗都不能合併：

| 檢查 | 內容 |
|---|---|
| 型別檢查 | `npm run typecheck` |
| dist 同步 | `npm run check:dist` |
| 說明檢查 | 先跑檢查腳本自身的測試（`npm run test:scripts`），再跑 `npm run check:docs` |
| 單元測試 | 工具程式的測試（Chromium） |
| 文件網站建置與冒煙測試 | 建文件網站，再逐頁打開指南頁 |

建置指南時會檢查站內連結，指南裡連到不存在的頁面，建置就會失敗。

## 改了本體之後

本體發新版後，各框架 repo 要把依賴的本體版本改成新版，再發框架套件的新版，使用端才拿得到。步驟見[版本與升級](./versioning)。

## 相關

- [版本與升級](./versioning)
- [開始使用](./getting-started)
- [元件怎麼選](./choosing-components)
