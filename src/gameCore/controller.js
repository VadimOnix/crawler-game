import CONSTANTS from './constants';
import { cloneDeep } from 'lodash';
import LEVELS from './levels/LEVELS';

/**
 * @function calculatePosition
 * @param {Object} prevCoords {x,y}
 * @param {string} direction  (W,N,E,S)
 * @retruns {Array} newPosition [x,y]
 * */
export const calculateNewCoords = (prevCoords, direction) => {
    let newCoords = {...prevCoords};
    switch (direction) {
        case 'W':
            if (prevCoords.x > 0) {
                newCoords.x = prevCoords.x - 1;
            }
            return newCoords;
        case 'N':
            if (prevCoords.y > 0) {
                newCoords.y = prevCoords.y - 1;
            }
            return newCoords;
        case 'E':
            if (prevCoords.x < CONSTANTS.MAP_COLUMNS - 1) {
                newCoords.x = prevCoords.x + 1;
            }
            return newCoords;
        case 'S': {
            if (prevCoords.y < CONSTANTS.MAP_ROWS - 1) {
                newCoords.y = prevCoords.y + 1;
            }
            return newCoords;
        }
    }
    return newCoords;
};

export const getUpdatedGameObjects = (gameObjects, action, currentLevel) => {
    let newGameObjects = cloneDeep(gameObjects);
    let heroChangedPosition = true;
    switch (action.type) {
        case 'move': {
            newGameObjects.forEach(obj => {
                switch (obj.type) {
                    case 'hero': {
                        // calculate new walkIndex
                        let newWalkIndex = obj.walkIndex;
                        obj.currentDirection = action.direction;

                        if (action.direction === obj.prevDirection) {
                            if (newWalkIndex < CONSTANTS.PHASE_COUNT_ANIMATION) {
                                newWalkIndex += 1;
                            } else {
                                newWalkIndex = 0;
                            }
                        } else {
                            obj.prevDirection = action.direction;
                            newWalkIndex = 1;
                        }

                        obj.walkIndex = newWalkIndex;


                        // calculate new move coordinates
                        let newCoords = calculateNewCoords(obj.coords, action.direction);
                        let validated = validateNextCoordinateForMove(newCoords, LEVELS[currentLevel].levelMap, LEVELS[currentLevel].levelAssets);

                        if (
                            ((newCoords.x !== obj.coords.x) || (newCoords.y !== obj.coords.y)) && validated
                        ) {
                            obj.coords = {x: newCoords.x, y: newCoords.y};
                        } else {
                            heroChangedPosition = false;
                        }
                    }
                    // TODO: add another types
                }
            });

        }
    }
    return {
        newGameObjects,
        info: {
            heroChangedPosition
        }
    };
};

export const checkOnGameEvent = (gameObjects) => {
    let result = {isGameEvent: false, eventObject: null};
    let heroPos = gameObjects.find(obj => obj.type === 'hero').coords;
    gameObjects.forEach(obj => {
        if (obj.type === 'dialog' || obj.type === 'battle') {
            if (obj.coords.x === heroPos.x && obj.coords.y === heroPos.y) {
                result = {isGameEvent: true, eventObject: obj};
                return result;
            }
        }
    });
    return result;
};

export const validateNextCoordinateForMove = (newCoords, levelMap, levelAssets) => {
    let x = newCoords.x;
    let y = newCoords.y;
    return levelAssets[levelMap[y][x]].walkable;
};
