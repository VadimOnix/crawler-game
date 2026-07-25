// @vitest-environment jsdom
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TypingText from './TypingText';
import { REDUCED_MOTION_QUERY } from '../../../utils/useReducedMotion';

/** Заставляет matchMedia отвечать `matches: true` на запрос про движение. */
const stubReducedMotion = (reduced: boolean) => {
    vi.stubGlobal('matchMedia', (query: string) => ({
        matches: reduced && query === REDUCED_MOTION_QUERY,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
    }));
};

describe('TypingText', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    it('печатает текст посимвольно', () => {
        stubReducedMotion(false);
        const onFinishedTyping = vi.fn();
        render(<TypingText text="привет" speed={10} onFinishedTyping={onFinishedTyping} />);

        // до промотки таймеров ничего ещё не напечатано
        expect(screen.queryByText('привет')).toBeNull();
        expect(onFinishedTyping).not.toHaveBeenCalled();

        act(() => void vi.advanceTimersByTime(10 * 'привет'.length));

        expect(screen.getByText(/привет/)).toBeTruthy();
        expect(onFinishedTyping).toHaveBeenCalled();
    });

    it('при prefers-reduced-motion показывает текст сразу, без печати', () => {
        stubReducedMotion(true);
        const onFinishedTyping = vi.fn();
        render(<TypingText text="привет" speed={10} onFinishedTyping={onFinishedTyping} />);

        // ни одного таймера промотать не нужно
        expect(screen.getByText('привет')).toBeTruthy();
        expect(onFinishedTyping).toHaveBeenCalled();
    });

    it('не показывает курсор, когда печатать больше нечего', () => {
        stubReducedMotion(true);
        const { container } = render(<TypingText text="привет" cursorClassName="cursor" />);

        expect(container.querySelector('.cursor')).toBeNull();
    });
});
