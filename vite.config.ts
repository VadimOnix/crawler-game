// defineConfig из vitest/config, а не из vite: только он знает про секцию test
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // относительные пути к ассетам: сборка работает под любым базовым URL
    // (vadimonix.github.io/<repo>, кастомный домен и т.п.)
    base: './',
    plugins: [react()],
    server: {
        port: 3000,
    },
    test: {
        // node по умолчанию — чистой логике и сторам DOM не нужен;
        // компонентные тесты включают jsdom докблоком @vitest-environment
        environment: 'node',
        setupFiles: ['./src/test/setup.ts'],
    },
});
