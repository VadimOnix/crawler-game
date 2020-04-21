import React from 'react';

const Character = (props) => {
    const spriteControl = {
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${props.sprite}')`,
        backgroundPosition: '0 0',
        width: `${props.constants.SPRITE_SIZE}px`,
        height: `${props.constants.SPRITE_SIZE}px`,
    };

    return (
        <div className="GameSprite" style = {spriteControl}>

        </div >
    );



};




export default Character;