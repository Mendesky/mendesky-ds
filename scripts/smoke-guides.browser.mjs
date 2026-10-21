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

test('每頁都畫出內容、沒有錯誤 → 通過；404 不檢查', async () => {
  const result = await smokeGuides(path.join(fixtures, 'ok'), '/main/');
  assert.equal(result.visited, 2);
  assert.deepEqual(result.failures, []);
});

test('頁面有「找不到」的資料元件或丟錯 → 失敗並指出哪一頁', async () => {
  const result = await smokeGuides(path.join(fixtures, 'bad'), '/main/', { timeout: 3000 });
  assert.equal(result.failures.length, 2);
  assert.match(result.failures.join('\n'), /guide\/missing/);
  assert.match(result.failures.join('\n'), /guide\/throws/);
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
    const result = await smokeGuides(site, '/main/');
    assert.equal(result.visited, 1);
    assert.deepEqual(result.failures, []);
  } finally {
    external.close();
    rmSync(site, { recursive: true, force: true });
  }
});

test('一頁都沒有 → 失敗', async () => {
  const result = await smokeGuides(path.join(fixtures, 'empty'), '/main/');
  assert.equal(result.visited, 0);
  assert.equal(result.failures.length, 1);
  assert.match(result.failures[0], /0 頁/);
});
