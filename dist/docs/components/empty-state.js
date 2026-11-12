export const emptyStateSpec = {
    id: 'empty-state',
    name: 'Empty State',
    group: '展示元件',
    when: '區塊沒有內容可以顯示時，在原地說明為什麼沒有。有兩種版本：讀到了但沒有資料（例如列表、查詢沒有結果），用預設的空狀態；內容讀取失敗，把 variant 設為 error，用錯誤版本取代讀不到的內容，規則見互動原則「區塊載入失敗」（`loading.load-failure-inline`）。沒有讀取權限不算讀取失敗，不用錯誤版本。',
    notes: [
        {
            type: 'info',
            content: '可以放入任意自訂內容（按鈕、含 inline CTA 的訊息段落等）。兩種版本都可以放，放入的內容顯示在最下方。',
        },
        {
            type: 'info',
            content: '錯誤版本不顯示插圖和 message，改顯示紅色圖示、標題（title）、說明（description）和重試鈕。title 預設是「載入失敗」，description 預設不顯示，重試鈕的文字（retryText）預設是「重試」。',
        },
        {
            type: 'info',
            content: '重試鈕只在使用端接了 retry 事件時才出現。重讀也不會成功的地方不要接，畫面就不會出現按了沒用的按鈕。',
        },
        {
            type: 'info',
            content: 'retrying 設為「正在重試」時，重試鈕顯示載入圈和「重試中」，再按也不會送出 retry。區塊維持錯誤版本，不換回骨架或載入畫面。',
        },
        {
            type: 'warn',
            content: '錯誤版本沒有外框，也不撐高。使用端照被取代的正常內容加外框，並用樣式變數 `--es-min-height` 設成跟正常內容一樣高；內容在這個高度裡上下置中。重試成功、換回正常內容時，版面才不會跳。',
        },
    ],
    customTables: [],
    anatomy: [
        { name: '插圖', description: '空狀態才有。200 × 158 px 的插圖，放大鏡一直左右擺動。' },
        { name: '文字', description: '空狀態才有。插圖下方的灰色說明，內容是 message；message 是空字串時不顯示。' },
        { name: '圖示', description: '錯誤版本才有。24 px 的 `Alert-Info` 圖示，顏色是 `--icon/warning`（#cc5252）。' },
        { name: '標題', description: '錯誤版本才有。寫哪一塊沒載入，字型 `noto-14-medium`，顏色 `--text/title`。' },
        { name: '說明', description: '錯誤版本才有，選填。寫下一步怎麼做，字型 `noto-12-regular`，顏色 `--text/body-light`。' },
        { name: '重試鈕', description: '錯誤版本、而且使用端接了 retry 事件時才有。#button 的外框樣式（outlined）、中性色（neutral）、S 尺寸，左邊是 `Refresh` 圖示。' },
        { name: '自訂內容', description: '兩種版本都可以放，在最下方。' },
    ],
    states: [
        { name: '空狀態', description: '預設。顯示插圖和 message。' },
        { name: '錯誤', description: 'variant 是 error。圖示、標題、說明、重試鈕由上往下置中排列。重試鈕可以按，按下送出 retry 事件。' },
        { name: '重試中', description: 'variant 是 error，retrying 設為「正在重試」。重試鈕顯示載入圈和「重試中」，按了沒有反應。圖示、標題、說明不變。retrying 改回來時，重試鈕恢復可以按。' },
    ],
    a11y: {
        keyboard: [
            'Enter 或空白鍵：按重試鈕。',
        ],
        focus: [
            '錯誤版本出現時，焦點不自動移過去：使用者可能正在操作別的區塊。',
            '重試中，重試鈕暫時不能按，接不住焦點。焦點原本在重試鈕上時，移到錯誤區塊本身，不掉出區塊；重試失敗、按鈕恢復後，按 Tab 回到按鈕。',
            '重試成功、錯誤版本被換成正常內容時，元件管不到焦點。焦點原本在錯誤區塊裡的話，使用端把焦點移到新內容的開頭。',
        ],
        screenReader: [
            '錯誤版本是狀態訊息：標題或說明改變時，報讀軟體念完目前的內容才念，不打斷使用者。',
            '錯誤版本跟文字一起出現的那一刻，有些報讀軟體不會念，各家做法不同。使用者移到區塊時一定念得到標題和說明。',
            '圖示只是裝飾，不念。',
        ],
        aria: [
            '錯誤版本的外層是 role="status"，空狀態不設角色。',
            '錯誤版本的外層有 tabindex="-1"，讓焦點在重試中可以停在區塊上；按 Tab 不會停在這裡。',
            '圖示加 aria-hidden="true"。',
        ],
    },
    dos: [
        { text: '標題寫哪一塊沒載入，例如「附件清單載入失敗」。不知道是哪一塊時，才用預設的「載入失敗」。' },
        { text: '說明寫下一步：先請使用者重試，再寫重試沒用時找誰，例如「請重試。如果一直失敗，請聯絡系統管理員。」' },
        { text: '用 `--es-min-height` 把錯誤版本撐到跟正常內容一樣高，外框也照正常內容加。' },
    ],
    donts: [
        { text: '讀取失敗時不要顯示空狀態的「目前無資料」。使用者會以為真的沒有資料。' },
        { text: '標題和說明不要寫錯誤代碼、API 名稱這類使用者看不懂、也處理不了的詞。' },
        { text: '重試中不要把區塊換回骨架或載入畫面。版面會閃一下，使用者也看不出重試還在進行。' },
        { text: '沒有讀取權限時不要用錯誤版本。那是確定的結果，重試也不會變。' },
    ],
};
