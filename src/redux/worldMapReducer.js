// отображать текущую карту
const SET_LEVEL_MAP = 'SET-LEVEL-MAP';
const SET_ASSETS_MAP = 'SET-MAP-ASSETS';

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
        case SET_ASSETS_MAP:
            return {
                ...state,
                mapAssets: action.assetsObject,
            };
        case SET_LEVEL_MAP:
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
        type: SET_ASSETS_MAP,
        assetsObject
    };
};

export const setLevelMap = (map) => {
    return {
        type: SET_LEVEL_MAP,
        map
    };
};

export default worldMapReducer;