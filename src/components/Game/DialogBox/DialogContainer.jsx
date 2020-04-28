import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from './Dialog';
import { addReadDialog, loadDialogs } from '../../../redux/dialogsReducer';
import LEVELS from '../../../gameCore/levels/LEVELS';


function mapStateToProps(state) {
    return {
        currentLevel: state.game.level,
        currentDialogId: state.dialogs.currentDialogId,
        alreadyReadIndexes: state.dialogs.alreadyReadIndexes,
        speakersData: state.dialogs.speakersData,
        dialogData: state.dialogs.dialogList[state.dialogs.currentDialogId],

        gameMode: state.game.gameMode
    };
}

let mapDispatchToProps = {
    loadDialogs, addReadDialog
};

class DialogContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadDialogs(LEVELS[this.props.currentLevel].dialogs);
    }

    onFinishReading() {
        if (this.props.dialogData.isDisposable) {
            addReadDialog(this.props.currentDialogId);
        }
    }

    render() {
        return (
            this.props.currentDialogId !==  0 ?
                <Dialog
                    speakersData = {this.props.speakersData}
                    phrases = {this.props.dialogData.phrases}
                    finishReading = {this.onFinishReading.bind(this)}
                />
                :
                <></>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogContainer);