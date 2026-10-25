<script setup lang="ts">
// 元件頁：跟框架無關的規格（何時用、說明、部位、狀態、可以／不要這樣做、無障礙、注意事項、對照表），
// 中間用分頁切換各框架的用法（元件標籤、屬性、事件、範例程式碼、這個框架專屬的注意事項）與可操作範例。
// 規格文字裡的 `#元件id` 由 RefText 換成元件名稱與連結。
// 部位、狀態、可以／不要這樣做、無障礙是規格第 2 版欄位（選填），每一項都要畫出來：冒煙測試用 data-testid 數項數。
import { computed, ref } from 'vue';
import { data } from '../../ds.data.mts';
import { storyUrl, storybookDocsUrl } from '../links';
import RefText from './RefText.vue';

type Note = { type: 'info' | 'warn' | 'warning'; content: string } | string;
type Table = { title: string; columns: string[]; rows: string[][] };
type Part = { name: string; description: string };
type Example = { text: string; story?: string };
type A11y = Partial<Record<'keyboard' | 'focus' | 'screenReader' | 'motion' | 'touch' | 'aria', string[]>>;
type Story = { id: string; name: string };
type Prop = { name: string; type: string; default?: string; desc?: string; description?: string; isOutput?: boolean };
type Usage = { label?: string; code: string };
type Api = { selector: string; summary?: string; props: Prop[]; events?: { name: string; type: string; description: string }[]; usage: Usage[]; usageNotes?: Note[] };

const props = defineProps<{ id: string }>();
const spec = computed(() => data.components.find((c: { id: string }) => c.id === props.id));

const frameworks = computed(() =>
  Object.entries(data.frameworks as Record<string, { label: string; ref: string; storybook: string; docs: Record<string, Api>; stories: Record<string, { id: string; name: string }[]> }>)
    .filter(([, fw]) => fw.docs[props.id])
    .map(([name, fw]) => ({ name, label: fw.label, ref: fw.ref, storybook: fw.storybook, api: fw.docs[props.id], stories: fw.stories[props.id] ?? [] })),
);
const active = ref(0);
const current = computed(() => frameworks.value[active.value] ?? frameworks.value[0]);

const noteText = (n: Note) => (typeof n === 'string' ? n : n.content);
const noteType = (n: Note) => (typeof n === 'string' ? 'info' : n.type === 'warning' ? 'warn' : n.type);

// 無障礙分兩組：網頁和 APP 都要做到的行為、網頁才有的 ARIA
const A11Y_GROUPS: { title: string; keys: (keyof A11y)[] }[] = [
  { title: '網頁和 APP 都要做到', keys: ['keyboard', 'focus', 'screenReader', 'motion', 'touch'] },
  { title: '網頁專屬', keys: ['aria'] },
];
const A11Y_LABEL: Record<keyof A11y, string> = { keyboard: '鍵盤', focus: '焦點', screenReader: '報讀軟體', motion: '動態', touch: '觸控', aria: 'ARIA 與 HTML 語意' };
const a11yGroups = computed(() => {
  const a11y = (spec.value?.a11y ?? {}) as A11y;
  return A11Y_GROUPS.map((g) => ({ title: g.title, entries: g.keys.filter((k) => a11y[k]?.length).map((k) => ({ key: k, label: A11Y_LABEL[k], items: a11y[k] as string[] })) })).filter(
    (g) => g.entries.length,
  );
});

// 可以／不要這樣做的範例：在各框架的範例網站找 `<元件id>--<代號>`，找到第一個就嵌入。
// 範例網站連不上（建置時拿不到範例清單）就只顯示文字；拿得到清單卻找不到代號，標成「找不到」讓冒煙測試抓。
const allStories = computed(() =>
  Object.values(data.frameworks as Record<string, { label: string; storybook: string; stories: Record<string, Story[]> }>).map((fw) => ({
    label: fw.label,
    storybook: fw.storybook,
    stories: fw.stories[props.id] ?? [],
  })),
);
const storiesKnown = computed(() => allStories.value.some((fw) => fw.stories.length));
const exampleStory = (story: string) => {
  const storyId = `${props.id}--${story}`;
  const fw = allStories.value.find((f) => f.stories.some((s) => s.id === storyId));
  return fw ? { url: storyUrl(storyId, fw.storybook), label: fw.label } : null;
};
const examples = computed(() => [
  { kind: 'do', title: '可以這樣做', testid: 'spec-do-item', items: (spec.value?.dos ?? []) as Example[] },
  { kind: 'dont', title: '不要這樣做', testid: 'spec-dont-item', items: (spec.value?.donts ?? []) as Example[] },
].filter((g) => g.items.length));
</script>

