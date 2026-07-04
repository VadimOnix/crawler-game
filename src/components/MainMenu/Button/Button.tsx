import classes from './Button.module.sass'

interface ButtonProps {
    text: string;
}

const Button = (props: ButtonProps) => {
    return (
            <button className={classes.mainButton}>
                <svg width="315" height="60" viewBox="0 0 302 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%"   stopColor ="rgba(3,8,22,.92)"/>
                            <stop offset="55%"  stopColor ="rgba(0,240,255,.12)"/>
                            <stop offset="100%" stopColor ="rgba(5,2,26,.92)"/>
                        </linearGradient>
                    </defs>
                    <path d="M118.13 1H7.29888L1 7.07594V48.4684L7.29888 55.6835H189.246L196.173 61H294.997L301 55.6835V12.7722L294.997 7.07594H125.98L118.13 1Z" />
                </svg>
                <p>{props.text}</p>
            </button>
    );
};

export default Button;
