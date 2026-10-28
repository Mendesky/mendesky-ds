# Sort Header（sort-header）

分組：展示元件

列表表頭裡可點擊排序的一格。點了發出這欄的 key，由呼叫端決定怎麼排、並把新的排序狀態傳回來；本元件不持有狀態，也不排序資料。

## 用法

### Angular（v0.5.0）

`app-sort-header`

label · key · [sort]: SortState | null · align: start|end · (sortChange)

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/sort-header--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 表頭文字 |
| `key` | `string` | `''` | 這欄的識別字，點擊時原樣發出；也用來產生 data-testid="sort-<key>" |
| `sort` | `SortState \| null` | `null` | 列表目前的排序狀態 { key, dir }；null 表示沒有排序 |
| `align` | `'start' \| 'end'` | `'start'` | 文字靠左（預設）或靠右（數字欄） |
| `(sortChange)` | `EventEmitter<string>` |  | 點擊時發出 key |

#### 程式碼範例

**搭配 nextSort 切換方向**

```html
<app-sort-header class="col-name" label="姓名" key="name" [sort]="sort()" (sortChange)="onSort($event)"></app-sort-header>

// component
sort = signal<SortState | null>(null);
onSort(key: string) { this.sort.set(nextSort(this.sort(), key)); }
```

## 注意事項

- 沒在排序的欄：跟一般表頭一樣是淺灰字，滑過或鍵盤聚焦時才出現排序圖示。正在排序的欄：動作色、半粗，一直顯示上／下箭頭。
- 欄寬由呼叫端放在元件本身元素上的 class（例：col-name）決定。
- nextSort(目前狀態, key, 預設方向)：點同一欄反轉方向，點別欄從預設方向開始。數量、日期欄通常傳 'desc'，第一次點就「多到少／新到舊」。
- 元件本身的元素帶 role="columnheader" 與 aria-sort，讀屏會唸出目前的排序方向。
