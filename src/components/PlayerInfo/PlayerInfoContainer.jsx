import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerInfo from './PlayerInfo';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class PlayerInfoContainer extends Component {
    render() {
        return (
            <PlayerInfo/>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerInfoContainer);