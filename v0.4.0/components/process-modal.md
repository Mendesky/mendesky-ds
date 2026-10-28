# Process Modal（process-modal）

分組：浮層元件

耗時操作的進度顯示（覆蓋整個畫面）。

## 用法

### Angular（v0.5.0）

`app-process-modal`

type: running|congratulation · message [isOpen] · (dismissed)

[在範例網站看全部 4 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/process-modal--%E8%AA%AA%E6%98%8E)

#### 屬性

| 名稱 | 型別 | 預設 | 說明 |
| --- | --- | --- | --- |
| `type` | `'running' \| 'congratulation'` |  | running = 白底小卡 + spinner；congratulation = 綠底慶祝卡 |
| `message` | `string` |  | 顯示文字（running 預設「執行中請稍候」；congratulation 預設「恭喜！」，使用端應傳入具體的完成訊息） |
| `isOpen` | `boolean` |  | 控制顯示/隱藏 |
| `(dismissed)` | `EventEmitter<void>` |  | 關閉回調（僅 congratulation 觸發） |

#### 程式碼範例

**基本用法**

```html
<app-process-modal
  type="running"
  message="執行中請稍候"
  [isOpen]="isProcessing()"
  (dismissed)="onDone()"
></app-process-modal>
```

## 注意事項

- running 狀態不可關閉（系統處理中阻擋操作）；congratulation 點擊背景會送出 dismissed 事件。

## 對照表

### 外觀規格

|  | running | congratulation |
| --- | --- | --- |
| 尺寸 | 333 × 72px | 333 × 104px |
| 背景 | #ffffff | --button/success #74ae3e |
| 圓角 | 10px | 10px |
| 陰影 | 0 0 20px rgba(0,0,0,0.2) | 0 0 20px rgba(0,0,0,0.2) |
| 左側 | Loading spinner icon (36×36) | 彩帶慶祝插圖 |
| 文字色 | --text/body #686868 | #ffffff |
