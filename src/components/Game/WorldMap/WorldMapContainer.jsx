import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorldMap from './WorldMap';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class WorldMapContainer extends Component {
    render() {
        return <WorldMap />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapContainer);