import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MenuContainer from './components/MainMenu/MenuContainer';
import GameContainer from './components/Game/GameContainer';
import PlayerInfoContainer from './components/PlayerInfo/PlayerInfoContainer';
import { connect } from 'react-redux';
import { switchPreloader } from './redux/commonAppReducer';
import Preloader from './components/Preloader/Preloader';
import DeveloperInfo from './components/DeveloperInfo/DeveloperInfo';

let mapStateToProps = (state) => {
    return {
        isLoading: state.commonApp.isLoading,
    };
};

let mapDispatchToProps = {
    setLoad: switchPreloader
};

class App extends React.Component {
    componentDidMount() {
        this.props.setLoad(true);
        setTimeout(
            () => {
                this.props.setLoad(false);
            }
            , 2000
        );
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Preloader />
            );
        } else {
            return (
                <BrowserRouter >
                    <div className = "App">
                        <Route exact path = "/" render = {() => <MenuContainer />} />
                        <Route path = "/game" render = {() => <GameContainer />} />
                        <Route path = "/character" render = {() => <PlayerInfoContainer />} />
                        <Route path = "/about" render = {() => <DeveloperInfo />} />
                    </div >
                </BrowserRouter >
            );
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);