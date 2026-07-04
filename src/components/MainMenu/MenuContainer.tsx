import Menu from './Menu';
import { useCommonAppStore } from '../../stores/commonAppStore';

const MenuContainer = () => {
    const menuOptions = useCommonAppStore(state => state.menuOptions);

    return <Menu menuOptions = {menuOptions}/>;
};

export default MenuContainer;
