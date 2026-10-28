# Keyboard Help 快速鍵說明（keyboard-help）

分組：浮層元件

集中展示目前畫面可用的鍵盤快速鍵。慣例以 ? 開啟。快速鍵資料由父層傳入，元件不自己蒐集——因為哪些快速鍵有效取決於當前路由與權限。

## 用法

### Angular（v0.5.0）

`app-keyboard-help`

isOpen · shortcuts: ShortcutGroup[] · (close) · 內建搜尋篩選 · 基於 modal-shell 建構

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/keyboard-help--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | 開關狀態。父層自行綁定 ? 鍵的監聽 |
| `shortcuts` | `ShortcutGroup[]` | `[]` | ShortcutGroup = { label: string; items: ShortcutItem[] }；ShortcutItem = { description: string; keys: string[] }。keys 的每個元素獨立渲染成一個 <kbd>，例如 ['Shift', '?'] 會畫成兩個鍵帽 |
| `(close)` | `EventEmitter<void>` |  | ESC 或點 backdrop 時 emit。父層負責把 isOpen 設回 false |

#### 程式碼範例

**基本用法**

```html
<app-keyboard-help
  [isOpen]="helpOpen()"
  [shortcuts]="SHORTCUT_GROUPS"
  (close)="helpOpen.set(false)"
/>
```

**shortcuts 資料形狀**

```html
const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    label: '全域',
    items: [
      { description: '開啟快速鍵說明', keys: ['Shift', '?'] },
      { description: '關閉目前 modal', keys: ['Esc'] },
    ],
  },
];
```

## 注意事項

- 內建搜尋框，輸入關鍵字即時篩選 items（比對 description）。搜尋無結果時顯示 [Empty State](empty-state.md)。
- **注意**：登記進 shortcuts 的組合必須是本專案實際綁定的。⌘N / ⌘T / ⌘W 等會被瀏覽器攔截的 modifier combo 不得使用，也不要列進說明面板。
- 面板本身用 [Modal Shell](modal-shell.md) + [Modal Close Button](modal-close-btn.md) 組成，所以 ESC 與 backdrop 行為直接沿用 modal.dismissal pattern。
