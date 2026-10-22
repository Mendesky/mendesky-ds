// dist 同步檢查：dist/ 進版控（使用端從 GitHub tag 安裝時不會幫我們建置），
// 所以 CI 要確認 dist/ 就是 src/ 現在的建置結果，沒有人忘了重建。
//
// 做法：把 src/ 建置到暫存資料夾，逐檔比對 dist/。多檔、少檔、內容不同都算失敗。
// 用法：node scripts/check-dist.mjs [repo 根目錄]
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function listFiles(dir, base = dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) listFiles(full, base, out);
    else out.push(path.relative(base, full));
  }
  return out.sort();
}

export function compareDirs(expectedDir, actualDir) {
  const expected = listFiles(expectedDir);
  const actual = listFiles(actualDir);
  const missing = expected.filter((f) => !actual.includes(f));
  const extra = actual.filter((f) => !expected.includes(f));
  const changed = expected.filter(
    (f) => actual.includes(f) && !readFileSync(path.join(expectedDir, f)).equals(readFileSync(path.join(actualDir, f))),
  );
  return { missing, extra, changed };
}

export function checkDist(root) {
  const tmp = mkdtempSync(path.join(tmpdir(), 'mendesky-ds-dist-'));
  try {
    const tsc = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
    execFileSync(process.execPath, [tsc, '-p', path.join(root, 'tsconfig.build.json'), '--outDir', tmp], { stdio: 'inherit' });
    return compareDirs(tmp, path.join(root, 'dist'));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { missing, extra, changed } = checkDist(root);
  const problems = [
    ...missing.map((f) => `dist 少了 ${f}`),
    ...extra.map((f) => `dist 多了 ${f}（src 已沒有對應檔案）`),
    ...changed.map((f) => `dist/${f} 跟 src 的建置結果不同`),
  ];
  if (problems.length) {
    console.error(`dist 沒有跟 src 同步（${problems.length} 項）。請執行 npm run build 後一起 commit：`);
    for (const p of problems) console.error(`  - ${p}`);
    // 用 exitCode 而不是 process.exit：輸出接到管線時，process.exit 會截斷還沒寫完的訊息
    process.exitCode = 1;
  } else {
    console.log('dist 與 src 的建置結果一致');
  }
}
