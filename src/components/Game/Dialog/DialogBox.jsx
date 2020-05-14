import React, { useMemo, useCallback, useEffect } from 'react';
import classes from './Dialog.module.sass';
import Typing from 'react-typing-animation';
import { Spring } from 'react-spring/renderprops-universal';
import { useDispatch, useSelector } from 'react-redux';
import { setTyping } from '../../../redux/dialogsReducer';

const DialogBox = (props) => {

    const typing = useSelector(state => state.dialogs.typing);
    const dispatch = useDispatch();

    const handleEnterKeydown = useCallback((e) => {
        if (e.keyCode === 13 && typing) {
            dispatch(setTyping(false));
        }
    },[typing]);


    useEffect(() => {
        window.addEventListener('keydown', handleEnterKeydown);
        return () => {
            window.removeEventListener('keydown', handleEnterKeydown);
        };
    },[]);

  const getTypingContent = useMemo(() => {
    return typing ?
      <Typing className={classes.text}
        cursorClassName={classes.cursor}
        speed={3}
        startDelay={600}
        onFinishedTyping={() => { dispatch(setTyping(false)) }}
      >
        <Typing.Delay ms={100} />
        <p >
          {props.text}
        </p >
      </Typing >
      :
      <div className={classes.text}>
        <p >
          {props.text}
        </p >
      </div>
  }, [typing]);

    return (
        <div className = {[classes.dialogBox, props.boxRole].join(' ')}>
            <img className = {classes.avatar} src = {props.spriteSrc} alt = "" />
            <h3 className = {classes.title}>{props.speaker}</h3 >
                {getTypingContent}
            <Spring
                delay = {1300}
                from = {{position: 'absolute', opacity: 0}}
                to = {{opacity: 1}}
            >
                {props => <div style = {props} className = {classes.nextPopup}><span >пропустить (Enter) </span >
                </div >}
            </Spring >
        </div >
    );
};

export default DialogBox;