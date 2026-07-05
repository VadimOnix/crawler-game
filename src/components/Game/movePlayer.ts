import { checkOnGameEvent, getUpdatedGameObjects } from '../../gameCore/controller';
import CONSTANTS, { GAME_MODES, OBJECT_TYPES } from '../../gameCore/constants';
import type { Direction } from '../../gameCore/constants';
import LEVELS from '../../gameCore/levels/LEVELS';
import { useGameStore } from '../../stores/gameStore';
import { useDialogsStore } from '../../stores/dialogsStore';

// общий троттлинг ходов для всех источников ввода
let lockedUntil = 0;

/** Сбрасывает троттлинг ходов (нужно только в тестах). */
export const resetMoveThrottle = (): void => {
    lockedUntil = 0;
};

/**
 * Единая точка входа для всех способов управления героем:
 * клавиатура, свайпы и экранный D-pad. Ходы троттлятся скоростью
 * анимации, состояние читается из сторов императивно.
 */
export const movePlayer = (direction: Direction): void => {
    const { level, gameObjects, gameMode, setGameMode, setGameObjects } = useGameStore.getState();
    if (gameMode !== GAME_MODES.EXPLORING) {
        return;
    }

    const now = Date.now();
    if (now < lockedUntil) {
        return;
    }
    lockedUntil = now + CONSTANTS.GAME_ANIMATE_SPEED;

    // обновить данные по всем игровым объектам на уровне
    const updatedGameObjects = getUpdatedGameObjects(
        gameObjects,
        { type: 'move', direction },
        LEVELS[level],
    );

    const event = checkOnGameEvent(updatedGameObjects.newGameObjects);
    const { alreadyReadIndexes, setCurrentDialog } = useDialogsStore.getState();
    if (
        event.isGameEvent &&
        event.eventObject !== null &&
        event.eventObject.type === OBJECT_TYPES.DIALOG &&
        event.eventObject.dialogId !== undefined &&
        !alreadyReadIndexes.includes(event.eventObject.dialogId)
    ) {
        setGameMode(GAME_MODES.SPEAKING);
        setCurrentDialog(event.eventObject.dialogId);
    }
    setGameObjects(updatedGameObjects.newGameObjects);
};
