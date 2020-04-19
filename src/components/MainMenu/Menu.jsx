import React from 'react';
import classes from './Menu.module.sass';
import Button from './Button/Button';
import { NavLink } from 'react-router-dom';

const Menu = (props) => {
    let optionsList = props.menuOptions.map((o,index) => (
        <NavLink activeClassName = {classes.menuItem} to = {o.link}>
            <Button key = {index} text = {o.label} />
        </NavLink >
    ));

    return (
        <div className = {`${classes.menuBackground} ${classes.gameLoaded}`}>
            <div className = {classes.menuContainer}>
                {optionsList}
            </div >
        </div >
    );
};

export default Menu;