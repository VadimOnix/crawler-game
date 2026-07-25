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
        coverage: {
            provider: 'v8',
            reporter: ['text-summary', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            // из отчёта исключены точка входа, стили-модули и экраны-заглушки:
            // мерить покрытие пустых <div> нечего, а порогам они только мешают
            exclude: [
                'src/**/*.test.{ts,tsx}',
                'src/test/**',
                'src/main.tsx',
                'src/vite-env.d.ts',
                'src/components/Battle/**',
                'src/components/PlayerInfo/**',
            ],
            // порогов пока нет: сначала стоит реализовать экраны-заглушки,
            // иначе планка будет отражать объём незаписанного кода
        },
    },
});
