import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MenuOption {
    label: string;
    link: string;
}

interface CommonAppStore {
    isLoading: boolean;
    backgroundImageUrl: string;
    menuOptions: MenuOption[];
    switchPreloader: (status: boolean) => void;
    changeBackgroundImage: (url: string) => void;
}

export const useCommonAppStore = create<CommonAppStore>()(
    devtools(
        (set) => ({
            isLoading: true,
            backgroundImageUrl: '',
            menuOptions: [
                {
                    label: 'New game',
                    link: '/game'
                },
                {
                    label: 'About developer',
                    link: '/about'
                }
            ],

            switchPreloader: (status) => set({isLoading: status}, false, 'switchPreloader'),
            changeBackgroundImage: (url) => set({backgroundImageUrl: url}, false, 'changeBackgroundImage'),
        }),
        {name: 'commonApp'},
    ),
);
