import classes from './ExitToMenu.module.sass';

interface ExitToMenuProps {
    onExit: () => void;
}

/**
 * Выход с игрового экрана в главное меню. Без неё игровой экран —
 * тупик: вернуться можно только кнопкой «назад» браузера.
 */
const ExitToMenu = (props: ExitToMenuProps) => {
    return (
        <button type="button" className={classes.exitButton} onClick={props.onExit}>
            В меню
            <span className={classes.hint}>Esc</span>
        </button>
    );
};

export default ExitToMenu;
