# Button Group（button-group）

分組：互動元件

2–5 個互斥選項，且視覺需連成一排時用。也用在同一份資料換一種呈現方式（例：表格、看板），這時用 view 型；要換成另一組內容時用 [Tabs](tabs.md)。

## 用法

### Angular（v0.19.1）

`app-button-group`

type: form|round|view · size: S|M|L · color: neutral|primary（view）· options: ButtonGroupOption[]（可放 icon）· value · [disabled] errorMessage errorPosition: top|bottom · (valueChange)

[在範例網站看全部 8 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.19.1/components/?path=/docs/button-group--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `type` | `ButtonGroupType` | `'form'` | form \| round \| view |
| `size` | `'S' \| 'M' \| 'L'` | `'L'` | form / view 皆生效。form: L≈46 / M≈36 / S≈26px；view: 按鈕 L=32 / M=28 / S=24px，外框（白底槽）再加上下各 2px，L=36 / M=32 / S=28px。只放圖示的按鈕是正方形。round 不吃 size。 |
| `color` | `'neutral' \| 'primary'` | `'neutral'` | 只對 view 生效：選中的底色。neutral＝深灰，用在中性的設定（例：字級、排版方式）；primary＝深藍，用在功能操作（例：切換畫面的呈現方式）。 |
| `options` | `ButtonGroupOption[]` | `[]` | { value: string; label: string; disabled?: boolean; icon?: string }[]。有 icon（同 app-icon 的 name）時按鈕只放圖示，label 改當報讀名稱與滑過提示，所以 label 仍然必填。建議只在 view 用 icon。只放圖示的選項不要停用：停用的按鈕滑鼠碰不到、鍵盤停不上去，提示出不來，看畫面的人不知道它叫什麼；要停用的選項改放文字（開發模式下會在主控台提醒）。 |
| `value` | `string \| null` | `null` | 目前選中的值，搭配 [(value)] 雙向綁定 |
| `disabled` | `boolean` | `false` | 整組禁用。選項只放圖示時不要整組停用，理由同 options。 |
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

**view：只放圖示、選中深藍**

```html
<app-button-group
  type="view" size="M" color="primary"
  [options]="[
    { value: 'list', label: '清單', icon: 'Table' },
    { value: 'kanban', label: '看板', icon: 'Kanban' },
  ]"
  [value]="mode"
  (valueChange)="mode = $event"
></app-button-group>
```

## 注意事項

- RWD 指引：手機版（< 768px）若選項文字過長（單一選項 > 4 個中文字，或 ≥ 3 選項且平均字數 > 3），應改用 [Select](select.md) 替代 button-group。做法：桌面版保留 button-group，手機版加平行的 [Select](select.md)，用 CSS class 切換顯示（.xxx-desktop-only / .xxx-mobile-only），共用同一組 options 和 change handler。短文字選項（如「月/年/次」「小/中/大」）維持 button-group 不變。
- 選中的顏色依用途選，不依喜好：表單裡的作答用 form 型（綠色）；切換畫面的呈現方式這類功能操作，用 view 型加 color="primary"（深藍 #1a6489，同主要按鈕按下時的顏色）；字級、排版方式這類中性的設定，用 view 型的預設深灰。同一個畫面上兩種用途並存時，顏色幫使用者分出哪一組會改變畫面、哪一組只是設定；顏色只是輔助，每個選項的名稱仍要講清楚它做什麼。切換呈現方式跟 [Tabs](tabs.md) 的差別：呈現方式是同一份資料換一種排法（表格、看板），內容不變；[Tabs](tabs.md) 是換成另一組內容。
- view 型的選項可以只放圖示（選項的 icon）。這時 label 仍然必填：它是報讀軟體念的名稱，也是滑過時的提示。只放圖示適合大家已經熟悉的圖示（例：表格、看板）；意思不明顯的選項要放文字。只放圖示的選項不要停用（單一選項或整組都算）：停用的按鈕滑鼠碰不到、鍵盤停不上去，提示出不來，看畫面的人就不知道它叫什麼。要停用的選項改放文字。
- 鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 一律只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。
