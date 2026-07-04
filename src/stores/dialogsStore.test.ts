import { beforeEach, describe, expect, it } from 'vitest';
import { SPEAKER_ROLES } from '../gameCore/constants';
import type { LevelDialogs } from '../gameCore/types';
import { useDialogsStore } from './dialogsStore';

const DIALOGS: LevelDialogs = {
    speakersData: [{ name: 'Leia', role: SPEAKER_ROLES.HERO, sprite: 'leia.png' }],
    dialogList: {
        1: { isDisposable: true, phrases: [{ speaker: 'Leia', text: 'привет' }] },
        2: { isDisposable: false, phrases: [{ speaker: 'Leia', text: 'ещё раз' }] },
    },
};

const initialState = useDialogsStore.getState();

describe('dialogsStore', () => {
    beforeEach(() => {
        useDialogsStore.setState(initialState, true);
        useDialogsStore.getState().loadDialogs(DIALOGS);
    });

    it('loadDialogs кладёт данные уровня в стор', () => {
        const state = useDialogsStore.getState();
        expect(state.speakersData).toEqual(DIALOGS.speakersData);
        expect(state.dialogList).toEqual(DIALOGS.dialogList);
    });

    it('setCurrentDialog открывает диалог и включает печать текста', () => {
        useDialogsStore.getState().setTyping(false);
        useDialogsStore.getState().setCurrentDialog(1);

        const state = useDialogsStore.getState();
        expect(state.currentDialogId).toBe(1);
        expect(state.typing).toBe(true);
    });

    it('addReadDialog закрывает диалог и помечает одноразовый прочитанным', () => {
        useDialogsStore.getState().setCurrentDialog(1);
        useDialogsStore.getState().addReadDialog(1);

        const state = useDialogsStore.getState();
        expect(state.currentDialogId).toBe(0);
        expect(state.alreadyReadIndexes).toContain(1);
    });

    it('addReadDialog не помечает многоразовый диалог', () => {
        useDialogsStore.getState().setCurrentDialog(2);
        useDialogsStore.getState().addReadDialog(2);

        const state = useDialogsStore.getState();
        expect(state.currentDialogId).toBe(0);
        expect(state.alreadyReadIndexes).not.toContain(2);
    });
});
