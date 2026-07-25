import WorldMap from './WorldMap';
import LEVELS from '../../../gameCore/levels/LEVELS';
import { useGameStore } from '../../../stores/gameStore';

// Статичные данные уровня (карта, тайлы) не дублируются в сторе:
// единственный источник правды — LEVELS, стор хранит только номер уровня.
const WorldMapContainer = () => {
    const level = useGameStore((state) => state.level);
    const levelData = LEVELS[level];

    // уровня с таким номером нет: рисовать нечего, но и падать незачем
    if (!levelData) {
        return null;
    }

    return <WorldMap mapLevel={levelData.levelMap} mapAssets={levelData.levelAssets} />;
};

export default WorldMapContainer;
