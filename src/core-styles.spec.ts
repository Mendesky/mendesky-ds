/// <reference types="vite/client" />
// 全域樣式 styles/core.scss 的「減少動態」規則。
// 用 Vite 實際編譯 core.scss，再交給瀏覽器解析，斷言的是瀏覽器讀到的規則，不是原始碼字串。
import coreCss from '../styles/core.scss?inline';

function parseCore(): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(coreCss);
  return sheet;
}

/** 頂層（不在任何 @media 裡）選擇器完全相同的規則 */
function topLevelRule(sheet: CSSStyleSheet, selector: string): CSSStyleRule | undefined {
  return Array.from(sheet.cssRules).find(
    (r): r is CSSStyleRule => r instanceof CSSStyleRule && r.selectorText === selector,
  );
}

/** 「減少動態」區塊裡選擇器完全相同的規則 */
function reducedMotionRule(sheet: CSSStyleSheet, selector: string): CSSStyleRule | undefined {
  const blocks = Array.from(sheet.cssRules).filter(
    (r): r is CSSMediaRule => r instanceof CSSMediaRule && r.conditionText.includes('prefers-reduced-motion: reduce'),
  );
  for (const block of blocks) {
    const hit = Array.from(block.cssRules).find(
      (r): r is CSSStyleRule => r instanceof CSSStyleRule && r.selectorText === selector,
    );
    if (hit) return hit;
  }
  return undefined;
}

describe('core.scss：骨架屏閃光', () => {
  it('平常會跑閃光動畫', () => {
    const rule = topLevelRule(parseCore(), '.sk-shimmer');
    expect(rule?.style.animationName).toBe('shimmer');
  });

  it('使用者設定「減少動態」時停止動畫，灰底佔位保留', () => {
    const sheet = parseCore();
    const rule = reducedMotionRule(sheet, '.sk-shimmer');
    expect(rule, '「減少動態」區塊裡沒有 .sk-shimmer 的規則').toBeDefined();
    expect(rule!.style.animationName).toBe('none');
    expect(rule!.style.getPropertyPriority('animation-name')).toBe('important');
    expect(rule!.style.background).toBe('');
    expect(topLevelRule(sheet, '.sk-shimmer')?.style.backgroundImage).toContain('linear-gradient');
  });
});
