import React from 'react';
import classes from './DeveloperInfo.module.sass';
import developerPhoto from '../../assets/img/Developer_Photo.jpg';

const DeveloperInfo = () => {
    return (
        <div className = {classes.background}>
            <div className={classes.padder}>
                <div className = {classes.container}>
                    <div className = {classes.avatar}>
                        <img src = {developerPhoto} alt = "photo developer" />
                    </div >
                    <div className = {classes.info}>
                        <h1 >Vadim Xces</h1 >
                        <p >Немного текста обо мне</p >
                    </div >
                    <div>
                        <p>
                            оциалочки
                        </p>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default DeveloperInfo;