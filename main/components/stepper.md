# Stepper（stepper）

分組：互動元件

horizontal：多步驟 Wizard 進度指示。nav：Modal 左側多層導覽面板。

## 用法

### Angular（v0.5.0）

`app-stepper`

variant: 'horizontal'|'nav' · horizontal: steps: string[] currentStep: number (stepClick) · nav: navSections activePage expandedPageIds lockedPageIds sectionStatuses (navPageClick) (navSubItemClick)

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/stepper--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `variant` | `'horizontal' \| 'nav'` | `'horizontal'` | 切換呈現模式 |
| `steps` | `string[]` | `[]` | 步驟標籤清單（依序顯示） |
| `currentStep` | `number` | `0` | 當前步驟 index（0-based） |
| `(stepClick)` | `EventEmitter<number>` |  | 點擊已完成步驟（done）時 emit index |
| `navSections` | `NavSection[]` | `[]` | 導覽區段陣列；每個區段有 label?（區段標題）與 pages（NavPage[]） |
| `activePage` | `string` | `''` | 目前 active 的 page id 或 sub-item id |
| `expandedPageIds` | `string[]` | `[]` | 已展開顯示子項目的頂層 page ids |
| `lockedPageIds` | `string[]` | `[]` | 尚未解鎖（不可點擊）的頂層 page ids |
| `sectionStatuses` | `Record<string, string>` | `{}` | 子項目狀態 map（key = subItemId，值 = 'empty' \| 'in-progress' \| 'complete'） |
| `validationTriggeredIds` | `string[]` | `[]` | 已觸發驗證的 section / page ids；列在此的項目顯示紅色警告狀態。搭配 modal.nonlinear-completion pattern 使用 |
| `hideNum` | `boolean` | `false` | 隱藏 nav pill 內的數字文字（完成態的綠勾仍保留） |
| `(navPageClick)` | `EventEmitter<NavPage>` |  | 點擊頂層 pill 時 emit（已排除 locked 頁面） |
| `(navSubItemClick)` | `EventEmitter<{subId, parentId}>` |  | 點擊子項目時 emit |

#### 程式碼範例

**horizontal — Wizard 步驟指示器**

```html
<app-stepper
  [steps]="['選擇類型', '身分驗證', '基本資料', '偏好設定']"
  [currentStep]="stepIndex"
  (stepClick)="goToStep($event)"
></app-stepper>
```

**nav — 多層導覽面板**

```html
<app-stepper
  variant="nav"
  [navSections]="navSections()"
  [activePage]="activePage()"
  [expandedPageIds]="expandedPageIdsArray()"
  [lockedPageIds]="lockedPageIdsArray()"
  [sectionStatuses]="navSectionStatuses()"
  (navPageClick)="onPageClick($event)"
  (navSubItemClick)="navigateTo($event.subId, $event.parentId)"
></app-stepper>

// 消費端 computed 範例
navSections = computed((): NavSection[] => [
  { label: memberName, pages: memberPages() },
  ...(hasSharedPages ? [{ label: '共用資料', pages: sharedPages() }] : []),
]);
expandedPageIdsArray = computed(() => Array.from(expandedPages()));
lockedPageIdsArray   = computed(() => PAGE_ORDER.filter(id => isPageLocked(id)));
navSectionStatuses   = computed(() => formState.sectionStatuses());
```

**介面定義**

```html
// 從 stepper 元件 import
import { NavPage, NavSection, NavSubItem } from '...stepper/stepper.component';

interface NavSubItem { id: string; label: string; }
interface NavPage    { id: string; num: string; label: string; subItems?: NavSubItem[]; }
interface NavSection { label?: string; pages: NavPage[]; }
```
