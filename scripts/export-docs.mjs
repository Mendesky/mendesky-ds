// 匯出 DS 本體的說明正本成 JSON：元件規格（src/docs/components/*.ts）、基礎（token、字型、動效）、互動原則、圖示名稱。
//
// 用途：
//   - 本 repo 的文件網站建置時讀取
//   - 各框架套件（mendesky-ds-angular…）的匯出腳本呼叫 exportCoreDocs()，再合併自己的用法說明
// 用法：node scripts/export-docs.mjs [repo 根目錄，預設為本 repo]
// 輸出：stdout 一個 JSON 物件 { specs, tokens, typography, motion, patterns, icons }。
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

/** 載入一份說明檔（只能 import type），回傳它唯一 export 的物件。 */
export function loadDocFile(file) {
  const source = readFileSync(file, 'utf8');
  const { outputText, diagnostics } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
    fileName: file,
  });
  if (diagnostics?.length) {
    const msg = diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('; ');
    throw new Error(`${file}：語法錯誤：${msg}`);
  }
  const module = { exports: {} };
  const sandboxRequire = (id) => {
    throw new Error(`${file}：說明檔只能 import type，不能在執行期 import「${id}」`);
  };
  vm.runInNewContext(outputText, { module, exports: module.exports, require: sandboxRequire }, { filename: file });
  const values = Object.values(module.exports);
  if (values.length !== 1) throw new Error(`${file}：必須剛好 export 一個說明物件，實際 ${values.length} 個`);
  // 透過 JSON 往返，去掉 vm context 的原型差異，讓呼叫端能直接 deep-equal
  return JSON.parse(JSON.stringify(values[0]));
}

/** 元件規格檔清單（index.ts 是總表，不是規格）。 */
export function listSpecFiles(root) {
  const dir = path.join(root, 'src', 'docs', 'components');
  return readdirSync(dir)
    .filter((name) => name.endsWith('.ts') && name !== 'index.ts')
    .sort()
    .map((name) => path.join(dir, name));
}

/** 圖示名稱：讀 src/icons/icons.ts 的 ICON_REGISTRY 鍵名（不執行檔案）。 */
export function iconNames(root) {
  const text = readFileSync(path.join(root, 'src', 'icons', 'icons.ts'), 'utf8');
  const body = text.slice(text.indexOf('ICON_REGISTRY'));
  return [...new Set([...body.matchAll(/^\s*(?:'([^']+)'|([A-Za-z][\w-]*))\s*:\s*`/gm)].map((m) => m[1] ?? m[2]))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function exportCoreDocs(root) {
  const docs = path.join(root, 'src', 'docs');
  return {
    specs: listSpecFiles(root).map((file) => ({ file: path.relative(root, file), spec: loadDocFile(file) })),
    tokens: loadDocFile(path.join(docs, 'foundations', 'tokens.ts')),
    typography: loadDocFile(path.join(docs, 'foundations', 'typography.ts')),
    motion: loadDocFile(path.join(docs, 'foundations', 'motion.ts')),
    patterns: loadDocFile(path.join(docs, 'patterns.ts')),
    icons: iconNames(root),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const result = exportCoreDocs(root);
  if (result.specs.length === 0) {
    console.error(`在 ${root}/src/docs/components 找不到任何元件規格`);
    process.exit(1);
  }
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
}
