import { useEffect, useRef, useState } from 'react';

interface TypingTextProps {
    /** текст для печати */
    text: string;
    /** задержка между символами, мс */
    speed?: number;
    /** задержка перед началом печати, мс */
    startDelay?: number;
    /** колбек по окончании печати */
    onFinishedTyping?: () => void;
    className?: string;
    cursorClassName?: string;
}

/**
 * Печатает текст посимвольно (замена заброшенной react-typing-animation).
 */
const TypingText = ({
    text,
    speed = 50,
    startDelay = 0,
    onFinishedTyping,
    className,
    cursorClassName,
}: TypingTextProps) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const isFinished = visibleCount >= text.length;

    const onFinishedRef = useRef(onFinishedTyping);
    onFinishedRef.current = onFinishedTyping;

    useEffect(() => {
        setVisibleCount(0);
        let intervalId: ReturnType<typeof setInterval> | undefined;
        const timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                setVisibleCount((prev) => {
                    if (prev >= text.length) {
                        clearInterval(intervalId);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, speed, startDelay]);

    useEffect(() => {
        if (isFinished) {
            onFinishedRef.current?.();
        }
    }, [isFinished]);

    return (
        <div className={className}>
            <p>
                {text.slice(0, visibleCount)}
                {!isFinished && <span className={cursorClassName}>|</span>}
            </p>
        </div>
    );
};

export default TypingText;
