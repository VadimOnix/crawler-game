import GameObjectsContainer from './GameObjects/GameObjectsContainer';
import WorldMapContainer from './WorldMap/WorldMapContainer';
import classes from './Game.module.sass';
import Dialog from './Dialog/Dialog';
import Battle from '../Battle/Battle';
import { BOARD_HEIGHT, BOARD_WIDTH, GAME_MODES } from '../../gameCore/constants';
import type { GameMode } from '../../gameCore/constants';

interface GameProps {
    gameMode: GameMode;
}

const Game = (props: GameProps) => {
    return (
        <div className={classes.gameContainer} style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}>
            <WorldMapContainer />
            <GameObjectsContainer />
            <div className={classes.hudFrame} />
            {props.gameMode === GAME_MODES.SPEAKING && <Dialog />}
            {props.gameMode === GAME_MODES.BATTLE && <Battle />}
        </div>
    );
};

export default Game;
