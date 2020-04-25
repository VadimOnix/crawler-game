// отображать текущую карту
const SET_MAP_LEVEL = 'SET-MAP-LEVEL';
const SET_MAP_ASSETS = 'SET-MAP-ASSETS';

let initialState = {
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

const worldMapReducer = (state = initialState, action) => {
    switch (action.type) {
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

export const setMapAssets = (assetsObject) => {
    return {
        type: SET_MAP_ASSETS,
        assetsObject
    };
};

export const setMapLevel = (map) => {
    return {
        type: SET_MAP_LEVEL,
        map
    };
};

export default worldMapReducer;