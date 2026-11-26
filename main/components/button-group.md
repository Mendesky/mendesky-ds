# Button Group（button-group）

分組：互動元件

2–5 個互斥選項，且視覺需連成一排時用。也用在同一份資料換一種呈現方式（例：表格、看板），這時用 view 型；要換成另一組內容時用 [Tabs](tabs.md)。

## 用法

### Angular（v0.20.2）

`app-button-group`

type: form|round|view · size: S|M|L · color: progress|primary|neutral（form、view）· options: ButtonGroupOption[]（可放 icon；view 的文字選項可帶 menu）· value · [disabled] errorMessage errorPosition: top|bottom · [menuOpen] (menuToggle) · (valueChange)

[在範例網站看全部 11 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.20.2/components/?path=/docs/button-group--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `type` | `ButtonGroupType` | `'form'` | form \| round \| view |
| `size` | `'S' \| 'M' \| 'L'` | `'L'` | form / view 皆生效。form: L≈46 / M≈36 / S≈26px；view: 按鈕 L=32 / M=28 / S=24px，外框（白底槽）再加上下各 2px，L=36 / M=32 / S=28px。只放圖示的按鈕是正方形。round 不吃 size。 |
| `color` | `'progress' \| 'primary' \| 'neutral'` | `不設（form＝progress，view＝neutral）` | 選中的底色，看這組選項拿來做什麼。progress＝綠，跟填寫進度有關的作答；form 不設就是這個。primary＝深藍 #1a6489，選了以後畫面上顯示的東西會變（例：篩掉一部分資料、換一種排法）。neutral＝深灰 #686868，只是偏好的設定（例：單位、字級）。view 不拿來作答：不設或設 progress 都是深灰。round 不吃 color。深藍、深灰選中時鍵盤焦點框是白色；強制色彩下 form、view 的選中都改用系統反白色。 |
| `options` | `ButtonGroupOption[]` | `[]` | { value: string; label: string; disabled?: boolean; icon?: string; menu?: { hint?: string } }[]。有 icon（同 app-icon 的 name）時按鈕只放圖示，label 改當報讀名稱與滑過提示，所以 label 仍然必填。建議只在 view 用 icon。只放圖示的選項不要停用：停用的按鈕滑鼠碰不到、鍵盤停不上去，提示出不來，看畫面的人不知道它叫什麼；要停用的選項改放文字（開發模式下會在主控台提醒）。menu：這個選項帶一個選單（例：「走勢」再選畫金額或件數），只有 view 的文字選項能帶（有 icon 或不是 view 時不畫箭頭，開發模式提醒）；字後面畫 12px 箭頭，選中後再按一次是開關選單（menuToggle），沒選中時按下去照舊是選它；選中、帶選單那顆滑過比選中深一階、按下再深一階（深灰、深藍都是；強制色彩下滑過加底線、按下反白），看得出按得下去；hint 是選單目前的值，報讀念「走勢，目前：金額」、滑過提示「走勢：金額」。 |
| `menuOpen` | `boolean` | `false` | 帶選單的選項（選中那顆）的選單開著沒，由使用端管：選單開著時箭頭轉向、aria-expanded="true"，整組的滑過提示收起（提示和選單都往下出，不收會疊在一起）。 |
| `(menuToggle)` | `EventEmitter<boolean>` |  | 按了選中、帶選單的那顆（滑鼠、Enter 或空白鍵；按住不放的連發不算）：true＝要打開、false＝要關上，依 menuOpen 決定。選單由使用端放：app-action-menu 一定要用 [anchorEl]="group.menuAnchor()" 對齊選中那顆（元件的公開方法；沒有這顆時是 null），按這顆時才不會被當成點選單外面而先關掉、接著又被打開。這一下 click 不往外冒，Enter 也不往外冒（放在 wizard 裡不會同時觸發 onFormEnter）；其他選項照常。選單開著時 value 被改掉（包括改成另一個帶選單的選項），或這顆沒了資格（整組或這一項停用），元件送 false；同一輪把 value 改成另一個帶選單的選項、menuOpen 改成 true 時不送（選單跟著新的值開）。帶選單的選項按下空白鍵或 Enter 後，到放開前的連發不執行預設動作、也不往下傳，放開那一下取消預設動作（不會補一次點擊），焦點移進選單後不會點到第一項；沒帶選單的選項不受影響。 |
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

**view：帶選單的選項（選中後再按開選單）**

```html
<app-button-group #group
  type="view" size="S"
  [options]="[
    { value: 'cards', label: '合計' },
    { value: 'dist', label: '分布', menu: { hint: metric === 'amount' ? '金額' : '件數' } },
    { value: 'trend', label: '走勢', menu: { hint: metric === 'amount' ? '金額' : '件數' } },
  ]"
  [value]="view" (valueChange)="view = $event"
  [menuOpen]="menuOpen" (menuToggle)="menuOpen = $event"
></app-button-group>
@if (menuOpen) {
  <app-action-menu [anchorEl]="group.menuAnchor()" ariaLabel="畫金額或件數" (closeMenu)="menuOpen = false">
    <app-menu-item label="金額" [selected]="metric === 'amount'" (itemClick)="metric = 'amount'"></app-menu-item>
    <app-menu-item label="件數" [selected]="metric === 'count'" (itemClick)="metric = 'count'"></app-menu-item>
  </app-action-menu>
}
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
- view 型的文字選項可以帶一個選單（選項的 menu），用在同一種呈現方式底下還有一個次要的選擇，例如「走勢」再選畫金額或件數。字後面多一個向下的小箭頭；沒選中時按下去照舊是選它，選中之後再按一次才是開關選單，選單開著時箭頭轉向。選單由使用端放，對齊選中的那一顆：按這顆不算點選單外面，選單開著時按它是關。選單開著時選中的值被改掉（包括改成另一個帶選單的選項），或這顆失去資格（停用），元件會要使用端把選單關掉；使用端同一次把值改成另一個帶選單的選項、又打開選單時不算，選單跟著新的值開。選單目前的值寫在 hint：報讀念「走勢，目前：金額」，滑過提示「走勢：金額」；選單開著時整組都不提示，免得跟往下開的選單疊在一起（選單比按鈕寬，旁邊選項的提示也會疊上去）。觸控裝置不顯示提示（見 [Tooltip Directive (Portal)](tooltip-directive.md)），所以目前的值不能只放在 hint，畫面上要另外看得到，例如寫在圖表標題。選中、帶選單的那顆按了會有反應，所以滑過比選中深一階、按下再深一階（深灰 #535353、#333333；深藍 #0f4a67、#073045），白字對比都比選中高；強制色彩下滑過加底線、按下反白。只放圖示的選項、form 型和 round 型都不能帶選單。
- 鍵盤行為（對齊 ds-patterns wizard.keyboard）：方向鍵 ← → ↑ ↓ 在選項間循環移動焦點；Space 只做切換；Enter 兩段式 —— 未選中的選項按 Enter → 切換為該選項；已選中的選項再按一次 Enter → 事件冒泡給外層 wizard 的 onFormEnter（由 wizard 把焦點丟到下一步按鈕）。非 wizard 場景下第二次 Enter 無外層 handler 接收 → 等同無事發生。例外是選中、帶選單的選項（見上一條）：Space 和 Enter 都是開關選單，Enter 不冒泡給外層，不會同時跳下一步（帶選單只限 view 型，view 型通常不放在 wizard 裡）；按住 Space 或 Enter 不放時只算第一下，選單不會一直開開關關。
