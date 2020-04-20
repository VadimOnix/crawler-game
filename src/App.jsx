import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MenuContainer from './components/MainMenu/MenuContainer';
import GameContainer from './components/Game/GameContainer';
import PlayerInfoContainer from './components/PlayerInfo/PlayerInfoContainer';
import Preloader from './components/Preloader/Preloader';
import DeveloperInfoContainer from './components/DeveloperInfo/DeveloperInfoContainer';


const App = props => {
    let appStyle = {
        backgroundImage: `url('${props.backgroundImageUrl}')`
    };

    let content = props.isLoading
        ? <Preloader />
        : (<>
            <Route exact path = "/" render = {() => <MenuContainer />} />
            <Route path = "/game" render = {() => <GameContainer />} />
            <Route path = "/character" render = {() => <PlayerInfoContainer />} />
            <Route path = "/about" render = {() => <DeveloperInfoContainer />} />
        </>);

    return (
        <BrowserRouter >
            <div className = "App" style = {appStyle}>
                <div className = "AppWrapper">
                    {content}
                </div >
            </div >
        </BrowserRouter >
    );
};

export default App;