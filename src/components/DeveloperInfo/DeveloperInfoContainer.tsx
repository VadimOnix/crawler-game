import { Component } from 'react';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';
import DeveloperInfo from './DeveloperInfo';
import { changeBackgroundImage } from '../../redux/commonAppReducer';
import type { RootState } from '../../redux/Store';

import bgImage from '../../assets/img/MenuBackground.jpeg'

const mapStateToProps = (state: RootState) => {
    return {
        backgroundImageUrl : state.commonApp.backgroundImageUrl
    };
};

const mapDispatchToProps = {
    changeBackgroundImage
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type DeveloperInfoContainerProps = ConnectedProps<typeof connector>;

class DeveloperInfoContainer extends Component<DeveloperInfoContainerProps> {
    componentDidMount() {
        this.props.changeBackgroundImage(bgImage)
    }

    render() {
        return (
            <DeveloperInfo/>
        );
    }
}

export default connector(DeveloperInfoContainer);
