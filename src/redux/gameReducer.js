// карта, если эксплоринг
// битва, если битва

const LOAD_LEVEL = 'LOAD-LEVEL';
const SET_GAME_OBJECTS = 'SET-GAME-OBJECTS';
const SET_GAME_OBJECT_PARAMETER = 'SET-GAME-OBJECT-PARAMETER';
const SET_GAME_MODE = 'SET-GAME-MODE';

let initialState = {
    level: 1,
    gameMode: 'exploring',
    gameObjects: [
        {
            id: 1,
            type: 'hero',
            coords: {
                x: 0,
                y: 0
            },
            sprite: '',
            spritePosition: [0, 0],
            walkIndex: 0,
            prevDirection: 'S',
            currentDirection: 'S'
        },
        {
            id: 2,
            type: 'treasure_chest',
            coords: {
                x: 5,
                y: 5
            },
            sprite: '',
            spritePosition: [0, 0],
            walkIndex: 0,
            prevDirection: 'S',
            currentDirection: 'S'
        },
        {
            id: 3,
            type: 'monster',
            coords: {
                x: 10,
                y: 10
            },
            sprite: '',
            spritePosition: [0, 0],
            walkIndex: 0,
            prevDirection: 'S',
            currentDirection: 'S'
        }
    ],


};

const gamerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LEVEL:
            return {
                ...state,
                level: action.level,
            };
        case SET_GAME_OBJECTS:
            return {
                ...state,
                gameObjects: action.gameObjects
            };
        case SET_GAME_OBJECT_PARAMETER:
            return {
                ...state,
                gameObjects: state.gameObjects.map(obj => {
                    if (obj['id'] === action.objectId && action.parameter in obj) {
                        obj[`${action.parameter}`] = action.value;
                        return obj;
                    } else {
                        return obj;
                    }
                }),
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


export const loadLevel = (level, gameObjects = undefined) => {
    return {
        type: LOAD_LEVEL,
        level, gameObjects
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


export default gamerReducer;