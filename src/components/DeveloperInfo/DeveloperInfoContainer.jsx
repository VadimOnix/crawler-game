import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeveloperInfo from './DeveloperInfo';
import { changeBackgroundImage } from '../../redux/commonAppReducer';

import bgImage from '../../assets/img/MenuBackground.jpeg'

const mapStateToProps = (state) => {
    return {
        backgroundImageUrl : state.commonApp.backgroundImageUrl
    };
};

const mapDispatchToProps = {
    changeBackgroundImage
};

class DeveloperInfoContainer extends Component {
    componentDidMount() {
        this.props.changeBackgroundImage(bgImage)
    }

    render() {
        return (
            <DeveloperInfo/>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperInfoContainer);