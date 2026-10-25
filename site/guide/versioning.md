# 版本與升級

這篇說明設計系統的版本怎麼命名、去哪裡看每版改了什麼，以及使用端專案怎麼換到新版本。要升級設計系統、或想先試用還沒正式發布的改動時讀這篇。

## 有哪些套件

設計系統分成兩種套件，各自在自己的 GitHub repo 打版本 tag：

| 套件 | repo | 放什麼 |
|---|---|---|
| `@mendesky/ds`（本體） | [mendesky-ds](https://github.com/Mendesky/mendesky-ds) | 跟框架無關的樣式、圖示、工具程式、元件規格、這個文件網站 |
| `@mendesky/ds-angular` | [mendesky-ds-angular](https://github.com/Mendesky/mendesky-ds-angular) | Angular 元件與 Angular 用法 |
| `@mendesky/ds-vue`（試做中） | [mendesky-ds-vue](https://github.com/Mendesky/mendesky-ds-vue) | Vue 3 元件與 Vue 用法；目前只有 8 個元件，還不供專案安裝 |

使用端只要裝自己框架的套件。框架套件會指定它搭配的本體版本，安裝時自動一起裝。兩種套件的版本號各自獨立。

## 版本號

每個版本是 GitHub repo 上的一個 git tag。使用端安裝時，在網址的 `#` 後面指定 tag。

### 正式版：vX.Y.Z

正式版的 tag 寫成 `vX.Y.Z`，例如 `v0.1.0`。使用端平常釘在正式版。

### 預發布版：vX.Y.Z-beta.N

預發布版是某個正式版發布之前的試用版，tag 寫成 `vX.Y.Z-beta.N`：

- `X.Y.Z` 是它之後要成為的正式版號。
- `N` 從 1 開始。同一個版號在正式發布前又有修改，就再打下一個號碼，例如 `v0.1.8-beta.1`、`v0.1.8-beta.2`、`v0.1.8-beta.3`，最後才是 `v0.1.8`。

預發布版的用途是：改動還沒正式發布前，先讓使用端專案裝起來實際跑、確認沒問題。確認後發布正式版，使用端再把版本從預發布版換成正式版，例如從 `v0.1.8-beta.2` 換到 `v0.1.8`。

不是每個正式版之前都有預發布版。

### 誰來打 tag

目前預發布版與正式版的 tag 都是由維護者人工建立的。

## 每版改了什麼

本體的版本說明在 [mendesky-ds 的 GitHub Releases](https://github.com/Mendesky/mendesky-ds/releases)，文件網站上方導覽列的「版本說明」會連過去；框架套件的版本說明在各自 repo 的 Releases，例如 [mendesky-ds-angular](https://github.com/Mendesky/mendesky-ds-angular/releases)。

升級前，先讀目前版本到目標版本之間每一版的說明。

## 看對應版本的文件

文件網站跟著本體的版本走，為本體的每個正式版各保留一整套文件：

- 右上角的版本選單可以切換版本。切換後會停在另一個版本的同一頁。
- 選單裡的 `main（開發中）` 是還沒發布的最新內容，不一定跟任何正式版相同。
- 網址的結構是 `/<版本>/`。元件的可操作範例在各框架的範例網站，從元件總覽的連結進去。
- 直接打開文件網站首頁，會轉到最新的正式版。
- 拆成本體與框架套件之前（`@mendesky/ds-angular` v0.2.0 以前）的文件，保留在[舊的文件網站](https://mendesky.github.io/mendesky-ds-angular/v0.2.0/)。舊網站的首頁現在會轉到這個網站，要看舊版請用版本網址。

使用端釘在哪一版，就看哪一版的文件，屬性與用法才會對得上。

## 升級步驟

目前只有 Angular 版可以安裝，以下以 Angular 套件為例。以下把 `vX.Y.Z` 換成要升到的版本。

### 1. 指名安裝新版本

把 `package.json` 裡 `@mendesky/ds-angular` 的 tag 改成新版本，並用完整的套件來源指名安裝：

```bash
npm i "github:Mendesky/mendesky-ds-angular#vX.Y.Z"
```

這個指令會同時更新 `package.json` 與 `package-lock.json`：

```json
{
  "dependencies": {
    "@mendesky/ds-angular": "github:Mendesky/mendesky-ds-angular#vX.Y.Z"
  }
}
```

裝完打開 `package-lock.json`，找到 `node_modules/@mendesky/ds-angular` 這一筆，確認 `resolved` 結尾的 commit 已經換成新 tag 指向的 commit。

本體 `@mendesky/ds` 會依新版框架套件指定的版本自動安裝，不用另外指定；`package-lock.json` 裡 `node_modules/@mendesky/ds` 那一筆會一起更新。

安裝結束時，postinstall 會自動刷新專案根目錄的 `mendesky-ds-angular` symlink，不用手動處理（設定方式見[開始使用](./getting-started)）。

### 2. 跑型別檢查與測試

設計系統是原始碼套件，新版的元件會跟你的專案一起編譯。換版後至少跑一次：

```bash
npx tsc --noEmit                 # 型別檢查
npx ng test --watch=false        # 單元測試
npx ng build                     # 建置
```

有錯誤時，對照該版的版本說明與新版的元件說明頁修正。

### 3. 一起 commit

`package.json` 與 `package-lock.json` 要放在同一個 commit。

## 試用預發布版

步驟跟升級一樣，只是 tag 換成預發布版：

```bash
npm i "github:Mendesky/mendesky-ds-angular#vX.Y.Z-beta.N"
```

同一版號發布正式版後，再用同樣的方式換成正式版 `vX.Y.Z`。

## 相關

- [開始使用](./getting-started)
- [貢獻](./contributing)
- [第一個畫面](./first-screen)
