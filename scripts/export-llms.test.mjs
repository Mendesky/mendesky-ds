// 給 AI 讀的檔案（export-llms.mjs）的測試：llms.txt 與每個元件一份 components/<id>.md。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLlmsFiles, firstSentence, A11Y_GROUPS, A11Y_LABEL } from './export-llms.mjs';
import { storyUrl, storybookDocsUrl } from './storybook-urls.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const GROUPS = ['互動元件', '表單元件', '浮層元件', '展示元件', '工具'];

const specs = () => [
  {
    id: 'button',
    name: 'Button',
    group: '互動元件',
    when: '任何可點擊操作。只有圖示時改用 #icon-btn。',
    description: '第一行說明\n第二行說明',
    notes: ['一般備註，見 #icon-btn', { type: 'warn', content: '要小心' }, { type: 'warning', content: '更要小心' }, { type: 'info', content: '補充資訊' }],
    anatomy: [
      { name: '外框', description: '可以點的範圍，見 #icon-btn。' },
      { name: '文字', description: '說明這個操作。' },
    ],
    states: [{ name: '停用', description: '灰底 | 灰字\n點了沒反應' }],
    a11y: { keyboard: ['Tab 移到按鈕。', 'Enter 觸發。'], screenReader: ['念出按鈕文字。'], aria: ['用原生 button。'] },
    dos: [{ text: '撐滿容器寬度時用 fullWidth。', story: 'full-width' }, { text: '載入中給 loadingText。' }],
    donts: [{ text: '不要放 #ghost。', story: 'nope' }],
    customTables: [{ title: '尺寸對照', columns: ['尺寸', '說明'], rows: [['M', '見 #icon-btn'], ['L', 'a | b']] }],
  },
  { id: 'icon-btn', name: 'Icon Button', group: '互動元件', when: '只有圖示時用，`#button 不算。`這裡才結束。第二句。', notes: [] },
  { id: 'field', name: 'Field', group: '表單元件', when: '搭配 #button 的欄位外框，沒有句號', notes: [] },
  { id: 'avatar', name: 'Avatar', group: '互動元件', notes: [] },
];

const frameworks = () => ({
  angular: {
    label: 'Angular',
    ref: 'v0.5.0',
    repo: 'https://github.com/Mendesky/mendesky-ds-angular.git',
    storybook: 'https://example.test/ng/',
    docs: [
      {
        id: 'button',
        selector: 'app-button',
        summary: 'variant: filled|ghost · (btnClick)',
        props: [
          { name: 'variant', type: "'filled' | 'ghost'", default: "'filled'", desc: '外觀\n第二行' },
          { name: 'text', type: 'string', description: '按鈕文字' },
          { name: 'leftLabel', type: 'BtnLabelConfig | null', default: 'null', desc: 'null 為不顯示' },
        ],
        events: [{ name: 'closeMenu', type: 'EventEmitter<void>', description: '關閉選單' }],
        usage: [
          { label: '基本用法', code: '<app-button text="嗨" />' },
          { code: '<!-- 有三個反引號 ``` 的程式碼 -->\n<app-button />' },
        ],
        usageNotes: ['用 ngModel 綁值（#button 原樣保留）', { type: 'warn', content: '小心' }],
      },
      { id: 'icon-btn', selector: 'app-icon-btn', props: [], usage: [] },
    ],
    stories: {
      button: [
        { id: 'button--default', name: 'Default' },
        { id: 'button--full-width', name: 'Full Width' },
      ],
    },
  },
  vue: {
    label: 'Vue（試做）',
    ref: 'v0.2.0',
    repo: 'https://github.com/Mendesky/mendesky-ds-vue.git',
    storybook: 'https://example.test/vue/',
    docs: [{ id: 'button', selector: '<DsButton>', props: [], usage: [{ code: '<DsButton text="嗨" />' }] }],
    stories: { button: [{ id: 'button--full-width', name: 'Full Width' }] },
  },
});

