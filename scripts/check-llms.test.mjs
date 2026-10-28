// 給 AI 讀的檔案檢查（check-llms.mjs）的測試，分三種情況：
//   正常：正確的輸出通過
//   注錯：少元件檔、斷掉的連結、漏值印出 undefined、llms.txt 漏列元件，各自失敗並指出檔案
//   檢查本身壞掉：網站目錄不存在、llms.txt 不存在、讀到 0 份規格，一律失敗、不得回報通過
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLlms, findLeaks } from './check-llms.mjs';
import { buildLlmsFiles } from './export-llms.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(here, '__fixtures__', 'check-llms');
const specs = [
  { id: 'alpha', name: 'Alpha', group: '互動元件', when: '第一個元件。', notes: [] },
  { id: 'beta', name: 'Beta', group: '互動元件', when: '第二個元件，可以搭配 #alpha。', notes: [] },
];
const check = (name, opts = {}) => checkLlms(path.join(fixtures, name), { specs, ...opts });

function makeDir(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'check-llms-test-'));
  for (const [rel, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    writeFileSync(path.join(dir, rel), content);
  }
  return dir;
}

// ── 正常 ──

test('正確的輸出 → 通過；程式碼裡的連結與 undefined、框架原文的 null 都不算錯', () => {
  const result = check('ok');
  assert.deepEqual(result.errors, []);
  assert.equal(result.specs, 2);
  assert.equal(result.files, 3);
  // llms.txt 2 個、alpha.md 1 個（範例網站是外部網址，不算）、beta.md 3 個（含段落錨點與 ../llms.txt）
  assert.equal(result.links, 6);
});

test('export-llms 產生的檔案 → 通過（產生與檢查的規則一致）', () => {
  const fullSpecs = [
    ...specs,
    { id: 'gamma', name: 'Gamma (Portal)', group: '表單元件', notes: [{ type: 'warn', content: '見 #beta' }], anatomy: [{ name: '外框', description: '見 #alpha' }] },
  ];
  const frameworks = {
    angular: {
      label: 'Angular',
      ref: 'v0.0.1',
      repo: 'https://github.com/example/ng.git',
      storybook: 'https://example.test/ng/',
      docs: [{ id: 'alpha', selector: 'app-alpha', props: [{ name: 'x', type: 'string | null', default: 'null', desc: 'null 為不顯示' }], usage: [{ code: '<app-alpha />' }] }],
      stories: { alpha: [{ id: 'alpha--default', name: 'Default' }] },
    },
  };
  const files = buildLlmsFiles({ specs: fullSpecs, frameworks, version: 'main', groups: ['互動元件', '表單元件'] });
  const dir = makeDir(files);
  const result = checkLlms(dir, { specs: fullSpecs });
  assert.deepEqual(result.errors, []);
  assert.equal(result.specs, 3);
  rmSync(dir, { recursive: true });
});

// ── 注錯 ──

test('少一份元件檔 → 失敗，指出 components/beta.md', () => {
  const { errors } = check('missing-md');
  assert.ok(errors.length > 0);
  assert.ok(errors.some((e) => e.includes('components/beta.md') && e.includes('不存在')), errors.join('\n'));
});

test('連結指到不存在的檔案 → 失敗，指出哪個檔案第幾行、哪個連結', () => {
  const { errors } = check('broken-link');
  assert.deepEqual(errors, ['components/alpha.md:5：連結 gamma.md 找不到檔案']);
});

test('漏值印出 undefined → 失敗，指出檔案與行號', () => {
  const { errors } = check('leaked-undefined');
  assert.deepEqual(errors, ['components/alpha.md:7：出現 undefined（產生檔案時漏了值）']);
});

test('llms.txt 漏列一個元件 → 失敗，指出 llms.txt 與元件', () => {
  const { errors } = check('missing-from-llms');
  assert.deepEqual(errors, ['llms.txt：沒有列出 beta（components/beta.md）']);
});

test('llms.txt 重複列出、列了不是規格的元件、元件檔標題沒有名稱、連結不是相對路徑 → 各自失敗', () => {
  const dir = makeDir({
    'llms.txt': '# Mendesky Design System\n\n- [Alpha](components/alpha.md)\n- [Alpha](components/alpha.md)\n- [Beta](components/beta.md)\n- [Ghost](components/ghost.md)\n',
    'components/alpha.md': '# 沒有名稱（alpha）\n',
    'components/beta.md': '# Beta（beta）\n\n見 [Alpha](/components/alpha.md)。\n',
    'components/ghost.md': '# Ghost（ghost）\n',
  });
  const { errors } = checkLlms(dir, { specs });
  assert.deepEqual(errors.sort(), [
    'components/alpha.md：第一行應該是標題「# Alpha（alpha）」，現在是「# 沒有名稱（alpha）」',
    'components/beta.md:3：連結 /components/alpha.md 不是相對路徑',
    'llms.txt：alpha 列了 2 次',
    'llms.txt：列出的 ghost 不是任何元件規格',
  ]);
  rmSync(dir, { recursive: true });
});

