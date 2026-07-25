import { beforeEach, describe, expect, it } from 'vitest';
import { GAME_MODES } from '../gameCore/constants';
import LEVELS from '../gameCore/levels/LEVELS';
import { useGameStore } from './gameStore';

const initialState = useGameStore.getState();

describe('gameStore', () => {
    beforeEach(() => {
        useGameStore.setState(initialState, true);
    });

    it('loadLevel кладёт номер уровня и его объекты в стор', () => {
        useGameStore.getState().loadLevel(LEVELS[1]);

        const state = useGameStore.getState();
        expect(state.level).toBe(1);
        expect(state.gameObjects).toEqual(LEVELS[1].gameObjects);
    });

    it('loadLevel возвращает режим исследования', () => {
        useGameStore.getState().setGameMode(GAME_MODES.SPEAKING);

        useGameStore.getState().loadLevel(LEVELS[1]);

        expect(useGameStore.getState().gameMode).toBe(GAME_MODES.EXPLORING);
    });

    it('loadLevel не мутирует объекты уровня', () => {
        useGameStore.getState().loadLevel(LEVELS[1]);
        const [firstObject] = useGameStore.getState().gameObjects;

        useGameStore.getState().setGameObjects([{ ...firstObject, coords: { x: 9, y: 9 } }]);
        useGameStore.getState().loadLevel(LEVELS[1]);

        expect(useGameStore.getState().gameObjects).toEqual(LEVELS[1].gameObjects);
    });
});
