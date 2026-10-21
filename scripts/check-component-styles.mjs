// 元件共用樣式檢查：styles/components/<名稱>.scss 每份都要能編譯，而且每條規則都在 .ds-<名稱> 底下。
//
// 這些樣式不像 Angular 的元件樣式那樣自動限定在元件內，跑到 .ds-<名稱> 外面的規則會影響整個頁面。
// 允許的最上層：.ds-<名稱> 開頭的選擇器、@keyframes。一份都沒掃到也算失敗。
//
// 用法：node scripts/check-component-styles.mjs [樣式資料夾，預設 styles/components]
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

/** 編譯後 CSS 的最上層區塊：[{ prelude }]（prelude 是選擇器或 @規則） */
function topLevelPreludes(css) {
  const out = [];
  let depth = 0;
  let start = 0;
  let quote = null;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '{') {
      if (depth === 0) out.push(css.slice(start, i).trim());
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) start = i + 1;
    }
  }
  return out;
}

export function checkComponentStyles(dir) {
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.scss') && !f.startsWith('_')).sort() : [];
  if (files.length === 0) return { checked: 0, failures: [`${dir} 裡沒有任何元件樣式`] };
  const failures = [];
  for (const file of files) {
    const root = `.ds-${file.replace(/\.scss$/, '')}`;
    let css;
    try {
      css = sass.compile(path.join(dir, file), { style: 'compressed' }).css;
    } catch (e) {
      failures.push(`${file}：編譯失敗：${e.message.split('\n')[0]}`);
      continue;
    }
    for (const prelude of topLevelPreludes(css)) {
      if (prelude.startsWith('@keyframes')) continue;
      const outside = prelude.split(',').filter((sel) => !new RegExp(`^${root.replace('.', '\\.')}(?![\\w-])`).test(sel.trim()));
      if (outside.length) failures.push(`${file}：規則不在 ${root} 底下：${outside.join(', ')}`);
    }
  }
  return { checked: files.length, failures };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'styles', 'components'));
  const { checked, failures } = checkComponentStyles(dir);
  if (failures.length) {
    console.error(`元件樣式檢查失敗：`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`元件樣式檢查通過：${checked} 份都能編譯，規則都在各自的 .ds-<名稱> 底下`);
}
