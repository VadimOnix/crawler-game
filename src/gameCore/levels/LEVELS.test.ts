import { describe, expect, it } from 'vitest';
import CONSTANTS, { DIRECTIONS, OBJECT_TYPES } from '../constants';
import { isWalkable } from '../controller';
import LEVELS from './LEVELS';
import type { Level } from '../types';

/**
 * Данные уровней — самая «немая» часть проекта: сетка тайлов и объекты
 * набираются руками, а рантайм на ошибку в них теперь не падает (isWalkable
 * считает неизвестный тайл стеной). Поэтому опечатки должны отлавливаться
 * здесь, а не проявляться непроходимой клеткой в игре.
 */
const levels = Object.entries(LEVELS) as Array<[string, Level]>;

describe('LEVELS', () => {
    it('содержит хотя бы один уровень', () => {
        expect(levels.length).toBeGreaterThan(0);
    });

    describe.each(levels)('уровень %s', (key, level) => {
        it('номер уровня совпадает с ключом в LEVELS', () => {
            expect(level.level).toBe(Number(key));
        });

        it('сетка карты имеет размеры из констант', () => {
            expect(level.levelMap).toHaveLength(CONSTANTS.MAP_ROWS);
            for (const row of level.levelMap) {
                expect(row).toHaveLength(CONSTANTS.MAP_COLUMNS);
            }
        });

        it('каждый тайл сетки описан в ассетах уровня', () => {
            const unknown = new Set<number>();
            for (const row of level.levelMap) {
                for (const tileId of row) {
                    if (level.levelAssets[tileId] === undefined) {
                        unknown.add(tileId);
                    }
                }
            }
            expect([...unknown]).toEqual([]);
        });

        it('на уровне ровно один герой', () => {
            const heroes = level.gameObjects.filter((obj) => obj.type === OBJECT_TYPES.HERO);
            expect(heroes).toHaveLength(1);
        });

        it('идентификаторы объектов уникальны', () => {
            const ids = level.gameObjects.map((obj) => obj.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('все объекты стоят в границах карты', () => {
            for (const obj of level.gameObjects) {
                expect(obj.coords.x).toBeGreaterThanOrEqual(0);
                expect(obj.coords.x).toBeLessThan(CONSTANTS.MAP_COLUMNS);
                expect(obj.coords.y).toBeGreaterThanOrEqual(0);
                expect(obj.coords.y).toBeLessThan(CONSTANTS.MAP_ROWS);
            }
        });

        it('направления взгляда объектов — из DIRECTIONS', () => {
            const directions = Object.values(DIRECTIONS);
            for (const obj of level.gameObjects) {
                expect(directions).toContain(obj.currentDirection);
                expect(directions).toContain(obj.prevDirection);
            }
        });

        it('герой стоит на проходимой клетке', () => {
            const hero = level.gameObjects.find((obj) => obj.type === OBJECT_TYPES.HERO);
            expect(hero).toBeDefined();
            expect(isWalkable(hero!.coords, level.levelMap, level.levelAssets)).toBe(true);
        });

        it('триггеры диалогов лежат на проходимых клетках', () => {
            // на непроходимую клетку герой не зайдёт, значит триггер мёртв
            const triggers = level.gameObjects.filter((obj) => obj.type === OBJECT_TYPES.DIALOG);
            for (const trigger of triggers) {
                expect(isWalkable(trigger.coords, level.levelMap, level.levelAssets)).toBe(true);
            }
        });

        it('у каждого триггера диалога есть существующий dialogId', () => {
            const triggers = level.gameObjects.filter((obj) => obj.type === OBJECT_TYPES.DIALOG);
            for (const trigger of triggers) {
                expect(trigger.dialogId).toBeDefined();
                expect(level.dialogs.dialogList[trigger.dialogId!]).toBeDefined();
            }
        });

        it('каждая фраза принадлежит объявленному говорящему', () => {
            const speakers = new Set(level.dialogs.speakersData.map((speaker) => speaker.name));
            for (const dialog of Object.values(level.dialogs.dialogList)) {
                expect(dialog.phrases.length).toBeGreaterThan(0);
                for (const phrase of dialog.phrases) {
                    expect(speakers).toContain(phrase.speaker);
                }
            }
        });

        it('каждый диалог достижим хотя бы одним триггером', () => {
            const triggered = new Set(
                level.gameObjects
                    .filter((obj) => obj.type === OBJECT_TYPES.DIALOG)
                    .map((obj) => obj.dialogId),
            );
            for (const dialogId of Object.keys(level.dialogs.dialogList)) {
                expect(triggered).toContain(Number(dialogId));
            }
        });
    });
});
