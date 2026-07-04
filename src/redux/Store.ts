import { combineReducers, legacy_createStore as createStore } from 'redux';
import type { Reducer } from 'redux';
import gameReducer from './gameReducer';
import type { GameActions } from './gameReducer';
import battleReducer from './battleReducer';
import commonAppReducer from './commonAppReducer';
import type { CommonAppActions } from './commonAppReducer';
import dialogsReducer from './dialogsReducer';
import type { DialogsActions } from './dialogsReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    battle: battleReducer,
    commonApp: commonAppReducer,
    dialogs: dialogsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppActions = GameActions | CommonAppActions | DialogsActions;

// Слайсы типизированы строгими union'ами своих экшенов, но redux 5 требует,
// чтобы редьюсеры формально принимали UnknownAction (иначе combineReducers
// выводит preloadedState как never). В рантайме это безопасно: чужие экшены
// уходят в default-ветку каждого слайса.
const Store = createStore(
    rootReducer as unknown as Reducer<RootState, AppActions>,
    /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__?.());

export type AppDispatch = typeof Store.dispatch;

export default Store;
