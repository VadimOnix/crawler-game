import React from 'react';

const Character = (props) => {
    const spriteControl = {
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${props.sprite}')`,
        backgroundPosition: '0 0',
        width: '100px',
        height: '100px',
    };

    return (
        <div style={spriteControl}>

        </div >
    );



};




export default Character;