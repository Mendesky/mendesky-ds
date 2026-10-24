// 指南冒煙測試：逐一打開建好的指南網站（VitePress）每一頁，確認畫出內容、沒有頁面錯誤、
// 也沒有「找不到元件說明／互動原則」的資料元件（代表文章引用了不存在的 id），
// 而且頁面文字（程式碼除外）沒有還沒換成元件名稱的 `#元件id`（代表某處直接印出說明原文、沒經過 RefText）。
// 元件頁另外確認：規格的第 2 版欄位（部位、狀態、無障礙、可以／不要這樣做）每一項都畫出來，項數跟規格一致。
//
// 用法：npm run site:build（或 scripts/build-site.sh main）之後
//       node scripts/smoke-guides.mjs <網站目錄，預設 site/.vitepress/dist> <網站 base，預設 /main/>
// 指南與元件頁都檢查；404.html 與 assets/ 不檢查。元件頁裡嵌入的範例來自各框架的範例網站，由各框架 repo 檢查，
// 所以測試時對外連線一律擋掉：結果只反映本體自己的頁面，不受網路或外部網站影響。
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { findRefs } from './component-refs.mjs';
import { exportCoreDocs } from './export-docs.mjs';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function listPages(dir, rel = '') {
  const out = [];
  for (const name of readdirSync(path.join(dir, rel))) {
    const r = path.posix.join(rel, name);
    if (r === 'assets' || r === '404.html') continue;
    if (statSync(path.join(dir, r)).isDirectory()) out.push(...listPages(dir, r));
    else if (name.endsWith('.html')) out.push(r);
  }
  return out.sort();
}

function serve(dir, base) {
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith(base)) {
      res.writeHead(404).end();
      return;
    }
    let file = path.join(dir, decodeURIComponent(url.pathname.slice(base.length)));
    if (!file.startsWith(dir)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
    if (!existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/** 本 repo 的元件 id（src/docs/components 的檔名） */
function repoComponentIds() {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'docs', 'components');
  return new Set(readdirSync(dir).filter((n) => n.endsWith('.ts') && n !== 'index.ts').map((n) => n.replace(/\.ts$/, '')));
}

/** 本 repo 的元件規格 */
function repoSpecs() {
  return exportCoreDocs(path.join(path.dirname(fileURLToPath(import.meta.url)), '..')).specs.map(({ spec }) => spec);
}

/** 規格的第 2 版欄位 → 元件頁上每一項的 data-testid 與應有的項數 */
const V2_SECTIONS = [
  ['anatomy', 'spec-anatomy-item', (s) => s.anatomy?.length ?? 0],
  ['states', 'spec-state-item', (s) => s.states?.length ?? 0],
  ['a11y', 'spec-a11y-item', (s) => Object.values(s.a11y ?? {}).reduce((n, items) => n + items.length, 0)],
  ['dos', 'spec-do-item', (s) => s.dos?.length ?? 0],
  ['donts', 'spec-dont-item', (s) => s.donts?.length ?? 0],
];

/**
 * 逐頁檢查；回傳 { visited, failures }。
 * componentIds：未翻譯檢查要認得的元件 id；specs：元件頁要畫出哪些第 2 版欄位。兩者預設都讀本 repo
 */
export async function smokeGuides(dir, base = '/main/', { timeout = 15000, componentIds = repoComponentIds(), specs = repoSpecs() } = {}) {
  const root = path.resolve(dir);
  if (componentIds.size === 0) return { visited: 0, failures: ['讀不到任何元件 id，未翻譯的 #元件id 檢查沒有執行'] };
  if (specs.length === 0) return { visited: 0, failures: ['讀不到任何元件規格，元件頁的第 2 版欄位檢查沒有執行'] };
  const specById = new Map(specs.map((s) => [s.id, s]));
  const pages = listPages(root);
  if (pages.length === 0) return { visited: 0, failures: [`${root} 裡有 0 頁指南，網站沒有內容`] };

  const server = await serve(root, base);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const failures = [];
  let visited = 0;
  try {
    const page = await browser.newPage();
    await page.route('**/*', (route) => (route.request().url().startsWith(`${origin}/`) ? route.continue() : route.abort()));
    for (const rel of pages) {
      const errors = [];
      const onError = (e) => errors.push(e.message);
      const onConsole = (msg) => {
        // 外部字型或網路資源載入失敗不算頁面錯誤（CI 可能沒有網路）
        if (msg.type() === 'error' && !/Failed to load resource|net::ERR_/.test(msg.text())) errors.push(msg.text());
      };
      page.on('pageerror', onError);
      page.on('console', onConsole);
      try {
        await page.goto(`${origin}${base}${rel}`);
        await page.waitForSelector('.VPContent', { state: 'attached', timeout });
        await page.waitForTimeout(150);
        const missing = await page.locator('.ds-missing').allTextContents();
        for (const m of missing) errors.push(`資料元件找不到對象：${m.trim()}`);
        // 程式碼與內嵌頁面不算：指南可以在程式碼裡示範 #元件id 的寫法
        const text = await page.evaluate(() => {
          const content = document.querySelector('.VPContent')?.cloneNode(true);
          if (!content) return '';
          content.querySelectorAll('pre, code, script, style, iframe').forEach((el) => el.remove());
          return content.textContent ?? '';
        });
        for (const id of new Set(findRefs(text).filter((id) => componentIds.has(id)))) errors.push(`有沒換成元件名稱的 #${id}`);
        const spec = specById.get(rel.match(/^components\/([^/]+)\.html$/)?.[1]);
        for (const [key, testid, expected] of spec ? V2_SECTIONS : []) {
          const want = expected(spec);
          if (want === 0) continue;
          const got = await page.locator(`.VPContent [data-testid="${testid}"]`).count();
          if (got !== want) errors.push(`第 2 版欄位 ${key} 有 ${want} 項，頁面畫出 ${got} 項`);
        }
      } catch (e) {
        errors.push(`沒有畫出內容（等不到 .VPContent）`);
      }
      page.off('pageerror', onError);
      page.off('console', onConsole);
      visited++;
      if (errors.length) failures.push(`${rel}：${[...new Set(errors)].join('；')}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  return { visited, failures };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const dir = process.argv[2] ?? path.join(here, '..', 'site', '.vitepress', 'dist');
  const base = process.argv[3] ?? '/main/';
  const { visited, failures } = await smokeGuides(dir, base);
  if (failures.length) {
    console.error(`指南冒煙測試失敗（${failures.length} / ${visited} 頁）：`);
    for (const f of failures) console.error(`  - ${f}`);
    // 用 exitCode 而不是 process.exit：輸出接到管線時，process.exit 會截斷還沒寫完的訊息
    process.exitCode = 1;
  } else {
    console.log(`指南冒煙測試通過：${visited} 頁都畫出內容、沒有錯誤`);
  }
}
