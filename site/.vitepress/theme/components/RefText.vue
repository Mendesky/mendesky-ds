<script setup lang="ts">
// 顯示說明文字，並把裡面的 `#元件id` 換成元件名稱與連結（寫法見 scripts/component-refs.mjs）。
// 找不到的 id 顯示成「找不到元件說明」，冒煙測試會抓。
import { computed } from 'vue';
import { data } from '../../ds.data.mts';
import { componentDocsUrl } from '../links';
import { splitRefs } from '../../../../scripts/component-refs.mjs';

const props = defineProps<{ text?: string }>();
const names = new Map<string, string>(data.components.map((c: { id: string; name: string }) => [c.id, c.name]));
const parts = computed(() => splitRefs(props.text ?? '') as Array<{ text: string } | { ref: string }>);
</script>

<template>
  <template v-for="(p, i) in parts" :key="i">
    <template v-if="'text' in p">{{ p.text }}</template>
    <a v-else-if="names.has(p.ref)" class="ds-ref" :href="componentDocsUrl(p.ref)">{{ names.get(p.ref) }}</a>
    <code v-else class="ds-missing">#{{ p.ref }}（找不到元件說明）</code>
  </template>
</template>
