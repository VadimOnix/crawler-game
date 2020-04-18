import { combineReducers, createStore } from 'redux';
import characterReducer from './characterReducer';
import gamerReducer from './gameReducer';
import worldMapReducer from './worldMapReducer';
import battleReducer from './battleReducer';
import commonAppReducer from './commonAppReducer';

const rootReducer = combineReducers({
    character: characterReducer,
    game: gamerReducer,
    worldMap: worldMapReducer,
    battle: battleReducer,
    commonApp: commonAppReducer,
});

const Store = createStore(
    rootReducer,
    /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;