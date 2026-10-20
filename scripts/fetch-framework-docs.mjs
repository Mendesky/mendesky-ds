// 讀各框架套件的「用法說明」（元件標籤、屬性、事件、範例程式碼），給文件網站合併到元件規格上。
//
// 設定在 site/frameworks.json：每個框架一筆 { label, repo, ref, storybook }。
// 做法：把該框架 repo 的指定 tag 淺層 clone 到 site/.vitepress/cache/frameworks/，
// 呼叫它自己的 scripts/export-docs.mjs 取得說明，只留用法欄位。
// 不把框架套件裝進本 repo 的依賴：框架套件本身依賴本體，裝進來會變成自己依賴自己。
// 用法：node scripts/fetch-framework-docs.mjs [repo 根目錄]（輸出 JSON 到 stdout）
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const API_KEYS = ['id', 'selector', 'summary', 'props', 'events', 'usage'];

function pickApi(doc) {
  return Object.fromEntries(API_KEYS.filter((k) => k in doc).map((k) => [k, doc[k]]));
}

export async function loadFrameworkDocs(root) {
  const config = JSON.parse(readFileSync(path.join(root, 'site', 'frameworks.json'), 'utf8'));
  const result = {};
  for (const [name, fw] of Object.entries(config)) {
    const dir = path.join(root, 'site', '.vitepress', 'cache', 'frameworks', `${name}-${fw.ref}`);
    if (!existsSync(dir)) {
      execFileSync('git', ['-c', 'advice.detachedHead=false', 'clone', '--quiet', '--depth', '1', '--branch', fw.ref, fw.repo, dir], { stdio: 'inherit' });
    }
    const mod = await import(pathToFileURL(path.join(dir, 'scripts', 'export-docs.mjs')).href);
    // 新版框架套件提供只含用法的匯出；舊版（v0.2.0 以前）只有完整說明，取其中的用法欄位
    const docs = mod.exportFrameworkDocs
      ? mod.exportFrameworkDocs(dir)
      : mod.exportDocs(dir).components.map((c) => pickApi(c.doc));
    result[name] = { label: fw.label, ref: fw.ref, storybook: fw.storybook, docs };
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const result = await loadFrameworkDocs(root);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
}
