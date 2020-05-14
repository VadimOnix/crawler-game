import React from 'react';
import ProgressBar from './ProgressBar';

const HeroBar = () => {



    return (
        <div >
            <div className="">
                <h3>NAME</h3>
                <span>63/100</span>
            </div>
            <div>
                <ProgressBar color={''} percent={50}/>
                <ProgressBar color={''} percent={50}/>
            </div>
        </div >
    );
};

export default HeroBar;