import type { Reducer } from 'redux';
import { SPEAKER_ROLES } from '../gameCore/constants';
import type { Dialog, LevelDialogs, Speaker } from '../gameCore/types';

const ADD_READ_DIALOG = 'ADD-READ-DIALOG';
const DELETE_DIALOG = 'DELETE-DIALOG';
const LOAD_DIALOGS = 'LOAD-DIALOGS';
const SET_CURRENT_DIALOG = 'SET-CURRENT-DIALOG';
const SET_TYPING = 'SET-TYPING';

export interface DialogsState {
    currentDialogId: number;
    alreadyReadIndexes: number[];
    typing: boolean;
    speakersData: Speaker[];
    dialogList: Record<number, Dialog>;
}

type AddReadDialogAction = {type: typeof ADD_READ_DIALOG; dialogId: number};
type DeleteDialogAction = {type: typeof DELETE_DIALOG; dialogId: number};
type LoadDialogsAction = {type: typeof LOAD_DIALOGS; dialogsData: LevelDialogs};
type SetCurrentDialogAction = {type: typeof SET_CURRENT_DIALOG; dialogId: number};
type SetTypingAction = {type: typeof SET_TYPING; typingState: boolean};

export type DialogsActions =
    | AddReadDialogAction
    | DeleteDialogAction
    | LoadDialogsAction
    | SetCurrentDialogAction
    | SetTypingAction;

const initialState: DialogsState = {
    currentDialogId: 0,
    alreadyReadIndexes: [],
    typing: true,

    speakersData: [
        {
            name: 'hero',
            role: SPEAKER_ROLES.HERO,
            sprite: ''
        },
        {
            name: 'enemy',
            role: SPEAKER_ROLES.ENEMY,
            sprite: 'enemy_avatar'
        }
    ],
    dialogList: {
        1: {
            isDisposable: true,
            phrases: [
                {
                    speaker: 'hero',
                    text: 'Тестирование первого диалогвого окна из четырех'
                },
                {
                    speaker: 'hero',
                    text: 'Тестирование второго диалогвого окна из 4'
                },
                {
                    speaker: 'enemy',
                    text: 'Тестирование третьего диалогвого противника окна из 4'
                },
                {
                    speaker: 'hero',
                    text: 'Тестирование последнего диалогвого окна из 4'
                },
            ]
        }
    }
};

const dialogsReducer: Reducer<DialogsState, DialogsActions> = (state = initialState, action) => {
    switch (action.type) {
        case ADD_READ_DIALOG:
            return {
                ...state,
                alreadyReadIndexes: state.dialogList[action.dialogId].isDisposable
                    ? [...state.alreadyReadIndexes, action.dialogId]
                    : state.alreadyReadIndexes,
                currentDialogId: 0,
            };
        case LOAD_DIALOGS:
            return {
                ...state,
                ...action.dialogsData
            };

        case DELETE_DIALOG:
            return {
                //TODO:
                ...state
            };
        case SET_CURRENT_DIALOG:
            return {
                ...state,
                currentDialogId: action.dialogId
            };
        case SET_TYPING:
            return {
                ...state,
                typing: action.typingState,
            };
        default:
            return state;
    }
};


export const addReadDialog = (dialogId: number): AddReadDialogAction => {
    return {
        type: ADD_READ_DIALOG,
        dialogId
    };
};

export const loadDialogs = (dialogsData: LevelDialogs): LoadDialogsAction => {
    return {
        type: LOAD_DIALOGS,
        dialogsData
    };
};

export const setCurrentDialog = (dialogId: number): SetCurrentDialogAction => {
    return {
        type: SET_CURRENT_DIALOG,
        dialogId
    };
};

export const deleteDialog = (dialogId: number): DeleteDialogAction => {
    return {
        type: DELETE_DIALOG,
        dialogId
    };
};

export const setTyping = (typingState: boolean): SetTypingAction => {
    return {
        type: SET_TYPING,
        typingState
    }
};

export default dialogsReducer;
