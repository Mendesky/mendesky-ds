// 給 AI 讀的檔案檢查：文件網站建好之後，確認 llms.txt 與 components/<id>.md（scripts/export-llms.mjs 產生）完整可用。
//   - llms.txt 存在；每份元件規格剛好列一次，也沒有列出不是規格的元件
//   - 每份規格都有 components/<id>.md，第一行就是「# 名稱（id）」。只看有沒有名稱不夠：
//     Button 是 Icon Button 的一部分，button.md 放成 Icon Button 的內容也會過
//   - llms.txt 與每份元件檔裡的相對連結都找得到檔案。程式碼裡的不算；連到其他網站的不檢查；
//     以 / 開頭的不行（網站每個版本放在不同資料夾，換版本就斷）
//   - 沒有漏值：產生檔案時放值的位置整格是 undefined 或 null（例如「分組：undefined」「| null |」「### Angular（undefined）」），
//     或任何地方的 [object Object]。程式碼裡的與句子裡的 null（「null 為不顯示」「number|null」）是框架原文，不算
// 網站目錄不存在、llms.txt 不存在、讀不到任何元件規格，都算失敗：檢查沒有真的執行，不能回報通過。
//
// 用法：scripts/build-site.sh main 之後
//       node scripts/check-llms.mjs <網站目錄，預設 site/.vitepress/dist>
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exportCoreDocs } from './export-docs.mjs';
import { splitCode } from './export-llms.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

/** 本 repo 的元件規格 */
function repoSpecs() {
  return exportCoreDocs(path.join(here, '..')).specs.map(({ spec }) => spec);
}

/** 程式碼不檢查：圍欄程式碼區塊整行清空、行內程式碼換成佔位文字，行號不變 */
function stripCode(text) {
  let fence = null;
  const lines = text.split('\n').map((line) => {
    const m = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence) {
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length && line.trim() === m[1]) fence = null;
      return '';
    }
    if (m) {
      fence = m[1];
      return '';
    }
    return line;
  });
  return splitCode(lines.join('\n'))
    .map((p) => (p.code ? '‹code›' + '\n'.repeat((p.text.match(/\n/g) ?? []).length) : p.text))
    .join('');
}

// export-llms.mjs 放值的位置：值漏了，這一格就整格變成 undefined 或 null。
// 只看這些位置、不看整段文字：框架原文本來就會寫 null（「null 為不顯示」「(valueChange: number|null)」）。
const W = '(undefined|null)';
const ITEM = ' *(?:[-*+]|\\d+\\.) +';
const LEAK_SLOTS = [
  `^${W}$`, // 整段：何時用、說明、框架的摘要
  `^#{1,6} ${W}(?:（| |$)`, // 標題開頭：# undefined（id）、### undefined（v1.0.0）、#### undefined 注意事項
  `^#{1,6} .*（${W}）$`, // 標題結尾的括號：# Button（undefined）、### Angular（undefined）
  `^${ITEM}${W}$`, // 整項：- undefined
  `^${ITEM}\\*\\*${W}\\*\\*`, // 項目的粗體名稱：1. **undefined**：…
  `^${ITEM}\\*\\*[^*]+\\*\\*：?${W}$`, // 粗體之後整段：- **注意**：undefined、- **鍵盤**：undefined
  `^分組：${W}$`,
  `^\\*\\*${W}\\*\\*$`, // 程式碼範例的標題
  `\\[${W}(?: 版| 範例網站)?\\]\\(`, // 連結文字：[undefined](…)、[undefined 版](…)
  `\\]\\([^)]*\\): ${W}$`, // llms.txt 每個元件的說明：- [X](components/x.md): undefined
  `版本 ${W}(?:；|$)`, // llms.txt 的框架版本
  `原始碼 ${W}$`, // llms.txt 的框架 repo
  `（範例代號：${W}）`,
].map((s) => new RegExp(s));

/** 找出漏值：[{ line: 行號, word }]，依行號排序；程式碼裡的不算 */
export function findLeaks(text) {
  const found = [];
  const add = (line, word) => {
    if (!found.some((f) => f.line === line && f.word === word)) found.push({ line, word });
  };
  text.split('\n').forEach((line, i) => {
    if (line.includes('[object Object]')) add(i + 1, '[object Object]');
  });
  stripCode(text)
    .split('\n')
    .forEach((line, i) => {
      for (const re of LEAK_SLOTS) {
        const m = line.match(re);
        if (m) add(i + 1, m[1]);
      }
      // 表格：某一格整格是 undefined 或 null（跳脫的 \| 不是分隔）
      if (line.startsWith('|')) {
        for (const cell of line.split(/(?<!\\)\|/).slice(1, -1)) {
          const word = cell.trim();
          if (word === 'undefined' || word === 'null') add(i + 1, word);
        }
      }
    });
  return found.sort((a, b) => a.line - b.line);
}

