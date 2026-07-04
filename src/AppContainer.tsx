import { useEffect } from 'react';
import { useCommonAppStore } from './stores/commonAppStore';
import App from './App';

import bgImageBlured from './assets/img/MenuBackground_blured.jpeg';

const AppContainer = () => {
    const isLoading = useCommonAppStore((state) => state.isLoading);
    const backgroundImageUrl = useCommonAppStore((state) => state.backgroundImageUrl);

    useEffect(() => {
        const { changeBackgroundImage, switchPreloader } = useCommonAppStore.getState();
        changeBackgroundImage(bgImageBlured);
        switchPreloader(true);
        const timeoutId = setTimeout(() => {
            switchPreloader(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, []);

    return <App isLoading={isLoading} backgroundImageUrl={backgroundImageUrl} />;
};

export default AppContainer;
