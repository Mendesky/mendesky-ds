<script setup lang="ts">
// 連到站內的元件頁，顯示元件名稱（跟框架無關；各框架的元件標籤在元件頁的分頁裡）。
import { computed } from 'vue';
import { data } from '../../ds.data.mts';
import { componentDocsUrl } from '../links';

const props = defineProps<{ id: string }>();
const doc = computed(() => data.components.find((c: { id: string }) => c.id === props.id));
</script>

<template>
  <a v-if="doc" class="ds-ref" :href="componentDocsUrl(id)">{{ doc.name }}</a>
  <code v-else class="ds-missing">#{{ id }}（找不到元件說明）</code>
</template>
