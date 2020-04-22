import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import { moveTo } from '../../redux/characterReducer';
import { loadLevel } from '../../redux/gameReducer';
import { calculateNewPosition, waitGameAnimate } from '../../gameCore/controller';

function mapStateToProps(state) {
    return {
        position: state.character.position,
    };
}

let mapDispatchToProps = {
    moveTo, loadLevel
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


    validatePosition(position,) {

    }

    /**
     * @param {string} direction (W,N,E,S)
     * @return {boolean} true if move was successful, false if not
     * */
    move(direction) {
        let result = true;
        let newPosition = calculateNewPosition(this.props.position, direction);
        if (newPosition.toString() !== this.props.position.toString()) {
            this.props.moveTo(newPosition);
        } else {
            result = false;
        }
        return result;
    }

    handleKeydown(e) {
        if (this.reservedKeys.includes(e.keyCode) && !this.idleAnimate) {
            this.idleAnimate = true;
            e.preventDefault();
            waitGameAnimate()
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