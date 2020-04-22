import React from 'react';

const Character = (props) => {
    const spriteControl = {
        position: 'absolute',
        transform: `translate(${props.position[0]}px, ${props.position[1]}px)`,
        backgroundImage: `url('${props.sprite}')`,
        backgroundPosition: '0 0',
        width: `${props.constants.SPRITE_SIZE}px`,
        height: `${props.constants.SPRITE_SIZE}px`,
        transition: '0.2s cubic-bezier(.51,0,0,1)'
    };

    return (
        <div className="GameSprite" style = {spriteControl}>

        </div >
    );



};




export default Character;