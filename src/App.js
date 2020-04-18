import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MenuContainer from './components/MainMenu/MenuContainer';
import GameContainer from './components/Game/GameContainer';
import PlayerInfoContainer from './components/PlayerInfo/PlayerInfoContainer';
import { connect } from 'react-redux';
import { setLoad } from './redux/commonAppReducer';
import Preloader from './components/Preloader/Preloader';

let mapStateToProps = (state) => {
    return {
        isLoading: state.commonApp.isLoading
    };
};

let mapDispatchToProps = {
    setLoad
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
                        <Route path = "/" render = {() => <MenuContainer />} />
                        <Route path = "/game" render = {() => <GameContainer />} />
                        <Route path = "/character" render = {() => <PlayerInfoContainer />} />
                    </div >
                </BrowserRouter >
            );
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);