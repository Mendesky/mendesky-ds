# DS Collapse 收合動畫（ds-collapse）

分組：工具

內容區塊需要收合／展開動畫時用（例如可展開的卡片段落）。統一用這組 class，不要自己寫 height 動畫。整個區塊連同可以點的標頭一起做的話，直接用 [Collapsible](collapsible.md)，它已經用了這組 class，鍵盤和報讀軟體也處理好了。

CSS Grid `0fr → 1fr` 收合/展開工具 class。Component tier 300ms，進出場共用 ease-out curve。
所有需要「內容區塊收合/展開」動畫的元件，統一用這組做法。

## 用法

### Angular（v0.12.1）

`.ds-collapse`

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.12.1/components/?path=/docs/ds-collapse--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `container` | `class` | `.ds-collapse` | 動畫外殼，負責 grid-template-rows transition |
| `inner` | `class` | `.ds-collapse__inner` | 內層，設置 overflow: hidden 讓 grid 收合時確實裁切內容 |
| `expanded` | `modifier` | `.ds-collapse--expanded` | 套用此 class 展開；移除則收合 |

#### 程式碼範例

**基本用法**

```html
<div class="ds-collapse" [class.ds-collapse--expanded]="isExpanded">
  <div class="ds-collapse__inner">
    <!-- 可收合的內容 -->
  </div>
</div>
```

## 注意事項

- 元件也可用自己的 class 名稱（如 .contact-content），只需沿用相同 CSS Grid 動畫方式
- Component tier: 300ms var(--ease-enter)（cubic-bezier(0.215, 0.61, 0.355, 1)）
- DS 內目前套用：[Collapsible](collapsible.md) 的內容區。stepper 導覽的子項收合用自己的 class（.sn-sub-collapse），只借了 .ds-collapse--expanded，減少動態寫在 stepper 自己的樣式裡。使用端的可收合卡片也用同一組 class。
- 使用者設了「減少動態」時，這組 class 不轉場，直接開合。用自己的 class 名稱時不會套到，要自己處理。
