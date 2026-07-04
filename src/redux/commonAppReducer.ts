import type { Reducer } from 'redux';

// Общие настройки приложения
const SET_LOAD = 'SET-LOAD';
const ADD_MENU_OPTION = 'ADD-MENU-OPTION';
const DELETE_MENU_OPTION = 'DELETE-MENU-OPTION';
const CHANGE_BACKGROUND = 'CHANGE-BACKGROUND';

export interface MenuOption {
    label: string;
    link: string;
}

export interface CommonAppState {
    isLoading: boolean;
    backgroundImageUrl: string;
    menuOptions: MenuOption[];
}

type SetLoadAction = {type: typeof SET_LOAD; status: boolean};
type AddMenuOptionAction = {type: typeof ADD_MENU_OPTION; label: string; link: string};
type DeleteMenuOptionAction = {type: typeof DELETE_MENU_OPTION; label: string};
type ChangeBackgroundAction = {type: typeof CHANGE_BACKGROUND; url: string};

export type CommonAppActions =
    | SetLoadAction
    | AddMenuOptionAction
    | DeleteMenuOptionAction
    | ChangeBackgroundAction;

const initialState: CommonAppState = {
    isLoading: true,
    backgroundImageUrl: '',
    menuOptions: [
        {
            label: 'New game',
            link: '/game'
        },
        {
            label: 'About developer',
            link: '/about'
        }
    ]
};

const commonAppReducer: Reducer<CommonAppState, CommonAppActions> = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOAD:
            return {
                ...state,
                isLoading: action.status,
            };
        case CHANGE_BACKGROUND:
            return {
                ...state,
                backgroundImageUrl: action.url,
            };
        case ADD_MENU_OPTION:
            return {
                ...state,
                menuOptions: [
                    ...state.menuOptions,
                    {
                        label: action.label,
                        link: action.link
                    }
                ]
            };
        case DELETE_MENU_OPTION:
            return {
                ...state,
                menuOptions: state.menuOptions.filter(option => option.label !== action.label)
            };
        default:
            return state;
    }
};

export const changeBackgroundImage = (url: string): ChangeBackgroundAction => {
    return {
        type: CHANGE_BACKGROUND,
        url
    }
};

export const addMenuOption = (label: string, link: string): AddMenuOptionAction => {
    return {
        type: ADD_MENU_OPTION,
        label, link
    }
};

export const deleteMenuOption = (label: string): DeleteMenuOptionAction => {
    return {
        type: DELETE_MENU_OPTION,
        label
    }
};

export const switchPreloader = (status: boolean): SetLoadAction => {
    return {
        type: SET_LOAD,
        status
    };
};

export default commonAppReducer;
