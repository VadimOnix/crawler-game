import { useEffect, useRef } from 'react';
import Game from './Game';
import TouchControls from './TouchControls/TouchControls';
import classes from './Game.module.sass';
import CONSTANTS, { DIRECTIONS, KEY_TO_DIRECTION, OBJECT_TYPES } from '../../gameCore/constants';
import LEVELS from '../../gameCore/levels/LEVELS';
import { useGameStore } from '../../stores/gameStore';
import { useDialogsStore } from '../../stores/dialogsStore';
import { movePlayer } from './movePlayer';

// минимальная длина жеста, чтобы отличить свайп от тапа
const SWIPE_MIN_DISTANCE = 24;

const GameContainer = () => {
    const gameMode = useGameStore((state) => state.gameMode);
    const heroX = useGameStore(
        (state) => state.gameObjects.find((obj) => obj.type === OBJECT_TYPES.HERO)?.coords.x,
    );
    const heroY = useGameStore(
        (state) => state.gameObjects.find((obj) => obj.type === OBJECT_TYPES.HERO)?.coords.y,
    );

    const viewportRef = useRef<HTMLDivElement>(null);
    const cameraInitializedRef = useRef(false);

    // загрузка текущего уровня при входе на игровой экран
    useEffect(() => {
        const { level, loadLevel } = useGameStore.getState();
        const levelData = LEVELS[level];
        loadLevel(levelData);
        useDialogsStore.getState().loadDialogs(levelData.dialogs);
    }, []);

    // клавиатура: обработчик стабилен, актуальное состояние читается
    // из сторов императивно — без протухших замыканий и переподписок
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            const direction = KEY_TO_DIRECTION[e.key];
            if (!direction) {
                return;
            }
            e.preventDefault();
            movePlayer(direction);
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    // сенсорные экраны: свайп по полю двигает героя
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return;
        }

        let startX = 0;
        let startY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_MIN_DISTANCE) {
                return;
            }
            const direction =
                Math.abs(dx) > Math.abs(dy)
                    ? dx > 0
                        ? DIRECTIONS.EAST
                        : DIRECTIONS.WEST
                    : dy > 0
                      ? DIRECTIONS.SOUTH
                      : DIRECTIONS.NORTH;
            movePlayer(direction);
        };

        viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
        viewport.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            viewport.removeEventListener('touchstart', handleTouchStart);
            viewport.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    // камера: держит героя в центре вьюпорта; на десктопе поле помещается
    // целиком и scrollTo превращается в no-op
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport || heroX === undefined || heroY === undefined) {
            return;
        }
        const half = CONSTANTS.SPRITE_SIZE / 2;
        viewport.scrollTo({
            left: heroX * CONSTANTS.SPRITE_SIZE + half - viewport.clientWidth / 2,
            top: heroY * CONSTANTS.SPRITE_SIZE + half - viewport.clientHeight / 2,
            behavior: cameraInitializedRef.current ? 'smooth' : 'auto',
        });
        cameraInitializedRef.current = true;
    }, [heroX, heroY]);

    return (
        <div className={classes.viewport} ref={viewportRef}>
            <Game gameMode={gameMode} />
            <TouchControls />
        </div>
    );
};

export default GameContainer;
