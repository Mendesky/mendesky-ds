// 指南冒煙測試腳本本身的測試（需要瀏覽器，CI 的 smoke job 會跑）。
// 用法：node --test scripts/smoke-guides.browser.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { smokeGuides } from './smoke-guides.mjs';

const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), '__fixtures__', 'smoke-guides');
// fixture 的元件 id 只有 demo
const componentIds = new Set(['demo']);

test('每頁都畫出內容、沒有錯誤 → 通過；404 不檢查；程式碼、色碼、網址裡的 # 不算未翻譯', async () => {
  const result = await smokeGuides(path.join(fixtures, 'ok'), '/main/', { componentIds });
  assert.equal(result.visited, 2);
  assert.deepEqual(result.failures, []);
});

test('頁面有「找不到」的資料元件、丟錯、或有沒換成元件名稱的 #元件id → 失敗並指出哪一頁', async () => {
  const result = await smokeGuides(path.join(fixtures, 'bad'), '/main/', { timeout: 3000, componentIds });
  assert.equal(result.failures.length, 3, result.failures.join('\n'));
  const all = result.failures.join('\n');
  assert.match(all, /guide\/missing/);
  assert.match(all, /guide\/throws/);
  assert.match(all, /guide\/raw-ref\.html：有沒換成元件名稱的 #demo/);
  assert.doesNotMatch(all, /not-a-component/);
});

test('讀不到任何元件 id（檢查本身失效）→ 失敗，不得當成通過', async () => {
  const result = await smokeGuides(path.join(fixtures, 'ok'), '/main/', { componentIds: new Set() });
  assert.equal(result.failures.length, 1);
  assert.match(result.failures[0], /讀不到任何元件 id/);
});

test('元件頁嵌入的外部範例出錯 → 不算本體的錯（測試時對外連線一律擋掉）', async () => {
  // 外部範例網站：另一個 origin，頁面一載入就丟錯
  const external = createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><script>throw new Error("外部範例丟錯")</script>');
  });
  await new Promise((resolve) => external.listen(0, '127.0.0.1', resolve));
  const site = mkdtempSync(path.join(tmpdir(), 'smoke-guides-'));
  try {
    mkdirSync(path.join(site, 'components'));
    writeFileSync(
      path.join(site, 'components', 'embed.html'),
      `<!doctype html><html><head><meta charset="utf-8"></head><body><div id="app"><div class="VPContent">元件頁` +
        `<iframe src="http://localhost:${external.address().port}/iframe.html"></iframe></div></div></body></html>`,
    );
    const result = await smokeGuides(site, '/main/', { componentIds });
    assert.equal(result.visited, 1);
    assert.deepEqual(result.failures, []);
  } finally {
    external.close();
    rmSync(site, { recursive: true, force: true });
  }
});

test('一頁都沒有 → 失敗', async () => {
  const result = await smokeGuides(path.join(fixtures, 'empty'), '/main/', { componentIds });
  assert.equal(result.visited, 0);
  assert.equal(result.failures.length, 1);
  assert.match(result.failures[0], /0 頁/);
});

// ── 元件頁的第 2 版欄位（部位、狀態、無障礙、可以／不要這樣做）都畫出來 ─────────────

const demoV2Spec = {
  id: 'demo',
  name: 'Demo',
  group: '展示元件',
  notes: [],
  anatomy: [
    { name: '外框', description: '可點擊的範圍' },
    { name: '文字', description: '說明這個操作' },
  ],
  states: [{ name: '停用', description: '灰底，點了沒有反應' }],
  a11y: { keyboard: ['Enter 觸發'], screenReader: ['念出文字'], aria: ['aria-disabled'] },
  dos: [{ text: '一個畫面只放一個主要按鈕' }],
  donts: [{ text: '不要巢狀' }],
};

test('元件頁把規格的第 2 版欄位逐項畫出來 → 通過', async () => {
  const result = await smokeGuides(path.join(fixtures, 'v2-ok'), '/main/', { componentIds, specs: [demoV2Spec] });
  assert.equal(result.visited, 1);
  assert.deepEqual(result.failures, []);
});

test('元件頁少畫第 2 版欄位或少畫幾項 → 失敗，指出頁面、欄位與項數', async () => {
  const result = await smokeGuides(path.join(fixtures, 'v2-missing'), '/main/', { componentIds, specs: [demoV2Spec] });
  assert.equal(result.failures.length, 1, result.failures.join('\n'));
  const [f] = result.failures;
  assert.match(f, /components\/demo\.html：/);
  assert.match(f, /anatomy 有 2 項，頁面畫出 1 項/);
  assert.match(f, /states 有 1 項，頁面畫出 0 項/);
  assert.match(f, /dos 有 1 項，頁面畫出 0 項/);
  assert.match(f, /donts 有 1 項，頁面畫出 0 項/);
  assert.doesNotMatch(f, /a11y/);
});

test('讀不到任何元件規格（檢查本身失效）→ 失敗，不得當成通過', async () => {
  const result = await smokeGuides(path.join(fixtures, 'v2-ok'), '/main/', { componentIds, specs: [] });
  assert.equal(result.failures.length, 1);
  assert.match(result.failures[0], /讀不到任何元件規格/);
});
