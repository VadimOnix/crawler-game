import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../../utils/useReducedMotion';

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
 * При prefers-reduced-motion печать пропускается: здесь анимация — это сам
 * контент, поэтому стилями её не погасить.
 */
const TypingText = ({
    text,
    speed = 50,
    startDelay = 0,
    onFinishedTyping,
    className,
    cursorClassName,
}: TypingTextProps) => {
    const reducedMotion = useReducedMotion();
    const [visibleCount, setVisibleCount] = useState(0);
    const isFinished = reducedMotion || visibleCount >= text.length;

    const onFinishedRef = useRef(onFinishedTyping);
    onFinishedRef.current = onFinishedTyping;

    useEffect(() => {
        if (reducedMotion) {
            return;
        }
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
    }, [reducedMotion, text, speed, startDelay]);

    useEffect(() => {
        if (isFinished) {
            onFinishedRef.current?.();
        }
    }, [isFinished]);

    return (
        <div className={className}>
            <p>
                {reducedMotion ? text : text.slice(0, visibleCount)}
                {!isFinished && <span className={cursorClassName}>|</span>}
            </p>
        </div>
    );
};

export default TypingText;
