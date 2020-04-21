import React from 'react';
import CharacterContainer from './Character/CharacterContainer';
import WorldMapContainer from './WorldMap/WorldMapContainer';
import classes from './Game.module.sass'
const Game = (props) => {
    return (
        <div>
            <div className={classes.gameContainer}>
                <WorldMapContainer/>
                <CharacterContainer/>
            </div>
        {/* TODO: меню и инвентарь */}
        </div >
    );
};

export default Game;