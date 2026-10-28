export const fieldSpec = {
    id: 'field',
    name: 'Field',
    group: '表單元件',
    when: '所有表單欄位外層包裝。提供一致的 label 排版。標題只放欄位名稱（中粗 500）；單位（元）、限制（單檔上限 50MB）、提示（可複選）一律放 hint（標題旁淺灰說明），不要寫進 label 文字。跟畫面重複的說明（例如按鈕已列出的選項）直接不寫。',
    notes: [
        {
            type: 'info',
            content: '#field 是表單欄位的包裝元件，負責統一管理標題列與必填 badge。把 #input、#textarea、#autocomplete 等表單元件放進它裡面即可。選填欄位不加任何 badge，只顯示 label 文字。',
        },
    ],
    a11y: {
        screenReader: [
            '直接寫在欄位裡的 #input 沒設 ariaLabel 時，標題就是它的報讀名稱。欄位標了必填時，報讀軟體也會念出必填。標題旁的說明文字（hint）與必填標記不算進名稱。',
            'hint 目前也不會在聚焦輸入框時念出，單位、限制這類說明，報讀軟體使用者聽不到。',
            '#input 寫在別的元件的模板裡（例如 #inline-add）時，不會連到外層欄位的標題，也不會標必填，名稱要由那個元件自己給。',
            '目前只有 #input 會自動連到標題。#textarea、#select 等其他控制項放進來，報讀軟體還念不出欄位標題。',
        ],
        aria: [
            '標題元素有自動產生的 id。直接寫在欄位裡的 #input 沒設 ariaLabel 時，用 aria-labelledby 指向它；欄位標了必填時，#input 輸出 aria-required="true"。標題是空的或只有空白時，就不會連過去。',
        ],
    },
    customTables: [],
};
