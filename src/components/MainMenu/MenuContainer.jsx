import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class MenuContainer extends Component {
    render() {
        return <Menu />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);