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
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            },
            2: {
                type: 'ground',
                walkable: true,
                bgUrl: ground_sheet,
                top: 654,
                left: 80,
                sizeX: CONSTANTS.SPRITE_SIZE,
                sizeY: CONSTANTS.SPRITE_SIZE,
            }
        },
        dialogs: {
            speakersData: [
                {
                    name: 'Leia',
                    sprite: hero_avatar
                },
                {
                    name: 'Grimm',
                    sprite: enemy_avatar
                },
                {
                    name: 'Незнакомец',
                    sprite: enemy_avatar
                }
            ],
            dialogList: {
                1: {
                    isDisposable: true,

                    phrases: [
                        {
                            speaker: 'Leia',
                            text: 'Черт, не стоило надеяться, что навигатор сможет работать в такую магнитную бурю...'
                        },
                        {
                            speaker: 'Leia',
                            text: 'Видимо, придется искать лачугу, в которой можно будет пересидеть до остановки реактора.'
                        },
                        {
                            speaker: 'Незнакомец',
                            text: 'С каких пор по нашему гнилому краю в одиночистве гуляют такие красотки?'
                        },
                        {
                            speaker: 'Leia',
                            text: 'С тех самых, когда здесь начали случайным образом пропадать люди.'
                        },
                        {
                            speaker: 'Leia',
                            text: 'Поэтому рекомендую держать дистанцию, если не хочешь, чтобы я отстрелила тебе чего-нибудь.'
                        },
                        {
                            speaker: 'Незнакомец',
                            text: 'Леди, быть столь грубой в Фризленде - сродни самоубийству... Но Гримм сегодня в хорошем настроении!'
                        },
                        {
                            speaker: 'Grimm',
                            text: 'Меня зовут Гримм, я работаю проводником в долине Фризленда'
                        },
                        {
                            speaker: 'Grimm',
                            text: 'Ты из нового отряда Ревёрсеров. На прошлой неделе один из ваших отказался от помощи, теперь его тело доедают догзайленты на входе'
                        },
                        {
                            speaker: 'Leia',
                            text: 'Я не хотела верить в смерть Йохана, но если это действительно так, дай мне убедиться в этом своими глазами'
                        },
                        {
                            speaker: 'Leia',
                            text: 'После чего я буду готова обсудить твоё вознаграждение и дальнейшеее сотрудничество'
                        },
                        {
                            speaker: 'Grimm',
                            text: 'Не отставай!'
                        },
                    ]
                }
            }
        }
    }
};


export default LEVELS;