import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';

function mapStateToProps(state) {
    return {
        menuOptions: state.commonApp.menuOptions
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class MenuContainer extends Component {
    render() {
        return <Menu menuOptions = {this.props.menuOptions}/>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);