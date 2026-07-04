import { HashRouter, Route, Routes } from 'react-router-dom';
import MenuContainer from './components/MainMenu/MenuContainer';
import GameContainer from './components/Game/GameContainer';
import PlayerInfoContainer from './components/PlayerInfo/PlayerInfoContainer';
import Preloader from './components/Preloader/Preloader';
import DeveloperInfoContainer from './components/DeveloperInfo/DeveloperInfoContainer';

interface AppProps {
    isLoading: boolean;
    backgroundImageUrl: string;
}

const App = (props: AppProps) => {
    const appStyle = {
        backgroundImage: `url('${props.backgroundImageUrl}')`,
    };

    const content = props.isLoading ? (
        <Preloader />
    ) : (
        <Routes>
            <Route path="/" element={<MenuContainer />} />
            <Route path="/game" element={<GameContainer />} />
            <Route path="/character" element={<PlayerInfoContainer />} />
            <Route path="/about" element={<DeveloperInfoContainer />} />
        </Routes>
    );

    return (
        // HashRouter вместо BrowserRouter: статический хостинг (GitHub Pages)
        // не умеет отдавать index.html по произвольным путям SPA
        <HashRouter>
            <div className="App" style={appStyle}>
                <div className="AppWrapper">{content}</div>
            </div>
        </HashRouter>
    );
};

export default App;
