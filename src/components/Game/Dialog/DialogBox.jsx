import React from 'react';
import classes from './Dialog.module.sass';

const DialogBox = (props) => {
    return (
        <div className = {[classes.dialogBox, props.boxRole].join(' ')}>
            <img className = {classes.avatar} src = {props.spriteSrc} alt = "" />
            <p className = {classes.text}>
                {props.text}
            </p >
        </div >
    );
};

export default DialogBox;