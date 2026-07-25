// @vitest-environment jsdom
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Dialog from './Dialog';
import { GAME_MODES, SPEAKER_ROLES } from '../../../gameCore/constants';
import type { LevelDialogs } from '../../../gameCore/types';
import { useGameStore } from '../../../stores/gameStore';
import { useDialogsStore } from '../../../stores/dialogsStore';

const DIALOGS: LevelDialogs = {
    speakersData: [
        { name: 'Leia', role: SPEAKER_ROLES.HERO, sprite: 'leia.png' },
        { name: 'Grimm', role: SPEAKER_ROLES.ENEMY, sprite: 'grimm.png' },
    ],
    dialogList: {
        1: {
            isDisposable: true,
            phrases: [
                { speaker: 'Leia', text: 'первая фраза' },
                { speaker: 'Grimm', text: 'вторая фраза' },
            ],
        },
    },
};

const initialGameState = useGameStore.getState();
const initialDialogsState = useDialogsStore.getState();

/** Нажатие Enter по window — так же, как это делает игрок. */
const pressEnter = () => act(() => void fireEvent.keyDown(window, { key: 'Enter' }));

describe('Dialog', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        useGameStore.setState(initialGameState, true);
        useDialogsStore.setState(initialDialogsState, true);
        useDialogsStore.getState().loadDialogs(DIALOGS);
        useDialogsStore.getState().setCurrentDialog(1);
    });

    /** Промотать таймеры печати, чтобы фраза напечаталась целиком. */
    const finishTypewriter = () => act(() => void vi.advanceTimersByTime(2000));

    it('печатает первую фразу и её говорящего', () => {
        render(<Dialog />);

        expect(screen.getByRole('heading').textContent).toBe('Leia');
        finishTypewriter();
        expect(screen.getByText('первая фраза')).toBeTruthy();
    });

    it('объявляет себя диалогом и забирает фокус', () => {
        render(<Dialog />);

        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('aria-modal')).toBe('true');
        expect(dialog.getAttribute('aria-label')).toBe('Диалог');
        expect(document.activeElement).toBe(dialog);
    });

    it('помечает область фразы как живую, чтобы скринридер её зачитал', () => {
        const { container } = render(<Dialog />);

        const live = container.querySelector('[aria-live="polite"]');
        expect(live).toBeTruthy();
        // пока идёт печать, зачитывать нечего
        expect(live?.getAttribute('aria-busy')).toBe('true');

        pressEnter();

        expect(live?.getAttribute('aria-busy')).toBe('false');
    });

    it('Enter допечатывает фразу, не листая её', () => {
        render(<Dialog />);

        // до нажатия текст ещё печатается — виден курсор
        pressEnter();

        expect(useDialogsStore.getState().typing).toBe(false);
        expect(screen.getByText('первая фраза')).toBeTruthy();
        expect(screen.getByRole('heading').textContent).toBe('Leia');
    });

    it('следующий Enter листает на вторую фразу', () => {
        render(<Dialog />);

        pressEnter(); // допечатать
        pressEnter(); // листнуть
        finishTypewriter();

        expect(screen.getByText('вторая фраза')).toBeTruthy();
        expect(useGameStore.getState().gameMode).toBe(GAME_MODES.EXPLORING);
    });

    it('на последней фразе возвращает режим исследования и помечает диалог прочитанным', () => {
        useGameStore.getState().setGameMode(GAME_MODES.SPEAKING);
        render(<Dialog />);

        pressEnter(); // допечатать первую
        pressEnter(); // листнуть на вторую
        pressEnter(); // допечатать вторую
        pressEnter(); // закрыть

        expect(useGameStore.getState().gameMode).toBe(GAME_MODES.EXPLORING);
        expect(useDialogsStore.getState().alreadyReadIndexes).toContain(1);
        expect(useDialogsStore.getState().currentDialogId).toBe(0);
    });

    it('тап по диалогу продвигает его так же, как Enter', () => {
        render(<Dialog />);

        act(() => void fireEvent.click(screen.getByText('Leia')));

        expect(useDialogsStore.getState().typing).toBe(false);
    });

    it('снимает слушатель клавиатуры при размонтировании', () => {
        const { unmount } = render(<Dialog />);
        pressEnter();
        unmount();

        useDialogsStore.getState().setTyping(true);
        pressEnter();

        // после размонтирования нажатия больше ничего не переключают
        expect(useDialogsStore.getState().typing).toBe(true);
    });
});
