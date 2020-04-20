import React, { Component } from 'react';
import { connect } from 'react-redux';
import Character from './Character';


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
            <Character {...this.props}/>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CharacterContainer);