/** 文字裡的連結（程式碼裡的不算）：[{ line: 行號, target }] */
function findLinks(text) {
  const stripped = stripCode(text);
  return [...stripped.matchAll(/\[(?:[^[\]\\\n]|\\.)*\]\(([^)\s]*)(?:\s+"[^"]*")?\)/g)].map((m) => ({
    line: stripped.slice(0, m.index).split('\n').length,
    target: m[1],
  }));
}

/** 網站目錄裡 components/ 底下的 .md（相對路徑，排序） */
function listComponentFiles(dir) {
  const base = path.join(dir, 'components');
  if (!existsSync(base)) return [];
  return readdirSync(base)
    .filter((name) => name.endsWith('.md') && statSync(path.join(base, name)).isFile())
    .sort()
    .map((name) => `components/${name}`);
}

/**
 * 檢查網站目錄裡給 AI 讀的檔案；回傳 { specs: 規格數, files: 檢查的檔案數, links: 檢查的站內連結數, errors }。
 * specs 預設讀本 repo 的元件規格。
 */
export function checkLlms(dir, { specs = repoSpecs() } = {}) {
  const root = path.resolve(dir);
  const result = { specs: specs.length, files: 0, links: 0, errors: [] };
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    result.errors.push(`網站目錄 ${root} 不存在，先建置文件網站（scripts/build-site.sh），給 AI 讀的檔案檢查沒有執行`);
    return result;
  }
  if (specs.length === 0) {
    result.errors.push('讀不到任何元件規格，給 AI 讀的檔案檢查沒有執行');
    return result;
  }
  const errors = result.errors;
  const specIds = new Set(specs.map((s) => s.id));

  // llms.txt：每份規格剛好列一次
  const llmsFile = path.join(root, 'llms.txt');
  const files = listComponentFiles(root);
  if (existsSync(llmsFile)) {
    files.unshift('llms.txt');
    const counts = new Map();
    for (const { target } of findLinks(readFileSync(llmsFile, 'utf8'))) {
      const id = target.match(/^components\/([^/?#]+)\.md$/)?.[1];
      if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    for (const s of specs) {
      const n = counts.get(s.id) ?? 0;
      if (n === 0) errors.push(`llms.txt：沒有列出 ${s.id}（components/${s.id}.md）`);
      else if (n > 1) errors.push(`llms.txt：${s.id} 列了 ${n} 次`);
    }
    for (const id of counts.keys()) if (!specIds.has(id)) errors.push(`llms.txt：列出的 ${id} 不是任何元件規格`);
  } else {
    errors.push(`llms.txt 不存在（${llmsFile}）`);
  }

  // 每份規格都有元件檔，第一行是這個元件的標題（export-llms.mjs 寫的格式）
  for (const s of specs) {
    const rel = `components/${s.id}.md`;
    if (!existsSync(path.join(root, rel))) {
      errors.push(`${rel} 不存在`);
      continue;
    }
    const want = `# ${s.name}（${s.id}）`;
    const first = readFileSync(path.join(root, rel), 'utf8').split('\n')[0];
    if (first !== want) errors.push(`${rel}：第一行應該是標題「${want}」，現在是「${first}」`);
  }

  // 每個檔案：相對連結找得到檔案、沒有漏值
  for (const rel of files) {
    const text = readFileSync(path.join(root, rel), 'utf8');
    result.files++;
    for (const { line, target } of findLinks(text)) {
      if (target === '' || target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      if (target.startsWith('/')) {
        errors.push(`${rel}:${line}：連結 ${target} 不是相對路徑`);
        continue;
      }
      result.links++;
      let file = target.split(/[?#]/)[0];
      try {
        file = decodeURIComponent(file);
      } catch {
        // 編碼壞掉就用原字串找，找不到會報錯
      }
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(rel), file));
      if (resolved.startsWith('../') || resolved === '..') errors.push(`${rel}:${line}：連結 ${target} 指到網站目錄外`);
      else if (!existsSync(path.join(root, resolved))) errors.push(`${rel}:${line}：連結 ${target} 找不到檔案`);
    }
    for (const { line, word } of findLeaks(text)) errors.push(`${rel}:${line}：出現 ${word}（產生檔案時漏了值）`);
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2] ?? path.join(here, '..', 'site', '.vitepress', 'dist');
  const { specs, files, links, errors } = checkLlms(dir);
  if (errors.length) {
    console.error(`給 AI 讀的檔案檢查失敗（${errors.length} 項）：`);
    for (const e of errors) console.error(`  - ${e}`);
    // 用 exitCode 而不是 process.exit：輸出接到管線時，process.exit 會截斷還沒寫完的訊息
    process.exitCode = 1;
  } else {
    console.log(`給 AI 讀的檔案檢查通過：llms.txt 列出全部 ${specs} 個元件，${files} 個檔案裡的 ${links} 個站內連結都找得到、沒有漏值`);
  }
}
