import CONSTANTS, { DIRECTIONS, OBJECT_TYPES } from './constants';

/**
 * @function calculateNewCoords
 * @param {Object} prevCoords {x,y}
 * @param {string} direction  (W,N,E,S)
 * @returns {Object} newCoords {x,y}, clamped to the map bounds
 * */
export const calculateNewCoords = (prevCoords, direction) => {
    let newCoords = {...prevCoords};
    switch (direction) {
        case DIRECTIONS.WEST:
            if (prevCoords.x > 0) {
                newCoords.x = prevCoords.x - 1;
            }
            return newCoords;
        case DIRECTIONS.NORTH:
            if (prevCoords.y > 0) {
                newCoords.y = prevCoords.y - 1;
            }
            return newCoords;
        case DIRECTIONS.EAST:
            if (prevCoords.x < CONSTANTS.MAP_COLUMNS - 1) {
                newCoords.x = prevCoords.x + 1;
            }
            return newCoords;
        case DIRECTIONS.SOUTH:
            if (prevCoords.y < CONSTANTS.MAP_ROWS - 1) {
                newCoords.y = prevCoords.y + 1;
            }
            return newCoords;
        default:
            return newCoords;
    }
};

/**
 * Продвигает индекс фазы анимации ходьбы или начинает цикл заново
 * при смене направления.
 */
const calculateWalkIndex = (gameObject, direction) => {
    if (direction !== gameObject.prevDirection) {
        return 1;
    }
    return gameObject.walkIndex < CONSTANTS.PHASE_COUNT_ANIMATION
        ? gameObject.walkIndex + 1
        : 0;
};

/**
 * Чистая функция игрового тика: принимает текущие объекты, действие игрока
 * и данные уровня, возвращает НОВЫЙ массив объектов (без мутации входа).
 *
 * @param {Array} gameObjects
 * @param {{type: string, direction?: string}} action
 * @param {Object} level - объект уровня из LEVELS (levelMap + levelAssets)
 */
export const getUpdatedGameObjects = (gameObjects, action, level) => {
    let heroChangedPosition = true;

    const newGameObjects = gameObjects.map(obj => {
        switch (action.type) {
            case 'move': {
                if (obj.type !== OBJECT_TYPES.HERO) {
                    // TODO: add another types
                    return obj;
                }

                const newCoords = calculateNewCoords(obj.coords, action.direction);
                const canMove = isWalkable(newCoords, level.levelMap, level.levelAssets);
                const positionChanged = canMove &&
                    (newCoords.x !== obj.coords.x || newCoords.y !== obj.coords.y);

                if (!positionChanged) {
                    heroChangedPosition = false;
                }

                return {
                    ...obj,
                    currentDirection: action.direction,
                    prevDirection: action.direction,
                    walkIndex: calculateWalkIndex(obj, action.direction),
                    coords: positionChanged ? newCoords : obj.coords,
                };
            }
            default:
                return obj;
        }
    });

    return {
        newGameObjects,
        info: {
            heroChangedPosition
        }
    };
};

/**
 * Ищет событийный объект (диалог, битва) на клетке героя.
 */
export const checkOnGameEvent = (gameObjects) => {
    const heroPos = gameObjects.find(obj => obj.type === OBJECT_TYPES.HERO).coords;
    const eventObject = gameObjects.find(obj =>
        (obj.type === OBJECT_TYPES.DIALOG || obj.type === OBJECT_TYPES.BATTLE) &&
        obj.coords.x === heroPos.x && obj.coords.y === heroPos.y
    );
    return {
        isGameEvent: eventObject !== undefined,
        eventObject: eventObject ?? null
    };
};

export const isWalkable = (coords, levelMap, levelAssets) => {
    return levelAssets[levelMap[coords.y][coords.x]].walkable;
};
