// отображать текущую карту
const SET_LOAD = 'SET-LOAD';
const ADD_MENU_OPTION = 'ADD-MENU-OPTION';
const DELETE_MENU_OPTION = 'DELETE-MENU-OPTION';

let initialState = {
    isLoading: true,
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

const commonAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOAD:
            return {
                ...state,
                isLoading: action.status,
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
            let updatedMenuOptions = state.menuOptions.filter( option  => option.label !== action.link);
            return {
                ...state,
                menuOptions: updatedMenuOptions
            };
        default:
            return state;
    }
};

export const addMenuOption = (label, link) => {
    return {
        type: ADD_MENU_OPTION,
        label, link
    }
};

export const deleteMenuOption = (label) => {
    return {
        type: DELETE_MENU_OPTION,
        label
    }
};

export const switchPreloader = (status) => {
    return {
        type: SET_LOAD,
        status
    };
};

export default commonAppReducer;