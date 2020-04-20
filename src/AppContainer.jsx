import React from 'react';
import { connect } from 'react-redux';
import { changeBackgroundImage, switchPreloader } from './redux/commonAppReducer';
import App from './App';

import bgImage from './assets/img/MenuBackground.jpeg';
import bgImageBlured from './assets/img/MenuBackground_blured.jpeg';

let mapStateToProps = (state) => {
    return {
        isLoading: state.commonApp.isLoading,
        backgroundImageUrl: state.commonApp.backgroundImageUrl,
    };
};

let mapDispatchToProps = {
    switchPreloader,
    changeBackgroundImage,
};

class AppContainer extends React.Component {
    componentDidMount() {
        this.props.changeBackgroundImage(bgImageBlured);
        this.props.switchPreloader(true);
        setTimeout(
            () => {
                this.props.switchPreloader(false);
            }
            , 2000
        );
    }

    render() {
        return (<App {...this.props} />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);