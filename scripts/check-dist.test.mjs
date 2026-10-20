import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { compareDirs } from './check-dist.mjs';

function makeDir(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'check-dist-test-'));
  for (const [rel, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    writeFileSync(path.join(dir, rel), content);
  }
  return dir;
}

test('內容完全相同 → 沒有差異', () => {
  const a = makeDir({ 'index.js': 'x', 'utils/a.js': 'y' });
  const b = makeDir({ 'index.js': 'x', 'utils/a.js': 'y' });
  assert.deepEqual(compareDirs(a, b), { missing: [], extra: [], changed: [] });
  rmSync(a, { recursive: true }); rmSync(b, { recursive: true });
});

test('少檔、多檔、內容不同都抓得到', () => {
  const expected = makeDir({ 'index.js': 'x', 'new.js': 'n', 'same.js': 's' });
  const actual = makeDir({ 'index.js': 'OLD', 'gone.js': 'g', 'same.js': 's' });
  assert.deepEqual(compareDirs(expected, actual), { missing: ['new.js'], extra: ['gone.js'], changed: ['index.js'] });
  rmSync(expected, { recursive: true }); rmSync(actual, { recursive: true });
});
