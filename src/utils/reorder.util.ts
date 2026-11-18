/**
 * 清單排序的共用工具（#reorder-handle、#reorder-status 的使用端用）。
 *
 * - reorderTarget：移動選單的「上移、下移、移到最上、移到最下」換成新位置。
 * - moveInArray：回傳搬好的新陣列，不改原陣列。
 * - reorderMessage：移動後念給報讀軟體聽的句子。
 * - captureReorder：選單移動時讓其他項目滑到新位置、被移動的項目發一次光。
 *
 * 跟框架無關，不碰拖曳本身（拖曳由各框架的拖曳工具負責，Angular 用 CDK）。
 */

/** 移動選單的四個方向 */
export type ReorderDirection = 'up' | 'down' | 'top' | 'bottom';

/** 移動選單四項，依選單上的順序 */
export const REORDER_DIRECTIONS: ReadonlyArray<{ direction: ReorderDirection; label: string }> = [
  { direction: 'up', label: '上移' },
  { direction: 'down', label: '下移' },
  { direction: 'top', label: '移到最上' },
  { direction: 'bottom', label: '移到最下' },
];

/**
 * 第 index 個（從 0 起）往 direction 移之後的新位置；做不到（已經在最上卻要上移、只有一個）回 null。
 */
export function reorderTarget(index: number, count: number, direction: ReorderDirection): number | null {
  if (!Number.isInteger(index) || !Number.isInteger(count) || count < 2 || index < 0 || index >= count) return null;
  const last = count - 1;
  switch (direction) {
    case 'up': return index > 0 ? index - 1 : null;
    case 'top': return index > 0 ? 0 : null;
    case 'down': return index < last ? index + 1 : null;
    case 'bottom': return index < last ? last : null;
  }
}

/** 把 from 的項目搬到 to，回傳新陣列；位置不合法或相同時回傳原陣列的複本 */
export function moveInArray<T>(list: readonly T[], from: number, to: number): T[] {
  const copy = [...list];
  if (from === to || from < 0 || to < 0 || from >= copy.length || to >= copy.length) return copy;
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
}

export interface ReorderMessageInput {
  /** 被移動項目移動前的名稱 */
  name: string;
  /** 移動前的位置（從 0 起） */
  from: number;
  /** 移動後的位置（從 0 起） */
  to: number;
  /** 清單共幾項 */
  count: number;
  /** 名稱跟著位置改變時（例如重新編號），移動後的新名稱 */
  newName?: string;
}

/** 「『名稱』已從第 2 個移到第 1 個，共 4 個」；名稱改變時再加「，現在是『新名稱』」 */
export function reorderMessage({ name, from, to, count, newName }: ReorderMessageInput): string {
  let text = `「${name}」已從第 ${from + 1} 個移到第 ${to + 1} 個，共 ${count} 個`;
  if (newName && newName !== name) text += `，現在是「${newName}」`;
  return text;
}

export interface ReorderSnapshot {
  /**
   * 畫面換成新順序之後呼叫：位置變了的項目從舊位置滑到新位置（300ms），moved 發一次光。
   * 使用者設了「減少動態」時不滑也不發光。
   */
  play(moved?: HTMLElement | null): void;
}

const FLIP_CLASS = 'ds-sortable-flip';
const SETTLED_CLASS = 'ds-sortable-settled';

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 在畫面換成新順序之前，記下 container 裡每個項目的位置。
 * 項目以元素本身對應：框架重排時搬動的是同一個元素（Angular 的 @for 有 track 時就是）。
 *
 * @param itemSelector 項目的選擇器，相對於 container；預設是 container 的直接子元素
 */
export function captureReorder(container: HTMLElement, itemSelector = ':scope > *'): ReorderSnapshot {
  const before = new Map<Element, number>();
  // 量的是畫面上的位置（含拖曳中的位移）：拖曳放下時其他項目已經讓好位，量到的就是新位置，不會再滑一次。
  // 看不見的項目（拖曳中被藏起來的原項目）不記，免得從 0 滑過來。
  container.querySelectorAll(itemSelector).forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.height > 0) before.set(el, rect.top);
  });
  return {
    play(moved?: HTMLElement | null): void {
      if (prefersReducedMotion()) return;
      container.querySelectorAll<HTMLElement>(itemSelector).forEach(el => {
        const top = before.get(el);
        if (top === undefined) return;
        const delta = top - el.getBoundingClientRect().top;
        if (Math.abs(delta) < 1) return;
        el.classList.remove(FLIP_CLASS);
        el.style.transform = `translateY(${delta}px)`;
        void el.offsetHeight;
        el.classList.add(FLIP_CLASS);
        el.style.transform = '';
        el.addEventListener('transitionend', () => el.classList.remove(FLIP_CLASS), { once: true });
      });
      if (moved) {
        moved.classList.remove(SETTLED_CLASS);
        void moved.offsetWidth;
        moved.classList.add(SETTLED_CLASS);
        moved.addEventListener('animationend', () => moved.classList.remove(SETTLED_CLASS), { once: true });
      }
    },
  };
}
