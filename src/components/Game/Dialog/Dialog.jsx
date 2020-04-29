import React, { useCallback, useEffect, useState } from 'react';
import classes from './Dialog.module.sass';

import { batch, useDispatch, useSelector } from 'react-redux';

import { animated, useTransition } from 'react-spring';
import { addReadDialog } from '../../../redux/dialogsReducer';
import { setGameMode } from '../../../redux/gameReducer';
import DialogBox from './DialogBox';


const DialogOnHook = () => {
    // REDUX CONNECT
    const dialogs = useSelector(state => state.dialogs);
    const dispatch = useDispatch();

    const currDialogData = dialogs.dialogList[dialogs.currentDialogId];
    const phrasesCount = currDialogData.phrases.length;

    const boxes = currDialogData.phrases.map((p) => {
        let boxRole = p.speaker === 'hero' ? classes.hero : classes.enemy;
        let spriteSrc = dialogs.speakersData.find(char => char.name === p.speaker).sprite;
        return (
            ({style}) => (
                <animated.div style = {{...style, position: 'absolute'}}>
                    <DialogBox
                        boxRole = {boxRole}
                        spriteSrc = {spriteSrc}
                        text = {p.text}
                    />
                </animated.div >
            )
        );
    });


    let [index, setIndex] = useState(0);

    const handleEnterKeydown = useCallback((e) => {
        if (e.keyCode === 13) {
            if (index < phrasesCount - 1) {
                setIndex(index + 1);
            } else {
                batch(() => {
                        dispatch(setGameMode('exploring'));
                        dispatch(addReadDialog(dialogs.currentDialogId));
                    }
                );
            }
        }
    }, [dialogs.currentDialogId, dialogs.currentPhrase, dispatch, index, phrasesCount]);

    useEffect(() => {
        window.addEventListener('keydown', handleEnterKeydown);

        return () => {

            window.removeEventListener('keydown', handleEnterKeydown);
        };
    });


    const transitions = useTransition(index, p => p, {
        from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: {opacity: 0, transform: 'translate3d(-50%,0,0)'},
    });


    return (
        <div className = {classes.dialogBoxWrapper}>
            {transitions.map(({item, props, key}) => {
                    const D = boxes[item];
                    return <D key = {key} style = {props} />;
                }
            )}

        </div >
    );


};

export default DialogOnHook;