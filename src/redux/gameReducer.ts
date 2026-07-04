import type { Reducer } from 'redux';
import { GAME_MODES } from '../gameCore/constants';
import type { GameMode } from '../gameCore/constants';
import type { GameObject, Level } from '../gameCore/types';

const LOAD_LEVEL = 'LOAD-LEVEL';
const SET_GAME_OBJECTS = 'SET-GAME-OBJECTS';
const SET_GAME_OBJECT_PARAMETER = 'SET-GAME-OBJECT-PARAMETER';
const SET_GAME_MODE = 'SET-GAME-MODE';

export interface GameState {
    level: number;
    gameMode: GameMode;
    gameObjects: GameObject[];
}

type LoadLevelAction = {type: typeof LOAD_LEVEL; level: Level};
type SetGameObjectsAction = {type: typeof SET_GAME_OBJECTS; gameObjects: GameObject[]};
type SetGameObjectParameterAction = {
    type: typeof SET_GAME_OBJECT_PARAMETER;
    objectId: number;
    parameter: keyof GameObject;
    value: GameObject[keyof GameObject];
};
type SetGameModeAction = {type: typeof SET_GAME_MODE; gameMode: GameMode};

export type GameActions =
    | LoadLevelAction
    | SetGameObjectsAction
    | SetGameObjectParameterAction
    | SetGameModeAction;

const initialState: GameState = {
    level: 1,
    gameMode: GAME_MODES.EXPLORING,
    // сущности приходят из данных уровня (LEVELS[n].gameObjects) при LOAD_LEVEL
    gameObjects: [],
};

const gameReducer: Reducer<GameState, GameActions> = (state = initialState, action) => {
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


export const loadLevel = (level: Level): LoadLevelAction => {
    return {
        type: LOAD_LEVEL,
        level
    };
};

export const setGameMode = (gameMode: GameMode): SetGameModeAction => {
    return {
        type: SET_GAME_MODE,
        gameMode
    };
};

export const setGameObjects = (gameObjects: GameObject[]): SetGameObjectsAction => {
    return {
        type: SET_GAME_OBJECTS,
        gameObjects
    };
};

export const setGameObjectParameter = (
    objectId: number,
    parameter: keyof GameObject,
    value: GameObject[keyof GameObject],
): SetGameObjectParameterAction => {
    return {
        type: SET_GAME_OBJECT_PARAMETER,
        objectId, parameter, value
    };
};


export default gameReducer;
