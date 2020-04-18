import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class FooterContainer extends Component {
    render() {
        <Footer />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);