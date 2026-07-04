import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import { loadLevel, setGameMode, setGameObjects } from '../../redux/gameReducer';
import { checkOnGameEvent, getUpdatedGameObjects } from '../../gameCore/controller';
import CONSTANTS, { GAME_MODES, KEY_TO_DIRECTION, OBJECT_TYPES } from '../../gameCore/constants';
import LEVELS from '../../gameCore/levels/LEVELS';
import { loadDialogs, setCurrentDialog } from '../../redux/dialogsReducer';

function mapStateToProps(state) {
    return {
        gameMode: state.game.gameMode,
        gameObjects: state.game.gameObjects,
        level: state.game.level,
        alreadyReadIndexes: state.dialogs.alreadyReadIndexes
    };
}

let mapDispatchToProps = {
    loadDialogs, loadLevel, setGameObjects, setCurrentDialog, setGameMode
};

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.idleAnimate = false;
    }

    componentDidMount() {
        const level = LEVELS[this.props.level];
        this.props.loadLevel(level);
        this.props.loadDialogs(level.dialogs);
        // bad solution for architecture
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    render() {
        return <Game gameMode = {this.props.gameMode} />;
    }

    waitGameAnimate = (ms) => {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        }));
    };

    /**
     * @param {string} direction (W,N,E,S)
     * */
    move(direction) {
        // обновить данные по всем игровым объектам на уровне
        let updatedGameObjects = getUpdatedGameObjects(
            this.props.gameObjects,
            {type: 'move', direction},
            LEVELS[this.props.level]
        );

        let event = checkOnGameEvent(updatedGameObjects.newGameObjects);
        if (event.isGameEvent &&
            event.eventObject.type === OBJECT_TYPES.DIALOG &&
            !this.props.alreadyReadIndexes.includes(event.eventObject.dialogId)) {
            this.props.setGameMode(GAME_MODES.SPEAKING);
            this.props.setCurrentDialog(event.eventObject.dialogId);
        }
        this.props.setGameObjects(updatedGameObjects.newGameObjects);
    }


    handleKeydown(e) {
        const direction = KEY_TO_DIRECTION[e.key];
        if (direction && !this.idleAnimate && this.props.gameMode === GAME_MODES.EXPLORING) {
            this.idleAnimate = true;
            e.preventDefault();
            this.waitGameAnimate(CONSTANTS.GAME_ANIMATE_SPEED)
                .then(() => {
                    this.idleAnimate = false;
                });
            this.move(direction);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