const build = (over = {}) => buildLlmsFiles({ specs: specs(), frameworks: frameworks(), version: 'v9.9.9', groups: GROUPS, ...over });
const headings = (md) => md.split('\n').filter((l) => /^#{1,4} /.test(l));

test('產生 llms.txt 與每份規格的 components/<id>.md', () => {
  assert.deepEqual(Object.keys(build()).sort(), ['components/avatar.md', 'components/button.md', 'components/field.md', 'components/icon-btn.md', 'llms.txt']);
});

test('llms.txt：標題、一行摘要、說明段落寫出版本與規格寫法', () => {
  const txt = build()['llms.txt'];
  const lines = txt.split('\n');
  assert.equal(lines[0], '# Mendesky Design System');
  assert.equal(lines[1], '');
  assert.match(lines[2], /^> \S/);
  assert.match(txt, /v9\.9\.9/);
  assert.match(txt, /跟框架無關/);
  assert.match(txt, /行內粗體/);
  assert.match(txt, /行內程式碼/);
  assert.match(txt, /連結/);
});

test('llms.txt：依分組順序各一節，同組依名稱排序，沒有元件的分組不出現', () => {
  const txt = build()['llms.txt'];
  const h2 = txt.split('\n').filter((l) => l.startsWith('## '));
  assert.deepEqual(h2, ['## 互動元件', '## 表單元件', '## 框架']);
  const section = txt.slice(txt.indexOf('## 互動元件'), txt.indexOf('## 表單元件'));
  const items = section.split('\n').filter((l) => l.startsWith('- '));
  assert.deepEqual(items.map((l) => l.match(/^- \[([^\]]+)\]/)[1]), ['Avatar', 'Button', 'Icon Button']);
});

test('llms.txt：每行連到 components/<id>.md，附「何時用」的第一句，#元件id 換成元件名稱（不加連結）', () => {
  const txt = build()['llms.txt'];
  assert.match(txt, /^- \[Button\]\(components\/button\.md\): 任何可點擊操作。$/m);
  // 行內程式碼裡的 。 不算句尾，裡面的 #元件id 也原樣保留
  assert.match(txt, /^- \[Icon Button\]\(components\/icon-btn\.md\): 只有圖示時用，`#button 不算。`這裡才結束。$/m);
  // 沒有句號：整段都放；#button 換成名稱
  assert.match(txt, /^- \[Field\]\(components\/field\.md\): 搭配 Button 的欄位外框，沒有句號$/m);
  // 沒有「何時用」：只有連結
  assert.match(txt, /^- \[Avatar\]\(components\/avatar\.md\)$/m);
});

test('llms.txt：「框架」一節列出每個框架的名稱、版本、範例網站與 repo', () => {
  const txt = build()['llms.txt'];
  const section = txt.slice(txt.indexOf('## 框架'));
  const items = section.split('\n').filter((l) => l.startsWith('- '));
  assert.equal(items.length, 2);
  assert.match(items[0], /Angular/);
  assert.match(items[0], /v0\.5\.0/);
  assert.match(items[0], /https:\/\/example\.test\/ng\//);
  // repo 網址去掉 clone 用的 .git
  assert.ok(items[0].endsWith('；原始碼 https://github.com/Mendesky/mendesky-ds-angular'), items[0]);
  assert.match(items[1], /Vue（試做）/);
  assert.match(items[1], /v0\.2\.0/);
  assert.ok(items[1].endsWith('；原始碼 https://github.com/Mendesky/mendesky-ds-vue'), items[1]);
});

test('llms.txt：連到本站檔案的連結都是相對路徑', () => {
  const txt = build()['llms.txt'];
  const targets = [...txt.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
  const own = targets.filter((t) => !/^https?:/.test(t));
  assert.ok(own.length >= 4);
  for (const t of own) assert.match(t, /^components\/[a-z0-9-]+\.md$/);
});

test('元件檔：標題、分組，各段順序跟元件頁一致', () => {
  const md = build()['components/button.md'];
  assert.ok(md.startsWith('# Button（button）\n\n分組：互動元件\n\n任何可點擊操作。只有圖示時改用 [Icon Button](icon-btn.md)。\n\n第一行說明\n第二行說明\n'));
  assert.deepEqual(headings(md), [
    '# Button（button）',
    '## 部位',
    '## 狀態',
    '## 可以這樣做、不要這樣做',
    '### 可以這樣做',
    '### 不要這樣做',
    '## 用法',
    '### Angular（v0.5.0）',
    '#### 屬性',
    '#### 事件',
    '#### 程式碼範例',
    '#### Angular 注意事項',
    '### Vue（試做）（v0.2.0）',
    '#### 屬性',
    '#### 程式碼範例',
    '## 無障礙',
    '### 網頁和 APP 都要做到',
    '### 網頁專屬',
    '## 注意事項',
    '## 對照表',
    '### 尺寸對照',
  ]);
});

test('元件檔：部位是有序清單，狀態是表格（| 跳脫、換行變空白）', () => {
  const md = build()['components/button.md'];
  assert.match(md, /^1\. \*\*外框\*\*：可以點的範圍，見 \[Icon Button\]\(icon-btn\.md\)。$/m);
  assert.match(md, /^2\. \*\*文字\*\*：說明這個操作。$/m);
  assert.match(md, /^\| 狀態 \| 長怎樣、什麼時候出現 \|$/m);
  assert.match(md, /^\| 停用 \| 灰底 \\\| 灰字 點了沒反應 \|$/m);
});

test('元件檔：有範例代號的「可以這樣做」附上第一個有這個範例的框架的範例網址；找不到時只附代號', () => {
  const md = build()['components/button.md'];
  const url = storyUrl('button--full-width', 'https://example.test/ng/');
  assert.ok(md.includes(`- 撐滿容器寬度時用 fullWidth。（範例：[Angular 版](${url})）\n`), md);
  assert.match(md, /^- 載入中給 loadingText。$/m);
  assert.match(md, /^- 不要放 #ghost。（範例代號：nope）$/m);
});

test('元件檔：各框架的範例清單都拿不到時，範例只附代號', () => {
  const fws = frameworks();
  fws.angular.stories = {};
  fws.vue.stories = {};
  const md = build({ frameworks: fws })['components/button.md'];
  assert.match(md, /^- 撐滿容器寬度時用 fullWidth。（範例代號：full-width）$/m);
});

test('元件檔：用法依框架各一節：標籤、摘要、範例網站說明頁、屬性、事件、程式碼、框架注意事項', () => {
  const md = build()['components/button.md'];
  const ng = md.slice(md.indexOf('### Angular（v0.5.0）'), md.indexOf('### Vue（試做）'));
  assert.match(ng, /^`app-button`$/m);
  assert.match(ng, /^variant: filled\|ghost · \(btnClick\)$/m);
  assert.ok(ng.includes(`[在範例網站看全部 2 個範例](${storybookDocsUrl('button', 'https://example.test/ng/')})`));
  assert.match(ng, /^\| 名稱 \| 型別 \| 預設 \| 說明 \|$/m);
  assert.ok(ng.includes("| `variant` | `'filled' \\| 'ghost'` | `'filled'` | 外觀 第二行 |"), ng);
  assert.ok(ng.includes('| `text` | `string` |  | 按鈕文字 |'), ng);
  assert.ok(ng.includes('| `leftLabel` | `BtnLabelConfig \\| null` | `null` | null 為不顯示 |'), ng);
  assert.match(ng, /^\| 名稱 \| 型別 \| 說明 \|$/m);
  assert.ok(ng.includes('| `closeMenu` | `EventEmitter<void>` | 關閉選單 |'));
  assert.ok(ng.includes('**基本用法**\n\n```html\n<app-button text="嗨" />\n```'));
  // 程式碼裡有三個反引號：外圍改用更長的圍欄
  assert.ok(ng.includes('````html\n<!-- 有三個反引號 ``` 的程式碼 -->\n<app-button />\n````'));
  // 框架提供的文字原樣輸出（#button 不換）；warn 前面加粗體的「注意」
  assert.match(ng, /^- 用 ngModel 綁值（#button 原樣保留）$/m);
  assert.match(ng, /^- \*\*注意\*\*：小心$/m);

  const vue = md.slice(md.indexOf('### Vue（試做）'), md.indexOf('## 無障礙'));
  assert.match(vue, /^`<DsButton>`$/m);
  assert.match(vue, /^沒有輸入屬性。$/m);
  assert.ok(vue.includes('```vue\n<DsButton text="嗨" />\n```'));
  assert.ok(!vue.includes('#### 事件'));
});

test('元件檔：框架的範例清單拿不到時仍連到說明頁；拿得到但沒有這個元件就不連', () => {
  const fws = frameworks();
  fws.angular.stories = {};
  fws.vue.stories = { other: [{ id: 'other--default', name: 'Default' }] };
  const md = build({ frameworks: fws })['components/button.md'];
  assert.ok(md.includes(`[在範例網站看範例](${storybookDocsUrl('button', 'https://example.test/ng/')})`));
  assert.ok(!md.includes(storybookDocsUrl('button', 'https://example.test/vue/')));
});

test('元件檔：無障礙分兩組，每項前面標分類', () => {
  const md = build()['components/button.md'];
  const a11y = md.slice(md.indexOf('## 無障礙'), md.indexOf('## 注意事項'));
  assert.equal(
    a11y,
    [
      '## 無障礙',
      '',
      '### 網頁和 APP 都要做到',
      '',
      '- **鍵盤**：Tab 移到按鈕。',
      '- **鍵盤**：Enter 觸發。',
      '- **報讀軟體**：念出按鈕文字。',
      '',
      '### 網頁專屬',
      '',
      '- **ARIA 與 HTML 語意**：用原生 button。',
      '',
      '',
    ].join('\n'),
  );
});

test('元件檔：注意事項的 warn／warning 前面加粗體的「注意」（冒號在粗體外），對照表的格子換元件連結並跳脫 |', () => {
  const md = build()['components/button.md'];
  assert.match(md, /^- 一般備註，見 \[Icon Button\]\(icon-btn\.md\)$/m);
  assert.match(md, /^- \*\*注意\*\*：要小心$/m);
  assert.match(md, /^- \*\*注意\*\*：更要小心$/m);
  assert.match(md, /^- 補充資訊$/m);
  assert.match(md, /^\| 尺寸 \| 說明 \|$/m);
  assert.match(md, /^\| M \| 見 \[Icon Button\]\(icon-btn\.md\) \|$/m);
  assert.match(md, /^\| L \| a \\\| b \|$/m);
});

test('元件檔：沒有內容的段落不出現', () => {
  const md = build()['components/icon-btn.md'];
  assert.deepEqual(headings(md), ['# Icon Button（icon-btn）', '## 用法', '### Angular（v0.5.0）', '#### 屬性']);
  assert.match(md, /^沒有輸入屬性。$/m);
  // 行內程式碼裡的 #button 不換成連結
  assert.ok(md.includes('只有圖示時用，`#button 不算。`這裡才結束。第二句。'));
  const avatar = build()['components/avatar.md'];
  assert.equal(avatar, '# Avatar（avatar）\n\n分組：互動元件\n');
});

test('清單項目裡的換行：接續的行縮排，留在同一項', () => {
  const s = specs();
  s[0].anatomy = [{ name: '外框', description: '第一行\n第二行' }];
  s[0].notes = ['備註第一行\n備註第二行'];
  const md = build({ specs: s })['components/button.md'];
  assert.ok(md.includes('1. **外框**：第一行\n   第二行\n'));
  assert.ok(md.includes('- 備註第一行\n  備註第二行\n'));
});

test('輸出不會有 undefined、null 字樣或 [object Object]（框架原文裡的 null 除外）', () => {
  for (const [file, content] of Object.entries(build())) {
    assert.ok(!content.includes('undefined'), `${file} 有 undefined`);
    assert.ok(!content.includes('[object Object]'), `${file} 有 [object Object]`);
    const nulls = content.split('\n').filter((l) => /\bnull\b/.test(l));
    for (const l of nulls) assert.ok(l.includes('leftLabel'), `${file} 有不該出現的 null：${l}`);
  }
});

test('規格的分組不在分組清單裡 → 丟出錯誤，指出元件', () => {
  const s = specs();
  s[3].group = '不存在的分組';
  assert.throws(() => build({ specs: s }), /avatar.*不存在的分組/);
});

test('沒有任何元件規格 → 丟出錯誤', () => {
  assert.throws(() => build({ specs: [] }), /沒有任何元件規格/);
});

test('必要欄位不是文字（例如框架的 selector 漏了）→ 丟出錯誤，不輸出 undefined', () => {
  const fws = frameworks();
  delete fws.angular.docs[0].selector;
  assert.throws(() => build({ frameworks: fws }), /Angular.*button.*selector/);
  const s = specs();
  s[0].name = undefined;
  assert.throws(() => build({ specs: s }), /button.*name/);
  assert.throws(() => build({ version: '' }), /版本/);
});

test('框架少了 label、ref 或 storybook，元件 id 重複或不能當檔名，沒有分組 → 丟出錯誤', () => {
  for (const key of ['label', 'ref', 'storybook']) {
    const fws = frameworks();
    delete fws.vue[key];
    assert.throws(() => build({ frameworks: fws }), new RegExp(`框架 vue 的 ${key}`));
  }
  const dup = specs();
  dup[3].id = 'button';
  assert.throws(() => build({ specs: dup }), /元件規格 button 重複/);
  for (const bad of ['../x', 'Bad', 'a/b']) {
    const s = specs();
    s[3].id = bad;
    assert.throws(() => build({ specs: s }), (e) => e.message.includes(`元件規格 ${bad} 的 id 只能有小寫英數與連字號`));
  }
  assert.throws(() => build({ groups: [] }), /沒有元件分組/);
});

test('firstSentence：取到第一個句號；行內程式碼裡的句號不算；句號在粗體裡就補上收尾的 **', () => {
  assert.equal(firstSentence('第一句。第二句。'), '第一句。');
  assert.equal(firstSentence('用 `a。b` 寫。後面'), '用 `a。b` 寫。');
  assert.equal(firstSentence('**整句粗體。**第二句。第三句。'), '**整句粗體。**');
  assert.equal(firstSentence('**粗體。裡面**結束。後面'), '**粗體。**');
  assert.equal(firstSentence('前面 **重點。** 後面。再後面。'), '前面 **重點。**');
  assert.equal(firstSentence('**粗體**之後。後面'), '**粗體**之後。');
  // 粗體跨過行內程式碼
  assert.equal(firstSentence('**用 `x` 寫。**後面。'), '**用 `x` 寫。**');
  // 沒有收尾的 ** 是一般文字，照樣在第一個句號結束
  assert.equal(firstSentence('**沒關的粗體。第二句。'), '**沒關的粗體。');
  assert.equal(firstSentence('沒有句號'), '沒有句號');
  assert.equal(firstSentence('換\n行。後面'), '換 行。');
});

test('跳脫：連結文字的 [ ]、行內程式碼裡的反引號；程式碼範例結尾的空行去掉', () => {
  const s = specs();
  s[1].name = 'Icon [Portal] Button';
  const fws = frameworks();
  fws.angular.docs[0].props = [{ name: 'tpl', type: 'Template<`x`>', default: '`a`', desc: '有反引號' }];
  fws.angular.docs[0].usage = [{ code: '<app-button />\n\n' }];
  const files = build({ specs: s, frameworks: fws });
  assert.match(files['llms.txt'], /^- \[Icon \\\[Portal\\\] Button\]\(components\/icon-btn\.md\): /m);
  const md = files['components/button.md'];
  // button 的「何時用」提到 #icon-btn：連結文字一樣跳脫
  assert.ok(md.includes('只有圖示時改用 [Icon \\[Portal\\] Button](icon-btn.md)。'), md);
  // 內容有反引號：外圍用兩個；開頭或結尾是反引號：內側再加空白
  assert.ok(md.includes('| `tpl` | ``Template<`x`>`` | `` `a` `` | 有反引號 |'), md);
  assert.ok(md.includes('```html\n<app-button />\n```\n'), md);
});

test('規格文字裡像 HTML 標籤的 < 前面加 \\，顯示時才不會變成元素；行內程式碼與框架原文照原樣', () => {
  const s = specs();
  s[0].when = '禁止原生 <textarea>，改用 `<app-textarea>`。第二句 a < b。';
  s[0].anatomy = [{ name: '<b> 標籤', description: '見 <strong> 與 #icon-btn' }];
  s[0].customTables = [{ title: '對照', columns: ['<th> 欄', '說明'], rows: [['M', '用 <style>']] }];
  const files = build({ specs: s });
  const md = files['components/button.md'];
  assert.ok(md.includes('\n禁止原生 \\<textarea>，改用 `<app-textarea>`。第二句 a < b。\n'), md);
  assert.ok(md.includes('\n1. **\\<b> 標籤**：見 \\<strong> 與 [Icon Button](icon-btn.md)\n'), md);
  assert.match(md, /^\| \\<th> 欄 \| 說明 \|$/m);
  assert.match(md, /^\| M \| 用 \\<style> \|$/m);
  assert.ok(md.includes('| `closeMenu` | `EventEmitter<void>` | 關閉選單 |'), md);
  assert.match(files['llms.txt'], /^- \[Button\]\(components\/button\.md\): 禁止原生 \\<textarea>，改用 `<app-textarea>`。$/m);
});

test('元件檔用文件網站同一套 Markdown 顯示：粗體標籤都變成粗體，規格文字裡的 <標籤> 不會變成 HTML 元素', async () => {
  const { createMarkdownRenderer } = await import('vitepress');
  const renderer = await createMarkdownRenderer(path.join(here, '..', 'site'));
  const s = specs();
  s[0].when = '備注、描述等多行輸入。禁止原生 <textarea>。';
  s[0].notes = [{ type: 'warn', content: '驗證重點：hover 時變白' }];
  const html = renderer.render(build({ specs: s })['components/button.md'], { relativePath: 'components/button.md' });
  assert.ok(html.includes('<p>備注、描述等多行輸入。禁止原生 &lt;textarea&gt;。</p>'), html);
  assert.ok(!html.includes('<textarea'), html);
  assert.ok(html.includes('<li><strong>注意</strong>：驗證重點：hover 時變白</li>'), html);
  assert.ok(html.includes('<li><strong>注意</strong>：小心</li>'), html);
  assert.ok(html.includes('<li><strong>外框</strong>：'), html);
  assert.ok(html.includes('<li><strong>鍵盤</strong>：Tab 移到按鈕。</li>'), html);
  // 程式碼區塊以外，不留下顯示成字面的 **
  assert.ok(!html.replace(/<pre[\s\S]*?<\/pre>/g, '').includes('**'), html);
});

test('範例網址的格式（文件網站 links.ts 也用同一支）', () => {
  assert.equal(storyUrl('button--full-width', 'https://x.test/sb/'), 'https://x.test/sb/iframe.html?id=button--full-width&viewMode=story');
  assert.equal(storybookDocsUrl('button', 'https://x.test/sb/'), 'https://x.test/sb/?path=/docs/button--%E8%AA%AA%E6%98%8E');
});

test('無障礙的分組與名稱跟元件頁（ComponentPage.vue）一致', () => {
  const vue = readFileSync(path.join(here, '..', 'site', '.vitepress', 'theme', 'components', 'ComponentPage.vue'), 'utf8');
  const labelSrc = vue.match(/const A11Y_LABEL[^=]*=\s*\{([^}]*)\}/)[1];
  const labels = Object.fromEntries([...labelSrc.matchAll(/(\w+):\s*'([^']*)'/g)].map((m) => [m[1], m[2]]));
  assert.deepEqual(A11Y_LABEL, labels);
  const groupSrc = vue.match(/const A11Y_GROUPS[^=]*=\s*\[([\s\S]*?)\];/)[1];
  const groups = [...groupSrc.matchAll(/title:\s*'([^']*)',\s*keys:\s*\[([^\]]*)\]/g)].map((m) => ({
    title: m[1],
    keys: [...m[2].matchAll(/'(\w+)'/g)].map((k) => k[1]),
  }));
  assert.deepEqual(A11Y_GROUPS, groups);
});