test('元件檔放的是別的元件（標題含有這個元件的名稱，例如 button.md 放了 Icon Button）→ 失敗，指出檔案', () => {
  const pair = [
    { id: 'button', name: 'Button', group: '互動元件', notes: [] },
    { id: 'icon-btn', name: 'Icon Button', group: '互動元件', notes: [] },
  ];
  const dir = makeDir({
    'llms.txt': '# Mendesky Design System\n\n- [Button](components/button.md)\n- [Icon Button](components/icon-btn.md)\n',
    'components/button.md': '# Icon Button（icon-btn）\n',
    'components/icon-btn.md': '# Icon Button（icon-btn）\n',
  });
  const { errors } = checkLlms(dir, { specs: pair });
  assert.deepEqual(errors, ['components/button.md：第一行應該是標題「# Button（button）」，現在是「# Icon Button（icon-btn）」']);
  rmSync(dir, { recursive: true });
});

test('連結指到網站目錄外、連到不存在的檔案再接段落錨點 → 各自失敗，指出檔案與行號', () => {
  const dir = makeDir({
    'llms.txt': '# Mendesky Design System\n\n- [Alpha](components/alpha.md)\n- [Beta](components/beta.md)\n',
    'components/alpha.md': '# Alpha（alpha）\n\n見 [外面](../../outside.md)。\n',
    'components/beta.md': '# Beta（beta）\n\n見 [Gamma 的部位](gamma.md#部位)。\n',
  });
  const { errors } = checkLlms(dir, { specs });
  assert.deepEqual(errors, ['components/alpha.md:3：連結 ../../outside.md 指到網站目錄外', 'components/beta.md:3：連結 gamma.md#部位 找不到檔案']);
  rmSync(dir, { recursive: true });
});

test('~~~ 圍欄的程式碼區塊裡的連結與 undefined 不算；網址編碼的連結解碼後再找', () => {
  const dir = makeDir({
    'llms.txt': '# Mendesky Design System\n\n- [Alpha](components/alpha.md)\n- [Beta](components/beta.md)\n',
    'components/alpha.md': '# Alpha（alpha）\n\n~~~html\n<a>[x](missing.md)</a>\nundefined\n~~~\n',
    'components/beta.md': '# Beta（beta）\n\n見 [Alpha](alph%61.md)。\n',
  });
  const result = checkLlms(dir, { specs });
  assert.deepEqual(result.errors, []);
  assert.equal(result.links, 3);
  rmSync(dir, { recursive: true });
});

test('findLeaks：抓到單獨出現的 undefined、null 與 [object Object]；句子裡的 null 與程式碼不算', () => {
  assert.deepEqual(findLeaks('分組：undefined\n| `x` | null |\n- [object Object]\n'), [
    { line: 1, word: 'undefined' },
    { line: 2, word: 'null' },
    { line: 3, word: '[object Object]' },
  ]);
  assert.deepEqual(findLeaks('| `x` | `null` | null 為不顯示 |\n點擊清除會將值設為 null\n```js\nlet a = undefined;\n```\n'), []);
});

test('findLeaks：產生檔案時放值的每個位置都抓得到', () => {
  const lines = [
    '# undefined（button）',
    '# Button（null）',
    '#### undefined 注意事項',
    '1. **undefined**：可以點的範圍',
    '- **鍵盤**：undefined',
    '- **注意**：null',
    '- undefined',
    'undefined',
    '**null**',
    '- [Button](components/button.md): undefined',
    '- [undefined](components/button.md): 何時用',
    '- 撐滿寬度。（範例：[undefined 版](https://x.test/)）',
    '- 撐滿寬度。（範例代號：undefined）',
    '- [Angular 範例網站](https://x.test/): 版本 undefined；原始碼 null',
    '| `x` | `string` | undefined | 說明 |',
  ];
  const found = findLeaks(lines.join('\n'));
  assert.deepEqual([...new Set(found.map((f) => f.line))], lines.map((_, i) => i + 1));
});

test('findLeaks：框架原文裡的 null（摘要的型別、句子、跳脫的 |）不算', () => {
  const text = [
    'size: S|M|L · (valueChange: number|null) · (valueCommit: number | null)',
    'label · key · [sort]: SortState | null · align: start|end',
    '- 最小值；null = 無限制',
    '- clearValue → 立即 emit null。',
    '| `min` | `number \\| null` | `null` | 最小值；null = 無限制 |',
    '| `x` | `T` |  | 型別 number \\| null |',
  ].join('\n');
  assert.deepEqual(findLeaks(text), []);
});

// ── 檢查本身壞掉 ──

test('網站目錄不存在 → 失敗，不得當成通過', () => {
  const result = check('does-not-exist');
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /不存在/);
});

test('llms.txt 不存在 → 失敗', () => {
  const { errors } = check('no-llms');
  assert.ok(errors.some((e) => e.startsWith('llms.txt 不存在')), errors.join('\n'));
});

test('讀到 0 份元件規格 → 失敗，不得當成通過', () => {
  const result = check('ok', { specs: [] });
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /讀不到任何元件規格/);
});

test('命令列：網站目錄不存在、llms.txt 不存在 → 結束碼非 0，也不印「通過」', () => {
  for (const name of ['does-not-exist', 'no-llms']) {
    const r = spawnSync(process.execPath, [path.join(here, 'check-llms.mjs'), path.join(fixtures, name)], { encoding: 'utf8' });
    assert.notEqual(r.status, 0, `${name}：結束碼是 ${r.status}`);
    assert.ok(!r.stdout.includes('通過'), `${name}：印出了 ${r.stdout}`);
  }
});
