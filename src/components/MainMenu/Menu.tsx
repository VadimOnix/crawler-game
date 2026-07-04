import classes from './Menu.module.sass';
import Button from './Button/Button';
import { NavLink } from 'react-router-dom';
import type { MenuOption } from '../../stores/commonAppStore';

interface MenuProps {
    menuOptions: MenuOption[];
}

const Menu = (props: MenuProps) => {
    const optionsList = props.menuOptions.map((o, index) => (
        <NavLink key = {index} className = {({isActive}) => isActive ? classes.menuItem : undefined} to = {o.link}>
            <Button text = {o.label} />
        </NavLink >
    ));

    return (
        <div className = {classes.menuBackground}>
            <h1 className = {classes.title} data-text = "Crawler">Crawler</h1 >
            <div className = {classes.menuContainer}>
                {optionsList}
            </div >
        </div >
    );
};

export default Menu;
