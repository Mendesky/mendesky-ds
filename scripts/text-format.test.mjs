// 說明文字格式（text-format.mjs）的測試。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseInline, formatProblems } from './text-format.mjs';

// ── 拆成片段 ────────────────────────────────────────────────

test('沒有格式的文字 → 一段文字', () => {
  assert.deepEqual(parseInline('任何可點擊操作。'), [{ text: '任何可點擊操作。', bold: false }]);
});

test('粗體裡的 #元件id 一樣換成元件，前後文字不受影響', () => {
  assert.deepEqual(parseInline('先看 **改用 #button 時** 再說'), [
    { text: '先看 ', bold: false },
    { text: '改用 ', bold: true },
    { ref: 'button', bold: true },
    { text: ' 時', bold: true },
    { text: ' 再說', bold: false },
  ]);
});

test('行內程式碼原樣保留：裡面的 <button>、#name、** 都不解讀', () => {
  assert.deepEqual(parseInline('禁止原生 `<button>`；範本變數 `#menu` 與 `a**b`'), [
    { text: '禁止原生 ', bold: false },
    { code: '<button>', bold: false },
    { text: '；範本變數 ', bold: false },
    { code: '#menu', bold: false },
    { text: ' 與 ', bold: false },
    { code: 'a**b', bold: false },
  ]);
});

test('粗體裡可以有行內程式碼', () => {
  assert.deepEqual(parseInline('**文字顏色寫 `color: inherit`**'), [
    { text: '文字顏色寫 ', bold: true },
    { code: 'color: inherit', bold: true },
  ]);
});

test('落單的 ** 照原樣當文字，前面成對的照樣是粗體', () => {
  assert.deepEqual(parseInline('**甲** 乙 ** 丙'), [
    { text: '甲', bold: true },
    { text: ' 乙 ** 丙', bold: false },
  ]);
});

test('refs: false（框架提供的文字）→ 粗體與行內程式碼照樣拆，#name 不當元件', () => {
  assert.deepEqual(parseInline('**用綁定** 與 #menu 範本變數', { refs: false }), [
    { text: '用綁定', bold: true },
    { text: ' 與 #menu 範本變數', bold: false },
  ]);
});

test('沒收尾的反引號照原樣當文字', () => {
  assert.deepEqual(parseInline('寫 `x 沒收尾'), [{ text: '寫 `x 沒收尾', bold: false }]);
});

// ── 不合格式的寫法 ──────────────────────────────────────────

test('合格的寫法：粗體、行內程式碼（含標籤名與 noto-*）、#元件id、色碼、網址、不等式 → 沒有問題', () => {
  for (const text of [
    '**放入自訂內容時，文字顏色寫 `color: inherit`**',
    '禁止原生 `<button>`；字型用 `noto-*`。',
    '改用 #check-chip，底色 #fff。',
    '見 https://example.com/a#b 與 a < b、c > d。',
  ]) {
    assert.deepEqual(formatProblems(text), [], text);
  }
});

test('直接寫的 HTML 標籤（含屬性、結尾標籤）→ 逐一指出，提示包成行內程式碼', () => {
  const problems = formatProblems('禁止原生 <button>；貼上時移除 <b style="font-weight:normal"> 與 </div>');
  assert.equal(problems.length, 3, problems.join('\n'));
  assert.match(problems[0], /HTML 標籤「<button>」.*`<button>`/);
  assert.match(problems[1], /HTML 標籤「<b style="font-weight:normal">」/);
  assert.match(problems[2], /HTML 標籤「<\/div>」/);
});

test('有命名空間的標籤與 HTML 註解也算標籤；不等式與比較不算', () => {
  const problems = formatProblems('貼上時移除 <o:p>、<w:sdt> 與 <!-- 條件註解 -->');
  assert.equal(problems.length, 3, problems.join('\n'));
  assert.match(problems[0], /「<o:p>」/);
  assert.match(problems[1], /「<w:sdt>」/);
  assert.match(problems[2], /「<!-- 條件註解 -->」/);
  for (const text of ['a < b > c', 'value <= 3', 'A<B', '1 <2 and 3> 4', '`<o:p>`']) {
    assert.deepEqual(formatProblems(text), [], text);
  }
});

test('行首的清單、引言、標題、程式碼區塊、分隔線 → 指出第幾行（框架網站會畫成區塊）', () => {
  for (const [text, kind] of [
    ['1. 先選類型，再填內容。', '清單'],
    ['- 只放一個主要按鈕。', '清單'],
    ['> 不要在按鈕裡放連結。', '引言'],
    ['#主要按鈕一次只放一個。', '標題'],
    ['## 小標', '標題'],
    ['    縮排四格', '程式碼區塊'],
    ['文字\n- 項', '清單'],
    ['文字\n---', '分隔線'],
  ]) {
    const problems = formatProblems(text);
    assert.equal(problems.length, 1, `${text}\n${problems.join('\n')}`);
    assert.match(problems[0], new RegExp(`第 ${text.includes('\n') ? 2 : 1} 行.*${kind}`), text);
  }
  // # 後面接英數字（#元件id、色碼）：框架網站把這種 # 跳脫，不會變成標題
  for (const text of ['#button 是主要操作。', '#ffffff（白色）', '`-` 是減號', '`a` `b` `c` `d` 四段程式碼', 'a - b、超過 5 筆、1.5 倍']) {
    assert.deepEqual(formatProblems(text), [], text);
  }
});

test('#元件id 緊貼行內程式碼 → 指出（框架網站換成名稱後會跟程式碼黏成一段）', () => {
  for (const text of ['用 `<x>`#button 包起來', '用 #button`<x>` 包起來']) {
    const problems = formatProblems(text);
    assert.equal(problems.length, 1, `${text}\n${problems.join('\n')}`);
    assert.match(problems[0], /#button.*空一格/);
  }
  assert.deepEqual(formatProblems('用 `<x>` #button 包起來'), []);
});

test('plain（表格標題、欄名：各處都只顯示純文字）→ 只擋粗體與行內程式碼，標籤名與 * 照原樣顯示', () => {
  const problems = formatProblems('**甲** 與 `乙`', { plain: true });
  assert.equal(problems.length, 1, problems.join('\n'));
  assert.match(problems[0], /純文字/);
  assert.deepEqual(formatProblems('原生 <button> 的 noto-*', { plain: true }), []);
});

test('沒收尾的反引號、落單的 **、粗體以外的 *、Markdown 連結 → 各自指出', () => {
  assert.match(formatProblems('寫 `x 沒收尾').join('\n'), /反引號/);
  assert.match(formatProblems('**甲** 乙 ** 丙').join('\n'), /落單的 \*\*/);
  assert.match(formatProblems('字型用 noto-*、mono-* 兩種').join('\n'), /粗體以外的 \*.*`noto-\*`/);
  assert.match(formatProblems('見 [說明](https://example.com)').join('\n'), /Markdown 連結「\[說明\]\(https:\/\/example\.com\)」/);
});
