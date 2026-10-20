import { defineConfig } from 'vitest/config';
// 工具程式的測試跑在真的 Chromium（量測 SVG、PDF 渲染、剪貼簿都需要真瀏覽器）。
export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.spec.ts'],
        browser: {
            enabled: true,
            provider: 'playwright',
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
    },
});
