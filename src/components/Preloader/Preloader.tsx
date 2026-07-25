import preloaderSvg from '../../assets/img/Preloader.svg';
import classes from './Preloader.module.sass';
import { animated, useSpring } from '@react-spring/web';

const Preloader = () => {
    const containerStyle = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });
    const imageStyle = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        // короткая задержка: прелоадер живёт ровно столько, сколько грузятся
        // ассеты, поэтому логотип должен успеть проявиться
        delay: 150,
    });

    return (
        <animated.div className={classes.preloaderContainer} style={containerStyle}>
            <animated.img src={preloaderSvg} style={imageStyle} alt="Game is loading" />
            <animated.p className={classes.loadingText} style={imageStyle}>
                Loading
            </animated.p>
        </animated.div>
    );
};

export default Preloader;
