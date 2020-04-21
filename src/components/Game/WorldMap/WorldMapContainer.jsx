import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorldMap from './WorldMap';
import { setMapAssets, setMapLevel } from '../../../redux/gameReducer';
import { levelAssets, LEVELS } from '../../../data/levels/LEVELS';
import CONSTANTS from '../../../data/constants';

function mapStateToProps(state) {
    return {
        level: state.game.level,
        mapLevel: state.game.mapLevel,
        mapAssets: state.game.mapAssets,
    };
}

let mapDispatchToProps = {
    setMapLevel, setMapAssets
};


class WorldMapContainer extends Component {
    componentDidMount() {
        this.props.setMapLevel(LEVELS[`${this.props.level}`]);
        this.props.setMapAssets(levelAssets);
    }

    render() {
        return <WorldMap mapLevel = {this.props.mapLevel} mapAssets = {this.props.mapAssets} constants = {CONSTANTS} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapContainer);