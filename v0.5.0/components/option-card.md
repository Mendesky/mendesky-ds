# Option Card（option-card）

分組：表單元件

單張可選插圖卡。一般不單獨使用，由 [Option Card Group](option-card-group.md) 組成互斥群組（radiogroup）。hover 揭露純 CSS、無 JS；prefers-reduced-motion 下停用動效。

## 用法

### Angular（v0.6.0）

`app-option-card`

[value] [label] [description] [illustration]: SVG string · [selected] [disabled] — 四態（rest 全彩插圖 / hover 浮起+插圖↔說明 crossfade 150ms / selected 填色+check / disabled 灰階）

[在範例網站看全部 3 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.6.0/components/?path=/docs/option-card--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `value` | `string` | `required` | 此卡代表的值（選取時由 group emit） |
| `label` | `string` | `required` | 卡片主標題 |
| `description` | `string` | `''` | hover 時淡入取代插圖的說明文字；空字串則不渲染說明區、hover 不做 crossfade |
| `illustration` | `string (SVG)` | `''` | 120×120 inline SVG 字串，元件內 sanitize 後以 innerHTML 注入 |
| `selected` | `boolean` | `false` | 選中態（填色 + check 角標） |
| `disabled` | `boolean` | `false` | 停用態（灰階 + not-allowed，不可選取） |
| `(cardSelect)` | `EventEmitter<void>` |  | 點選（滑鼠點擊、Enter、Space）且非 disabled 時觸發 |

#### 程式碼範例

**由 group 組成（不單獨使用）**

```html
<app-option-card-group
  [options]="cards"
  [value]="selected"
  (valueChange)="onSelect($event)">
</app-option-card-group>
```

## 注意事項

- hover 揭露為純 CSS（插圖 opacity→0、說明 opacity→1，150ms crossfade）；無 JS、無 description 時不切換。
- rest 態插圖目前為全彩；selected 填色採 --button/action-lighter（淡藍）。
