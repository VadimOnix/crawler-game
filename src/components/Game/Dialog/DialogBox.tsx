import { useMemo, useCallback, useEffect } from 'react';
import classes from './Dialog.module.sass';
import TypingText from './TypingText';
import { animated, useSpring } from '@react-spring/web';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setTyping } from '../../../redux/dialogsReducer';

interface DialogBoxProps {
    boxRole: string;
    spriteSrc: string;
    text: string;
    speaker: string;
}

const DialogBox = (props: DialogBoxProps) => {

    const typing = useAppSelector(state => state.dialogs.typing);
    const dispatch = useAppDispatch();

    const handleEnterKeydown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && typing) {
            dispatch(setTyping(false));
        }
    },[typing, dispatch]);


    useEffect(() => {
        window.addEventListener('keydown', handleEnterKeydown);
        return () => {
            window.removeEventListener('keydown', handleEnterKeydown);
        };
    },[handleEnterKeydown]);

  const getTypingContent = useMemo(() => {
    return typing ?
      <TypingText className={classes.text}
        cursorClassName={classes.cursor}
        speed={3}
        startDelay={700}
        text={props.text}
        onFinishedTyping={() => { dispatch(setTyping(false)) }}
      />
      :
      <div className={classes.text}>
        <p >
          {props.text}
        </p >
      </div>
  }, [typing]);

    const nextPopupStyle = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        delay: 1300,
    });

    return (
        <div className = {[classes.dialogBox, props.boxRole].join(' ')}>
            <img className = {classes.avatar} src = {props.spriteSrc} alt = "" />
            <h3 className = {classes.title}>{props.speaker}</h3 >
                {getTypingContent}
            <animated.div style = {{position: 'absolute', ...nextPopupStyle}} className = {classes.nextPopup}>
                <span >пропустить (Enter) </span >
            </animated.div >
        </div >
    );
};

export default DialogBox;