<template>
  <div v-if="spec" class="ds-component-page" data-testid="component-page">
    <p v-if="spec.when" class="ds-when"><RefText :text="spec.when" /></p>
    <p v-if="spec.description"><RefText :text="spec.description" /></p>

    <template v-if="spec.anatomy?.length">
      <h2 id="anatomy">部位</h2>
      <ol class="ds-anatomy" data-testid="spec-anatomy">
        <li v-for="(p, i) in (spec.anatomy as Part[])" :key="i" data-testid="spec-anatomy-item"><strong><RefText :text="p.name" /></strong>：<RefText :text="p.description" /></li>
      </ol>
    </template>

    <template v-if="spec.states?.length">
      <h2 id="states">狀態</h2>
      <table class="ds-table" data-testid="spec-states">
        <thead><tr><th>狀態</th><th>長怎樣、什麼時候出現</th></tr></thead>
        <tbody>
          <tr v-for="(s, i) in (spec.states as Part[])" :key="i" data-testid="spec-state-item"><td><RefText :text="s.name" /></td><td><RefText :text="s.description" /></td></tr>
        </tbody>
      </table>
    </template>

    <template v-if="examples.length">
      <h2 id="do-dont">可以這樣做、不要這樣做</h2>
      <div class="ds-dodont">
        <div v-for="g in examples" :key="g.kind" class="ds-dodont__col" :class="`ds-dodont__col--${g.kind}`" :data-testid="`spec-${g.kind}s`">
          <p class="ds-dodont__title">{{ g.kind === 'do' ? '✅' : '❌' }} {{ g.title }}</p>
          <ul>
            <li v-for="(e, i) in g.items" :key="i" :data-testid="g.testid">
              <RefText :text="e.text" />
              <template v-if="e.story">
                <iframe
                  v-if="exampleStory(e.story)"
                  class="ds-story ds-dodont__story"
                  :src="exampleStory(e.story)!.url"
                  height="140"
                  :title="`${g.title}：${spec.name} 範例`"
                  loading="lazy"
                ></iframe>
                <code v-else-if="storiesKnown" class="ds-missing">範例 {{ e.story }}（範例網站找不到）</code>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template v-if="frameworks.length">
      <h2 id="usage">用法</h2>
      <div class="ds-fw-tabs" role="tablist" aria-label="框架">
        <button
          v-for="(fw, i) in frameworks"
          :key="fw.name"
          type="button"
          role="tab"
          class="ds-fw-tab"
          :class="{ 'is-active': i === active }"
          :aria-selected="i === active"
          @click="active = i"
        >{{ fw.label }}</button>
      </div>

      <div v-if="current" role="tabpanel" class="ds-fw-panel" :data-framework="current.name">
        <p><code>{{ current.api.selector }}</code><span class="ds-fw-ref">（{{ current.label }} 版 {{ current.ref }}）</span></p>

        <template v-if="current.stories.length">
          <iframe class="ds-story" :src="storyUrl(current.stories[0].id, current.storybook)" height="260" :title="`${spec.name} 範例`" loading="lazy"></iframe>
          <p class="ds-fw-more">
            <a :href="storybookDocsUrl(props.id, current.storybook)" target="_blank" rel="noopener">在範例網站看全部 {{ current.stories.length }} 個範例</a>
          </p>
        </template>

        <h3>屬性</h3>
        <p v-if="!current.api.props.length">沒有輸入屬性。</p>
        <table v-else class="ds-table">
          <thead><tr><th>名稱</th><th>型別</th><th>預設</th><th>說明</th></tr></thead>
          <tbody>
            <tr v-for="p in current.api.props" :key="p.name">
              <td><code>{{ p.name }}</code></td>
              <td><code>{{ p.type }}</code></td>
              <td><code v-if="p.default">{{ p.default }}</code></td>
              <td>{{ p.desc ?? p.description }}</td>
            </tr>
          </tbody>
        </table>

        <template v-if="current.api.usage.length">
          <h3>程式碼範例</h3>
          <div v-for="(u, i) in current.api.usage" :key="i">
            <p v-if="u.label"><strong>{{ u.label }}</strong></p>
            <div class="language-html"><pre><code>{{ u.code }}</code></pre></div>
          </div>
        </template>

        <div v-if="current.api.usageNotes?.length" data-testid="framework-notes">
          <h3>{{ current.label }} 注意事項</h3>
          <div v-for="(n, i) in current.api.usageNotes" :key="i" class="custom-block" :class="noteType(n)">
            <p>{{ noteText(n) }}</p>
          </div>
        </div>
      </div>
    </template>

    <template v-if="a11yGroups.length">
      <h2 id="a11y">無障礙</h2>
      <div data-testid="spec-a11y">
        <template v-for="g in a11yGroups" :key="g.title">
          <h3>{{ g.title }}</h3>
          <dl class="ds-a11y">
            <template v-for="e in g.entries" :key="e.key">
              <dt>{{ e.label }}</dt>
              <dd><ul><li v-for="(item, i) in e.items" :key="i" data-testid="spec-a11y-item"><RefText :text="item" /></li></ul></dd>
            </template>
          </dl>
        </template>
      </div>
    </template>

    <template v-if="spec.notes?.length">
      <h2 id="notes">注意事項</h2>
      <div v-for="(n, i) in spec.notes" :key="i" class="custom-block" :class="noteType(n)">
        <p><RefText :text="noteText(n)" /></p>
      </div>
    </template>

    <template v-if="spec.customTables?.length">
      <div v-for="t in (spec.customTables as Table[])" :key="t.title">
        <h3>{{ t.title }}</h3>
        <table class="ds-table">
          <thead><tr><th v-for="c in t.columns" :key="c">{{ c }}</th></tr></thead>
          <tbody>
            <tr v-for="(r, i) in t.rows" :key="i"><td v-for="(cell, j) in r" :key="j"><RefText :text="String(cell)" /></td></tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
  <p v-else class="ds-missing">#{{ id }}（找不到元件規格）</p>
