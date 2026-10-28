# Po Process（po-process）

分組：展示元件

採購/流程節點狀態顯示。

## 用法

### Angular（v0.5.0）

`app-po-process`

status: Running|Success|Error|Congratulation · message

[在範例網站看全部 5 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/po-process--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `status` | `PoProcessStatus` | `'Running'` | Running \| Success \| Error \| Congratulation |
| `message` | `string` | `''` | 狀態文字；空字串時顯示各狀態的預設文字 |

## 注意事項

- 採購訂單流程元件，顯示 PO 審核狀態步驟條。Props 與狀態定義待業務確認後補充。
