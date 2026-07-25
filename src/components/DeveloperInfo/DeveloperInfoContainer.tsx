import { useEffect } from 'react';
import DeveloperInfo from './DeveloperInfo';
import { useCommonAppStore } from '../../stores/commonAppStore';

import bgImage from '../../assets/img/MenuBackground.webp';

const DeveloperInfoContainer = () => {
    useEffect(() => {
        useCommonAppStore.getState().changeBackgroundImage(bgImage);
    }, []);

    return <DeveloperInfo />;
};

export default DeveloperInfoContainer;
