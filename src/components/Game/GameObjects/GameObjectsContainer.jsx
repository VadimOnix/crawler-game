import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameObject from './GameObject';
import CONSTANTS from '../../../gameCore/constants';
import { setGameObjectParameter } from '../../../redux/gameReducer';
import heroSprite from '../../../assets/img/character/Female_Character.png';

// Контейнер, который пробрасывает ...........

let mapStateToProps = (state) => {
    return {
        gameObjects: state.game.gameObjects
    };
};

let mapDispatchToProps = {
    setGameObjectParameter
};

class GameObjectsContainer extends Component {
    componentDidMount() {
        this.props.setGameObjectParameter(1, 'sprite', heroSprite);
    }

    render() {
        let gameObjects = this.props.gameObjects.map(obj => {
            let posArray = this.calculatePosition(obj, CONSTANTS.SPRITE_SIZE);
            let spritePos = this.getSpritePosition(obj, CONSTANTS.SPRITE_SIZE);

            return (
                <GameObject
                    position = {posArray}
                    width = {CONSTANTS.SPRITE_SIZE}
                    height = {CONSTANTS.SPRITE_SIZE}
                    key = {obj.id}
                    sprite = {obj.sprite}
                    spritePosition = {spritePos}
                />
            );
        });

        return (
            <>
                {gameObjects}
            </>
        );
    }


    getSpritePosition(gameObject, spriteSize) {
        switch (gameObject.currentDirection) {
            case 'S':
                return [spriteSize * gameObject.walkIndex, 0];
            case'W':
                return [spriteSize * gameObject.walkIndex, spriteSize];
            case 'N':
                return [spriteSize * gameObject.walkIndex, spriteSize * 2];
            case 'E':
                return [spriteSize * gameObject.walkIndex, spriteSize * 3];
            default:
                return [spriteSize * gameObject.walkIndex, 0];
        }
    }

    calculatePosition(gameObject, spriteSize) {
        let x = gameObject.coords.x;
        let y = gameObject.coords.y;
        return [x * spriteSize, y * spriteSize];
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameObjectsContainer);