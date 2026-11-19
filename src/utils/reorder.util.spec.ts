import { captureReorder, moveInArray, reorderMessage, reorderTarget, settleReorder, REORDER_DIRECTIONS } from './reorder.util.js';

describe('reorderTarget', () => {
  it('第一個：上移、移到最上做不到；下移、移到最下可以', () => {
    expect(reorderTarget(0, 3, 'up')).toBeNull();
    expect(reorderTarget(0, 3, 'top')).toBeNull();
    expect(reorderTarget(0, 3, 'down')).toBe(1);
    expect(reorderTarget(0, 3, 'bottom')).toBe(2);
  });

  it('最後一個：下移、移到最下做不到；上移、移到最上可以', () => {
    expect(reorderTarget(2, 3, 'down')).toBeNull();
    expect(reorderTarget(2, 3, 'bottom')).toBeNull();
    expect(reorderTarget(2, 3, 'up')).toBe(1);
    expect(reorderTarget(2, 3, 'top')).toBe(0);
  });

  it('只有一個、或位置不合法：四項都做不到', () => {
    for (const { direction } of REORDER_DIRECTIONS) {
      expect(reorderTarget(0, 1, direction)).toBeNull();
      expect(reorderTarget(-1, 3, direction)).toBeNull();
      expect(reorderTarget(3, 3, direction)).toBeNull();
      expect(reorderTarget(Number.NaN, 3, direction)).toBeNull();
    }
  });
});

describe('moveInArray', () => {
  it('搬到後面、搬到前面，原陣列不變', () => {
    const list = ['a', 'b', 'c', 'd'];
    expect(moveInArray(list, 0, 2)).toEqual(['b', 'c', 'a', 'd']);
    expect(moveInArray(list, 3, 0)).toEqual(['d', 'a', 'b', 'c']);
    expect(list).toEqual(['a', 'b', 'c', 'd']);
  });

  it('位置相同或超出範圍：回傳複本，順序不變', () => {
    const list = ['a', 'b'];
    const same = moveInArray(list, 1, 1);
    expect(same).toEqual(['a', 'b']);
    expect(same).not.toBe(list);
    expect(moveInArray(list, 0, 5)).toEqual(['a', 'b']);
  });
});

describe('reorderMessage', () => {
  it('念出名稱、舊位置、新位置、總數', () => {
    expect(reorderMessage({ name: '項目一', from: 0, to: 2, count: 4 }))
      .toBe('「項目一」已從第 1 個移到第 3 個，共 4 個');
  });

  it('名稱跟著位置改變時，加念新名稱；沒變就不加', () => {
    expect(reorderMessage({ name: '第一段', from: 0, to: 1, count: 3, newName: '第二段' }))
      .toBe('「第一段」已從第 1 個移到第 2 個，共 3 個，現在是「第二段」');
    expect(reorderMessage({ name: '甲', from: 0, to: 1, count: 3, newName: '甲' }))
      .toBe('「甲」已從第 1 個移到第 2 個，共 3 個');
  });
});

