import React, { useMemo, useCallback, useEffect, useState } from 'react';
import classes from './Dialog.module.sass';

import { useDispatch, useSelector } from 'react-redux';

import { animated, useTransition } from '@react-spring/web';
import { addReadDialog, setTyping } from '../../../redux/dialogsReducer';
import { setGameMode } from '../../../redux/gameReducer';
import DialogBox from './DialogBox';


const Dialog = () => {
    // REDUX CONNECT
    const dialogs = useSelector(state => state.dialogs);
    const currDialogData = useSelector(state => state.dialogs.dialogList[dialogs.currentDialogId]);
    const dispatch = useDispatch();

    useEffect(() => {
      window.addEventListener('keydown', handleEnterKeydown);

      return () => {
          window.removeEventListener('keydown', handleEnterKeydown);
      };
  });

    const phrasesCount = currDialogData.phrases.length;
    const typing = dialogs.typing;

    const getBoxes = useMemo(() => {
      return currDialogData.phrases.map((p) => {
        let boxRole = p.speaker === 'hero' ? classes.hero : classes.enemy;
        let spriteSrc = dialogs.speakersData.find(char => char.name === p.speaker).sprite;
        return (
          ({ style }) => (
            <animated.div style={{ ...style, position: 'absolute' }}>
              <DialogBox
                boxRole={boxRole}
                spriteSrc={spriteSrc}
                text={p.text}
                speaker={p.speaker}
              />
            </animated.div >
          )
        );
      });
    }, [currDialogData]) 

    let [index, setIndex] = useState(0);

    const handleEnterKeydown = useCallback((e) => {
        if (e.keyCode === 13 && !typing) {
            if (index < phrasesCount - 1) {
                dispatch(setTyping(true));
                setIndex(index + 1);
            } else {
                dispatch(setGameMode('exploring'));
                dispatch(addReadDialog(dialogs.currentDialogId));
            }
        }
    }, [dialogs.currentDialogId, dispatch, typing, index, phrasesCount]);

    const transitions = useTransition(index, {
        from: {opacity: 0, transform: 'translateY(100%)'},
        enter: {opacity: 1, transform: 'translateY(0)'},
        leave: {opacity: 0, transform: 'translateY(-50%)'},
    });

    return (
        <div className = {classes.dialogBoxWrapper}>
            {transitions((style, item) => {
                    const boxes = getBoxes;

                    const D = boxes[item];
                    return <D style = {style} />;
                }
            )}
        </div >
    );


};

export default Dialog;