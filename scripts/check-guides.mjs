// 指南檢查：指南文章（site/guide/*.md）的文字跟框架無關，框架的程式碼放在分頁裡、而且寫得對。
//
// 檢查：
//   1. 程式碼區塊外的文字不得有框架寫法（app-xxx、[x]=、ngModel、v-model、<DsXxx>…，規則同 check-docs 的 FRAMEWORK_SYNTAX）
//   2. 文字裡不得直接寫 #元件id：Markdown 不會把它換成元件名稱，要用 <ComponentLink id="…" />
//   3. 有框架寫法的程式碼區塊要放進 ::: code-group，每個框架（site/frameworks.json）一個分頁，分頁標題寫框架名稱，
//      例如 ```html [Angular]、```vue [Vue]
//   4. 每個分頁的程式碼交給該框架 repo 自己的檢查器（scripts/check-docs.mjs 的 checkSnippets）：元件、屬性、事件要存在
//   5. 分頁不得混用別的框架的寫法
//   6. 框架還沒有某個元件時，該分頁寫「尚無 Vue 版：#元件id」；檢查會確認該框架真的沒有，之後補上元件就會提醒補範例
// 一篇指南都沒讀到、或框架版本沒有提供檢查器，都算失敗，避免「沒東西可查所以全過」。
//
// 用法：node scripts/check-guides.mjs [repo 根目錄]（會依 site/frameworks.json 取各框架 repo，同文件網站建置）
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FRAMEWORK_SYNTAX } from './check-docs.mjs';
import { findRefs } from './component-refs.mjs';

const FENCE = /^\s*(`{3,}|~{3,})(.*)$/;
const NOT_YET = /尚無\s*\S+?\s*版/;

/** 把指南拆成文字行與程式碼區塊；程式碼區塊記下所在的 code-group。 */
export function parseGuide(text) {
  const lines = text.split('\n');
  const prose = []; // [{ line, text }]
  const blocks = []; // [{ line, lang, title, code, group }]
  const groups = []; // [{ line, blocks }]
  const containers = []; // ::: 容器的堆疊；code-group 存 group 物件，其他存 null
  let fence = null;
  let start = 0;
  if (lines[0]?.trim() === '---') {
    const end = lines.indexOf('---', 1);
    if (end > 0) start = end + 1;
  }
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;
    if (fence) {
      if (line.trim().startsWith(fence.marker) && line.trim().replace(/[`~]/g, '') === '') {
        blocks.push(fence.block);
        fence.block.group?.blocks.push(fence.block);
        fence = null;
      } else {
        fence.block.code += (fence.block.code ? '\n' : '') + line;
      }
      continue;
    }
    const f = line.match(FENCE);
    if (f) {
      const info = f[2].trim();
      const group = containers.at(-1) ?? null;
      fence = { marker: f[1], block: { line: n, lang: info.split(/[\s[]/)[0], title: info.match(/\[([^\]]+)\]/)?.[1] ?? '', code: '', group } };
      continue;
    }
    const c = line.match(/^\s*:::\s*(\S*)/);
    if (c) {
      if (c[1] === '') containers.pop();
      else if (c[1] === 'code-group') {
        const g = { line: n, blocks: [] };
        groups.push(g);
        containers.push(g);
      } else {
        containers.push(null);
        prose.push({ line: n, text: line.replace(/^\s*:::\s*\S+/, '') });
      }
      continue;
    }
    prose.push({ line: n, text: line });
  }
  return { prose, blocks, groups };
}

