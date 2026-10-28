# Button Group（button-group）

分組：互動元件

2–5 個互斥選項，且視覺需連成一排時用。

## 用法

### Angular（v0.5.0）

`app-button-group`

type: form|round|view · size: S|M|L · options: ButtonGroupOption[] · value · [disabled] errorMessage errorPosition: top|bottom · (valueChange)

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/button-group--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `type` | `ButtonGroupType` | `'form'` | form \| round \| view |
| `size` | `'S' \| 'M' \| 'L'` | `'L'` | form / view 皆生效。form: L≈46 / M≈36 / S≈26px；view: L=32 / M=28 / S=24px（外框高度）。round 不吃 size。 |
| `options` | `ButtonGroupOption[]` | `[]` | { value: string; label: string }[] |
| `value` | `string \| null` | `null` | 目前選中的值，搭配 [(value)] 雙向綁定 |
| `disabled` | `boolean` | `false` | 整組禁用 |
| `errorMessage` | `string` | `''` | 非空時顯示 error 狀態（僅 form 有效） |
| `errorPosition` | `'top' \| 'bottom'` | `'bottom'` | 錯誤 tooltip 顯示方向（浮動，不佔版面） |
| `(valueChange)` | `EventEmitter<string>` |  | 選項改變時輸出新值 |

#### 程式碼範例

**基本用法**

```html
<app-button-group
  type="form"
  [options]="[{value:'a', label:'選項A'}, {value:'b', label:'選項B'}]"
  [(value)]="selectedValue"
  errorMessage="請至少選擇一項"
></app-button-group>
```

## 注意事項

- RWD 指引：手機版（< 768px）若選項文字過長（單一選項 > 4 個中文字，或 ≥ 3 選項且平均字數 > 3），應改用 [Select](select.md) 替代 button-group。做法：桌面版保留 button-group，手機版加平行的 [Select](select.md)，用 CSS class 切換顯示（.xxx-desktop-only / .xxx-mobile-only），共用同一組 options 和 change handler。短文字選項（如「月/年/次」「小/中/大」）維持 button-group 不變。
- 鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 一律只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。
