<script setup lang="ts">
// 元件頁：上半是跟框架無關的規格（何時用、說明、注意事項、對照表），
// 下半用分頁切換各框架的用法（元件標籤、屬性、事件、範例程式碼、這個框架專屬的注意事項）與可操作範例。
// 規格文字裡的 `#元件id` 由 RefText 換成元件名稱與連結。
import { computed, ref } from 'vue';
import { data } from '../../ds.data.mts';
import { storyUrl, storybookDocsUrl } from '../links';
import RefText from './RefText.vue';

type Note = { type: 'info' | 'warn' | 'warning'; content: string } | string;
type Table = { title: string; columns: string[]; rows: string[][] };
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
</script>

<template>
  <div v-if="spec" class="ds-component-page" data-testid="component-page">
    <p v-if="spec.when" class="ds-when"><RefText :text="spec.when" /></p>
    <p v-if="spec.description"><RefText :text="spec.description" /></p>

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
</style>
