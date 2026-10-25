import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { checkGuide, checkGuides } from './check-guides.mjs';

const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), '__fixtures__', 'check-guides');
const componentIds = new Set(['demo', 'other']);

// 各框架的範例檢查器在框架 repo；這裡用替身記錄收到哪些程式碼，並把 ghost 標籤當成寫錯
function frameworks() {
  const calls = { angular: [], vue: [] };
  const fake = (name, tag) => (snippets) => {
    calls[name].push(...snippets.map((s) => s.code.trim()));
    return snippets.filter((s) => s.code.includes(tag)).map((s) => `${s.where}：${tag} 不存在`);
  };
  return {
    calls,
    fws: {
      angular: { label: 'Angular', ids: new Set(['demo', 'other']), checkSnippets: fake('angular', '<app-ghost') },
      vue: { label: 'Vue', ids: new Set(['demo']), checkSnippets: fake('vue', '<DsGhost') },
    },
  };
}
const run = (text, fws = frameworks().fws) => checkGuide('g.md', text, { frameworks: fws, componentIds });
const group = (angular, vue, vueLang = 'vue') => `::: code-group\n\n\`\`\`html [Angular]\n${angular}\n\`\`\`\n\n\`\`\`${vueLang} [Vue]\n${vue}\n\`\`\`\n\n:::\n`;

test('中性文字＋每個框架一個分頁 → 通過；各分頁的程式碼交給該框架的檢查器', () => {
  const { calls, fws } = frameworks();
  const text = readFileSync(path.join(fixtures, 'ok', 'a.md'), 'utf8');
  assert.deepEqual(checkGuide('a.md', text, { frameworks: fws, componentIds }), []);
  assert.deepEqual(calls.angular, ['<app-demo text="嗨" />', '<app-other />']);
  assert.deepEqual(calls.vue, ['<DsDemo text="嗨" />']);
});

test('程式碼區塊外有框架寫法 → 失敗，指出行號', () => {
  const errors = run('# 標題\n\n選項一律用 app-button。\n');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^g\.md:3：文字裡有Angular 元件標籤「app-button」/);
});

test('文字裡直接寫 #元件id（指南不會換成名稱）→ 失敗，建議改用 ComponentLink', () => {
  const errors = run('改用 #demo。\n');
  assert.deepEqual(errors, ['g.md:1：#demo 在指南裡不會換成元件名稱，請改用 <ComponentLink id="demo" />']);
});

test('有框架寫法的程式碼沒放進 code-group → 失敗', () => {
  const errors = run('```html\n<app-demo />\n```\n');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^g\.md:1：這段程式碼有Angular 元件標籤，要放進 ::: code-group/);
});

test('code-group 少了一個框架的分頁 → 失敗', () => {
  const errors = run('::: code-group\n\n```html [Angular]\n<app-demo />\n```\n\n:::\n');
  assert.deepEqual(errors, ['g.md:1：程式碼分頁缺少 Vue']);
});

test('Vue 分頁用了不存在的元件或屬性（Vue 的檢查器抓到）→ 失敗', () => {
  const errors = run(group('<app-demo />', '<DsGhost />'));
  assert.deepEqual(errors, ['g.md:7（Vue 分頁）：<DsGhost 不存在']);
});

test('分頁混用別的框架的寫法 → 失敗', () => {
  const errors = run(group('<app-demo />', '<app-demo />'));
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^g\.md:7：Vue 分頁裡有Angular 元件標籤「app-demo」/);
});

test('「尚無 Vue 版」但 Vue 其實有這個元件 → 失敗，提醒補範例', () => {
  const errors = run(group('<app-demo />', '尚無 Vue 版：#demo', 'text'));
  assert.deepEqual(errors, ['g.md:7：Vue 已經有 #demo，請把「尚無 Vue 版」換成範例程式碼']);
});

test('「尚無 Vue 版」沒列元件或列了不存在的 id → 失敗', () => {
  assert.deepEqual(run(group('<app-demo />', '尚無 Vue 版', 'text')), ['g.md:7：「尚無 Vue 版」要列出缺的元件，例如 #select']);
  assert.deepEqual(run(group('<app-demo />', '尚無 Vue 版：#nope', 'text')), ['g.md:7：#nope 不是任何元件的 id']);
});

test('框架版本沒有提供範例檢查器（檢查本身失效）→ 失敗，不得當成通過', () => {
  const { fws } = frameworks();
  fws.vue.checkSnippets = null;
  const errors = run(group('<app-demo />', '<DsDemo />'), fws);
  assert.deepEqual(errors, ['Vue（frameworks.json 指定的版本）沒有提供範例檢查器，指南的 Vue 範例沒有檢查']);
});

test('一篇指南都沒有 → 失敗', async () => {
  const { fws } = frameworks();
  const { checked, errors } = await checkGuides(path.join(fixtures, 'empty'), { frameworks: fws, componentIds });
  assert.equal(checked, 0);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /0 篇指南/);
});

test('目錄裡的指南都讀進來檢查', async () => {
  const { fws } = frameworks();
  const { checked, errors } = await checkGuides(path.join(fixtures, 'ok'), { frameworks: fws, componentIds });
  assert.equal(checked, 1);
  assert.deepEqual(errors, []);
});
