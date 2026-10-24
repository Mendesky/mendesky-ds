// 讀各框架套件的「用法說明」（元件標籤、屬性、事件、範例程式碼、框架專屬注意事項）與互動原則的框架做法，
// 給文件網站合併到元件規格與互動原則上；也提供各框架的指南範例檢查器給 check:guides 用。
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

export const API_KEYS = ['id', 'selector', 'summary', 'props', 'events', 'usage', 'usageNotes'];

function pickApi(doc) {
  return Object.fromEntries(API_KEYS.filter((k) => k in doc).map((k) => [k, doc[k]]));
}

/**
 * 範例網站（Storybook）的範例清單：元件 id → [{ id, name }]（依範例網站的順序，第一支是主範例）。
 * 讀範例網站發布的 index.json；連不上時回傳空物件，元件頁就只顯示用法、不嵌入範例。
 */
export async function loadStories(storybook) {
  try {
    const res = await fetch(new URL('index.json', storybook));
    if (!res.ok) return {};
    const { entries } = await res.json();
    const byComponent = {};
    for (const e of Object.values(entries)) {
      if (e.type !== 'story') continue;
      const componentId = e.id.split('--')[0];
      (byComponent[componentId] ??= []).push({ id: e.id, name: e.name });
    }
    return byComponent;
  } catch {
    return {};
  }
}

export function readFrameworkConfig(root) {
  return JSON.parse(readFileSync(path.join(root, 'site', 'frameworks.json'), 'utf8'));
}

/** 框架 repo 在本機的位置（指定版本還沒 clone 就先 clone）。 */
export function frameworkDir(root, name, fw) {
  const dir = path.join(root, 'site', '.vitepress', 'cache', 'frameworks', `${name}-${fw.ref}`);
  if (!existsSync(dir)) {
    execFileSync('git', ['-c', 'advice.detachedHead=false', 'clone', '--quiet', '--depth', '1', '--branch', fw.ref, fw.repo, dir], { stdio: 'inherit' });
  }
  return dir;
}

export async function loadFrameworkDocs(root) {
  const result = {};
  for (const [name, fw] of Object.entries(readFrameworkConfig(root))) {
    const dir = frameworkDir(root, name, fw);
    const mod = await import(pathToFileURL(path.join(dir, 'scripts', 'export-docs.mjs')).href);
    // 新版框架套件提供只含用法的匯出；舊版（v0.2.0 以前）只有完整說明，取其中的用法欄位
    const docs = mod.exportFrameworkDocs
      ? mod.exportFrameworkDocs(dir)
      : mod.exportDocs(dir).components.map((c) => pickApi(c.doc));
    // 互動原則的框架做法：沒有提供的框架（或舊版）就是沒有
    const patternNotes = mod.exportFrameworkPatternNotes ? mod.exportFrameworkPatternNotes(dir) : {};
    result[name] = { label: fw.label, ref: fw.ref, storybook: fw.storybook, docs, patternNotes, stories: await loadStories(fw.storybook) };
  }
  return result;
}

/**
 * 各框架的指南範例檢查器：{ 框架名: { label, ids: 這個框架有的元件 id, checkSnippets } }。
 * checkSnippets(dir, snippets) 來自框架 repo 的 scripts/check-docs.mjs；舊版沒有提供時是 null。
 */
export async function loadSnippetCheckers(root) {
  const result = {};
  for (const [name, fw] of Object.entries(readFrameworkConfig(root))) {
    const dir = frameworkDir(root, name, fw);
    const docsMod = await import(pathToFileURL(path.join(dir, 'scripts', 'export-docs.mjs')).href);
    const checkMod = await import(pathToFileURL(path.join(dir, 'scripts', 'check-docs.mjs')).href);
    const docs = docsMod.exportFrameworkDocs ? docsMod.exportFrameworkDocs(dir) : [];
    result[name] = {
      label: fw.label,
      ids: new Set(docs.map((d) => d.id)),
      checkSnippets: checkMod.checkSnippets ? (snippets) => checkMod.checkSnippets(dir, snippets) : null,
    };
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const result = await loadFrameworkDocs(root);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
}
