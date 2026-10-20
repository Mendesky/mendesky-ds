<script setup lang="ts">
// 圖示總覽：輸入名稱篩選，點一下複製名稱。圖示資料來自本體的 ICON_REGISTRY（建置時讀入）。
import { computed, ref } from 'vue';
import { data } from '../../ds.data.mts';

const query = ref('');
const copied = ref('');
const names = computed(() => {
  const q = query.value.trim().toLowerCase();
  return (data.icons as string[]).filter((n) => !q || n.toLowerCase().includes(q));
});

async function copy(name: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(name);
    copied.value = name;
    setTimeout(() => {
      if (copied.value === name) copied.value = '';
    }, 1500);
  } catch {
    copied.value = '';
  }
}
</script>

<template>
  <div class="ds-icon-gallery" data-testid="icon-gallery">
    <input v-model="query" class="ds-icon-filter" type="search" placeholder="輸入圖示名稱篩選" aria-label="篩選圖示" />
    <p class="ds-icon-count">{{ names.length }} 個圖示</p>
    <ul class="ds-icon-grid">
      <li v-for="name in names" :key="name">
        <button type="button" class="ds-icon-cell" :title="`複製 ${name}`" @click="copy(name)">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" v-html="data.iconSvgs[name]"></svg>
          <span class="ds-icon-name">{{ copied === name ? '已複製' : name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ds-icon-filter { width: 100%; max-width: 320px; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.ds-icon-count { margin: 8px 0; color: var(--vp-c-text-2); font-size: 13px; }
.ds-icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; list-style: none; padding: 0; margin: 0; }
.ds-icon-grid li { margin: 0; }
.ds-icon-cell { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; padding: 12px 4px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: transparent; color: var(--vp-c-text-1); cursor: pointer; }
.ds-icon-cell:hover { border-color: var(--vp-c-brand-1); }
.ds-icon-name { font-size: 12px; word-break: break-all; text-align: center; }
</style>
