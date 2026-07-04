import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import AppContainer from './AppContainer';


createRoot(document.getElementById('root')).render(
    <Provider store = {Store}>
        <AppContainer />
    </Provider >
);
