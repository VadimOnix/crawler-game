// отображать текущую карту
const SET_LOAD = 'SET-LOAD';

let initialState = {
    isLoading: true
};

const commonAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOAD:
            return {
                ...state,
                isLoading: action.status,
            };
        default:
            return state;
    }
};

export const setLoad = (status) => {
    return {
        type: SET_LOAD,
        status
    }
};

export default commonAppReducer;