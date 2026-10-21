// 元件共用樣式檢查（check-component-styles.mjs）的測試。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkComponentStyles } from './check-component-styles.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(here, '__fixtures__', 'component-styles');

test('每條規則都在 .ds-<檔名> 底下、只多了 @keyframes → 通過', () => {
  const { checked, failures } = checkComponentStyles(path.join(fixtures, 'ok'));
  assert.equal(checked, 1);
  assert.deepEqual(failures, []);
});

test('有規則跑到 .ds-<檔名> 外面（會影響整個頁面）→ 失敗並指出選擇器', () => {
  const { failures } = checkComponentStyles(path.join(fixtures, 'leak'));
  assert.equal(failures.length, 1);
  assert.match(failures[0], /thing\.scss/);
  assert.match(failures[0], /\.thing__part/);
});

test('資料夾裡一份樣式都沒有 → 失敗', () => {
  const { checked, failures } = checkComponentStyles(path.join(fixtures, 'missing'));
  assert.equal(checked, 0);
  assert.equal(failures.length, 1);
});

test('本體的元件樣式全部通過', () => {
  const { checked, failures } = checkComponentStyles(path.join(here, '..', 'styles', 'components'));
  assert.ok(checked >= 9, `只檢查到 ${checked} 份`);
  assert.deepEqual(failures, []);
});
