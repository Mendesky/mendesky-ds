<script setup lang="ts">
// 顯示一條互動原則（正本：src/docs/patterns.ts）。指南文章只寫情境說明，規則從這裡來。
// 原則本身跟框架無關；各框架的實作做法（框架 repo 的 pattern-notes）接在下方，一個框架一段。
import { computed } from 'vue';
import { data } from '../../ds.data.mts';
import ComponentLink from './ComponentLink.vue';
import RefText from './RefText.vue';

type Note = { type: 'info' | 'warn' | 'warning'; content: string } | string;

const props = defineProps<{ id: string }>();
const p = computed(() => data.patterns[props.id]);
const frameworkNotes = computed(() =>
  Object.entries(data.frameworks as Record<string, { label: string; patternNotes?: Record<string, Note[]> }>)
    .map(([name, fw]) => ({ name, label: fw.label, notes: fw.patternNotes?.[props.id] ?? [] }))
    .filter((fw) => fw.notes.length),
);
const noteText = (n: Note) => (typeof n === 'string' ? n : n.content);
const isWarn = (n: Note) => typeof n !== 'string' && (n.type === 'warn' || n.type === 'warning');
const a11yEntries = computed(() => (p.value && typeof p.value.a11y === 'object' ? Object.entries(p.value.a11y) : []));
const A11Y_LABEL: Record<string, string> = { keyboard: '鍵盤', focus: '焦點', aria: 'ARIA', motion: '動態', touch: '觸控' };
</script>

<template>
  <div v-if="p" class="ds-pattern" data-testid="pattern-block">
    <h3 :id="'pattern-' + id">{{ p.name }} <code>{{ id }}</code></h3>
    <p class="ds-principle"><strong>原則：</strong><RefText :text="p.principle" /></p>
    <p><strong>什麼時候用：</strong><RefText :text="p.when" /></p>
    <table class="ds-table">
      <thead><tr><th>情境</th><th>說明</th><th>規則</th></tr></thead>
      <tbody>
        <tr v-for="s in p.scenarios" :key="s.type">
          <td><code>{{ s.type }}</code></td>
          <td><RefText :text="s.description" /><br /><small>為什麼：<RefText :text="s.rationale" /></small><template v-if="s.example"><br /><small>例：<RefText :text="s.example" /></small></template></td>
          <td><ul><li v-for="(r, i) in s.rule" :key="i"><RefText :text="r" /></li></ul></td>
        </tr>
      </tbody>
    </table>
    <template v-if="p.antiPatterns.length">
      <p><strong>不要這樣做</strong></p>
      <ul class="ds-anti"><li v-for="(a, i) in p.antiPatterns" :key="i"><RefText :text="a" /></li></ul>
    </template>
    <p><strong>無障礙</strong></p>
    <p v-if="typeof p.a11y === 'string'"><RefText :text="p.a11y" /></p>
    <ul v-else>
      <li v-for="[k, items] in a11yEntries" :key="k">{{ A11Y_LABEL[k] ?? k }}：<RefText :text="(items as string[]).join('；')" /></li>
    </ul>
    <p v-if="p.relatedComponents.length">
      <strong>相關元件：</strong>
      <template v-for="c in p.relatedComponents" :key="c"><ComponentLink :id="c.replace(/^#/, '')" />&nbsp;</template>
    </p>
    <div v-for="fw in frameworkNotes" :key="fw.name" class="ds-pattern-fw" data-testid="pattern-framework-notes" :data-framework="fw.name">
      <p><strong>{{ fw.label }} 做法</strong></p>
      <ul>
        <li v-for="(n, i) in fw.notes" :key="i" :class="{ 'ds-pattern-fw__warn': isWarn(n) }"><RefText :text="noteText(n)" :refs="false" /></li>
      </ul>
    </div>
  </div>
  <p v-else class="ds-missing">找不到互動原則 {{ id }}</p>
</template>
