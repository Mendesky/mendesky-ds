// 說明檢查（本體）：確認元件規格、基礎（token、字型）、互動原則彼此一致。
//
// 檢查：
//   1. 每份元件規格能正確載入；id 與檔名一致、不重複；group 是合法分組；notes 是陣列
//   2. src/docs/components/index.ts 的總表列出全部規格，沒有多也沒有少
//   3. token 說明與 styles/core.scss 的 CSS 變數一致（名稱與值）；字型 class 存在
//   4. 互動原則引用的元件（#id）與其他原則都存在
// 一份規格都沒掃到也算失敗，避免「沒東西可查所以全過」。
// 各框架的「屬性名稱對程式碼」檢查在各框架 repo 自己做。
//
// 用法：node scripts/check-docs.mjs [repo 根目錄]
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDocFile, listSpecFiles } from './export-docs.mjs';

export const DOC_GROUPS = ['互動元件', '表單元件', '浮層元件', '展示元件', '工具'];

/**
 * core.scss 裡宣告的 CSS 變數 → 第一次宣告的值（名稱保留原始寫法，例如 `--text\/body`）。
 * 前面必須是行首、空白、{ 或 ;，排除 `.btn--disabled:hover` 這類 BEM 修飾 class 後接偽類。
 * 同一個變數在 media query 等處被覆寫時，以第一次（通常是 :root）為準。
 */
function scssCustomProperties(scss) {
  const map = new Map();
  for (const m of scss.matchAll(/(?:^|[\s{;])(--[A-Za-z0-9_\\/.-]+)\s*:\s*([^;]*);/gm)) {
    if (!map.has(m[1])) map.set(m[1], m[2].trim());
  }
  return map;
}

const normalizeValue = (v) => v.replace(/\s+/g, ' ').trim().toLowerCase();

export function checkSpecs(root) {
  const errors = [];
  const ids = new Set();
  const rel = (f) => path.relative(root, f);
  const files = listSpecFiles(root);
  for (const file of files) {
    let spec;
    try {
      spec = loadDocFile(file);
    } catch (e) {
      errors.push(`${rel(file)}：無法載入（${e.message}）`);
      continue;
    }
    const expectedId = path.basename(file, '.ts');
    if (spec.id !== expectedId) errors.push(`${rel(file)}：id「${spec.id}」與檔名不一致（應為「${expectedId}」）`);
    if (ids.has(spec.id)) errors.push(`${rel(file)}：id「${spec.id}」重複`);
    ids.add(spec.id);
    if (!spec.name) errors.push(`${rel(file)}：缺少 name`);
    if (!DOC_GROUPS.includes(spec.group)) errors.push(`${rel(file)}：group「${spec.group}」不是合法分組（${DOC_GROUPS.join('、')}）`);
    if (!Array.isArray(spec.notes)) errors.push(`${rel(file)}：notes 必須是陣列`);
  }

  const indexFile = path.join(root, 'src', 'docs', 'components', 'index.ts');
  if (existsSync(indexFile)) {
    const listed = new Set([...readFileSync(indexFile, 'utf8').matchAll(/from '\.\/([^']+)\.js'/g)].map((m) => m[1]));
    const onDisk = new Set(files.map((f) => path.basename(f, '.ts')));
    const missing = [...onDisk].filter((id) => !listed.has(id)).sort();
    const extra = [...listed].filter((id) => !onDisk.has(id)).sort();
    if (missing.length) errors.push(`src/docs/components/index.ts：總表漏列的規格：${missing.join(', ')}`);
    if (extra.length) errors.push(`src/docs/components/index.ts：總表列了不存在的規格：${extra.join(', ')}`);
  } else {
    errors.push('src/docs/components/index.ts：缺少規格總表');
  }

  if (files.length === 0) errors.push(`掃描到 0 份元件規格，請確認路徑：${path.join(root, 'src', 'docs', 'components')}`);
  return { ids, count: files.length, errors };
}

/**
 * 基礎（token、字型）與互動原則的一致性。
 * 每類落差合併成一則錯誤訊息，列出全部名稱。
 */
export function checkFoundations(root, componentIds) {
  const docs = path.join(root, 'src', 'docs');
  const errors = [];
  const load = (file) => {
    try {
      return loadDocFile(file);
    } catch (e) {
      errors.push(`${path.relative(root, file)}：無法載入（${e.message}）`);
      return null;
    }
  };
  const scss = readFileSync(path.join(root, 'styles', 'core.scss'), 'utf8');
  const defined = scssCustomProperties(scss);

  const tokens = load(path.join(docs, 'foundations', 'tokens.ts'));
  if (tokens) {
    const documented = new Set(tokens.flatMap((g) => g.tokens.map((t) => t.name)));
    const stale = [...documented].filter((n) => !defined.has(n)).sort();
    const undocumented = [...defined.keys()].filter((n) => !documented.has(n)).sort();
    const drifted = tokens
      .flatMap((g) => g.tokens)
      .filter((t) => defined.has(t.name) && normalizeValue(t.value) !== normalizeValue(defined.get(t.name)))
      .map((t) => `${t.name}（說明寫 ${t.value}，core.scss 是 ${defined.get(t.name)}）`);
    if (stale.length) errors.push(`token：說明有、core.scss 已不存在（${stale.length} 個）：${stale.join(', ')}`);
    if (undocumented.length) errors.push(`token：core.scss 有、說明沒寫（${undocumented.length} 個）：${undocumented.join(', ')}`);
    if (drifted.length) errors.push(`token：說明的值跟 core.scss 不同（${drifted.length} 個）：${[...new Set(drifted)].join('；')}`);
  }

  const typography = load(path.join(docs, 'foundations', 'typography.ts'));
  if (typography) {
    const classes = typography.flatMap((f) => f.classes.map((c) => c.name));
    const stale = classes.filter((name) => !new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`).test(scss)).sort();
    if (stale.length) errors.push(`字型：說明有、core.scss 已不存在的 class：${stale.join(', ')}`);
  }

  const patterns = load(path.join(docs, 'patterns.ts'));
  if (patterns) {
    const keys = new Set(Object.keys(patterns));
    const dangling = [];
    for (const [key, p] of Object.entries(patterns)) {
      for (const c of p.relatedComponents ?? []) if (!componentIds.has(c.replace(/^#/, ''))) dangling.push(`${key} → 元件 ${c}`);
      for (const r of p.relatedPatterns ?? []) {
        const target = r.split(/[（(\s]/)[0];
        if (!keys.has(target)) dangling.push(`${key} → 原則 ${r}`);
      }
    }
    for (const d of dangling) errors.push(`互動原則：指向不存在的對象：${d}`);
  }
  return errors;
}

export function checkDocs(root) {
  const { ids, count, errors } = checkSpecs(root);
  errors.push(...checkFoundations(root, ids));
  return { checked: count, errors };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { checked, errors } = checkDocs(root);
  if (errors.length) {
    console.error(`說明檢查失敗（${errors.length} 項）：`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`說明檢查通過：${checked} 份元件規格；token、字型、互動原則也一致`);
}
