// `#元件id` 寫法（component-refs.mjs）的測試。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findRefs, splitRefs, renderRefs } from './component-refs.mjs';

test('找出文字裡的 #元件id', () => {
  assert.deepEqual(findRefs('改用 #check-chip；搭配 #modal-shell 的 canDismiss。'), ['check-chip', 'modal-shell']);
});

test('色碼不算元件代號', () => {
  assert.deepEqual(findRefs('底色 #fff、#ffffff、#cc5252、#fff8 與 #ffffff80'), []);
});

test('網址裡的 # 不算元件代號', () => {
  assert.deepEqual(findRefs('見 https://atlassian.design/components/modal-dialog/examples#warning 的範例'), []);
});

test('前面緊接英數字或 & 的 # 不算', () => {
  assert.deepEqual(findRefs('a#button、&#x27; 都不是'), []);
});

test('拆成一般文字與元件代號，順序不變', () => {
  assert.deepEqual(splitRefs('用 #button 或 #icon-btn。'), [
    { text: '用 ' },
    { ref: 'button' },
    { text: ' 或 ' },
    { ref: 'icon-btn' },
    { text: '。' },
  ]);
});

test('整段就是代號（互動原則的相關元件）', () => {
  assert.deepEqual(splitRefs('#modal-shell'), [{ ref: 'modal-shell' }]);
});

test('換成各處的名稱；查不到的保留原樣', () => {
  const names = { button: 'app-button' };
  assert.equal(renderRefs('改用 #button，不要用 #unknown。', (id) => names[id]), '改用 app-button，不要用 #unknown。');
});
