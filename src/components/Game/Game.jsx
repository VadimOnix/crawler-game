import React from 'react';
import GameObjectsContainer from './GameObjects/GameObjectsContainer';
import WorldMapContainer from './WorldMap/WorldMapContainer';
import classes from './Game.module.sass';
import DialogContainer from './DialogBox/DialogContainer';

const Game = (props) => {
    return (
        <div className = {classes.gameContainer}>
            <WorldMapContainer />
            <GameObjectsContainer />

            <DialogContainer />
        </div >
    );
};

export default Game;