import { Component } from 'react';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';
import Game from './Game';
import { loadLevel, setGameMode, setGameObjects } from '../../redux/gameReducer';
import { checkOnGameEvent, getUpdatedGameObjects } from '../../gameCore/controller';
import CONSTANTS, { GAME_MODES, KEY_TO_DIRECTION, OBJECT_TYPES } from '../../gameCore/constants';
import type { Direction } from '../../gameCore/constants';
import LEVELS from '../../gameCore/levels/LEVELS';
import { loadDialogs, setCurrentDialog } from '../../redux/dialogsReducer';
import type { RootState } from '../../redux/Store';

function mapStateToProps(state: RootState) {
    return {
        gameMode: state.game.gameMode,
        gameObjects: state.game.gameObjects,
        level: state.game.level,
        alreadyReadIndexes: state.dialogs.alreadyReadIndexes
    };
}

const mapDispatchToProps = {
    loadDialogs, loadLevel, setGameObjects, setCurrentDialog, setGameMode
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameContainerProps = ConnectedProps<typeof connector>;

class GameContainer extends Component<GameContainerProps> {
    private idleAnimate = false;

    constructor(props: GameContainerProps) {
        super(props);
        this.handleKeydown = this.handleKeydown.bind(this);
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

    waitGameAnimate = (ms: number): Promise<void> => {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        }));
    };

    move(direction: Direction) {
        // обновить данные по всем игровым объектам на уровне
        const updatedGameObjects = getUpdatedGameObjects(
            this.props.gameObjects,
            {type: 'move', direction},
            LEVELS[this.props.level]
        );

        const event = checkOnGameEvent(updatedGameObjects.newGameObjects);
        if (event.isGameEvent &&
            event.eventObject !== null &&
            event.eventObject.type === OBJECT_TYPES.DIALOG &&
            event.eventObject.dialogId !== undefined &&
            !this.props.alreadyReadIndexes.includes(event.eventObject.dialogId)) {
            this.props.setGameMode(GAME_MODES.SPEAKING);
            this.props.setCurrentDialog(event.eventObject.dialogId);
        }
        this.props.setGameObjects(updatedGameObjects.newGameObjects);
    }


    handleKeydown(e: KeyboardEvent) {
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

export default connector(GameContainer);
