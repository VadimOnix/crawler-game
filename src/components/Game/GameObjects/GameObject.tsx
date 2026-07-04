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
        transform: `translate(${props.position[0] + 3}px, ${props.position[1] - 10}px)`,
        backgroundImage: `url('${props.sprite}')`,
        backgroundPosition: `left -${props.spritePosition[0]}px top -${props.spritePosition[1]}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
        transition: 'transform .3s cubic-bezier(.74,.28,.6,1.04)',
    } as const;

    return <div className="GameSprite" style={spriteControl}></div>;
};

export default GameObject;
