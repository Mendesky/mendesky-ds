<script setup lang="ts">
// 顯示說明文字：粗體、行內程式碼照格式顯示，`#元件id` 換成元件名稱與連結（格式見 scripts/text-format.mjs，
// #元件id 的寫法見 scripts/component-refs.mjs）。文字一律當純文字放進頁面，不當 HTML 解讀。
// 找不到的 id 顯示成「找不到元件說明」，冒煙測試會抓。
// 框架提供的文字（屬性說明、框架注意事項）傳 :refs="false"：照樣顯示粗體與行內程式碼，但裡面的 # 是框架自己的寫法，不換成元件。
// 表格標題與欄名傳 plain：各框架網站都印純文字，這裡也只換 #元件id，不套粗體與行內程式碼。
import { computed } from 'vue';
import { data } from '../../ds.data.mts';
import { componentDocsUrl } from '../links';
import { parseInline } from '../../../../scripts/text-format.mjs';
import { splitRefs } from '../../../../scripts/component-refs.mjs';

type Part = ({ text: string } | { ref: string } | { code: string }) & { bold: boolean };

// Vue 的布林 prop 沒傳時是 false，所以要明寫預設值
const props = withDefaults(defineProps<{ text?: string; refs?: boolean; plain?: boolean }>(), { refs: true, plain: false });
const names = new Map<string, string>(data.components.map((c: { id: string; name: string }) => [c.id, c.name]));
const parts = computed(() =>
  props.plain
    ? splitRefs(props.text ?? '').map((p) => ({ ...p, bold: false }))
    : (parseInline(props.text ?? '', { refs: props.refs }) as Part[]),
);
</script>

<template>
  <template v-for="(p, i) in parts" :key="i">
    <strong v-if="p.bold">
      <template v-if="'text' in p">{{ p.text }}</template>
      <code v-else-if="'code' in p">{{ p.code }}</code>
      <a v-else-if="names.has(p.ref)" class="ds-ref" :href="componentDocsUrl(p.ref)">{{ names.get(p.ref) }}</a>
      <code v-else class="ds-missing">#{{ p.ref }}（找不到元件說明）</code>
    </strong>
    <template v-else>
      <template v-if="'text' in p">{{ p.text }}</template>
      <code v-else-if="'code' in p">{{ p.code }}</code>
      <a v-else-if="names.has(p.ref)" class="ds-ref" :href="componentDocsUrl(p.ref)">{{ names.get(p.ref) }}</a>
      <code v-else class="ds-missing">#{{ p.ref }}（找不到元件說明）</code>
    </template>
  </template>
</template>
