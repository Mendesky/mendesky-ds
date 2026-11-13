/// <reference types="vite/client" />
// 按鈕共用樣式 styles/components/button.scss 的載入轉圈（給 Vue 等框架用；Angular 用 app-spinner）。
// 規格（src/docs/components/spinner.ts、button.ts）寫的外觀與動態，在這裡鎖住：
// 淡軌道＋弧、XXS 到 S 12px／M 16px／L 24px、0.8 秒一圈、「減少動態」時 2.4 秒一圈。
// 用 Vite 實際編譯，再交給瀏覽器解析，斷言的是瀏覽器讀到的規則。
import buttonCss from '../styles/components/button.scss?inline';

function parse(): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(buttonCss);
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

describe('button.scss：載入轉圈 .btn__spinner', () => {
  it('淡軌道＋弧：弧是文字色，軌道是文字色的 20%', () => {
    const rule = topLevelRule(parse(), '.ds-button .btn__spinner');
    expect(rule, '沒有 .ds-button .btn__spinner 的規則').toBeDefined();
    expect(rule!.style.borderTopColor).toBe('currentcolor');
    expect(rule!.style.borderRightColor).toContain('color-mix');
    expect(rule!.style.borderRightColor).toContain('20%');
  });

  it('預設（XXS、XS、S）12px，線寬 1.5px', () => {
    const rule = topLevelRule(parse(), '.ds-button .btn__spinner')!;
    expect(rule.style.width).toBe('12px');
    expect(rule.style.height).toBe('12px');
    expect(rule.style.borderTopWidth).toBe('1.5px');
  });

  it('M 16px，線寬 2px；L 24px，線寬 2.5px', () => {
    const sheet = parse();
    const m = topLevelRule(sheet, '.ds-button .btn--m .btn__spinner');
    const l = topLevelRule(sheet, '.ds-button .btn--l .btn__spinner');
    expect(m?.style.width).toBe('16px');
    expect(m?.style.borderTopWidth).toBe('2px');
    expect(l?.style.width).toBe('24px');
    expect(l?.style.borderTopWidth).toBe('2.5px');
  });

  it('平常 0.8 秒轉一圈', () => {
    const rule = topLevelRule(parse(), '.ds-button .btn__spinner')!;
    expect(rule.style.animationName).toBe('btn-spin');
    expect(rule.style.animationDuration).toBe('0.8s');
  });

  it('使用者設定「減少動態」時轉慢成 2.4 秒一圈，不停下來', () => {
    const rule = reducedMotionRule(parse(), '.ds-button .btn__spinner');
    expect(rule, '「減少動態」區塊裡沒有 .ds-button .btn__spinner 的規則').toBeDefined();
    expect(rule!.style.animationDuration).toBe('2.4s');
    expect(rule!.style.animationName).toBe('');
  });
});
