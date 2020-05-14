import React from 'react';
import GameObjectsContainer from './GameObjects/GameObjectsContainer';
import WorldMapContainer from './WorldMap/WorldMapContainer';
import classes from './Game.module.sass';
import Dialog from './Dialog/Dialog';
import Battle from '../Battle/Battle';

const Game = (props) => {

    let dialog = props.gameMode === 'speaking' ? <Dialog/> : null;

    return (
        <div className = {classes.gameContainer}>
            <Battle/>
            {/*<WorldMapContainer />*/}
            {/*<GameObjectsContainer />*/}
            {dialog}
        </div >
    );
};

export default Game;