describe('captureReorder', () => {
  let host: HTMLElement;
  beforeEach(() => {
    host = document.createElement('div');
    host.innerHTML = '<div style="height:40px">a</div><div style="height:40px">b</div><div style="height:40px">c</div>';
    document.body.appendChild(host);
  });
  afterEach(() => host.remove());

  it('換順序後，位置變了的項目先回到舊位置再滑過去，被移動的發光', () => {
    const [a, b, c] = Array.from(host.children) as HTMLElement[];
    const snap = captureReorder(host);
    host.insertBefore(c, a); // c, a, b
    const seen: Record<string, string> = {};
    // 記錄每個項目被設的 transform（play 會先設舊位置的位移，再清掉）
    for (const el of [a, b, c]) {
      let last = '';
      Object.defineProperty(el.style, 'transform', {
        configurable: true,
        get: () => last,
        set: (v: string) => { if (v) seen[el.textContent!] = v; last = v; },
      });
    }
    snap.play(c);
    expect(seen['c']).toBe('translateY(80px)');
    expect(seen['a']).toBe('translateY(-40px)');
    expect(seen['b']).toBe('translateY(-40px)');
    expect(a.classList.contains('ds-sortable-flip')).toBe(true);
    expect(c.classList.contains('ds-sortable-settled')).toBe(true);
  });

  it('記位置時看不見的項目（高度 0）不滑，但仍會發光', () => {
    const [a, b, c] = Array.from(host.children) as HTMLElement[];
    c.style.display = 'none';
    const snap = captureReorder(host);
    c.style.display = '';
    host.insertBefore(c, a);
    snap.play(c);
    expect(c.classList.contains('ds-sortable-flip')).toBe(false);
    expect(c.style.transform).toBe('');
    expect(c.classList.contains('ds-sortable-settled')).toBe(true);
    expect(b.classList.contains('ds-sortable-flip')).toBe(true);
  });

  it('沒有移動的項目不加位移', () => {
    const [a] = Array.from(host.children) as HTMLElement[];
    const snap = captureReorder(host);
    snap.play();
    expect(a.classList.contains('ds-sortable-flip')).toBe(false);
  });

  it('記位置之後整份清單被捲動或推移（順序沒變）：不滑', () => {
    const [a, b, c] = Array.from(host.children) as HTMLElement[];
    const snap = captureReorder(host);
    host.style.marginTop = '120px'; // 等同外層捲動區捲了 120px
    snap.play();
    for (const el of [a, b, c]) {
      expect(el.classList.contains('ds-sortable-flip')).toBe(false);
      expect(el.style.transform).toBe('');
    }
  });

  it('清單被推移、同時換了順序：只滑順序造成的距離', () => {
    const [a, , c] = Array.from(host.children) as HTMLElement[];
    const snap = captureReorder(host);
    host.style.marginTop = '120px';
    host.insertBefore(c, a); // c, a, b
    let seen = '';
    Object.defineProperty(c.style, 'transform', {
      configurable: true, get: () => '', set: (v: string) => { if (v) seen = v; },
    });
    snap.play(c);
    expect(seen).toBe('translateY(80px)');
  });

  describe('使用者設了「減少動態」', () => {
    let restore: () => void;
    beforeEach(() => {
      const original = window.matchMedia;
      window.matchMedia = ((q: string) => ({ ...original.call(window, q), matches: q.includes('reduce') })) as typeof window.matchMedia;
      restore = () => { window.matchMedia = original; };
    });
    afterEach(() => restore());

    it('不滑、也不發光', () => {
      const [a, b, c] = Array.from(host.children) as HTMLElement[];
      const snap = captureReorder(host);
      host.insertBefore(c, a);
      snap.play(c);
      for (const el of [a, b, c]) {
        expect(el.classList.contains('ds-sortable-flip')).toBe(false);
        expect(el.style.transform).toBe('');
      }
      expect(c.classList.contains('ds-sortable-settled')).toBe(false);
    });

    it('settleReorder 也不發光', () => {
      const [a] = Array.from(host.children) as HTMLElement[];
      settleReorder(a);
      expect(a.classList.contains('ds-sortable-settled')).toBe(false);
    });
  });
});

describe('settleReorder', () => {
  it('拖曳放下後只讓被移動的項目發一次光，不加任何位移', () => {
    const host = document.createElement('div');
    host.innerHTML = '<div style="height:40px">a</div><div style="height:40px">b</div>';
    document.body.appendChild(host);
    const [a, b] = Array.from(host.children) as HTMLElement[];
    settleReorder(b);
    expect(b.classList.contains('ds-sortable-settled')).toBe(true);
    expect(b.style.transform).toBe('');
    expect(a.classList.contains('ds-sortable-settled')).toBe(false);
    expect(a.classList.contains('ds-sortable-flip')).toBe(false);
    host.remove();
  });

  it('沒有項目時不出錯', () => {
    expect(() => settleReorder(null)).not.toThrow();
  });
});
