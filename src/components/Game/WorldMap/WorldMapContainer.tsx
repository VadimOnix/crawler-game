import WorldMap from './WorldMap';
import LEVELS from '../../../gameCore/levels/LEVELS';
import CONSTANTS from '../../../gameCore/constants';
import { useGameStore } from '../../../stores/gameStore';

// Статичные данные уровня (карта, тайлы) не дублируются в сторе:
// единственный источник правды — LEVELS, стор хранит только номер уровня.
const WorldMapContainer = () => {
    const level = useGameStore((state) => state.level);
    const { levelMap, levelAssets } = LEVELS[level];

    return <WorldMap mapLevel={levelMap} mapAssets={levelAssets} constants={CONSTANTS} />;
};

export default WorldMapContainer;
