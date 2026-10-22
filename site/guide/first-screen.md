# 第一個畫面

這篇帶你在一個元件裡放進設計系統的欄位、輸入框和按鈕，組成一個可以輸入、顯示錯誤、按下送出的小表單。完成[開始使用](./getting-started)的設定後讀這篇。

## 在元件裡引入設計系統的元件

template 要用設計系統的元件，先在自己的元件裡引入。各框架的寫法見下方分頁：

::: code-group

```ts [Angular]
// standalone 元件是不需要 NgModule 的 Angular 元件：它在自己的 imports 裡列出 template 要用的東西。
// 設計系統的元件都是 standalone，從 @mendesky/ds-angular import 後放進 imports 就能在 template 使用。
import { Component } from '@angular/core';
import { ButtonComponent, FieldComponent, InputComponent } from '@mendesky/ds-angular';

@Component({
  selector: 'app-item-name-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ButtonComponent],
  templateUrl: './item-name-form.component.html',
})
export class ItemNameFormComponent {
  name = '';
  nameError = '';

  onNameChange(value: string): void {
    this.name = value;
  }

  onConfirm(): void {
    this.nameError = this.name.trim() ? '' : '請輸入項目名稱';
  }
}
```

```ts [Vue]
// <script setup lang="ts">
// Vue 版試做中，還沒有提供安裝與引入方式；這裡只示範元件的狀態與處理函式。
const name = ref('');
const nameError = ref('');

function onNameChange(value: string) {
  name.value = value;
}

function onConfirm() {
  nameError.value = name.value.trim() ? '' : '請輸入項目名稱';
}
```

:::

## 組一個表單

template 用三個元件：

- <ComponentLink id="field" />：欄位的外框，負責標題與「必填」標示。
- <ComponentLink id="input" />：單行文字輸入框。
- <ComponentLink id="button" />：按鈕。

::: code-group

```html [Angular]
<app-field label="項目名稱" [required]="true">
  <app-input
    size="L"
    placeholder="請輸入項目名稱"
    [errorMessage]="nameError"
    (valueChange)="onNameChange($event)"
  ></app-input>
</app-field>

<app-button
  variant="filled"
  color="primary"
  size="M"
  text="確認"
  (btnClick)="onConfirm()"
></app-button>
```

```vue [Vue]
<DsField label="項目名稱" :required="true">
  <DsInput
    size="L"
    placeholder="請輸入項目名稱"
    :errorMessage="nameError"
    @value-change="onNameChange($event)"
  ></DsInput>
</DsField>

<DsButton
  variant="filled"
  color="primary"
  size="M"
  text="確認"
  @btn-click="onConfirm()"
></DsButton>
```

:::

幾個要點：

- 欄位標題只放欄位名稱。單位、限制、提示放 <ComponentLink id="field" /> 的 `hint`，不要寫進 `label`。
- 選填欄位不用標示，只有必填欄位把 `required` 設為 `true`。
- 不要用原生的 `<input>` 和 `<button>`，一律用 <ComponentLink id="input" /> 和 <ComponentLink id="button" />。

輸入框有錯誤時的樣子：

<StoryEmbed id="input--with-error" :height="160" title="輸入框的錯誤狀態" />

## 取得輸入值：initialValue 與 valueChange

<ComponentLink id="input" /> 不能跟表單雙向綁定值，也不能接表單控制項。它用一個屬性和一個事件處理值，一進一出：

- `initialValue`（屬性）：放進輸入框的值。外部改了這個值，輸入框內容會跟著更新。
- `valueChange`（事件）：使用者改了內容就送出新的值。

例如從 API 拿到資料後預填：

::: code-group

```html [Angular]
<!-- app-input 不支援 ngModel，也不支援 formControlName -->
<app-input
  size="M"
  [initialValue]="prefillValue"
  (valueChange)="prefillValue = $event"
></app-input>
```

```vue [Vue]
<!-- DsInput 不支援 v-model -->
<DsInput
  size="M"
  :initialValue="prefillValue"
  @value-change="prefillValue = $event"
></DsInput>
```

:::

需要在離開欄位時才處理（例如輸入郵遞區號後查地址），改聽 `blur` 事件，它會帶出當下的值。

## 哪些元件可以雙向綁定

雙向綁定是讓畫面上的值和元件裡的變數保持同步。元件本身要支援，才能這樣用。

設計系統裡可以跟表單雙向綁定值的元件：

- <ComponentLink id="select" />
- <ComponentLink id="checkbox" />
- <ComponentLink id="date-picker" />
- <ComponentLink id="year-month-picker" />
- <ComponentLink id="check-chip" />
- <ComponentLink id="radio-chip" />

