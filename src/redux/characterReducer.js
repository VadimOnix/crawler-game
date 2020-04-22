import playerSprite from '../assets/img/character/Female_Character.png';

const MOVE_TO = 'MOVE-TO';
const WALK_INDEX_UPDATE = 'WALK-INDEX-UPDATE';
const PREV_DIRECTION_UPDATE = 'PREV-DIRECTION-UPDATE';

let initialState = {
    position: [0, 0],
    sprite: playerSprite,
    spritePosition: [0, 0],
    walkIndex: 0,
    prevDirection: 'S'
};

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case PREV_DIRECTION_UPDATE:
            return {
                ...state,
                prevDirection: action.prevDirection,
            };
        case MOVE_TO:
            return {
                ...state,
                position: action.position,
                spritePosition: action.spritePosition,
            };
        case WALK_INDEX_UPDATE:
            return {
                ...state,
                walkIndex: action.index
            };
        default:
            return state;
    }
};

export const prevDirectionUpdate = (prevDirection) => {
    return {
        type: PREV_DIRECTION_UPDATE,
        prevDirection
    }
};

export const walkIndexUpdate = (index) => {
    return {
        type: WALK_INDEX_UPDATE,
        index
    }
};

export const moveTo = (position, spritePosition) => {
    return {
        type: MOVE_TO,
        position, spritePosition
    };
};

export default characterReducer;