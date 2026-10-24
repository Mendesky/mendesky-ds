// component-refs.mjs 的型別：讓框架 repo 的 TypeScript（例如 Angular 的範例網站）可以直接 import。
export type RefPart = { text: string } | { ref: string };

/** 把文字拆成 [{ text }] 與 [{ ref: 元件id }]，順序不變。 */
export function splitRefs(text: string): RefPart[];

/** 文字裡所有的元件 id（依出現順序，可能重複）。 */
export function findRefs(text: string): string[];

/** 把 #元件id 換成 nameOf(id) 的結果；nameOf 回傳 undefined 時保留原樣。 */
export function renderRefs(text: string, nameOf: (id: string) => string | undefined): string;
