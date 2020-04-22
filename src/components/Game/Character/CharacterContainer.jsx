import React, { Component } from 'react';
import { connect } from 'react-redux';
import Character from './Character';
import CONSTANTS from '../../../gameCore/constants'


let mapStateToProps = (state) => {
    return {
        position: state.character.position,
        sprite: state.character.sprite
    };
};

let mapDispatchToProps = {};

class CharacterContainer extends Component {


    render() {
        return (
            <Character position = {this.props.position} sprite = {this.props.sprite} constants = {CONSTANTS} />
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CharacterContainer);