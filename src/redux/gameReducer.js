import { GAME_MODES } from '../gameCore/constants';

const LOAD_LEVEL = 'LOAD-LEVEL';
const SET_GAME_OBJECTS = 'SET-GAME-OBJECTS';
const SET_GAME_OBJECT_PARAMETER = 'SET-GAME-OBJECT-PARAMETER';
const SET_GAME_MODE = 'SET-GAME-MODE';


let initialState = {
    level: 1,
    gameMode: GAME_MODES.EXPLORING,
    // сущности приходят из данных уровня (LEVELS[n].gameObjects) при LOAD_LEVEL
    gameObjects: [],
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LEVEL:
            return {
                ...state,
                level: action.level.level,
                gameObjects: action.level.gameObjects,
            };
        case SET_GAME_OBJECTS:
            return {
                ...state,
                gameObjects: action.gameObjects
            };
        case SET_GAME_OBJECT_PARAMETER:
            return {
                ...state,
                gameObjects: state.gameObjects.map(obj =>
                    obj.id === action.objectId && action.parameter in obj
                        ? {...obj, [action.parameter]: action.value}
                        : obj
                ),
            };
        case SET_GAME_MODE:
            return {
                ...state,
                gameMode: action.gameMode
            };
        default:
            return state;
    }
};


export const loadLevel = (level) => {
    return {
        type: LOAD_LEVEL,
        level
    };
};

export const setGameMode = (gameMode) => {
    return {
        type: SET_GAME_MODE,
        gameMode
    };
};

export const setGameObjects = (gameObjects) => {
    return {
        type: SET_GAME_OBJECTS,
        gameObjects
    };
};

export const setGameObjectParameter = (objectId, parameter, value) => {
    return {
        type: SET_GAME_OBJECT_PARAMETER,
        objectId, parameter, value
    };
};


export default gameReducer;
