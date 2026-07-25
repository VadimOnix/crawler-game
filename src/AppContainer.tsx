import { useEffect } from 'react';
import { useCommonAppStore } from './stores/commonAppStore';
import App from './App';
import preloadImages from './utils/preloadImages';

import bgImageBlured from './assets/img/MenuBackground_blured.webp';
import groundSheet from './assets/img/map/colony-grounds-ready.png';
import buildingsSheet from './assets/img/map/colony-buildings-ready.png';
import heroSpriteSheet from './assets/img/character/Female_Character.png';

// Ассеты первого экрана и игрового поля: пока они грузятся, показываем
// прелоадер, поэтому меню и карта появляются сразу отрисованными.
const PRELOAD_ASSETS = [bgImageBlured, groundSheet, buildingsSheet, heroSpriteSheet];

// Минимальная выдержка прелоадера: на быстрой сети он иначе мигнул бы на кадр.
const MIN_PRELOADER_MS = 600;

const AppContainer = () => {
    const isLoading = useCommonAppStore((state) => state.isLoading);
    const backgroundImageUrl = useCommonAppStore((state) => state.backgroundImageUrl);

    useEffect(() => {
        const { changeBackgroundImage, switchPreloader } = useCommonAppStore.getState();
        changeBackgroundImage(bgImageBlured);
        switchPreloader(true);

        let cancelled = false;
        const startedAt = Date.now();
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        // прелоадер держится ровно до готовности ассетов, без фиксированной паузы
        preloadImages(PRELOAD_ASSETS).then(() => {
            if (cancelled) {
                return;
            }
            const elapsed = Date.now() - startedAt;
            timeoutId = setTimeout(
                () => switchPreloader(false),
                Math.max(0, MIN_PRELOADER_MS - elapsed),
            );
        });

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, []);

    return <App isLoading={isLoading} backgroundImageUrl={backgroundImageUrl} />;
};

export default AppContainer;
