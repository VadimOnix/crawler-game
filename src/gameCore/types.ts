import type { Direction, GameObjectType, SpeakerRole, TileType } from './constants';

export interface Coords {
    x: number;
    y: number;
}

export interface GameObject {
    id: number;
    type: GameObjectType;
    coords: Coords;
    /** URL спрайт-листа; пустая строка — объект не рендерится */
    sprite: string;
    walkIndex: number;
    prevDirection: Direction;
    currentDirection: Direction;
    /** только для объектов типа dialog */
    dialogId?: number;
}

export interface TileAsset {
    type: TileType;
    walkable: boolean;
    bgUrl: string;
    top: number;
    left: number;
    sizeX: number;
    sizeY: number;
}

export interface Speaker {
    name: string;
    role: SpeakerRole;
    sprite: string;
}

export interface DialogPhrase {
    speaker: string;
    text: string;
}

export interface Dialog {
    isDisposable: boolean;
    phrases: DialogPhrase[];
}

export interface LevelDialogs {
    speakersData: Speaker[];
    dialogList: Record<number, Dialog>;
}

export interface Level {
    level: number;
    levelMap: number[][];
    levelAssets: Record<number, TileAsset>;
    gameObjects: GameObject[];
    dialogs: LevelDialogs;
}

export type GameAction = {
    type: 'move';
    direction: Direction;
};

export interface GameEventCheck {
    eventObject: GameObject | null;
}
