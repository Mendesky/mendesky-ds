export const optionCardSpec = {
    id: 'option-card',
    name: 'Option Card',
    group: '表單元件',
    when: '單張可選插圖卡。一般不單獨使用，由 app-option-card-group 組成互斥群組（radiogroup）。hover 揭露純 CSS、無 JS；prefers-reduced-motion 下停用動效。',
    notes: [
        {
            type: 'info',
            content: 'hover 揭露為純 CSS（插圖 opacity→0、說明 opacity→1，150ms crossfade）；無 JS、無 description 時不切換。',
        },
        {
            type: 'info',
            content: 'rest 態插圖目前為全彩；selected 填色採 --button/action-lighter（淡藍）。',
        },
    ],
    customTables: [],
};
