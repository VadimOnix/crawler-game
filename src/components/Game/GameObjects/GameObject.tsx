import CONSTANTS from '../../../gameCore/constants';

// Кадр в спрайт-листе персонажа больше клетки и нарисован не по её центру,
// поэтому спрайт сдвигается, чтобы «стоять» на своём тайле
const SPRITE_OFFSET_X = 3;
const SPRITE_OFFSET_Y = -10;

// Плавный сдвиг между клетками должен укладываться в шаг игрового цикла,
// иначе анимация обрежется следующим ходом
const MOVE_TRANSITION = `transform ${CONSTANTS.GAME_ANIMATE_SPEED}ms cubic-bezier(.74,.28,.6,1.04)`;

interface GameObjectProps {
    position: [number, number];
    spritePosition: [number, number];
    sprite: string;
    width: number;
    height: number;
}

const GameObject = (props: GameObjectProps) => {
    const spriteControl = {
        position: 'absolute',
        transform: `translate(${props.position[0] + SPRITE_OFFSET_X}px, ${props.position[1] + SPRITE_OFFSET_Y}px)`,
        backgroundImage: `url('${props.sprite}')`,
        backgroundPosition: `left -${props.spritePosition[0]}px top -${props.spritePosition[1]}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
        transition: MOVE_TRANSITION,
    } as const;

    return <div className="GameSprite" style={spriteControl}></div>;
};

export default GameObject;
