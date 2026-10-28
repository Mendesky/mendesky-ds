// 給 AI 讀的檔案：每個版本的文件網站另外產生 llms.txt（llmstxt.org 格式的總表）與每個元件一份 components/<id>.md。
// 讀者是事務所其他產品的開發者與他們用的 AI 工具，用 DS 做畫面前先讀。寫法參考 Ant Design 的 llms.txt 與元件 .md。
//
// 元件檔的內容跟元件頁（site/.vitepress/theme/components/ComponentPage.vue）用同一份資料、同樣的段落順序：
// 何時用、說明、部位、狀態、可以／不要這樣做、各框架的用法、無障礙、注意事項、對照表。沒有內容的段落不寫。
// 規格文字裡的 `#元件id` 換成連到該元件檔的連結（行內程式碼裡的不換，找不到的 id 保留原樣）；
// 規格文字裡像 HTML 標籤的 <（例如「禁止原生 <textarea>」）前面加 \：元件頁照字面顯示，Markdown 卻會把它當成元素。
// 框架提供的文字（屬性說明、注意事項、程式碼）原樣輸出，只在表格裡跳脫 | 與換行。
//
// 這支檔案只產生內容、不寫檔：文件網站建置完（site/.vitepress/config.mts 的 buildEnd）寫進網站目錄，
// 建好之後由 scripts/check-llms.mjs 檢查。
import { splitRefs } from './component-refs.mjs';
import { storyUrl, storybookDocsUrl } from './storybook-urls.mjs';

/** 無障礙分兩組：網頁和 APP 都要做到的行為、網頁才有的 ARIA（跟 ComponentPage.vue 一致，測試會比對） */
export const A11Y_GROUPS = [
  { title: '網頁和 APP 都要做到', keys: ['keyboard', 'focus', 'screenReader', 'motion', 'touch'] },
  { title: '網頁專屬', keys: ['aria'] },
];
export const A11Y_LABEL = { keyboard: '鍵盤', focus: '焦點', screenReader: '報讀軟體', motion: '動態', touch: '觸控', aria: 'ARIA 與 HTML 語意' };

/** 程式碼範例的語言標記，依框架；沒列到的框架不標 */
const CODE_LANG = { angular: 'html', vue: 'vue' };

/** 元件 id 只能是小寫英數與連字號（也是檔名，不能有 / 或 ..） */
const ID = /^[a-z0-9][a-z0-9-]*$/;

// Markdown 的行內程式碼：開頭與結尾是一樣多個反引號
const CODE_SPAN = /(?<!`)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/g;

/** 把文字拆成行內程式碼與其他部分（順序不變）：[{ code: true|false, text }] */
export function splitCode(text) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(CODE_SPAN)) {
    if (m.index > last) parts.push({ code: false, text: text.slice(last, m.index) });
    parts.push({ code: true, text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ code: false, text: text.slice(last) });
  return parts;
}

/** 像 HTML 標籤開頭的 <（<button>、</b>、<!--、<https:…>）前面加 \，Markdown 才會照字面顯示 */
const escapeTags = (text) => text.replace(/<(?=[A-Za-z/!?])/g, '\\<');

/** 規格文字：行內程式碼以外的 `#元件id` 交給 render 換掉、像 HTML 標籤的 < 跳脫；行內程式碼照原樣 */
function replaceRefs(text, render) {
  return splitCode(text)
    .map((p) => (p.code ? p.text : splitRefs(p.text).map((r) => ('ref' in r ? render(r.ref) : escapeTags(r.text))).join('')))
    .join('');
}

/**
 * 取第一句（到第一個「。」為止）並收成一行；行內程式碼裡的「。」不算句尾。沒有「。」就是整段。
 * 句號在粗體裡時補上收尾的 **，粗體才不會沒關；後面沒有收尾的 ** 不是粗體，當一般文字。
 */
export function firstSentence(text) {
  const parts = splitCode(text);
  const done = (s) => s.replace(/\s+/g, ' ').trim();
  // 從第 pi 段的第 from 個字起，後面（行內程式碼以外）還有沒有 **
  const closesLater = (pi, from) => parts.slice(pi).some((p, k) => !p.code && p.text.includes('**', k === 0 ? from : 0));
  let out = '';
  let bold = false;
  for (let pi = 0; pi < parts.length; pi++) {
    const p = parts[pi];
    if (p.code) {
      out += p.text;
      continue;
    }
    for (let i = 0; i < p.text.length; i++) {
      if (p.text.startsWith('**', i) && (bold || closesLater(pi, i + 2))) {
        bold = !bold;
        out += '**';
        i++;
        continue;
      }
      out += p.text[i];
      if (p.text[i] === '。') return done(bold ? `${out}**` : out);
    }
  }
  return done(out);
}

/** 必要的文字欄位：不是有內容的文字就丟錯，不讓 undefined 寫進檔案 */
function required(value, what) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${what} 不是有內容的文字（拿到 ${String(value)}）`);
  return value;
}

/** 選填的文字欄位：沒有就是空字串；數字與布林值轉成文字；物件、陣列丟錯（否則會印出 [object Object]） */
function optional(value, what) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  throw new Error(`${what} 應該是文字，拿到 ${JSON.stringify(value)}`);
}

/** 選填的清單欄位：沒有就是空清單 */
function list(value, what) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new Error(`${what} 應該是清單，拿到 ${JSON.stringify(value)}`);
  return value;
}

/** 連結文字裡的 [ ] \ 要跳脫 */
const linkText = (text) => text.replace(/[[\]\\]/g, '\\$&');

/** 行內程式碼：內容有反引號時，外圍用更多個 */
function inlineCode(text) {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map((r) => r.length));
  const fence = '`'.repeat(longest + 1);
  const pad = text.startsWith('`') || text.endsWith('`') ? ' ' : '';
  return `${fence}${pad}${text}${pad}${fence}`;
}

/** 程式碼區塊：程式碼裡有三個以上的反引號時，圍欄用更多個 */
function codeBlock(code, lang) {
  const longest = Math.max(0, ...(code.match(/`{3,}/g) ?? []).map((r) => r.length));
  const fence = '`'.repeat(Math.max(3, longest + 1));
  return `${fence}${lang}\n${code.replace(/\n+$/, '')}\n${fence}`;
}

/** 清單的一項；文字有換行時，接續的行縮排到項目文字的位置，才會留在同一項 */
function listItem(marker, text) {
  const pad = ' '.repeat(marker.length + 1);
  return `${marker} ${text
    .split('\n')
    .map((line, i) => (i === 0 || line === '' ? line : pad + line))
    .join('\n')}`;
}

/** 表格；格子裡的 | 跳脫、換行變空白 */
function table(columns, rows) {
  const cell = (text) => text.replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
  const line = (cells) => `| ${cells.map(cell).join(' | ')} |`;
  return [line(columns), line(columns.map(() => '---')), ...rows.map(line)].join('\n');
}

/**
 * 注意事項的一項；warn、warning 前面加粗體的「注意」。冒號放在粗體外面：
 * 寫成「**注意：**」再緊接文字時，Markdown 認不出粗體的結尾，會照字面顯示成兩組星號
 */
function noteItem(note, render, what) {
  if (typeof note === 'string') return listItem('-', render(note));
  const warn = note?.type === 'warn' || note?.type === 'warning';
  return listItem('-', `${warn ? '**注意**：' : ''}${render(required(note?.content, `${what} 的 content`))}`);
}

/** 框架的用法說明：元件 id → 說明（loadFrameworkDocs 給的是清單，ds.data 給的是物件，兩種都收） */
function docsById(fw) {
  const docs = Array.isArray(fw.docs) ? fw.docs : Object.values(fw.docs ?? {});
  return new Map(docs.map((d) => [d.id, d]));
}

/** 連到原始碼的網址：去掉 clone 用的 .git */
const repoUrl = (repo) => repo.replace(/\.git$/, '');

function frameworkUsage(id, name, fw, doc) {
  const where = `${fw.label} 的 ${id} 用法說明`;
  const out = [`### ${fw.label}（${fw.ref}）`, inlineCode(required(doc.selector, `${where}的 selector`))];
  const summary = optional(doc.summary, `${where}的 summary`);
  if (summary) out.push(summary);

  // 範例網站的說明頁：有這個元件的範例才連；範例清單整個拿不到（建置時連不上）時照格式連
  const stories = list(fw.stories?.[id], `${where}的範例清單`);
  const storiesKnown = Object.keys(fw.stories ?? {}).length > 0;
  if (stories.length) out.push(`[在範例網站看全部 ${stories.length} 個範例](${storybookDocsUrl(id, fw.storybook)})`);
  else if (!storiesKnown) out.push(`[在範例網站看範例](${storybookDocsUrl(id, fw.storybook)})`);

  out.push('#### 屬性');
  const props = list(doc.props, `${where}的 props`);
  out.push(
    props.length
      ? table(
          ['名稱', '型別', '預設', '說明'],
          props.map((p) => {
            const type = optional(p.type, `${where}的屬性 ${p.name} 的 type`);
            const def = optional(p.default, `${where}的屬性 ${p.name} 的 default`);
            return [
              inlineCode(required(p.name, `${where}的屬性名稱`)),
              type ? inlineCode(type) : '',
              def ? inlineCode(def) : '',
              optional(p.desc ?? p.description, `${where}的屬性 ${p.name} 的說明`),
            ];
          }),
        )
      : '沒有輸入屬性。',
  );

  const events = list(doc.events, `${where}的 events`);
  if (events.length) {
    out.push(
      '#### 事件',
      table(
        ['名稱', '型別', '說明'],
        events.map((e) => {
          const type = optional(e.type, `${where}的事件 ${e.name} 的 type`);
          return [inlineCode(required(e.name, `${where}的事件名稱`)), type ? inlineCode(type) : '', optional(e.description, `${where}的事件 ${e.name} 的說明`)];
        }),
      ),
    );
  }

  const usage = list(doc.usage, `${where}的 usage`);
  if (usage.length) {
    out.push('#### 程式碼範例');
    for (const u of usage) {
      const label = optional(u.label, `${where}的範例標題`);
      if (label) out.push(`**${label}**`);
      out.push(codeBlock(required(u.code, `${where}的範例程式碼`), CODE_LANG[name] ?? ''));
    }
  }

  const notes = list(doc.usageNotes, `${where}的 usageNotes`);
  if (notes.length) out.push(`#### ${fw.label} 注意事項`, notes.map((n) => noteItem(n, (t) => t, `${where}的注意事項`)).join('\n'));
  return out;
}

function componentMd(spec, { names, frameworks }) {
  const { id, name } = spec;
  const what = `元件規格 ${id}`;
  const md = (text) => replaceRefs(text, (ref) => (names.has(ref) ? `[${linkText(names.get(ref))}](${ref}.md)` : `#${ref}`));
  const blocks = [`# ${name}（${id}）`, `分組：${spec.group}`];

  const when = optional(spec.when, `${what} 的 when`);
  if (when) blocks.push(md(when));
  const description = optional(spec.description, `${what} 的 description`);
  if (description) blocks.push(md(description));

  const anatomy = list(spec.anatomy, `${what} 的 anatomy`);
  if (anatomy.length) {
    blocks.push(
      '## 部位',
      anatomy.map((p, i) => listItem(`${i + 1}.`, `**${md(required(p.name, `${what} 的部位名稱`))}**：${md(required(p.description, `${what} 的部位說明`))}`)).join('\n'),
    );
  }

  const states = list(spec.states, `${what} 的 states`);
  if (states.length) {
    blocks.push(
      '## 狀態',
      table(['狀態', '長怎樣、什麼時候出現'], states.map((s) => [md(required(s.name, `${what} 的狀態名稱`)), md(required(s.description, `${what} 的狀態說明`))])),
    );
  }

  // 可以／不要這樣做的範例：在各框架的範例清單找 `<元件id>--<代號>`，第一個找到的框架給網址；都找不到只附代號
  const exampleSuffix = (story) => {
    if (!story) return '';
    const storyId = `${id}--${story}`;
    const fw = Object.values(frameworks).find((f) => (f.stories?.[id] ?? []).some((s) => s.id === storyId));
    return fw ? `（範例：[${linkText(fw.label)} 版](${storyUrl(storyId, fw.storybook)})）` : `（範例代號：${story}）`;
  };
  const examples = [
    { title: '可以這樣做', items: list(spec.dos, `${what} 的 dos`) },
    { title: '不要這樣做', items: list(spec.donts, `${what} 的 donts`) },
  ].filter((g) => g.items.length);
  if (examples.length) {
    blocks.push('## 可以這樣做、不要這樣做');
    for (const g of examples) {
      blocks.push(
        `### ${g.title}`,
        g.items.map((e) => listItem('-', md(required(e.text, `${what} 的${g.title}`)) + exampleSuffix(optional(e.story, `${what} 的範例代號`)))).join('\n'),
      );
    }
  }

  const usage = Object.entries(frameworks)
    .map(([fwName, fw]) => [fwName, fw, docsById(fw).get(id)])
    .filter(([, , doc]) => doc);
  if (usage.length) {
    blocks.push('## 用法');
    for (const [fwName, fw, doc] of usage) blocks.push(...frameworkUsage(id, fwName, fw, doc));
  }

  const a11y = spec.a11y ?? {};
  const a11yGroups = A11Y_GROUPS.map((g) => ({
    title: g.title,
    items: g.keys.flatMap((k) => list(a11y[k], `${what} 的 a11y.${k}`).map((item) => listItem('-', `**${A11Y_LABEL[k]}**：${md(required(item, `${what} 的 a11y.${k}`))}`))),
  })).filter((g) => g.items.length);
  if (a11yGroups.length) {
    blocks.push('## 無障礙');
    for (const g of a11yGroups) blocks.push(`### ${g.title}`, g.items.join('\n'));
  }

  const notes = list(spec.notes, `${what} 的 notes`);
  if (notes.length) blocks.push('## 注意事項', notes.map((n) => noteItem(n, md, `${what} 的注意事項`)).join('\n'));

  // 對照表另立一段：元件頁上它接在前一段後面，但在 .md 裡會被讀成前一段（例如「用法」）的一部分
  const tables = list(spec.customTables, `${what} 的 customTables`);
  if (tables.length) {
    blocks.push('## 對照表');
    for (const t of tables) {
      const title = required(t.title, `${what} 的對照表標題`);
      blocks.push(
        `### ${title}`,
        table(
          // 欄名在元件頁上不換元件連結，這裡也不換，只跳脫標籤
          list(t.columns, `${what} 的對照表「${title}」欄名`).map((c) => replaceRefs(optional(c, `${what} 的對照表「${title}」欄名`), (ref) => `#${ref}`)),
          list(t.rows, `${what} 的對照表「${title}」內容`).map((r) => r.map((c) => md(optional(c, `${what} 的對照表「${title}」格子`)))),
        ),
      );
    }
  }
  return blocks.join('\n\n') + '\n';
}

function llmsTxt({ specs, frameworks, version, groups, names }) {
  const plain = (text) => replaceRefs(text, (ref) => names.get(ref) ?? `#${ref}`);
  const lines = [
    '# Mendesky Design System',
    '',
    '> 嘉威聯合會計師事務所的設計系統：元件何時用、長怎樣、怎麼操作，以及各框架的寫法。',
    '',
    `這份是 ${version} 版的文件，給開發者與他們用的 AI 工具在用 DS 做畫面前閱讀。` +
      '元件規格跟框架無關；每份元件檔（`components/<元件id>.md`）都附上各框架的用法：元件標籤、屬性、事件、程式碼範例與框架專屬的注意事項。' +
      '規格文字只用 Markdown 的行內粗體與行內程式碼，提到其他元件時寫成連到該元件檔的連結。',
  ];
  for (const group of groups) {
    const inGroup = specs.filter((s) => s.group === group).sort((a, b) => a.name.localeCompare(b.name));
    if (!inGroup.length) continue;
    lines.push('', `## ${group}`, '');
    for (const s of inGroup) {
      const when = optional(s.when, `元件規格 ${s.id} 的 when`);
      lines.push(`- [${linkText(s.name)}](components/${s.id}.md)${when ? `: ${plain(firstSentence(when))}` : ''}`);
    }
  }
  const fws = Object.values(frameworks);
  if (fws.length) {
    lines.push('', '## 框架', '');
    for (const fw of fws) lines.push(`- [${linkText(fw.label)} 範例網站](${fw.storybook}): 版本 ${fw.ref}${fw.repo ? `；原始碼 ${repoUrl(fw.repo)}` : ''}`);
  }
  return lines.join('\n') + '\n';
}

/**
 * 產生給 AI 讀的檔案。回傳 { 相對於網站根目錄的路徑: 內容 }：llms.txt 與 components/<id>.md。
 *   specs       元件規格（exportCoreDocs(root).specs 的 spec）
 *   frameworks  各框架的用法說明（loadFrameworkDocs(root) 的結果：{ 框架: { label, ref, repo, storybook, docs, stories } }）
 *   version     文件版本（DOCS_VERSION：main 或 v1.2.3）
 *   groups      元件分組，依側欄順序
 * 資料不完整（沒有規格、分組對不上、必要欄位不是文字）就丟錯，不產生殘缺的檔案。
 */
export function buildLlmsFiles({ specs, frameworks = {}, version, groups }) {
  required(version, '文件版本（DOCS_VERSION）');
  if (!Array.isArray(groups) || groups.length === 0) throw new Error('沒有元件分組，無法產生 llms.txt');
  if (!Array.isArray(specs) || specs.length === 0) throw new Error('沒有任何元件規格，無法產生 llms.txt');
  const seen = new Set();
  for (const s of specs) {
    const id = required(s?.id, '元件規格的 id');
    if (!ID.test(id)) throw new Error(`元件規格 ${id} 的 id 只能有小寫英數與連字號`);
    if (seen.has(id)) throw new Error(`元件規格 ${id} 重複`);
    seen.add(id);
    required(s.name, `元件規格 ${id} 的 name`);
    required(s.group, `元件規格 ${id} 的 group`);
    if (!groups.includes(s.group)) throw new Error(`元件規格 ${id} 的分組「${s.group}」不在分組清單（${groups.join('、')}）裡，llms.txt 會漏掉它`);
  }
  for (const [name, fw] of Object.entries(frameworks)) {
    for (const key of ['label', 'ref', 'storybook']) required(fw?.[key], `框架 ${name} 的 ${key}`);
    optional(fw.repo, `框架 ${name} 的 repo`);
  }

  const names = new Map(specs.map((s) => [s.id, s.name]));
  const files = { 'llms.txt': llmsTxt({ specs, frameworks, version, groups, names }) };
  for (const spec of specs) files[`components/${spec.id}.md`] = componentMd(spec, { names, frameworks });
  return files;
}
