import type { Reducer, UnknownAction } from 'redux';

// Состояние боя (шаблон, боевая система в разработке)
export interface BattleState {
}

const initialState: BattleState = {};

const battleReducer: Reducer<BattleState, UnknownAction> = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default battleReducer;
