import playerSprite from '../assets/img/character/Female_Character.png'

const MOVE_TO = 'MOVE-TO';

let initialState = {
    position : [0,0],
    sprite: playerSprite,
};

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_TO:
            return {
                ...state,
                position: action.position,
            };
        default:
            return state;
    }
};

export const moveTo = (position) => {
    return {
        type: MOVE_TO,
        position
    }
};

export default characterReducer;