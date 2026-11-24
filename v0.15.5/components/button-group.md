# Button Group（button-group）

分組：互動元件

2–5 個互斥選項，且視覺需連成一排時用。也用在同一份資料換一種呈現方式（例：表格、看板），這時用 view 型；要換成另一組內容時用 [Tabs](tabs.md)。

## 用法

### Angular（v0.20.0）

`app-button-group`

type: form|round|view · size: S|M|L · color: progress|primary|neutral（form、view）· options: ButtonGroupOption[]（可放 icon）· value · [disabled] errorMessage errorPosition: top|bottom · (valueChange)

[在範例網站看全部 10 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.20.0/components/?path=/docs/button-group--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `type` | `ButtonGroupType` | `'form'` | form \| round \| view |
| `size` | `'S' \| 'M' \| 'L'` | `'L'` | form / view 皆生效。form: L≈46 / M≈36 / S≈26px；view: 按鈕 L=32 / M=28 / S=24px，外框（白底槽）再加上下各 2px，L=36 / M=32 / S=28px。只放圖示的按鈕是正方形。round 不吃 size。 |
| `color` | `'progress' \| 'primary' \| 'neutral'` | `不設（form＝progress，view＝neutral）` | 選中的底色，看這組選項拿來做什麼。progress＝綠，跟填寫進度有關的作答；form 不設就是這個。primary＝深藍 #1a6489，選了以後畫面上顯示的東西會變（例：篩掉一部分資料、換一種排法）。neutral＝深灰 #686868，只是偏好的設定（例：單位、字級）。view 不拿來作答：不設或設 progress 都是深灰。round 不吃 color。深藍、深灰選中時鍵盤焦點框是白色；強制色彩下 form、view 的選中都改用系統反白色。 |
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

**form：篩選資料，選中深藍**

```html
<app-button-group
  type="form" size="M" color="primary"
  [options]="[
    { value: '7d', label: '近 7 天' },
    { value: '30d', label: '近 30 天' },
    { value: 'all', label: '全部' },
  ]"
  [value]="range"
  (valueChange)="range = $event"
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
- 選中的顏色看這組選項拿來做什麼，不看喜好。綠色留給跟填寫進度有關的作答，form 型不設 color 就是綠色，想在程式裡寫明也可以設 color="progress"。選了之後畫面上顯示的東西會變（篩掉一部分資料、換一種排法）就用 color="primary" 的深藍 #1a6489，跟主要按鈕按下時同色；單位、字級這類只是偏好的設定用 color="neutral" 的深灰 #686868。form 型與 view 型都照這個分法；view 型不設 color 是深灰，設 progress 也一樣是深灰，因為 view 型不拿來作答。同一個畫面上兩種用途並存時，顏色幫使用者分出哪一組會改變畫面、哪一組只是設定；但顏色只是輔助，選項的名稱還是要講清楚它做什麼。切換呈現方式跟 [Tabs](tabs.md) 的差別：呈現方式是同一份資料換一種排法（表格、看板），內容不變；[Tabs](tabs.md) 是換成另一組內容。
- view 型的選項可以只放圖示（選項的 icon）。這時 label 仍然必填：它是報讀軟體念的名稱，也是滑過時的提示。只放圖示適合大家已經熟悉的圖示（例：表格、看板）；意思不明顯的選項要放文字。只放圖示的選項不要停用（單一選項或整組都算）：停用的按鈕滑鼠碰不到、鍵盤停不上去，提示出不來，看畫面的人就不知道它叫什麼。要停用的選項改放文字。
- 鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 一律只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。
