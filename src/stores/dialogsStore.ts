import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Dialog, LevelDialogs, Speaker } from '../gameCore/types';

interface DialogsStore {
    currentDialogId: number;
    alreadyReadIndexes: number[];
    typing: boolean;
    speakersData: Speaker[];
    dialogList: Record<number, Dialog>;
    loadDialogs: (dialogsData: LevelDialogs) => void;
    setCurrentDialog: (dialogId: number) => void;
    /** закрывает диалог; одноразовые диалоги помечаются прочитанными */
    addReadDialog: (dialogId: number) => void;
    setTyping: (typingState: boolean) => void;
}

export const useDialogsStore = create<DialogsStore>()(
    devtools(
        (set) => ({
            currentDialogId: 0,
            alreadyReadIndexes: [],
            typing: true,
            speakersData: [],
            dialogList: {},

            loadDialogs: (dialogsData) => set(
                {speakersData: dialogsData.speakersData, dialogList: dialogsData.dialogList},
                false, 'loadDialogs'),
            setCurrentDialog: (dialogId) => set(
                {currentDialogId: dialogId, typing: true},
                false, 'setCurrentDialog'),
            addReadDialog: (dialogId) => set(
                (state) => ({
                    alreadyReadIndexes: state.dialogList[dialogId].isDisposable
                        ? [...state.alreadyReadIndexes, dialogId]
                        : state.alreadyReadIndexes,
                    currentDialogId: 0,
                }),
                false, 'addReadDialog'),
            setTyping: (typingState) => set({typing: typingState}, false, 'setTyping'),
        }),
        {name: 'dialogs'},
    ),
);
