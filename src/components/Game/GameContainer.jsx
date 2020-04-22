import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import { moveTo, prevDirectionUpdate, walkIndexUpdate } from '../../redux/characterReducer';
import { loadLevel } from '../../redux/gameReducer';
import { calculateNewPosition, waitGameAnimate } from '../../gameCore/controller';
import CONSTANTS from '../../gameCore/constants';

function mapStateToProps(state) {
    return {
        position: state.character.position,
        spritePosition: state.character.spritePosition,
        walkIndex: state.character.walkIndex,
        prevDirection: state.character.prevDirection,
    };
}

let mapDispatchToProps = {
    moveTo, loadLevel, walkIndexUpdate, prevDirectionUpdate
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


    validatePosition(position, levelMap) {

    }


    /**
     * @param {string} direction (W,N,E,S)
     * @return {boolean} true if move was successful, false if not
     * */
    move(direction) {

        let result = true;
        let newWalkIndex = this.props.walkIndex;

        if (direction === this.props.prevDirection) {
            if (newWalkIndex < 2) {
                newWalkIndex += 1;
            } else {
                newWalkIndex = 0;
            }
        } else {
            this.props.prevDirectionUpdate(direction);
            newWalkIndex = 1;
        }

        this.props.walkIndexUpdate(newWalkIndex);
        let newPosition = calculateNewPosition(this.props.position, direction);
        if (newPosition.toString() !== this.props.position.toString()) {
            this.props.moveTo(newPosition, this.getSpritePosition(direction, newWalkIndex));
        } else {
            result = false;
        }
        return result;
    }

    getSpritePosition(direction, walkIndex) {
        switch (direction) {
            case 'S':
                return [CONSTANTS.SPRITE_SIZE * walkIndex, 0];
            case'W':
                return [CONSTANTS.SPRITE_SIZE * walkIndex, CONSTANTS.SPRITE_SIZE];
            case 'N':
                return [CONSTANTS.SPRITE_SIZE * walkIndex, CONSTANTS.SPRITE_SIZE * 2];
            case 'E':
                return [CONSTANTS.SPRITE_SIZE * walkIndex, CONSTANTS.SPRITE_SIZE * 3];
            default:
                return [CONSTANTS.SPRITE_SIZE * walkIndex, 0];
        }
    }

    handleKeydown(e) {
        if (this.reservedKeys.includes(e.keyCode) && !this.idleAnimate) {
            this.idleAnimate = true;
            e.preventDefault();
            waitGameAnimate(CONSTANTS.GAME_ANIMATE_SPEED)
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