// @vitest-environment jsdom
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TouchControls from './TouchControls';
import CONSTANTS, { GAME_MODES, OBJECT_TYPES } from '../../../gameCore/constants';
import LEVELS from '../../../gameCore/levels/LEVELS';
import { useGameStore } from '../../../stores/gameStore';
import { useDialogsStore } from '../../../stores/dialogsStore';
import { resetMoveThrottle } from '../movePlayer';

const initialGameState = useGameStore.getState();
const initialDialogsState = useDialogsStore.getState();

const heroCoords = () =>
    useGameStore.getState().gameObjects.find((obj) => obj.type === OBJECT_TYPES.HERO)?.coords;

/** Удержание кнопки: pointerdown без последующего pointerup. */
const holdButton = (label: string) =>
    act(() => void fireEvent.pointerDown(screen.getByRole('button', { name: label })));

const releaseButton = (label: string) =>
    act(() => void fireEvent.pointerUp(screen.getByRole('button', { name: label })));

/** Прокрутить n шагов автоповтора. */
const advanceSteps = (n: number) =>
    act(() => void vi.advanceTimersByTime(CONSTANTS.GAME_ANIMATE_SPEED * n));

describe('TouchControls', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        useGameStore.setState(initialGameState, true);
        useDialogsStore.setState(initialDialogsState, true);
        useGameStore.getState().loadLevel(LEVELS[1]);
        useDialogsStore.getState().loadDialogs(LEVELS[1].dialogs);
        resetMoveThrottle();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('рисует все четыре направления', () => {
        render(<TouchControls />);

        for (const label of ['Вверх', 'Вниз', 'Влево', 'Вправо']) {
            expect(screen.getByRole('button', { name: label })).toBeTruthy();
        }
    });

    it('нажатие сразу делает один ход', () => {
        render(<TouchControls />);

        holdButton('Вниз');

        expect(heroCoords()).toEqual({ x: 0, y: 1 });
    });

    it('удержание повторяет ходы с шагом анимации', () => {
        render(<TouchControls />);

        holdButton('Вниз');
        advanceSteps(2);

        expect(heroCoords()).toEqual({ x: 0, y: 3 });
    });

    it('отпускание кнопки прекращает автоповтор', () => {
        render(<TouchControls />);

        holdButton('Вниз');
        releaseButton('Вниз');
        advanceSteps(5);

        expect(heroCoords()).toEqual({ x: 0, y: 1 });
    });

    it('прячется вне режима исследования', () => {
        useGameStore.getState().setGameMode(GAME_MODES.SPEAKING);

        render(<TouchControls />);

        expect(screen.queryByRole('button', { name: 'Вниз' })).toBeNull();
    });

    it('глушит автоповтор, когда ход открыл диалог и кнопка исчезла до pointerup', () => {
        render(<TouchControls />);

        // (0,0) -> (0,1) -> (1,1) -> (2,1): на последней клетке триггер диалога
        holdButton('Вниз');
        releaseButton('Вниз');
        resetMoveThrottle();
        holdButton('Вправо');
        advanceSteps(1);

        // режим сменился на SPEAKING, кнопка размонтировалась без pointerup
        expect(useGameStore.getState().gameMode).toBe(GAME_MODES.SPEAKING);
        expect(heroCoords()).toEqual({ x: 2, y: 1 });

        // автоповтор не должен продолжать двигать героя
        advanceSteps(5);
        expect(heroCoords()).toEqual({ x: 2, y: 1 });
    });
});
