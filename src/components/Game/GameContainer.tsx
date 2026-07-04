import { useEffect } from 'react';
import Game from './Game';
import { checkOnGameEvent, getUpdatedGameObjects } from '../../gameCore/controller';
import CONSTANTS, { GAME_MODES, KEY_TO_DIRECTION, OBJECT_TYPES } from '../../gameCore/constants';
import LEVELS from '../../gameCore/levels/LEVELS';
import { useGameStore } from '../../stores/gameStore';
import { useDialogsStore } from '../../stores/dialogsStore';

const GameContainer = () => {
    const gameMode = useGameStore((state) => state.gameMode);

    // загрузка текущего уровня при входе на игровой экран
    useEffect(() => {
        const { level, loadLevel } = useGameStore.getState();
        const levelData = LEVELS[level];
        loadLevel(levelData);
        useDialogsStore.getState().loadDialogs(levelData.dialogs);
    }, []);

    // игровой цикл: обработчик стабилен, актуальное состояние читается
    // из сторов императивно — без протухших замыканий и переподписок
    useEffect(() => {
        let idleAnimate = false;

        const move = (direction: (typeof KEY_TO_DIRECTION)[string]) => {
            const { level, gameObjects, setGameMode, setGameObjects } = useGameStore.getState();

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

        const handleKeydown = (e: KeyboardEvent) => {
            const direction = KEY_TO_DIRECTION[e.key];
            if (
                !direction ||
                idleAnimate ||
                useGameStore.getState().gameMode !== GAME_MODES.EXPLORING
            ) {
                return;
            }
            idleAnimate = true;
            e.preventDefault();
            setTimeout(() => {
                idleAnimate = false;
            }, CONSTANTS.GAME_ANIMATE_SPEED);
            move(direction);
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    return <Game gameMode={gameMode} />;
};

export default GameContainer;
