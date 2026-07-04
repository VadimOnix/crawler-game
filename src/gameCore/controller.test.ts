import { describe, expect, it } from 'vitest';
import CONSTANTS, { DIRECTIONS, OBJECT_TYPES } from './constants';
import {
    calculateNewCoords,
    checkOnGameEvent,
    getUpdatedGameObjects,
    isWalkable,
} from './controller';
import type { Coords, GameObject, Level, TileAsset } from './types';

const FLOOR: TileAsset = {
    type: 'floor',
    walkable: true,
    bgUrl: '',
    top: 0,
    left: 0,
    sizeX: CONSTANTS.SPRITE_SIZE,
    sizeY: CONSTANTS.SPRITE_SIZE,
};

const WALL: TileAsset = { ...FLOOR, type: 'wall', walkable: false };

/** Пустая карта 16×16 из пола (тайл 0) со стенами (тайл 1) в указанных клетках */
const makeLevel = (walls: Coords[] = [], gameObjects: GameObject[] = []): Level => {
    const levelMap = Array.from({ length: CONSTANTS.MAP_ROWS }, () =>
        Array.from({ length: CONSTANTS.MAP_COLUMNS }, () => 0),
    );
    for (const { x, y } of walls) {
        levelMap[y][x] = 1;
    }
    return {
        level: 1,
        levelMap,
        levelAssets: { 0: FLOOR, 1: WALL },
        gameObjects,
        dialogs: { speakersData: [], dialogList: {} },
    };
};

const makeHero = (coords: Coords, overrides: Partial<GameObject> = {}): GameObject => ({
    id: 1,
    type: OBJECT_TYPES.HERO,
    coords,
    sprite: 'hero.png',
    walkIndex: 0,
    prevDirection: DIRECTIONS.SOUTH,
    currentDirection: DIRECTIONS.SOUTH,
    ...overrides,
});

describe('calculateNewCoords', () => {
    it.each([
        [DIRECTIONS.WEST, { x: 4, y: 5 }],
        [DIRECTIONS.EAST, { x: 6, y: 5 }],
        [DIRECTIONS.NORTH, { x: 5, y: 4 }],
        [DIRECTIONS.SOUTH, { x: 5, y: 6 }],
    ])('двигает на соседнюю клетку в направлении %s', (direction, expected) => {
        expect(calculateNewCoords({ x: 5, y: 5 }, direction)).toEqual(expected);
    });

    it.each([
        [DIRECTIONS.WEST, { x: 0, y: 5 }],
        [DIRECTIONS.NORTH, { x: 5, y: 0 }],
        [DIRECTIONS.EAST, { x: CONSTANTS.MAP_COLUMNS - 1, y: 5 }],
        [DIRECTIONS.SOUTH, { x: 5, y: CONSTANTS.MAP_ROWS - 1 }],
    ])('не выходит за границу карты в направлении %s', (direction, edge) => {
        expect(calculateNewCoords(edge, direction)).toEqual(edge);
    });

    it('не мутирует исходные координаты', () => {
        const coords = { x: 5, y: 5 };
        calculateNewCoords(coords, DIRECTIONS.EAST);
        expect(coords).toEqual({ x: 5, y: 5 });
    });
});

describe('isWalkable', () => {
    it('возвращает walkable тайла по координатам', () => {
        const level = makeLevel([{ x: 3, y: 2 }]);
        expect(isWalkable({ x: 0, y: 0 }, level.levelMap, level.levelAssets)).toBe(true);
        expect(isWalkable({ x: 3, y: 2 }, level.levelMap, level.levelAssets)).toBe(false);
    });
});

