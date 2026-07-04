import { Component } from 'react';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';
import Menu from './Menu';
import type { RootState } from '../../redux/Store';

function mapStateToProps(state: RootState) {
    return {
        menuOptions: state.commonApp.menuOptions
    };
}

const connector = connect(mapStateToProps);

type MenuContainerProps = ConnectedProps<typeof connector>;

class MenuContainer extends Component<MenuContainerProps> {
    render() {
        return <Menu menuOptions = {this.props.menuOptions}/>;
    }
}

export default connector(MenuContainer);
