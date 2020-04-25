import React from 'react';
import GameObjectsContainer from './GameObjects/GameObjectsContainer';
import WorldMapContainer from './WorldMap/WorldMapContainer';
import classes from './Game.module.sass'
const Game = (props) => {
    return (
        <div>
            <div className={classes.gameContainer}>
                <WorldMapContainer/>
                <GameObjectsContainer/>
            </div>
        {/* TODO: меню и инвентарь */}
        </div >
    );
};

export default Game;