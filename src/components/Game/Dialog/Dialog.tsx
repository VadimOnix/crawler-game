import { useMemo, useCallback, useEffect, useState } from 'react';
import classes from './Dialog.module.sass';

import { animated, useTransition } from '@react-spring/web';
import { addReadDialog, setTyping } from '../../../redux/dialogsReducer';
import { setGameMode } from '../../../redux/gameReducer';
import { GAME_MODES, SPEAKER_ROLES } from '../../../gameCore/constants';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import DialogBox from './DialogBox';

interface AnimatedBoxProps {
    style: React.CSSProperties;
}

const Dialog = () => {
    // REDUX CONNECT
    const dialogs = useAppSelector(state => state.dialogs);
    const currDialogData = useAppSelector(state => state.dialogs.dialogList[dialogs.currentDialogId]);
    const dispatch = useAppDispatch();

    const phrasesCount = currDialogData.phrases.length;
    const typing = dialogs.typing;

    const getBoxes = useMemo(() => {
      return currDialogData.phrases.map((p) => {
        const speakerData = dialogs.speakersData.find(char => char.name === p.speaker);
        const boxRole = speakerData?.role === SPEAKER_ROLES.HERO ? classes.hero : classes.enemy;
        const spriteSrc = speakerData?.sprite ?? '';
        return (
          ({ style }: AnimatedBoxProps) => (
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

    const [index, setIndex] = useState(0);

    const handleEnterKeydown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && !typing) {
            if (index < phrasesCount - 1) {
                dispatch(setTyping(true));
                setIndex(index + 1);
            } else {
                dispatch(setGameMode(GAME_MODES.EXPLORING));
                dispatch(addReadDialog(dialogs.currentDialogId));
            }
        }
    }, [dialogs.currentDialogId, dispatch, typing, index, phrasesCount]);

    useEffect(() => {
        window.addEventListener('keydown', handleEnterKeydown);

        return () => {
            window.removeEventListener('keydown', handleEnterKeydown);
        };
    }, [handleEnterKeydown]);

    const transitions = useTransition(index, {
        from: {opacity: 0, transform: 'translateY(100%)'},
        enter: {opacity: 1, transform: 'translateY(0)'},
        leave: {opacity: 0, transform: 'translateY(-50%)'},
    });

    return (
        <div className = {classes.dialogBoxWrapper}>
            {transitions((style, item) => {
                    const D = getBoxes[item];
                    return <D style = {style as unknown as React.CSSProperties} />;
                }
            )}
        </div >
    );


};

export default Dialog;
