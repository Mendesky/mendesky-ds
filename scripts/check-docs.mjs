// 說明檢查（本體）：確認元件規格、基礎（token、字型）、互動原則彼此一致。
//
// 檢查：
//   1. 每份元件規格能正確載入；id 與檔名一致、不重複；group 是合法分組；notes 是陣列
//   2. src/docs/components/index.ts 的總表列出全部規格，沒有多也沒有少
//   3. token 說明與 styles/core.scss 的 CSS 變數一致（名稱與值）；字型 class 存在
//   4. 互動原則引用的元件（#id）與其他原則都存在
//   5. 規格、互動原則、基礎說明只寫跨框架的內容：不得出現某個框架才有的寫法（app-xxx、[屬性]、ngModel、
//      <DsXxx>、v-model…）；指其他元件寫 #元件id，而且要指到存在的元件。寫法見 src/docs/component-spec.ts
// 一份規格都沒掃到、一段文字都沒讀到也算失敗，避免「沒東西可查所以全過」。
// 各框架的「屬性名稱對程式碼」檢查在各框架 repo 自己做。
//
// 用法：node scripts/check-docs.mjs [repo 根目錄]
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDocFile, listSpecFiles } from './export-docs.mjs';
import { findRefs } from './component-refs.mjs';

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

/**
 * 某個框架才有的寫法：[錯誤訊息裡的名稱, 規則]。本體的說明出現這些就是寫錯地方，
 * 要改成跨框架的寫法，或搬到該框架說明檔的 usageNotes。
 */
export const FRAMEWORK_SYNTAX = [
  ['Angular 元件標籤', /(?<![.\w-])app-[a-z][a-z0-9-]*/],
  // 屬性名第一段不含連字號（[disabled]、[attr.aria-label]），所以 [link-ds-angular] 這類連結文字不算；
  // 前面緊接英數字的是程式的索引（list[index]），也不算
  ['Angular 屬性綁定', /(?<![\w$\]])\[\(?[A-Za-z]\w*(?:\.[\w-]+)*\)?\]/],
  // 單字的事件名只列常見的：括號裡的 (a)、(left) 這類編號與註記不算；
  // 前面緊接英數字的是函式呼叫（existsSync(pkgDir)），也不算
  ['Angular 事件綁定', /(?<![\w$])\((?:click|add|remove|close|closed|open|opened|blur|focus|change|input|submit|dismissed|confirm|cancel|select|toggle|[a-z]+[A-Z][A-Za-z]*)\)/],
  ['Angular 內容投影選擇器', /\[slot=[\w-]+\]/],
  [
    'Angular 的 API',
    /\bng(?:Model|OnInit|OnChanges|OnDestroy|AfterViewInit|-content|-deep|-template|-container)\b|ViewEncapsulation|ControlValueAccessor|\bCVA\b|formControlName|FormsModule|NgModule|@(?:Input|Output|HostListener|ViewChild|ContentChild|Component|Directive|for|if|else|defer|switch|let)\b|\binject\(|changeDetectorRef|detectChanges|createComponent|\bzone\b|\b[Ss]ignals?\b|\b[Kk]arma\b|\bcomputed\(|\bset\((?:true|false)\)/,
  ],
  ['Angular 的類別或檔名', /\b[A-Z][A-Za-z]*(?:Service|Component|Directive)\b|\b[\w-]+\.(?:component|directive|service|helpers|registry)\.ts\b/],
  ['Vue 的寫法', /\bv-(?:model|if|for|bind|on)\b|<Ds[A-Z]|\bdefine(?:Props|Emits)\b|(?<![\w-]):[a-z][\w-]*=|(?<![\w-])@[a-z][\w-]*=/],
];

/** 不檢查的欄位：識別字、標題、網址、外部參考，以及由互動原則檢查負責的相關元件與相關原則 */
const NEUTRAL_SKIP_KEYS = new Set(['id', 'name', 'url', 'references', 'relatedComponents', 'relatedPatterns']);

function collectStrings(value, at, out) {
  if (typeof value === 'string') out.push({ at, text: value });
  else if (Array.isArray(value)) value.forEach((v, i) => collectStrings(v, `${at}[${i}]`, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (!NEUTRAL_SKIP_KEYS.has(k)) collectStrings(v, at ? `${at}.${k}` : k, out);
    }
  }
}

/** 規格、互動原則、基礎說明的每段文字：沒有框架寫法，#元件id 都指到存在的元件。 */
export function checkNeutralText(root, componentIds) {
  const docs = path.join(root, 'src', 'docs');
  const files = [
    ...(existsSync(path.join(docs, 'components')) ? listSpecFiles(root) : []),
    path.join(docs, 'patterns.ts'),
    ...['tokens', 'typography', 'motion'].map((n) => path.join(docs, 'foundations', `${n}.ts`)),
  ];
  const errors = [];
  let scanned = 0;
  for (const file of files) {
    let data;
    try {
      data = loadDocFile(file);
    } catch {
      continue; // 載入失敗由規格與基礎的檢查回報，這裡不重複
    }
    const strings = [];
    collectStrings(data, '', strings);
    const rel = path.relative(root, file);
    for (const { at, text } of strings) {
      scanned++;
      for (const [label, rule] of FRAMEWORK_SYNTAX) {
        const m = text.match(rule);
        if (m) errors.push(`${rel}：${at}：有${label}「${m[0]}」，本體只寫跨框架的內容（寫法見 src/docs/component-spec.ts）`);
      }
      for (const id of new Set(findRefs(text))) {
        if (!componentIds.has(id)) errors.push(`${rel}：${at}：#${id} 不是任何元件的 id`);
      }
    }
  }
  if (scanned === 0) errors.push('框架寫法檢查讀到 0 段文字，檢查沒有執行');
  return errors;
}

export function checkDocs(root) {
  const { ids, count, errors } = checkSpecs(root);
  errors.push(...checkFoundations(root, ids));
  errors.push(...checkNeutralText(root, ids));
  return { checked: count, errors };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { checked, errors } = checkDocs(root);
  if (errors.length) {
    console.error(`說明檢查失敗（${errors.length} 項）：`);
    for (const e of errors) console.error(`  - ${e}`);
    // 用 exitCode 而不是 process.exit：輸出接到管線時，process.exit 會截斷還沒寫完的訊息
    process.exitCode = 1;
  } else {
    console.log(`說明檢查通過：${checked} 份元件規格；token、字型、互動原則也一致`);
  }
}
