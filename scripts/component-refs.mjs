// 本體說明裡指其他元件的寫法：`#元件id`（例：「改用 #check-chip」）。
//
// 本體只寫跨框架的內容，所以不寫 app-check-chip 或 <DsCheckChip>。各處自己決定顯示成什麼：
// 文件網站顯示元件名稱並加連結，Angular 匯出時換成 app-xxx，之後的 Vue 或 APP 版換成自己的名稱。
//
// 規則：# 後面接小寫英文開頭、可含數字與連字號的 id。以下不算：
//   - 色碼（#fff、#ffffff 這類 3、4、6、8 位的十六進位）
//   - 網址裡的 #（https://…#warning）
//   - 行內程式碼（一對反引號）裡的 #（例如 `#menu`）：程式碼各處都原樣顯示，不換名稱
//   - 前面緊接英數字、/、&、# 的 #（例如 a#b、&#x27;）
// 這支檔案不依賴 Node，文件網站的瀏覽器端也直接用。
// 它也隨套件發布（@mendesky/ds/scripts/component-refs.mjs，型別在 component-refs.d.mts），
// 框架 repo 用它把 #元件id 換成自己的名稱，不要各自重寫一份規則。
const REF = /(?<![\w/&#])#([a-z][a-z0-9]*(?:-[a-z0-9]+)*)(?![\w-])/g;
const HEX_COLOR = /^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/;
const URL = /https?:\/\/\S+/g;
const CODE = /`[^`]+`/g;

/** 把文字拆成 [{ text }] 與 [{ ref: 元件id }]，順序不變。 */
export function splitRefs(text) {
  const skip = [...text.matchAll(URL), ...text.matchAll(CODE)].map((m) => [m.index, m.index + m[0].length]);
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(REF)) {
    if (HEX_COLOR.test(m[1])) continue;
    if (skip.some(([start, end]) => m.index >= start && m.index < end)) continue;
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ ref: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

/** 文字裡所有的元件 id（依出現順序，可能重複）。 */
export function findRefs(text) {
  return splitRefs(text)
    .filter((p) => 'ref' in p)
    .map((p) => p.ref);
}

/** 把 #元件id 換成 nameOf(id) 的結果；nameOf 回傳 undefined 時保留原樣。 */
export function renderRefs(text, nameOf) {
  return splitRefs(text)
    .map((p) => ('ref' in p ? nameOf(p.ref) ?? `#${p.ref}` : p.text))
    .join('');
}
