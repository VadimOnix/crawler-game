const CONSTANTS = {
    SPRITE_SIZE : 50,
    MAP_COLUMNS: 16,
    MAP_ROWS: 16,
    MAP_WIDTH: 800,
    MAP_HEIGHT : 800,
    FIX_TOP: 0,
    FIX_LEFT: 0,
    GAME_ANIMATE_SPEED: 300, // in milliseconds
    PHASE_COUNT_ANIMATION: 2 // start from 0 phase
};

export const GAME_MODES = Object.freeze({
    EXPLORING: 'exploring',
    SPEAKING: 'speaking',
    BATTLE: 'battle',
});

export const DIRECTIONS = Object.freeze({
    WEST: 'W',
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
});

export const KEY_TO_DIRECTION = Object.freeze({
    ArrowLeft: DIRECTIONS.WEST,
    ArrowUp: DIRECTIONS.NORTH,
    ArrowRight: DIRECTIONS.EAST,
    ArrowDown: DIRECTIONS.SOUTH,
});

export const OBJECT_TYPES = Object.freeze({
    HERO: 'hero',
    MONSTER: 'monster',
    TREASURE_CHEST: 'treasure_chest',
    DIALOG: 'dialog',
    BATTLE: 'battle',
});

export const SPEAKER_ROLES = Object.freeze({
    HERO: 'hero',
    ENEMY: 'enemy',
});

export default CONSTANTS
