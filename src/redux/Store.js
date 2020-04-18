import { combineReducers, createStore } from 'redux';
import characterReducer from './characterReducer';
import gamerReducer from './gameReducer';
import worldMapReducer from './worldMapReducer';
import battleReducer from './battleReducer';

const rootReducer = combineReducers({
    character: characterReducer,
    game: gamerReducer,
    worldMap: worldMapReducer,
    battle: battleReducer,
});

const Store = createStore(rootReducer);

export default Store;