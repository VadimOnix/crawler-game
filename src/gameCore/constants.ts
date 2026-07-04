const CONSTANTS = {
    SPRITE_SIZE: 50,
    MAP_COLUMNS: 16,
    MAP_ROWS: 16,
    MAP_WIDTH: 800,
    MAP_HEIGHT: 800,
    FIX_TOP: 0,
    FIX_LEFT: 0,
    GAME_ANIMATE_SPEED: 300, // in milliseconds
    PHASE_COUNT_ANIMATION: 2, // start from 0 phase
} as const;

export const GAME_MODES = Object.freeze({
    EXPLORING: 'exploring',
    SPEAKING: 'speaking',
    BATTLE: 'battle',
} as const);

export type GameMode = (typeof GAME_MODES)[keyof typeof GAME_MODES];

export const DIRECTIONS = Object.freeze({
    WEST: 'W',
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
} as const);

export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

export const KEY_TO_DIRECTION: Readonly<Record<string, Direction>> = Object.freeze({
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
} as const);

export type GameObjectType = (typeof OBJECT_TYPES)[keyof typeof OBJECT_TYPES];

export const SPEAKER_ROLES = Object.freeze({
    HERO: 'hero',
    ENEMY: 'enemy',
} as const);

export type SpeakerRole = (typeof SPEAKER_ROLES)[keyof typeof SPEAKER_ROLES];

export default CONSTANTS;
