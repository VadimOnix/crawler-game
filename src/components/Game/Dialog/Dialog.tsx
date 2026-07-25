import { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import classes from './Dialog.module.sass';

import { animated, useTransition } from '@react-spring/web';
import { GAME_MODES, SPEAKER_ROLES } from '../../../gameCore/constants';
import { useGameStore } from '../../../stores/gameStore';
import { useDialogsStore } from '../../../stores/dialogsStore';
import DialogBox from './DialogBox';

const Dialog = () => {
    const currentDialogId = useDialogsStore((state) => state.currentDialogId);
    const currDialogData = useDialogsStore((state) => state.dialogList[state.currentDialogId]);
    const speakersData = useDialogsStore((state) => state.speakersData);
    const typing = useDialogsStore((state) => state.typing);

    const [index, setIndex] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // переносим фокус в диалог, чтобы скринридер объявил его появление
    useEffect(() => {
        wrapperRef.current?.focus();
    }, []);

    // фразы вместе с оформлением говорящего: роль задаёт вид рамки,
    // спрайт — аватар в боксе
    const phrases = useMemo(() => {
        if (!currDialogData) {
            return [];
        }
        return currDialogData.phrases.map((phrase) => {
            const speakerData = speakersData.find((char) => char.name === phrase.speaker);
            return {
                speaker: phrase.speaker,
                text: phrase.text,
                boxRole: speakerData?.role === SPEAKER_ROLES.HERO ? classes.hero : classes.enemy,
                spriteSrc: speakerData?.sprite ?? '',
            };
        });
    }, [currDialogData, speakersData]);

    const finishTyping = useCallback(() => useDialogsStore.getState().setTyping(false), []);

    /**
     * Единственный обработчик продвижения диалога — и для Enter, и для тапа.
     * Пока фраза печатается, ввод её допечатывает; дальше листает фразы
     * и закрывает диалог на последней.
     */
    const advanceDialog = useCallback(() => {
        if (typing) {
            finishTyping();
            return;
        }
        if (index < phrases.length - 1) {
            useDialogsStore.getState().setTyping(true);
            setIndex(index + 1);
            return;
        }
        useGameStore.getState().setGameMode(GAME_MODES.EXPLORING);
        useDialogsStore.getState().addReadDialog(currentDialogId);
    }, [currentDialogId, finishTyping, typing, index, phrases.length]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                advanceDialog();
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [advanceDialog]);

    const transitions = useTransition(index, {
        from: { opacity: 0, transform: 'translateY(100%)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-50%)' },
    });

    return (
        // Enter слушается на window, а не на этом узле: в игре нажатие должно
        // работать независимо от того, где сейчас фокус. Поэтому внутри нет
        // вложенных интерактивных элементов — иначе Enter сработал бы дважды
        // (keydown плюс синтетический click по кнопке в фокусе)
        <div
            className={classes.dialogBoxWrapper}
            ref={wrapperRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Диалог"
            onClick={advanceDialog}
        >
            {transitions((style, item) => {
                const phrase = phrases[item];
                if (!phrase) {
                    return null;
                }
                return (
                    <animated.div style={{ ...style, position: 'absolute' }}>
                        <DialogBox
                            boxRole={phrase.boxRole}
                            spriteSrc={phrase.spriteSrc}
                            text={phrase.text}
                            speaker={phrase.speaker}
                            // уходящая фраза остаётся статичным текстом: иначе
                            // она обнулила бы напечатанное прямо во время
                            // анимации ухода
                            typing={item === index && typing}
                            onFinishedTyping={finishTyping}
                        />
                    </animated.div>
                );
            })}
        </div>
    );
};

export default Dialog;
