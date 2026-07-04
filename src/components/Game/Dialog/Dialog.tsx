import { useMemo, useCallback, useEffect, useState } from 'react';
import classes from './Dialog.module.sass';

import { animated, useTransition } from '@react-spring/web';
import { GAME_MODES, SPEAKER_ROLES } from '../../../gameCore/constants';
import { useGameStore } from '../../../stores/gameStore';
import { useDialogsStore } from '../../../stores/dialogsStore';
import DialogBox from './DialogBox';

interface AnimatedBoxProps {
    style: React.CSSProperties;
}

const Dialog = () => {
    const currentDialogId = useDialogsStore(state => state.currentDialogId);
    const currDialogData = useDialogsStore(state => state.dialogList[state.currentDialogId]);
    const speakersData = useDialogsStore(state => state.speakersData);
    const typing = useDialogsStore(state => state.typing);

    const phrasesCount = currDialogData?.phrases.length ?? 0;

    const getBoxes = useMemo(() => {
      if (!currDialogData) {
          return [];
      }
      return currDialogData.phrases.map((p) => {
        const speakerData = speakersData.find(char => char.name === p.speaker);
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
    }, [currDialogData, speakersData])

    const [index, setIndex] = useState(0);

    const handleEnterKeydown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && !typing) {
            if (index < phrasesCount - 1) {
                useDialogsStore.getState().setTyping(true);
                setIndex(index + 1);
            } else {
                useGameStore.getState().setGameMode(GAME_MODES.EXPLORING);
                useDialogsStore.getState().addReadDialog(currentDialogId);
            }
        }
    }, [currentDialogId, typing, index, phrasesCount]);

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
                    return D ? <D style = {style as unknown as React.CSSProperties} /> : null;
                }
            )}
        </div >
    );


};

export default Dialog;
