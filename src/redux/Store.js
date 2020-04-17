import { combineReducers, createStore } from 'redux';
import characterReducer from './characterReducer';

const rootReducer = combineReducers( {
    character: characterReducer
} );

const Store = createStore( rootReducer );


export default Store;