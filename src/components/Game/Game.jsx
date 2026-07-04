import React from 'react';
import GameObjectsContainer from './GameObjects/GameObjectsContainer';
import WorldMapContainer from './WorldMap/WorldMapContainer';
import classes from './Game.module.sass';
import Dialog from './Dialog/Dialog';
import Battle from '../Battle/Battle';
import { GAME_MODES } from '../../gameCore/constants';

const Game = (props) => {
    return (
        <div className = {classes.gameContainer}>
            <WorldMapContainer />
            <GameObjectsContainer />
            {props.gameMode === GAME_MODES.SPEAKING && <Dialog />}
            {props.gameMode === GAME_MODES.BATTLE && <Battle />}
        </div >
    );
};

export default Game;
