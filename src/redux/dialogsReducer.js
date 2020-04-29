const ADD_READ_DIALOG = 'ADD-READ-DIALOG';
const DELETE_DIALOG = 'DELETE-DIALOG';
const LOAD_DIALOGS = 'LOAD-DIALOGS';
const SET_CURRENT_DIALOG = 'SET-CURRENT-DIALOG';
const SET_TYPING = 'SET-TYPING';

let initialState = {
    currentDialogId: 0,
    alreadyReadIndexes: [],
    typing: true,

    speakersData: [
        {
            name: 'hero',
            sprite: ''
        },
        {
            name: 'enemy',
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

const dialogsReducer = (state = initialState, action) => {
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


export const addReadDialog = (dialogId) => {
    return {
        type: ADD_READ_DIALOG,
        dialogId
    };
};

export const loadDialogs = (dialogsData) => {
    return {
        type: LOAD_DIALOGS,
        dialogsData
    };
};

export const setCurrentDialog = (dialogId) => {
    return {
        type: SET_CURRENT_DIALOG,
        dialogId
    };
};

export const deleteDialog = (dialogId) => {
    return {
        type: DELETE_DIALOG,
        dialogId
    };
};

export const setTyping = (typingState) => {
    return {
        type: SET_TYPING,
        typingState
    }
};



export default dialogsReducer;