</template>

<style scoped>
.ds-when { font-size: 16px; }
.ds-fw-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--vp-c-divider); margin: 12px 0 16px; }
.ds-fw-tab { padding: 6px 14px; border: 0; border-bottom: 2px solid transparent; background: transparent; color: var(--vp-c-text-2); cursor: pointer; font-weight: 500; }
.ds-fw-tab.is-active { color: var(--vp-c-brand-1); border-bottom-color: var(--vp-c-brand-1); }
.ds-fw-ref { color: var(--vp-c-text-2); font-size: 13px; margin-left: 4px; }
.ds-fw-more { font-size: 14px; }
.ds-anatomy li + li { margin-top: 4px; }
.ds-dodont { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 16px; margin: 12px 0; }
.ds-dodont__col { border-top: 4px solid; padding-top: 8px; min-width: 0; }
.ds-dodont__col--do { border-top-color: var(--vp-c-green-1); }
.ds-dodont__col--dont { border-top-color: var(--vp-c-red-1); }
.ds-dodont__title { font-weight: 600; margin: 0 0 4px; }
.ds-dodont ul { padding-left: 1.2em; margin: 0; }
.ds-dodont li + li { margin-top: 8px; }
.ds-dodont__story { display: block; width: 100%; margin-top: 6px; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.ds-a11y { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 4px 16px; margin: 8px 0 16px; }
.ds-a11y dt { font-weight: 600; }
.ds-a11y dd { margin: 0; }
.ds-a11y ul { margin: 0; padding-left: 1.2em; }
@media (max-width: 480px) {
  .ds-a11y { grid-template-columns: minmax(0, 1fr); }
  .ds-a11y dd { margin-bottom: 8px; }
}
</style>
