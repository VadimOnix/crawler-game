// карта, если эксплоринг
// битва, если битва

const LOAD_LEVEL = 'LOAD-LEVEL';
const SET_MAP_LEVEL = 'SET-MAP-LEVEL';
const SET_MAP_ASSETS = 'SET-MAP-ASSETS';

let initialState = {
    level: 1,
    mapLevel: [],
    mapAssets: {
        0: {
            type: '',
            walkable: true,
            bgUrl: '',
            top: 0,
            left: 0,
            sizeX: 0,
            sizeY: 0
        }
    }
};

const gamerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LEVEL:
            return {
                ...state,
                level: action.level,
            };
        case SET_MAP_ASSETS:
            return {
                ...state,
                mapAssets: action.assetsObject,
            };
        case SET_MAP_LEVEL:
            return {
                ...state,
                mapLevel: action.map,
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

export const setMapLevel = (map) => {
    return {
        type: SET_MAP_LEVEL,
        map
    };
};

export const setMapAssets = (assetsObject) => {
    return {
        type: SET_MAP_ASSETS,
        assetsObject
    };
};

export default gamerReducer;