下面以 <ComponentLink id="select" /> 為例。框架專屬的設定寫在分頁的註解裡：

::: code-group

```ts [Angular]
// ngModel 是 Angular 的雙向綁定。元件要實作 ControlValueAccessor（Angular 讓自訂元件接上表單的介面）才能用。
// 使用時要在元件的 imports 加上 Angular 的 FormsModule。
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldComponent, SelectComponent, SelectOption } from '@mendesky/ds-angular';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [FormsModule, FieldComponent, SelectComponent],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent {
  department: string | null = null;

  departmentOptions: SelectOption[] = [
    { value: 'design', label: '設計部' },
    { value: 'engineering', label: '工程部' },
    { value: 'admin', label: '行政部', disabled: true },
  ];
}
```

```ts [Vue]
// <script setup lang="ts">
const department = ref<string | null>(null);

const departmentOptions: SelectOption[] = [
  { value: 'design', label: '設計部' },
  { value: 'engineering', label: '工程部' },
  { value: 'admin', label: '行政部', disabled: true },
];
```

:::

::: code-group

```html [Angular]
<!-- app-select 也可以接 Reactive Forms 的 formControlName -->
<app-field label="部門" [required]="true">
  <app-select
    [options]="departmentOptions"
    placeholder="請選擇部門"
    [(ngModel)]="department"
  ></app-select>
</app-field>
```

```vue [Vue]
<DsField label="部門" :required="true">
  <DsSelect
    :options="departmentOptions"
    placeholder="請選擇部門"
    v-model="department"
  ></DsSelect>
</DsField>
```

:::

## 顯示錯誤訊息

<ComponentLink id="input" /> 和 <ComponentLink id="select" /> 都用 `errorMessage` 顯示錯誤：

- `errorMessage` 有值時，欄位切成錯誤狀態並顯示這段文字。
- 清成空字串 `''`，錯誤狀態就解除。
- 錯誤訊息是浮動的提示，不佔版面。`errorPosition` 決定它出現在欄位上方（`'top'`）或下方（`'bottom'`，預設）。

::: code-group

```html [Angular]
<app-input
  placeholder="請輸入項目名稱"
  [errorMessage]="nameError"
  errorPosition="top"
></app-input>
```

```vue [Vue]
<DsInput
  placeholder="請輸入項目名稱"
  :errorMessage="nameError"
  errorPosition="top"
></DsInput>
```

:::

什麼時候該顯示錯誤、什麼時候清掉，見[表單與錯誤提示](./forms)。

## 處理按鈕事件

<ComponentLink id="button" /> 被點擊時送出 `btnClick` 事件。

<StoryEmbed id="button--default" :height="120" title="按鈕" />

常用的狀態：

- `disabled` 設為 `true`：停用，點了沒反應。
- `loading` 設為 `true`：載入中。spinner 取代 icon、底色不變、點擊無效，適合送出後等待回應的期間。
- `loadingText`：載入中顯示的替換文字，選填。

### 停用時仍要說明原因

主要動作條件不足時，可以維持停用的外觀但仍允許點擊，點下去顯示原因：

::: code-group

```html [Angular]
<app-button
  text="送出"
  [disabled]="!canSubmit"
  [clickableWhenDisabled]="true"
  [disabledMessage]="'請先填寫項目名稱'"
  (btnClick)="onSubmit()"
  (disabledClick)="onDisabledClick()"
></app-button>
```

```vue [Vue]
<DsButton
  text="送出"
  :disabled="!canSubmit"
  :clickableWhenDisabled="true"
  :disabledMessage="'請先填寫項目名稱'"
  @btn-click="onSubmit()"
  @disabled-click="onDisabledClick()"
></DsButton>
```

:::

- `clickableWhenDisabled`：停用時改用 `aria-disabled`，點擊事件仍會觸發。
- `disabledMessage`：停用時點擊，按鈕上方會出現這段提示。多條訊息傳字串陣列，會用條列顯示。
- `disabledClick`（事件）：停用時被點擊才送出。可以在這裡捲到第一個有錯誤的欄位。

按鈕的樣式（`variant`、`color`）怎麼依動作的意義挑選，見 <ComponentLink id="button" /> 的說明頁。

## 其他表單元件

<ComponentTable group="表單元件" />

## 相關

- [開始使用](./getting-started)
- [表單與錯誤提示](./forms)
- [元件怎麼選](./choosing-components)
- <ComponentLink id="field" />
