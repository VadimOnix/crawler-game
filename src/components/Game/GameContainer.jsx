import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class GameContainer extends Component {
    render() {
        return <Game />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);