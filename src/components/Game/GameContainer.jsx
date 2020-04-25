import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import { moveTo, prevDirectionUpdate, walkIndexUpdate } from '../../redux/characterReducer';
import { loadLevel, setGameObjectParameter, setGameObjects } from '../../redux/gameReducer';
import { getUpdatedGameObjects} from '../../gameCore/controller';
import CONSTANTS from '../../gameCore/constants';

function mapStateToProps(state) {
    return {
        position: state.character.position,
        spritePosition: state.character.spritePosition,
        walkIndex: state.character.walkIndex,
        prevDirection: state.character.prevDirection,
        mapLevel: state.game.mapLevel,
        mapAssets: state.game.mapAssets,
        gameObjects: state.game.gameObjects,
        level: state.game.level
    };
}

let mapDispatchToProps = {
    moveTo, loadLevel, walkIndexUpdate, prevDirectionUpdate, setGameObjectParameter, setGameObjects

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
        this.props.loadLevel(1);
        // bad solution for architecture
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    render() {
        return <Game />;
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

        this.props.setGameObjects(updatedGameObjects.newGameObjects)
    }



    handleKeydown(e) {
        if (this.reservedKeys.includes(e.keyCode) && !this.idleAnimate) {
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