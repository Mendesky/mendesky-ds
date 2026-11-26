import { ICON_REGISTRY } from './icons.js';

/**
 * Icon 垂直置中回歸測試
 *
 * 背景：`eye`（檢視 / view）icon 的 SVG path 原本畫在 24×24 viewBox 內偏上 3px
 * （y 範圍 0~18，中心 9），導致所有使用 view icon 的 button 內 icon 看起來偏上。
 * 修法是讓 path 整體下移 3px，使垂直中心對齊 viewBox 中心（12）。
 *
 * 此測試用真實瀏覽器 getBBox() 量測 icon 在 24×24 viewBox 內的實際垂直中心，
 * 鎖定「view 類 icon 必須垂直置中」這個視覺契約。
 */
describe('ICON_REGISTRY — 垂直置中', () => {
  const VIEWBOX = 24;
  const CENTER = VIEWBOX / 2; // 12
  // path 端點落在像素邊界、加上曲線控制點影響，給 ±1px 容忍
  const TOLERANCE = 1;

  let host: HTMLDivElement;

  beforeEach(() => {
    host = document.createElement('div');
    document.body.appendChild(host);
  });

  afterEach(() => {
    document.body.removeChild(host);
  });

  /** 把 registry 字串渲染進 24×24 SVG，回傳所有圖形子元素合併後的垂直中心 */
  function measureVerticalCenter(name: string): number {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${VIEWBOX} ${VIEWBOX}`);
    svg.setAttribute('width', `${VIEWBOX}`);
    svg.setAttribute('height', `${VIEWBOX}`);
    svg.innerHTML = ICON_REGISTRY[name];
    host.appendChild(svg);

    const shapes = Array.from(svg.querySelectorAll('path, g, rect, circle'))
      .filter((el): el is SVGGraphicsElement => typeof (el as SVGGraphicsElement).getBBox === 'function');

    let top = Infinity;
    let bottom = -Infinity;
    for (const shape of shapes) {
      const box = shape.getBBox();
      if (box.height === 0 && box.width === 0) continue;
      top = Math.min(top, box.y);
      bottom = Math.max(bottom, box.y + box.height);
    }
    return (top + bottom) / 2;
  }

  it('eye（view / 檢視）icon 垂直置中於 viewBox', () => {
    const center = measureVerticalCenter('eye');
    expect(center).toBeCloseTo(CENTER, 0);
    expect(Math.abs(center - CENTER)).toBeLessThanOrEqual(TOLERANCE);
  });

  it('eye-off icon 維持垂直置中（對照組，不得被破壞）', () => {
    const center = measureVerticalCenter('eye-off');
    expect(Math.abs(center - CENTER)).toBeLessThanOrEqual(TOLERANCE);
  });
});

/**
 * 線條粗細回歸測試
 *
 * 背景：平台主控台側欄的 Megaphone、Shield 原本是 Heroicons 1.5px 線條，Account、Role
 * 帶實心色塊，Key 畫滿整個 24×24，跟其他 2px 線條圖示並排時粗細、大小都不一。
 * 這幾個（加上側欄新用到的 BellRing）改成 Lucide 2px 線條。側欄子選單與麵包屑新增的子頁面圖示
 * （Person … VersionTag）一開始就用 Lucide 2px 線條。這裡鎖住：
 * 每個圖形元素都是 2px 圓端點描邊、不塗實心（小圓點除外），線條中心線留在中間 20×20（四邊各空 2px）。
 */
describe('ICON_REGISTRY — 2px 線條', () => {
  const LINE_ICONS = [
    'Account', 'Role', 'Megaphone', 'Shield', 'Key', 'BellRing',
    'Person', 'IdCard', 'SignIn', 'FileKey', 'Pulse', 'Mails', 'MessageText', 'AppWindow', 'VersionTag',
  ];

  function shapesOf(name: string): Element[] {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = ICON_REGISTRY[name] ?? '';
    return Array.from(svg.querySelectorAll('path, circle, rect, line, polyline, ellipse'));
  }

  for (const name of LINE_ICONS) {
    it(`${name} 每個圖形都是 2px 圓端點線條、不塗實心`, () => {
      const shapes = shapesOf(name);
      expect(shapes.length).toBeGreaterThan(0);
      for (const el of shapes) {
        expect(el.getAttribute('stroke')).toBe('currentColor');
        expect(el.getAttribute('stroke-width')).toBe('2');
        expect(el.getAttribute('stroke-linecap')).toBe('round');
        expect(el.getAttribute('stroke-linejoin')).toBe('round');
        // 唯一允許塗滿的是半徑 1 以下的小圓點（例如 Key 的鑰匙孔），它畫出來只是一個點，不是色塊
        const isDot = el.tagName === 'circle' && Number(el.getAttribute('r')) <= 1;
        expect(el.getAttribute('fill')).toBe(isDot ? 'currentColor' : 'none');
      }
    });

    it(`${name} 線條留在中間 20×20，四邊各空 2px`, () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.innerHTML = ICON_REGISTRY[name] ?? '';
      document.body.appendChild(svg);
      try {
        const box = (svg as SVGSVGElement).getBBox();
        // 曲線端點落在小數座標，給 0.5px 容忍
        expect(box.x).toBeGreaterThanOrEqual(1.5);
        expect(box.y).toBeGreaterThanOrEqual(1.5);
        expect(box.x + box.width).toBeLessThanOrEqual(22.5);
        expect(box.y + box.height).toBeLessThanOrEqual(22.5);
      } finally {
        document.body.removeChild(svg);
      }
    });
  }
});
