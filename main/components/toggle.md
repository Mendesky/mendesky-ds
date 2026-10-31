# Toggle（toggle）

分組：互動元件

即時生效的開/關設定。

## 可以這樣做、不要這樣做

### 可以這樣做

- 每個開關都給 ariaLabel，用旁邊說明這個設定的文字，例如「Email 通知」。

### 不要這樣做

- 不要把會跟著開關改變的文字當名稱，例如「已開啟通知」／「未開啟通知」。名稱要固定，開或關由報讀軟體從開關狀態念出。

## 用法

### Angular（v0.7.0）

`app-toggle`

[checked] [disabled] · ariaLabel · (checkedChange)

[在範例網站看全部 6 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/toggle--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | 開關狀態（雙向綁定用 [(checked)]） |
| `disabled` | `boolean` | `false` | 禁用狀態（opacity 0.5，不可點擊） |
| `ariaLabel` | `string` | `''` | 報讀軟體念的名稱，套在內層 switch 的 aria-label。開關本身沒有文字，一律要給；旁邊的文字會隨開關改變時，給固定名稱。 |
| `(checkedChange)` | `EventEmitter<boolean>` |  | 狀態切換時觸發，回傳新值 |

#### 程式碼範例

**單向綁定**

```html
<app-toggle [checked]="isEnabled" ariaLabel="Email 通知" (checkedChange)="isEnabled = $event"></app-toggle>
```

**雙向綁定**

```html
<app-toggle [(checked)]="isEnabled" ariaLabel="Email 通知"></app-toggle>
```

**禁用**

```html
<app-toggle [checked]="isEnabled" [disabled]="true" ariaLabel="Email 通知"></app-toggle>
```

#### Angular 注意事項

- **注意**：ariaLabel 要寫成元件的設定（ariaLabel="…" 或 [ariaLabel]="…"）。直接寫 aria-label 或 [attr.aria-label] 會留在外層 app-toggle 上，到不了內層 button，報讀軟體讀不到。

## 無障礙

### 網頁和 APP 都要做到

- **鍵盤**：Tab 移到開關，空白鍵或 Enter 切換開或關。
- **鍵盤**：停用時 Tab 仍會停在開關上，但按了沒有反應。
- **焦點**：用鍵盤移到開關時，外圍出現 2 px 的淺藍色焦點框，距離開關 2 px，顏色比 DS 共用的焦點框淺；用滑鼠點不會出現。
- **報讀軟體**：念出名稱、「開關」角色，以及目前是開或關。停用時也會念出停用狀態。
- **報讀軟體**：開關本身沒有文字，名稱只來自 ariaLabel。沒設 ariaLabel 時，報讀軟體念不出這是什麼開關。
- **動態**：切換時圓鈕滑動、底色變化，約 0.15 秒。目前不會因為使用者設定「減少動態」而停止。
- **觸控**：開關寬 36、高 22 px，小於 iOS 建議的 44 點與 Android 建議的 48 dp 觸控範圍。

### 網頁專屬

- **ARIA 與 HTML 語意**：用原生 button 元素，role="switch"，用 aria-checked 表示開或關。
- **ARIA 與 HTML 語意**：停用用 aria-disabled="true"，不用原生 disabled，所以鍵盤仍停得到。
- **ARIA 與 HTML 語意**：ariaLabel 輸出成 aria-label；沒設時不輸出。
