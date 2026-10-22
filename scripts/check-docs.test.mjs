import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkDocs } from './check-docs.mjs';

const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), '__fixtures__', 'check-docs');
const run = (name) => checkDocs(path.join(fixtures, name));

// ── 元件規格 ────────────────────────────────────────────────

test('規格、token、字型、互動原則都一致 → 通過', () => {
  const result = run('fnd-ok');
  assert.equal(result.checked, 1);
  assert.deepEqual(result.errors, []);
});

test('一份規格都沒掃到 → 失敗（防空集合假綠）', () => {
  const { errors, checked } = run('empty');
  assert.equal(checked, 0);
  assert.match(errors.join('\n'), /0 份/);
});

test('規格檔語法錯誤 → 失敗，不得略過', () => {
  const { errors } = run('spec-syntax-error');
  assert.match(errors.join('\n'), /demo\.ts：無法載入/);
});

test('規格的 id 跟檔名不一致 → 失敗', () => {
  const { errors } = run('spec-id-mismatch');
  assert.equal(errors.length, 2); // id 不一致 ＋ 互動原則指向的 #demo 不存在
  assert.match(errors.join('\n'), /id「other」與檔名不一致/);
});

test('規格的分組不合法 → 失敗', () => {
  const { errors } = run('spec-bad-group');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /不存在的分組/);
});

test('總表漏列規格 → 失敗', () => {
  const { errors } = run('index-missing-entry');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /總表漏列的規格：demo/);
});

// ── 基礎與互動原則 ───────────────────────────────────────────

test('說明裡有、core.scss 沒有的 token → 失敗', () => {
  const { errors } = run('fnd-token-stale');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /--text\\\/gone/);
});

test('core.scss 有、說明沒有的 token → 失敗', () => {
  const { errors } = run('fnd-token-undocumented');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /--ease-enter/);
});

test('說明裡有、core.scss 沒有的字型 class → 失敗', () => {
  const { errors } = run('fnd-type-stale');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /\.noto-99-gone/);
});

test('互動原則的相關元件或相關原則不存在 → 失敗', () => {
  const { errors } = run('fnd-pattern-dangling');
  assert.equal(errors.length, 2);
  assert.match(errors.join('\n'), /#no-such-component/);
  assert.match(errors.join('\n'), /other\.missing/);
});

test('說明裡的 token 值跟 core.scss 不同 → 失敗', () => {
  const { errors } = run('fnd-token-value-drift');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /--text\\\/body/);
  assert.match(errors[0], /#000000/);
});

// ── 本體只寫跨框架的內容 ───────────────────────────────────────

test('文字只用 #元件id 指元件、屬性只寫名稱（色碼、網址、本體 class 不算）→ 通過', () => {
  const { errors } = run('neutral-ok');
  assert.deepEqual(errors, []);
});

test('規格文字出現 Angular 寫法 → 失敗，指出檔案、欄位與那段寫法', () => {
  const { errors } = run('neutral-framework-syntax');
  const text = errors.join('\n');
  assert.match(text, /components\/demo\.ts：when：.*Angular 元件標籤「app-button」/);
  assert.match(text, /notes\[0\]\.content：.*Angular 屬性綁定「\[disabled\]」/);
  assert.match(text, /notes\[0\]\.content：.*Angular 的 API「ngModel」/);
  assert.match(text, /notes\[1\]：.*Angular 的 API「@defer」/);
  assert.match(text, /notes\[2\]：.*Angular 的 API「Signal」/);
  assert.match(text, /notes\[3\]：.*Angular 的 API「Karma」/);
  assert.match(text, /notes\[4\]：.*Angular 事件綁定「\(add\)」/);
  assert.match(text, /notes\[5\]：.*Angular 內容投影選擇器「\[slot=left\]」/);
  assert.match(text, /notes\[6\]：.*Angular 屬性綁定「\[attr\.aria-label\]」/);
});

test('#元件id 指到不存在的元件（拼錯）→ 失敗', () => {
  const { errors } = run('neutral-bad-ref');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /when：#buton 不是任何元件的 id/);
});

test('一段文字都讀不到 → 失敗，不得顯示通過（檢查本身失效）', () => {
  const { errors } = run('neutral-unreadable');
  assert.match(errors.join('\n'), /框架寫法檢查讀到 0 段文字/);
});
