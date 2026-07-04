import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GAME_MODES } from '../gameCore/constants';
import type { GameMode } from '../gameCore/constants';
import type { GameObject, Level } from '../gameCore/types';

interface GameStore {
    level: number;
    gameMode: GameMode;
    gameObjects: GameObject[];
    loadLevel: (level: Level) => void;
    setGameMode: (gameMode: GameMode) => void;
    setGameObjects: (gameObjects: GameObject[]) => void;
}

export const useGameStore = create<GameStore>()(
    devtools(
        (set) => ({
            level: 1,
            gameMode: GAME_MODES.EXPLORING,
            // сущности приходят из данных уровня (LEVELS[n].gameObjects) при loadLevel
            gameObjects: [],

            loadLevel: (level) => set(
                {level: level.level, gameObjects: level.gameObjects},
                false, 'loadLevel'),
            setGameMode: (gameMode) => set({gameMode}, false, 'setGameMode'),
            setGameObjects: (gameObjects) => set({gameObjects}, false, 'setGameObjects'),
        }),
        {name: 'game'},
    ),
);
