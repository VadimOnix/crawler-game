import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorldMap from './WorldMap';
import { setMapAssets, setMapLevel } from '../../../redux/worldMapReducer';
import { levelAssets, LEVELS } from '../../../gameCore/levels/LEVELS';
import CONSTANTS from '../../../gameCore/constants';

function mapStateToProps(state) {
    return {
        level: state.game.level,
        mapLevel: state.worldMap.mapLevel,
        mapAssets: state.worldMap.mapAssets,
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