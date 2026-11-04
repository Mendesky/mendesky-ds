# Icon（icon）

分組：展示元件

所有圖示顯示。禁止用 inline style width/height 控制大小，用 size 屬性。

## 用法

### Angular（v0.7.0）

`app-icon`

name（見 @mendesky/ds 的 ICON_REGISTRY）· size: 12|16|24|32|36|48 · 顏色透過父層 color CSS 或 style='color:...'

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.7.0/components/?path=/docs/icon--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `name` | `string` |  | Icon 名稱（見 Icons 章節完整列表） |
| `size` | `'12'\|'16'\|'24'\|'32'\|'36'\|'48'` | `'24'` | 渲染尺寸 px |

#### 程式碼範例

**使用規則**

```html
<!-- ✅ 正確：用 size input 控制大小 -->
<app-icon name="DownArrow" size="16" style="color:#686868"></app-icon>

<!-- ❌ 禁止：用 inline style 控制大小 -->
<app-icon name="DownArrow" style="width:16px;height:16px"></app-icon>

<!-- 顏色繼承父層 -->
<div style="color:#3a9ccd">
  <app-icon name="Search" size="24"></app-icon>
</div>
```

### Vue（試做）（v0.3.0）

`<DsIcon>`

name（見 ICON_REGISTRY）· size: 12|16|24|32|36|48 · 顏色透過父層 color CSS 或 style='color:...'

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-vue/v0.3.0/components/?path=/docs/icon--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `name` | `string` |  | Icon 名稱（見 Icons 章節完整列表） |
| `size` | `'12'\|'16'\|'24'\|'32'\|'36'\|'48'` | `'24'` | 渲染尺寸 px |

#### 程式碼範例

**使用規則**

```vue
<!-- ✅ 正確：用 size 控制大小 -->
<DsIcon name="DownArrow" size="16" style="color:#686868" />

<!-- ❌ 禁止：用 inline style 控制大小 -->
<DsIcon name="DownArrow" style="width:16px;height:16px" />

<!-- 顏色繼承父層 -->
<div style="color:#3a9ccd">
  <DsIcon name="Search" size="24" />
</div>
```

## 注意事項

- **注意**：禁止安裝任何第三方 icon library（Font Awesome、Material Icons 等），一律使用 [Icon](icon.md) + 本體的圖示登錄表 ICON_REGISTRY（src/icons/icons.ts）。
