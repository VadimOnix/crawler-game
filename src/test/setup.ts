import { afterEach } from 'vitest';

// По умолчанию тесты идут в node-окружении: чистая логика gameCore и сторы
// в DOM не нуждаются. Компонентные тесты просят jsdom докблоком
// `@vitest-environment jsdom`, и только для них нужно размонтировать
// отрендеренные деревья между кейсами.
afterEach(async () => {
    if (typeof document === 'undefined') {
        return;
    }
    const { cleanup } = await import('@testing-library/react');
    cleanup();
});
