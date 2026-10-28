# Portal Teleport 元素外送（portal-teleport）

分組：工具

元素必須脫離目前 DOM 位置才能正確顯示時用（祖先有 transform、backdrop-filter 或 overflow:hidden）。需要跟著觸發點定位與追蹤捲動時改用浮層定位服務。

把套用此工具的元素在元素建立並放進父層後 appendChild 到 document.body，在銷毀時移除。
用於「元素必須脫離目前 DOM 位置才能正確顯示」的情境——祖先有 transform、backdrop-filter 或 overflow:hidden 時，position:fixed 會以該祖先為基準或被裁切。

## 用法

### Angular（v0.5.0）

`[appPortalTeleport]`

[在範例網站看全部 3 個範例](https://mendesky.github.io/mendesky-ds-angular/v0.5.0/components/?path=/docs/portal-teleport--%E8%AA%AA%E6%98%8E)

#### 屬性

沒有輸入屬性。

#### 程式碼範例

**基本用法**

```html
<div class="my-overlay" appPortalTeleport>
  <!-- 這個 div 會被搬到 document.body 底下 -->
</div>
```

#### Angular 注意事項

- Angular 版是屬性型 directive appPortalTeleport：沒有任何 @Input，純副作用 directive，全長 21 行。
- appPortalTeleport 在 ngOnInit 時把元素 appendChild 到 document.body，在 ngOnDestroy 時移除。
- **注意**：ngOnDestroy 只在「元素的 parent 仍是 document.body」時才移除。若中途被別的程式搬走，appPortalTeleport 不會清掉它。
- 本體說的「浮層定位服務」在 Angular 是 PortalPositioningService（以 inject(PortalPositioningService) 取得）：需要跟著某個 trigger 定位並追蹤捲動時用它，不用 appPortalTeleport。

## 注意事項

- 沒有任何屬性，是純副作用的工具。
- **注意**：元素離開原本的 DOM 位置後，CSS 的後代選擇器（如 .parent .child）與 CSS 變數繼承都會斷掉。樣式要寫成不依賴祖先，或改用全域 class。
- **注意**：銷毀時只在「元素的 parent 仍是 document.body」時才移除。若中途被別的程式搬走，這個工具不會清掉它。
- 需要「跟著某個 trigger 定位並追蹤捲動」時不要用這個，用浮層定位服務——它除了搬移還會處理定位、翻轉、捲動追蹤與 z-index。本工具只負責搬家。