describe('getUpdatedGameObjects', () => {
    it('двигает героя на проходимую клетку', () => {
        const hero = makeHero({ x: 5, y: 5 });
        const level = makeLevel();

        const { newGameObjects, info } = getUpdatedGameObjects(
            [hero],
            { type: 'move', direction: DIRECTIONS.EAST },
            level,
        );

        expect(newGameObjects[0].coords).toEqual({ x: 6, y: 5 });
        expect(info.heroChangedPosition).toBe(true);
    });

    it('не двигает героя в стену, но поворачивает его', () => {
        const hero = makeHero({ x: 5, y: 5 });
        const level = makeLevel([{ x: 6, y: 5 }]);

        const { newGameObjects, info } = getUpdatedGameObjects(
            [hero],
            { type: 'move', direction: DIRECTIONS.EAST },
            level,
        );

        expect(newGameObjects[0].coords).toEqual({ x: 5, y: 5 });
        expect(newGameObjects[0].currentDirection).toBe(DIRECTIONS.EAST);
        expect(info.heroChangedPosition).toBe(false);
    });

    it('упирание в край карты не считается сменой позиции', () => {
        const hero = makeHero({ x: 0, y: 0 });
        const level = makeLevel();

        const { info } = getUpdatedGameObjects(
            [hero],
            { type: 'move', direction: DIRECTIONS.WEST },
            level,
        );

        expect(info.heroChangedPosition).toBe(false);
    });

    it('не мутирует входной массив и объекты', () => {
        const hero = makeHero({ x: 5, y: 5 });
        const input = [hero];
        const level = makeLevel();

        const { newGameObjects } = getUpdatedGameObjects(
            input,
            { type: 'move', direction: DIRECTIONS.EAST },
            level,
        );

        expect(hero.coords).toEqual({ x: 5, y: 5 });
        expect(newGameObjects).not.toBe(input);
        expect(newGameObjects[0]).not.toBe(hero);
    });

    it('не трогает объекты других типов', () => {
        const hero = makeHero({ x: 5, y: 5 });
        const chest = makeHero({ x: 1, y: 1 }, { id: 2, type: OBJECT_TYPES.TREASURE_CHEST });
        const level = makeLevel();

        const { newGameObjects } = getUpdatedGameObjects(
            [hero, chest],
            { type: 'move', direction: DIRECTIONS.EAST },
            level,
        );

        expect(newGameObjects[1]).toBe(chest);
    });

    describe('анимация ходьбы (walkIndex)', () => {
        it('сбрасывается в 1 при смене направления', () => {
            const hero = makeHero(
                { x: 5, y: 5 },
                { walkIndex: 2, prevDirection: DIRECTIONS.SOUTH },
            );
            const { newGameObjects } = getUpdatedGameObjects(
                [hero],
                { type: 'move', direction: DIRECTIONS.EAST },
                makeLevel(),
            );
            expect(newGameObjects[0].walkIndex).toBe(1);
        });

        it('инкрементируется при движении в том же направлении', () => {
            const hero = makeHero({ x: 5, y: 5 }, { walkIndex: 1, prevDirection: DIRECTIONS.EAST });
            const { newGameObjects } = getUpdatedGameObjects(
                [hero],
                { type: 'move', direction: DIRECTIONS.EAST },
                makeLevel(),
            );
            expect(newGameObjects[0].walkIndex).toBe(2);
        });

        it('зацикливается после последней фазы', () => {
            const hero = makeHero(
                { x: 5, y: 5 },
                { walkIndex: CONSTANTS.PHASE_COUNT_ANIMATION, prevDirection: DIRECTIONS.EAST },
            );
            const { newGameObjects } = getUpdatedGameObjects(
                [hero],
                { type: 'move', direction: DIRECTIONS.EAST },
                makeLevel(),
            );
            expect(newGameObjects[0].walkIndex).toBe(0);
        });
    });
});

describe('checkOnGameEvent', () => {
    it('находит диалоговый триггер на клетке героя', () => {
        const hero = makeHero({ x: 2, y: 1 });
        const trigger = makeHero(
            { x: 2, y: 1 },
            { id: 4, type: OBJECT_TYPES.DIALOG, sprite: '', dialogId: 1 },
        );

        const result = checkOnGameEvent([hero, trigger]);

        expect(result.isGameEvent).toBe(true);
        expect(result.eventObject).toBe(trigger);
    });

    it('не срабатывает, если герой на другой клетке', () => {
        const hero = makeHero({ x: 0, y: 0 });
        const trigger = makeHero({ x: 2, y: 1 }, { id: 4, type: OBJECT_TYPES.DIALOG, sprite: '' });

        expect(checkOnGameEvent([hero, trigger])).toEqual({
            isGameEvent: false,
            eventObject: null,
        });
    });

    it('игнорирует несобытийные объекты на клетке героя', () => {
        const hero = makeHero({ x: 3, y: 3 });
        const chest = makeHero({ x: 3, y: 3 }, { id: 2, type: OBJECT_TYPES.TREASURE_CHEST });

        expect(checkOnGameEvent([hero, chest]).isGameEvent).toBe(false);
    });

    it('возвращает false, если героя нет среди объектов', () => {
        expect(checkOnGameEvent([])).toEqual({ isGameEvent: false, eventObject: null });
    });
});
