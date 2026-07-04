import { Component } from 'react';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';
import { changeBackgroundImage, switchPreloader } from './redux/commonAppReducer';
import type { RootState } from './redux/Store';
import App from './App';

import bgImageBlured from './assets/img/MenuBackground_blured.jpeg';

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: state.commonApp.isLoading,
        backgroundImageUrl: state.commonApp.backgroundImageUrl,
    };
};

const mapDispatchToProps = {
    switchPreloader,
    changeBackgroundImage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppContainerProps = ConnectedProps<typeof connector>;

class AppContainer extends Component<AppContainerProps> {
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

export default connector(AppContainer);
