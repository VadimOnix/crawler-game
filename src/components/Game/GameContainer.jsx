import React, { Component } from 'react';
import { batch, connect } from 'react-redux';
import Game from './Game';
import { loadLevel, setGameMode, setGameObjects } from '../../redux/gameReducer';
import { checkOnGameEvent, getUpdatedGameObjects } from '../../gameCore/controller';
import CONSTANTS from '../../gameCore/constants';
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
        this.reservedKeys = [37, 38, 39, 40];
        this.idleAnimate = false;
    }

    componentDidMount() {

        // load firs level
        batch(() => {
            this.props.loadLevel(LEVELS[1]);
            this.props.loadDialogs(LEVELS[1].dialogs);
        });
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
                this.props.level
            );

            let event = checkOnGameEvent(updatedGameObjects.newGameObjects);
            batch(() => {
                if (event.isGameEvent) {
                    if (event.eventObject.type === 'dialog' &&
                        !this.props.alreadyReadIndexes.includes(event.eventObject.dialogId)) {
                        this.props.setGameMode('speaking');
                        this.props.setCurrentDialog(event.eventObject.dialogId);
                    }
                }
                this.props.setGameObjects(updatedGameObjects.newGameObjects);
            });
    }


    handleKeydown(e) {
        if (this.reservedKeys.includes(e.keyCode) && !this.idleAnimate && this.props.gameMode === 'exploring') {
            this.idleAnimate = true;
            e.preventDefault();
            this.waitGameAnimate(CONSTANTS.GAME_ANIMATE_SPEED)
                .then(() => {
                    this.idleAnimate = false;
                });
            switch (e.keyCode) {
                case 37:
                    return this.move('W');
                case 38:
                    return this.move('N');
                case 39:
                    return this.move('E');
                case 40:
                    return this.move('S');
                default:
                    return console.log(e.keyCode);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);