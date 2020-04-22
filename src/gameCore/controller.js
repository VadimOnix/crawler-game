import CONSTANTS from './constants';

/**
 * @function calculatePosition
 * @param {Array} prevPosition [x,y]
 * @param {string} direction  (W,N,E,S)
 * @retruns {Array} newPosition [x,y]
 * */
export const calculateNewPosition = (prevPosition, direction) => {
    let newPosition = [...prevPosition];
    switch (direction) {
        case 'W':
            if (prevPosition[0] > 0) {
                newPosition[0] = prevPosition[0] - CONSTANTS.SPRITE_SIZE;
                newPosition[1] = prevPosition[1];
            }
            return newPosition;
        case 'N':
            if (prevPosition[1] > 0) {
                newPosition[0] = prevPosition[0];
                newPosition[1] = prevPosition[1] - CONSTANTS.SPRITE_SIZE;

            }
            return newPosition;
        case 'E':
            if (prevPosition[0] < CONSTANTS.MAP_WIDTH - CONSTANTS.SPRITE_SIZE) {
                newPosition[0] = prevPosition[0] + CONSTANTS.SPRITE_SIZE;
                newPosition[1] = prevPosition[1];
            }
            return newPosition;
        case 'S': {
            if (prevPosition[1] < CONSTANTS.MAP_HEIGHT - CONSTANTS.SPRITE_SIZE) {
                newPosition[0] = prevPosition[0];
                newPosition[1] = prevPosition[1] + CONSTANTS.SPRITE_SIZE;
            }
            return newPosition;
        }
    }
    return newPosition;
};

export const waitGameAnimate = () => {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve();
        }, CONSTANTS.GAME_ANIMATE_SPEED);
    }));
};