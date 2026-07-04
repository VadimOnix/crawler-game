import GameObject from './GameObject';
import CONSTANTS, { DIRECTIONS } from '../../../gameCore/constants';
import type { GameObject as GameObjectData } from '../../../gameCore/types';
import { useAppSelector } from '../../../redux/hooks';

// Ряд спрайт-листа персонажа для каждого направления взгляда
const DIRECTION_TO_SHEET_ROW = {
    [DIRECTIONS.SOUTH]: 0,
    [DIRECTIONS.WEST]: 1,
    [DIRECTIONS.NORTH]: 2,
    [DIRECTIONS.EAST]: 3,
} as const;

const getSpritePosition = (gameObject: GameObjectData, spriteSize: number): [number, number] => {
    const sheetRow = DIRECTION_TO_SHEET_ROW[gameObject.currentDirection] ?? 0;
    return [spriteSize * gameObject.walkIndex, spriteSize * sheetRow];
};

const getScreenPosition = (gameObject: GameObjectData, spriteSize: number): [number, number] => {
    return [gameObject.coords.x * spriteSize, gameObject.coords.y * spriteSize];
};

const GameObjectsContainer = () => {
    const gameObjects = useAppSelector(state => state.game.gameObjects);

    // объекты без спрайта (триггеры диалогов, заглушки) не рендерим
    return (
        <>
            {gameObjects.filter(obj => obj.sprite).map(obj => (
                <GameObject
                    position = {getScreenPosition(obj, CONSTANTS.SPRITE_SIZE)}
                    width = {CONSTANTS.SPRITE_SIZE}
                    height = {CONSTANTS.SPRITE_SIZE}
                    key = {obj.id}
                    sprite = {obj.sprite}
                    spritePosition = {getSpritePosition(obj, CONSTANTS.SPRITE_SIZE)}
                />
            ))}
        </>
    );
};

export default GameObjectsContainer;
