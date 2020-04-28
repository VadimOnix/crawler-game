import ground_sheet from '../../assets/img/map/colony-grounds-ready.png';
import buildings_sheet from '../../assets/img/map/colony-buildings-ready.png';

import hero_avatar from '../../assets/img/hero_avatar_small.png';
import enemy_avatar from '../../assets/img/enemy_avatar_small.png';

import CONSTANTS from '../constants';

export const LEVELS = {
    1: {
        level: 1,
        levelMap: [
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        levelAssets: {
            0: {
                type: 'ground',
                walkable: true,
                bgUrl: ground_sheet,
                top: 544,
                left: 0,
                sizeX: CONSTANTS.SPRITE_SIZE,
                sizeY: CONSTANTS.SPRITE_SIZE,
            },
            1: {
                type: 'ground',
                walkable: false,
                bgUrl: buildings_sheet,
                top: 1575,
                left: 81,
                sizeX: CONSTANTS.SPRITE_SIZE,
                sizeY: CONSTANTS.SPRITE_SIZE,
            }
        },
        dialogs: {
            speakersData: [
                {
                    name: 'hero',
                    sprite: hero_avatar
                },
                {
                    name: 'enemy',
                    sprite: enemy_avatar
                }
            ],
            dialogList: {
                1: {
                    isDisposable: true,

                    phrases: [
                        {
                            speaker: 'hero',
                            text: 'Тестирование первого диалогвого окна из четырех'
                        },
                        {
                            speaker: 'hero',
                            text: 'Тестирование второго диалогвого окна'
                        },
                        {
                            speaker: 'enemy',
                            text: 'Тестирование первого диалогвого окна из '
                        },
                        {
                            speaker: 'hero',
                            text: 'Тестирование первого диалогвого окна из '
                        },
                    ]
                }
            }
        }
    }
};


export default LEVELS;