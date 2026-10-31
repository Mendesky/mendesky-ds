# Kanban Minimap（kanban-minimap）

分組：展示元件

Kanban 欄位縮略導覽。

## 用法

### Angular（v0.7.0）

`app-kanban-minimap`

columns: MinimapColumn[] · boardContainer: HTMLElement

[在範例網站看全部 3 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/kanban-minimap--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `boardContainer` | `HTMLElement \| null` | `null` | 看板的捲動容器（傳入 ViewChild 的 nativeElement） |
| `columns` | `MinimapColumn[]` | `[]` | 欄位資料，每項含 label、color、cardCount |

#### 程式碼範例

**看板視圖整合**

```html
<!-- 在 kanban 視圖區塊內 -->
<div class="kb-area" #kbArea *ngIf="isKanban">
  <!-- kanban board ... -->
  <app-kanban-minimap
    [boardContainer]="kbAreaRef?.nativeElement"
    [columns]="minimapColumns()"
  ></app-kanban-minimap>
</div>

// TS: minimapColumns
minimapColumns = computed(() =>
  columns().map(col => ({
    label: col.label,
    color: col.dotColor,
    cardCount: col.cards.length,
  }))
);
```
