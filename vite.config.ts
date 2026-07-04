import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // относительные пути к ассетам: сборка работает под любым базовым URL
    // (vadimonix.github.io/<repo>, кастомный домен и т.п.)
    base: './',
    plugins: [react()],
    server: {
        port: 3000,
    },
});
