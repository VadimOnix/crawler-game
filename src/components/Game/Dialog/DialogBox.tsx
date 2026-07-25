import classes from './Dialog.module.sass';
import TypingText from './TypingText';
import { animated, useSpring } from '@react-spring/web';

interface DialogBoxProps {
    boxRole: string;
    spriteSrc: string;
    text: string;
    speaker: string;
    /** печатать фразу посимвольно или показать её целиком */
    typing: boolean;
    onFinishedTyping: () => void;
}

/**
 * Презентационный бокс одной фразы. Ввод (Enter / тап) обрабатывает
 * родительский Dialog — здесь нет ни подписок на стор, ни слушателей.
 */
const DialogBox = (props: DialogBoxProps) => {
    const nextPopupStyle = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 1300,
    });

    return (
        <div className={[classes.dialogBox, props.boxRole].join(' ')}>
            <img className={classes.avatar} src={props.spriteSrc} alt="" />
            <h3 className={classes.title}>{props.speaker}</h3>
            {/* aria-live: скринридер зачитывает каждую новую фразу.
                Печать посимвольно объявлять нельзя — отсюда aria-busy */}
            <div aria-live="polite" aria-busy={props.typing}>
                {props.typing ? (
                    <TypingText
                        className={classes.text}
                        cursorClassName={classes.cursor}
                        speed={3}
                        startDelay={700}
                        text={props.text}
                        onFinishedTyping={props.onFinishedTyping}
                    />
                ) : (
                    <div className={classes.text}>
                        <p>{props.text}</p>
                    </div>
                )}
            </div>
            <animated.div
                style={{ position: 'absolute', ...nextPopupStyle }}
                className={classes.nextPopup}
            >
                <span>пропустить (Enter / тап) </span>
            </animated.div>
        </div>
    );
};

export default DialogBox;
