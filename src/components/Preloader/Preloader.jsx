import React from 'react';
import preloaderSvg from '../../assets/img/Preloader.svg';
import classes from './Preloader.module.sass';
import { Spring, config } from 'react-spring/renderprops';

const Preloader = (props) => {
    return (
        <Spring
            from = {{opacity: 0}}
            to = {{opacity: 1}}
        >
            {props =>
                <div className = {classes.preloaderContainer} style={props}>
                    <Spring
                        from = {{opacity: 0}}
                        to = {{opacity: 1}}
                        config={{
                            delay: 1000
                        }}
                    >
                        {props =>
                            <img src = {preloaderSvg} style={props} alt = "Game is loading" />
                        }
                    </Spring>
                </div >
            }
        </Spring >
    );
};

export default Preloader;