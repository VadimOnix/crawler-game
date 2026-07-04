import classes from './WorldMap.module.sass';
import type { TileAsset } from '../../../gameCore/types';

interface TileProps {
    asset?: TileAsset;
    Xid: number;
    Yid: number;
    fixTop: number;
    fixLeft: number;
}

const Tile = (props: TileProps) => {
    const styles =
        props.asset !== undefined
            ? {
                  transform: `translate(${Math.round(props.Xid * props.asset.sizeX) + props.fixLeft}px,
                                  ${Math.round(props.Yid * props.asset.sizeY) + props.fixTop}px)`,
                  backgroundColor: '#21214a',
                  backgroundImage: `url('${props.asset.bgUrl}')`,
                  backgroundPosition: `left -${props.asset.left}px top -${props.asset.top}px`,
                  width: `${props.asset.sizeX}px`,
                  height: `${props.asset.sizeY}px`,
              }
            : {};

    return <div className="GameSprite" style={styles}></div>;
};

interface RowMapProps {
    id: number;
    row: number[];
    mapAssets: Record<number, TileAsset>;
    constants: { FIX_TOP: number; FIX_LEFT: number };
}

const RowMap = (props: RowMapProps) => {
    const tiles = props.row.map((value, index) => (
        <Tile
            key={`${props.id}-${index}`}
            asset={props.mapAssets[value]}
            Xid={index}
            Yid={props.id}
            fixTop={props.constants.FIX_TOP}
            fixLeft={props.constants.FIX_LEFT}
        />
    ));

    return <div style={{ display: 'flex' }}>{tiles}</div>;
};

interface WorldMapProps {
    mapLevel: number[][];
    mapAssets: Record<number, TileAsset>;
    constants: { FIX_TOP: number; FIX_LEFT: number };
}

const WorldMap = (props: WorldMapProps) => {
    const rows = props.mapLevel.map((row, index) => (
        <RowMap
            key={`row-${index}`}
            id={index}
            mapAssets={props.mapAssets}
            row={row}
            constants={props.constants}
        />
    ));

    return <div className={classes.worldMap}>{rows}</div>;
};

export default WorldMap;
