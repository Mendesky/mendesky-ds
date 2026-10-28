// 說明文字（元件規格、互動原則、基礎說明）可用的格式，只有三種：
//   - 粗體：**…**
//   - 行內程式碼：`…`（HTML 標籤名、含 * 的名稱，例如 `<button>`、`noto-*`，一律寫在這裡面）
//   - 指其他元件：#元件id（規則見 component-refs.mjs）
// 其他 Markdown（連結、斜體）不用；行首也不寫會變成區塊的寫法（清單、引言、標題、程式碼區塊、分隔線）。
// 表格標題與欄名各處都只顯示純文字，連粗體與行內程式碼都不用（formatProblems 的 plain）。
//
// 為什麼要限定：同一段文字會在三個地方顯示。文件網站照這支檔案拆片段顯示；各框架的範例網站把文字交給 Markdown，
// 直接寫的 <button> 會被畫成真的按鈕（字不見、還多一個看不見的按鈕），兩個 * 之間會變斜體；
// 給 AI 讀的 .md 則是原文。只用這三種，三個地方才會長得一樣。
//
// 這支檔案不依賴 Node，文件網站的瀏覽器端也直接用（RefText.vue）；說明檢查（check-docs.mjs）用 formatProblems 擋下不合格式的寫法。
import { splitRefs } from './component-refs.mjs';

const CODE = /`([^`]+)`/g;
const TAG = /<\/?[A-Za-z][\w:.-]*(?:\s[^<>]*)?\/?>|<!--[\s\S]*?(?:-->|$)|<![A-Za-z[][^>]*>|<\?[^>]*\?>/g;
const LINK = /\[[^\]\n]+\]\([^)\s]+\)/g;

/**
 * 把文字拆成片段，順序不變：{ text, bold }、{ ref: 元件id, bold }、{ code, bold }。
 * 行內程式碼的內容原樣保留，不換 #元件id、不解讀 **。沒有成對的 ** 與沒收尾的反引號照原樣當文字。
 * refs: false 時不找 #元件id（框架提供的文字，裡面的 # 是框架自己的寫法，例如範本變數）。
 */
export function parseInline(text, { refs = true } = {}) {
  const items = [];
  let last = 0;
  for (const m of text.matchAll(CODE)) {
    if (m.index > last) items.push({ plain: text.slice(last, m.index) });
    items.push({ code: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) items.push({ plain: text.slice(last) });

  // 成對的 ** 才切換粗體；總數是單數時，最後一個照原樣當文字
  const marks = items.reduce((n, it) => n + ('plain' in it ? it.plain.split('**').length - 1 : 0), 0);
  let toggles = marks - (marks % 2);
  let bold = false;
  const out = [];
  const pushText = (s) => {
    for (const p of refs ? splitRefs(s) : [{ text: s }]) {
      const prev = out[out.length - 1];
      if ('ref' in p) out.push({ ref: p.ref, bold });
      else if (prev && 'text' in prev && prev.bold === bold) prev.text += p.text;
      else out.push({ text: p.text, bold });
    }
  };
  for (const it of items) {
    if ('code' in it) {
      out.push({ code: it.code, bold });
      continue;
    }
    it.plain.split('**').forEach((piece, i) => {
      if (i > 0) {
        if (toggles > 0) {
          bold = !bold;
          toggles--;
        } else pushText('**');
      }
      if (piece) pushText(piece);
    });
  }
  return out;
}

/**
 * 不合說明文字格式的地方（每項一句，給說明檢查用）；沒有問題回傳空陣列。
 * plain：各處都只顯示純文字的欄位（表格標題、欄名），只擋粗體與行內程式碼的符號，因為三處都會原樣印出來。
 */
export function formatProblems(text, { plain = false } = {}) {
  if (plain) {
    return /\*\*|`/.test(text) ? ['這裡各處都只顯示純文字（表格標題、欄名）：不用粗體 ** 與行內程式碼的反引號，不然符號會原樣印出來'] : [];
  }
  const problems = [];
  if ((text.match(/`/g) ?? []).length % 2) problems.push('有沒收尾的反引號 `：行內程式碼要用一對反引號包起來');
  const outside = text.replace(CODE, ' ');
  for (const m of outside.matchAll(TAG)) {
    problems.push(`直接寫了 HTML 標籤「${m[0]}」：要寫成行內程式碼 \`${m[0]}\`，不然框架網站會把它畫成真的元素`);
  }
  problems.push(...blockProblems(text));
  // 框架網站把 #元件id 換成包在反引號裡的名稱，緊貼著的程式碼會跟它黏成一段
  const parts = splitRefs(text);
  parts.forEach((p, i) => {
    if (!('ref' in p)) return;
    if (parts[i - 1]?.text?.endsWith('`') || parts[i + 1]?.text?.startsWith('`')) {
      problems.push(`#${p.ref} 緊貼行內程式碼：中間空一格，不然框架網站換成名稱後會跟程式碼黏成一段`);
    }
  });
  for (const m of outside.matchAll(LINK)) {
    problems.push(`有 Markdown 連結「${m[0]}」：說明文字不用連結，網址直接寫出來`);
  }
  if ((outside.split('**').length - 1) % 2) problems.push('有落單的 **：粗體要用一對 ** 包起來');
  // 引用含 * 的那個英文名稱（中文沒有空白，取到整句太長）
  const star = outside.replaceAll('**', '').match(/[\w./:-]*\*[\w./:-]*/);
  if (star) {
    problems.push(`有粗體以外的 *「${star[0]}」：含 * 的名稱寫成行內程式碼（例如 \`noto-*\`），不然框架網站可能把兩個 * 之間當成斜體`);
  }
  return problems;
}

// 行首寫法 → 框架網站的 Markdown 會畫成的區塊（依序比對，先中先算）
const BLOCKS = [
  [/^(?: {4,}|\t)\S/, '程式碼區塊'],
  [/^ {0,3}(?:(?:[-*_] *){3,}|=+ *)$/, '分隔線或標題'],
  [/^ {0,3}(?:[-*+]|\d{1,9}[.)])(?:[ \t]|$)/, '清單'],
  [/^ {0,3}>/, '引言'],
];

/** 每一行的開頭有沒有會變成區塊的寫法（行內程式碼裡的不算） */
function blockProblems(text) {
  // 程式碼換成等長的 x：行數與位置不變，行首的程式碼也不會被當成寫法
  const masked = text.replace(CODE, (m) => m.replace(/[^\n]/g, 'x'));
  const lines = text.split('\n');
  const problems = [];
  masked.split('\n').forEach((line, i) => {
    let kind = BLOCKS.find(([re]) => re.test(line))?.[1];
    // # 開頭：後面接英數字的（#元件id、色碼 #fff）框架網站會先跳脫，接空白、中文或另一個 # 的會變成標題
    if (!kind && /^ {0,3}#(?![0-9A-Za-z])/.test(line)) kind = '標題';
    if (kind) {
      const head = lines[i].trim().slice(0, 12);
      problems.push(`第 ${i + 1} 行開頭「${head}」在框架網站會畫成${kind}：改寫開頭（例如「1. 」改成「第一步，」）`);
    }
  });
  return problems;
}
