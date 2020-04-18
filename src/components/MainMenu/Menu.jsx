import React from 'react';
import classes from './Menu.module.sass';
import Button from './Button/Button';
import { NavLink } from 'react-router-dom';

const Menu = (props) => {
    return (
        <div className = {`${classes.menuBackground} ${classes.gameLoaded}`}>
            <div className = {classes.menuContainer}>
                <NavLink activeClassName={classes.menuItem} to = {!props.link ? '/' : props.link}>
                    <Button key={'1'} clickHandler = {() => alert('1')} text = "New Game" />
                </NavLink >
                <NavLink activeClassName={classes.menuItem} to = {!props.link ? '/' : props.link}>
                    <Button key={'2'} clickHandler = {() => alert('1')} text = "My Character" />
                </NavLink >
                <NavLink activeClassName={classes.menuItem} to = {!props.link ? '/' : props.link}>
                    <Button key={'3'} clickHandler = {() => alert('1')} text = "About developer" />
                </NavLink >
            </div >
        </div >
    );
};

export default Menu;