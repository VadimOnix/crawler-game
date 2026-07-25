import classes from './WorldMap.module.sass';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../../gameCore/constants';
import type { TileAsset } from '../../../gameCore/types';

interface TileProps {
    asset?: TileAsset;
    Xid: number;
    Yid: number;
}

const Tile = (props: TileProps) => {
    const styles =
        props.asset !== undefined
            ? {
                  transform: `translate(${Math.round(props.Xid * props.asset.sizeX)}px, ${Math.round(props.Yid * props.asset.sizeY)}px)`,
                  backgroundColor: '#21214a',
                  backgroundImage: `url('${props.asset.bgUrl}')`,
                  backgroundPosition: `left -${props.asset.left}px top -${props.asset.top}px`,
                  width: `${props.asset.sizeX}px`,
                  height: `${props.asset.sizeY}px`,
              }
            : {};

    return <div className="GameSprite" style={styles}></div>;
};

interface WorldMapProps {
    mapLevel: number[][];
    mapAssets: Record<number, TileAsset>;
}

/**
 * Тайлы позиционируются абсолютно собственным transform, поэтому строки
 * карты рендерятся плоским списком — обёртки-ряды на раскладку не влияли.
 */
const WorldMap = (props: WorldMapProps) => {
    return (
        <div className={classes.worldMap} style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}>
            {props.mapLevel.map((row, rowIndex) =>
                row.map((tileId, columnIndex) => (
                    <Tile
                        key={`${rowIndex}-${columnIndex}`}
                        asset={props.mapAssets[tileId]}
                        Xid={columnIndex}
                        Yid={rowIndex}
                    />
                )),
            )}
        </div>
    );
};

export default WorldMap;
