// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const Boom = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('всё сломалось');
    }
    return <p>живой контент</p>;
};

describe('ErrorBoundary', () => {
    beforeEach(() => {
        // React печатает поймённую ошибку в консоль — в выводе тестов это шум
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('пропускает детей, пока ошибок нет', () => {
        render(
            <ErrorBoundary>
                <Boom shouldThrow={false} />
            </ErrorBoundary>,
        );

        expect(screen.getByText('живой контент')).toBeTruthy();
    });

    it('показывает экран сбоя вместо чёрного экрана', () => {
        render(
            <ErrorBoundary>
                <Boom shouldThrow />
            </ErrorBoundary>,
        );

        expect(screen.getByRole('alert')).toBeTruthy();
        expect(screen.getByText('всё сломалось')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Перезагрузить' })).toBeTruthy();
    });

    it('логирует ошибку, чтобы её можно было разобрать', () => {
        render(
            <ErrorBoundary>
                <Boom shouldThrow />
            </ErrorBoundary>,
        );

        expect(console.error).toHaveBeenCalled();
    });
});
