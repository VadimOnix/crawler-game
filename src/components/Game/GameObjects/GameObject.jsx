import React from 'react';

const GameObject = (props) => {
    const spriteControl = {
        position: 'absolute',
        transform: `translate(${props.position[0]}px, ${props.position[1]}px)`,
        backgroundImage: `url('${props.sprite}')`,
        backgroundPosition: `left -${props.spritePosition[0]}px top -${props.spritePosition[1]}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
        transition: 'transform .3s cubic-bezier(.74,.28,.6,1.04)'
    };

    return (
        <div className="GameSprite" style = {spriteControl}>

        </div >
    );
};

export default GameObject;