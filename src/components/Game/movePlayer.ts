import { checkOnGameEvent, getUpdatedGameObjects } from '../../gameCore/controller';
import CONSTANTS, { GAME_MODES, OBJECT_TYPES } from '../../gameCore/constants';
import type { Direction } from '../../gameCore/constants';
import type { GameObject } from '../../gameCore/types';
import LEVELS from '../../gameCore/levels/LEVELS';
import { useGameStore } from '../../stores/gameStore';
import { useDialogsStore } from '../../stores/dialogsStore';

// общий троттлинг ходов для всех источников ввода
let lockedUntil = 0;

/** Сбрасывает троттлинг ходов (нужно только в тестах). */
export const resetMoveThrottle = (): void => {
    lockedUntil = 0;
};

/** Открывает диалог события, если он ещё не прочитан. */
const openEventDialog = (eventObject: GameObject): void => {
    // TODO: OBJECT_TYPES.BATTLE — когда боевой экран перестанет быть заглушкой
    if (eventObject.type !== OBJECT_TYPES.DIALOG || eventObject.dialogId === undefined) {
        return;
    }

    const { alreadyReadIndexes, setCurrentDialog } = useDialogsStore.getState();
    if (alreadyReadIndexes.includes(eventObject.dialogId)) {
        return;
    }

    useGameStore.getState().setGameMode(GAME_MODES.SPEAKING);
    setCurrentDialog(eventObject.dialogId);
};

/**
 * Единая точка входа для всех способов управления героем:
 * клавиатура, свайпы и экранный D-pad. Ходы троттлятся скоростью
 * анимации, состояние читается из сторов императивно.
 */
export const movePlayer = (direction: Direction): void => {
    const { level, gameObjects, gameMode, setGameObjects } = useGameStore.getState();
    if (gameMode !== GAME_MODES.EXPLORING) {
        return;
    }

    const now = Date.now();
    if (now < lockedUntil) {
        return;
    }

    const levelData = LEVELS[level];
    if (!levelData) {
        return;
    }

    // обновить данные по всем игровым объектам на уровне
    const { newGameObjects, info } = getUpdatedGameObjects(
        gameObjects,
        { type: 'move', direction },
        levelData,
    );

    if (info.heroChangedPosition) {
        // троттлим только реальные перемещения: у них есть анимация сдвига,
        // которую нельзя прерывать. Поворот на месте (упёрлись в стену)
        // мгновенный, глушить из-за него следующее нажатие незачем
        lockedUntil = now + CONSTANTS.GAME_ANIMATE_SPEED;

        // события срабатывают только при заходе на клетку: иначе диалог
        // открывался бы заново на каждый ход в стену, пока герой стоит
        // на триггере
        const { eventObject } = checkOnGameEvent(newGameObjects);
        if (eventObject !== null) {
            openEventDialog(eventObject);
        }
    }

    setGameObjects(newGameObjects);
};
