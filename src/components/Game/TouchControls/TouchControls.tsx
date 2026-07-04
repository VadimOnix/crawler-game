import { useCallback, useEffect, useRef } from 'react';
import classes from './TouchControls.module.sass';
import CONSTANTS, { DIRECTIONS, GAME_MODES } from '../../../gameCore/constants';
import type { Direction } from '../../../gameCore/constants';
import { useGameStore } from '../../../stores/gameStore';
import { movePlayer } from '../movePlayer';

const BUTTONS: Array<{ direction: Direction; className: string; label: string; glyph: string }> = [
    { direction: DIRECTIONS.NORTH, className: 'up', label: 'Вверх', glyph: '▲' },
    { direction: DIRECTIONS.WEST, className: 'left', label: 'Влево', glyph: '◀' },
    { direction: DIRECTIONS.EAST, className: 'right', label: 'Вправо', glyph: '▶' },
    { direction: DIRECTIONS.SOUTH, className: 'down', label: 'Вниз', glyph: '▼' },
];

/**
 * Экранный D-pad для сенсорных устройств (виден только при pointer: coarse).
 * Удержание кнопки двигает героя непрерывно с шагом анимации.
 */
const TouchControls = () => {
    const isExploring = useGameStore((state) => state.gameMode === GAME_MODES.EXPLORING);

    const repeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopMoving = useCallback(() => {
        if (repeatRef.current !== null) {
            clearInterval(repeatRef.current);
            repeatRef.current = null;
        }
    }, []);

    const startMoving = useCallback(
        (direction: Direction) => {
            stopMoving();
            movePlayer(direction);
            repeatRef.current = setInterval(
                () => movePlayer(direction),
                CONSTANTS.GAME_ANIMATE_SPEED,
            );
        },
        [stopMoving],
    );

    // когда ход открывает диалог, кнопка исчезает из DOM раньше pointerup
    // и события отпускания не будет — глушим автоповтор по смене режима
    useEffect(() => {
        if (!isExploring) {
            stopMoving();
        }
        return stopMoving;
    }, [isExploring, stopMoving]);

    if (!isExploring) {
        return null;
    }

    return (
        <div className={classes.dpad}>
            {BUTTONS.map((button) => (
                <button
                    key={button.direction}
                    type="button"
                    aria-label={button.label}
                    className={[classes.dpadButton, classes[button.className]].join(' ')}
                    onPointerDown={() => startMoving(button.direction)}
                    onPointerUp={stopMoving}
                    onPointerLeave={stopMoving}
                    onPointerCancel={stopMoving}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {button.glyph}
                </button>
            ))}
        </div>
    );
};

export default TouchControls;
