import { combineReducers, createStore } from 'redux';
import gameReducer from './gameReducer';
import characterReducer from './characterReducer';
import worldMapReducer from './worldMapReducer';
import battleReducer from './battleReducer';
import commonAppReducer from './commonAppReducer';
import dialogsReducer from './dialogsReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    character: characterReducer,
    worldMap: worldMapReducer,
    battle: battleReducer,
    commonApp: commonAppReducer,
    dialogs: dialogsReducer,
});

const Store = createStore(
    rootReducer,
    /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;