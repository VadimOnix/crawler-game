import React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/fonts/CyberfunkImport/20a15dae14a6505716c6e41e71fb7d7e.ttf';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import AppContainer from './AppContainer';


ReactDOM.render(
    <Provider store = {Store}>
        <AppContainer />
    </Provider >
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
