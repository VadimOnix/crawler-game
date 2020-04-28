import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorldMap from './WorldMap';
import { setMapAssets, setLevelMap } from '../../../redux/worldMapReducer';
import LEVELS from '../../../gameCore/levels/LEVELS';
import CONSTANTS from '../../../gameCore/constants';

function mapStateToProps(state) {
    return {
        level: state.game.level,
        mapLevel: state.worldMap.mapLevel,
        mapAssets: state.worldMap.mapAssets,
    };
}

let mapDispatchToProps = {
    setLevelMap, setMapAssets
};


class WorldMapContainer extends Component {
    componentDidMount() {
        this.props.setLevelMap(LEVELS[this.props.level].levelMap);
        this.props.setMapAssets(LEVELS[this.props.level].levelAssets);
    }

    render() {
        return <WorldMap mapLevel = {this.props.mapLevel} mapAssets = {this.props.mapAssets} constants = {CONSTANTS} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapContainer);