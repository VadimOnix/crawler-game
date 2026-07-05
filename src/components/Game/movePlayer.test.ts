import { beforeEach, describe, expect, it } from 'vitest';
import { movePlayer, resetMoveThrottle } from './movePlayer';
import { DIRECTIONS, GAME_MODES, OBJECT_TYPES } from '../../gameCore/constants';
import LEVELS from '../../gameCore/levels/LEVELS';
import { useGameStore } from '../../stores/gameStore';
import { useDialogsStore } from '../../stores/dialogsStore';

const initialGameState = useGameStore.getState();
const initialDialogsState = useDialogsStore.getState();

const getHero = () =>
    useGameStore.getState().gameObjects.find((obj) => obj.type === OBJECT_TYPES.HERO);

describe('movePlayer', () => {
    beforeEach(() => {
        useGameStore.setState(initialGameState, true);
        useDialogsStore.setState(initialDialogsState, true);
        const levelData = LEVELS[1];
        useGameStore.getState().loadLevel(levelData);
        useDialogsStore.getState().loadDialogs(levelData.dialogs);
        resetMoveThrottle();
    });

    it('двигает героя на проходимую клетку', () => {
        movePlayer(DIRECTIONS.SOUTH);
        expect(getHero()?.coords).toEqual({ x: 0, y: 1 });
    });

    it('троттлит повторные ходы в пределах шага анимации', () => {
        movePlayer(DIRECTIONS.SOUTH);
        movePlayer(DIRECTIONS.SOUTH);
        expect(getHero()?.coords).toEqual({ x: 0, y: 1 });
    });

    it('открывает диалог при заходе на триггер', () => {
        // путь героя с (0,0) до диалогового триггера на (2,1)
        for (const direction of [DIRECTIONS.SOUTH, DIRECTIONS.EAST, DIRECTIONS.EAST]) {
            resetMoveThrottle();
            movePlayer(direction);
        }
        expect(getHero()?.coords).toEqual({ x: 2, y: 1 });
        expect(useGameStore.getState().gameMode).toBe(GAME_MODES.SPEAKING);
        expect(useDialogsStore.getState().currentDialogId).toBe(1);
    });

    it('не двигает героя вне режима исследования', () => {
        useGameStore.getState().setGameMode(GAME_MODES.SPEAKING);
        movePlayer(DIRECTIONS.SOUTH);
        expect(getHero()?.coords).toEqual({ x: 0, y: 0 });
    });

    it('не открывает уже прочитанный одноразовый диалог повторно', () => {
        useDialogsStore.setState({ alreadyReadIndexes: [1] });
        for (const direction of [DIRECTIONS.SOUTH, DIRECTIONS.EAST, DIRECTIONS.EAST]) {
            resetMoveThrottle();
            movePlayer(direction);
        }
        expect(getHero()?.coords).toEqual({ x: 2, y: 1 });
        expect(useGameStore.getState().gameMode).toBe(GAME_MODES.EXPLORING);
    });
});
