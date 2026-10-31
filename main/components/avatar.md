# Avatar（avatar）

分組：展示元件

用戶頭像、個人資料。可點擊（例如右上角打開個人面板）時 clickable 設為 true 並給 ariaLabel，直接監聽本元件的 click 事件。

## 用法

### Angular（v0.7.0）

`app-avatar`

propClass: Text|Thumb|Icon · [size]: 28|36|44|56|64|96|128|240 · src text iconName [clickable] ariaLabel

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/avatar--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `propClass` | `'Text' \| 'Thumb' \| 'Icon'` |  | 文字縮寫（取第1字）/ 圖片縮圖 / icon 符號 |
| `size` | `number` |  | 28 \| 36 \| 44 \| 56 \| 64 \| 96 \| 128 \| 240（px） |
| `text` | `string` |  | Text 模式：顯示文字（自動取前1字） |
| `src` | `string` |  | Thumb 模式：圖片 URL |
| `iconName` | `string` |  | Icon 模式：icon 名稱 |
| `clickable` | `boolean` | `false` | 可點擊：根元素改為 <button>（鍵盤可聚焦、Enter／空白鍵觸發、鍵盤聚焦時顯示主色外框），含 hover／press 效果。點擊綁在外層 (click) 即可（v0.1.8 起） |
| `ariaLabel` | `string` | `''` | 可點擊時給報讀軟體的名稱；未提供時用 text（v0.1.8 起） |
| `bgColor` | `string` | `''` | 自訂背景色（Text／Icon 模式）；有值時覆蓋預設底色 |

#### 程式碼範例

**各模式用法**

```html
<app-avatar propClass="Text"  [size]="96" text="陳安安"></app-avatar>
<app-avatar propClass="Thumb" [size]="44" src="..." [clickable]="true" ariaLabel="個人面板" (click)="open()"></app-avatar>
<app-avatar propClass="Icon"  [size]="36" iconName="User"></app-avatar>
```

#### Angular 注意事項

- 可點擊頭像寫 [clickable]="true" 並給 ariaLabel，點擊綁在 <app-avatar> 外層的 (click)，例如 <app-avatar [clickable]="true" ariaLabel="個人面板" (click)="open()">。

## 注意事項

- 可點擊頭像不要再外包 div 或自己加 role="button"／tabindex：clickable 設為 true 就是原生按鈕。
