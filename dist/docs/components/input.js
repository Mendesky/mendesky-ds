export const inputSpec = {
    id: 'input',
    name: 'Input',
    group: '表單元件',
    when: '單行文字輸入。禁止原生 `<input>`。type=\'password\' 時自動顯示 eye toggle。電話、編號等純數字欄位用 inputMode="numeric" sanitize="digits"。',
    notes: [
        'Suffix icon（eye toggle、clear 等）統一使用 size="16"，不可用其他尺寸。',
    ],
    a11y: {
        keyboard: [
            'Tab 移到輸入框。密碼欄的眼睛按鈕接在輸入框後面，也在 Tab 順序裡，按 Enter 或空白鍵切換顯示明文或遮罩。輸入框停用或唯讀時，眼睛按鈕照樣可以按。',
            '清除鈕不在 Tab 順序裡：它只在輸入框有焦點又有值時出現，焦點移開就消失，密碼欄與唯讀欄不會出現。要用鍵盤清空，就全選再刪掉。',
        ],
        focus: [
            '輸入框有焦點時，整個框會亮起焦點框，滑鼠點進去也一樣。有錯誤訊息時外框維持紅色，目前不顯示焦點框，聚焦時只看得到游標。',
            '眼睛按鈕用鍵盤移到時，在按鈕內側顯示焦點框。',
        ],
        screenReader: [
            '名稱先看 ariaLabel，沒有再用外層 #field 的標題；兩個都沒有時，再看外面有沒有用 inputId 連過來、或直接包住元件的 `<label>`。這些都沒有，瀏覽器才拿提示文字（placeholder）當名稱；日期這類輸入框連提示文字都不拿，會完全沒有名稱。設了 ariaLabel 就只念它，欄位標題和外面的 `<label>` 都不念。',
            '只有直接寫在 #field 裡的輸入框會連到欄位標題。輸入框寫在別的元件的模板裡（例如 #inline-add），就不會連到外層欄位，名稱要由那個元件自己給。',
            '提示文字不適合當名稱：「02」「12345678」這類範例值，念出來聽不懂這格要填什麼。',
            '沒設 ariaLabel、沒有欄位標題、也沒設 inputId，提示文字又是空的、是預設值 `Placeholder`、或輸入框是日期這類不拿提示文字的類型時，開發模式會在 console 警告。只在第一次渲染時檢查一次；用 `<label>` 直接包住元件也會被警告，這時改設 inputId。',
            '外層 #field 標了必填時，報讀軟體會念出必填。',
            '眼睛按鈕念「顯示密碼」，並念出按下（目前是明文）或未按下（目前是遮罩）。',
            '錯誤訊息目前不會跟輸入框一起念出，報讀軟體使用者聽不到哪裡填錯。',
        ],
        aria: [
            '用原生 `<input>`。ariaLabel 輸出成 aria-label。沒設 ariaLabel、外層 #field 有標題時，改輸出 aria-labelledby 指向欄位標題。兩個不會同時出現。',
            '外層 #field 標了必填時，輸出 aria-required="true"。',
            'autocomplete、name、inputId 都輸出在裡面的 `<input>` 上，inputId 輸出成 id。這幾個屬性要是落在外框上，瀏覽器和密碼管理員不會看，所以元件把它們轉到裡面的 `<input>`。',
            '眼睛按鈕是原生 `<button>`，type="button"，用 aria-pressed 標出按下狀態。',
        ],
    },
    dos: [
        { text: '直接放進有標題的 #field：欄位標題就是報讀名稱，不用另外設。' },
        { text: '沒有欄位標題時設 ariaLabel，例如表格列裡的輸入框、唯讀的分享連結。' },
        { text: '帳號密碼欄設 autocomplete。登入本站用 username 和 current-password；別的平台的帳密，帳號欄用 off、密碼欄用 new-password，瀏覽器比較不會把本站的帳密填進去。' },
        { text: '密碼明文不存在前端的話，接 passwordVisibilityChange，等使用者切成明文再跟後端拿。' },
    ],
    donts: [
        { text: '不要只靠提示文字說明這格要填什麼：填了值之後提示文字就不見了，日期這類輸入框更是從頭到尾都不顯示；報讀軟體念出的範例值也聽不懂。' },
        { text: '不要在元件上寫 id 讓外面的 `<label>` 指過來：id 會落在外框上，連不到輸入框。改用 inputId。' },
    ],
    customTables: [],
};