/** 文字行裡要檢查的部分：拿掉網站元件標籤（<ComponentLink …/>）與 HTML 註解 */
const proseText = (text) => text.replace(/<!--.*?-->/g, '').replace(/<\/?[A-Z]\w*\b[^>]*>/g, '');
/** 行內程式碼可以示範 #元件id 的寫法 */
const withoutInlineCode = (text) => text.replace(/`[^`]*`/g, '');

function syntaxHits(text) {
  return FRAMEWORK_SYNTAX.map(([label, re]) => [label, text.match(re)?.[0]]).filter(([, m]) => m);
}

/**
 * 檢查一篇指南。frameworks：{ 框架名: { label, ids: 該框架有的元件 id, checkSnippets(snippets) | null } }；
 * componentIds：本體的元件 id。回傳錯誤訊息陣列。
 */
export function checkGuide(rel, text, { frameworks, componentIds }) {
  const errors = [];
  const { prose, blocks, groups } = parseGuide(text);
  const names = Object.keys(frameworks);
  const frameworkOf = (title) => names.find((name) => title.toLowerCase().startsWith(name));

  for (const { line, text: t } of prose) {
    const visible = proseText(t);
    for (const [label, m] of syntaxHits(visible)) errors.push(`${rel}:${line}：文字裡有${label}「${m}」，框架寫法放進 ::: code-group 的框架分頁`);
    for (const id of new Set(findRefs(withoutInlineCode(visible)))) {
      if (componentIds.has(id)) errors.push(`${rel}:${line}：#${id} 在指南裡不會換成元件名稱，請改用 <ComponentLink id="${id}" />`);
    }
  }

  for (const b of blocks) {
    if (b.group && b.group.blocks.some((x) => frameworkOf(x.title))) continue; // 框架分頁，下面檢查
    const hits = syntaxHits(b.code);
    if (hits.length) errors.push(`${rel}:${b.line}：這段程式碼有${hits[0][0]}，要放進 ::: code-group 並為每個框架各寫一個分頁`);
  }

  const snippets = Object.fromEntries(names.map((name) => [name, []]));
  for (const g of groups) {
    const tabs = g.blocks.filter((b) => frameworkOf(b.title));
    if (!tabs.length) continue; // 不是框架分頁（例如 CSS／SCSS 對照），不要求每個框架都有
    for (const name of names) {
      if (!tabs.some((b) => frameworkOf(b.title) === name)) errors.push(`${rel}:${g.line}：程式碼分頁缺少 ${frameworks[name].label}`);
    }
    for (const b of tabs) {
      const name = frameworkOf(b.title);
      const fw = frameworks[name];
      for (const [label, m] of syntaxHits(b.code)) {
        if (!label.toLowerCase().startsWith(name) && names.some((other) => label.toLowerCase().startsWith(other))) {
          errors.push(`${rel}:${b.line}：${fw.label} 分頁裡有${label}「${m}」`);
        }
      }
      if (NOT_YET.test(b.code)) {
        const ids = [...new Set(findRefs(b.code))];
        if (!ids.length) errors.push(`${rel}:${b.line}：「${b.code.match(NOT_YET)[0]}」要列出缺的元件，例如 #select`);
        for (const id of ids) {
          if (!componentIds.has(id)) errors.push(`${rel}:${b.line}：#${id} 不是任何元件的 id`);
          else if (fw.ids.has(id)) errors.push(`${rel}:${b.line}：${fw.label} 已經有 #${id}，請把「${b.code.match(NOT_YET)[0]}」換成範例程式碼`);
        }
        continue;
      }
      snippets[name].push({ where: `${rel}:${b.line}（${fw.label} 分頁）`, code: b.code });
    }
  }

  for (const name of names) {
    if (!snippets[name].length) continue;
    const fw = frameworks[name];
    if (!fw.checkSnippets) errors.push(`${fw.label}（frameworks.json 指定的版本）沒有提供範例檢查器，指南的 ${fw.label} 範例沒有檢查`);
    else errors.push(...fw.checkSnippets(snippets[name]));
  }
  return errors;
}

/** 本 repo 的元件 id（src/docs/components 的檔名） */
function repoComponentIds(root) {
  const dir = path.join(root, 'src', 'docs', 'components');
  return new Set(readdirSync(dir).filter((n) => n.endsWith('.ts') && n !== 'index.ts').map((n) => n.replace(/\.ts$/, '')));
}

/** 檢查 guideDir 裡所有 .md；frameworks 預設依 site/frameworks.json 載入（需要網路或已有快取）。 */
export async function checkGuides(guideDir, { frameworks, componentIds } = {}) {
  const files = existsSync(guideDir) ? readdirSync(guideDir).filter((n) => n.endsWith('.md')).sort() : [];
  if (files.length === 0) return { checked: 0, errors: [`${guideDir} 裡有 0 篇指南，指南檢查沒有執行`] };
  const errors = [];
  for (const name of files) {
    errors.push(...checkGuide(name, readFileSync(path.join(guideDir, name), 'utf8'), { frameworks, componentIds }));
  }
  return { checked: files.length, errors: [...new Set(errors)] };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { loadSnippetCheckers } = await import('./fetch-framework-docs.mjs');
  const frameworks = await loadSnippetCheckers(root);
  const { checked, errors } = await checkGuides(path.join(root, 'site', 'guide'), { frameworks, componentIds: repoComponentIds(root) });
  if (errors.length) {
    console.error(`指南檢查失敗（${errors.length} 項）：`);
    for (const e of errors) console.error(`  - ${e}`);
    // 用 exitCode 而不是 process.exit：輸出接到管線時，process.exit 會截斷還沒寫完的訊息
    process.exitCode = 1;
  } else {
    console.log(`指南檢查通過：${checked} 篇指南的文字跟框架無關，框架範例都在分頁裡、也都對得上各框架的元件`);
  }
}
