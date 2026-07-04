import React, { useEffect, useRef, useState } from 'react';

/**
 * Печатает текст посимвольно (замена заброшенной react-typing-animation).
 * @param {string} text - текст для печати
 * @param {number} speed - задержка между символами, мс
 * @param {number} startDelay - задержка перед началом печати, мс
 * @param {function} onFinishedTyping - колбек по окончании печати
 */
const TypingText = ({text, speed = 50, startDelay = 0, onFinishedTyping, className, cursorClassName}) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const isFinished = visibleCount >= text.length;

    const onFinishedRef = useRef(onFinishedTyping);
    onFinishedRef.current = onFinishedTyping;

    useEffect(() => {
        setVisibleCount(0);
        let intervalId;
        const timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                setVisibleCount(prev => {
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
        <div className = {className}>
            <p >
                {text.slice(0, visibleCount)}
                {!isFinished && <span className = {cursorClassName}>|</span >}
            </p >
        </div >
    );
};

export default TypingText;
