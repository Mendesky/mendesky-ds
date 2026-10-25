// 套件內容測試：框架 repo 從 GitHub tag 安裝本體時，只拿得到 package.json 的 files 列出的檔案，
// 也只能 import exports 列出的路徑。框架要用的工具少一個，框架那邊才會壞，所以在本體這裡先擋。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** npm pack 實際會打包的檔案（不真的產生壓縮檔） */
function packedFiles() {
  const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: root, encoding: 'utf8' });
  return JSON.parse(out)[0].files.map((f) => f.path);
}

test('框架 repo 要用的腳本都有打包：說明匯出、#元件id 解析與它的型別', () => {
  const files = packedFiles();
  for (const f of ['scripts/export-docs.mjs', 'scripts/component-refs.mjs', 'scripts/component-refs.d.mts']) {
    assert.ok(files.includes(f), `${f} 沒有打包進套件`);
  }
});

test('框架 repo 能用套件名稱 import #元件id 解析', async () => {
  const refs = await import('@mendesky/ds/scripts/component-refs.mjs');
  assert.equal(refs.renderRefs('改用 #check-chip', (id) => `app-${id}`), '改用 app-check-chip');
});
