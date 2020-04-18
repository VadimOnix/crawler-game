import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MenuContainer from './components/MainMenu/MenuContainer';
import GameContainer from './components/Game/GameContainer';
import PlayerInfoContainer from './components/PlayerInfo/PlayerInfoContainer';

function App() {
    return (
        <BrowserRouter >
            <div className = "App">
                <Route path = "/" render = {() => <MenuContainer />} />
                <Route path = "/game" render = {() => <GameContainer />} />
                <Route path = "/character" render = {() => <PlayerInfoContainer />} />
            </div >
        </BrowserRouter >
    );
}

export default App;