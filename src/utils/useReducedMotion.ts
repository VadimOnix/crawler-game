import { useEffect, useState } from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' && window.matchMedia?.(REDUCED_MOTION_QUERY).matches === true;

/**
 * Просит ли пользователь ограничить анимации. Переходы и CSS-анимации гасятся
 * стилями (см. index.css); хук нужен там, где «анимация» — это сам контент,
 * например посимвольная печать текста.
 */
export const useReducedMotion = (): boolean => {
    const [reduced, setReduced] = useState(prefersReducedMotion);

    useEffect(() => {
        const mediaQuery = window.matchMedia?.(REDUCED_MOTION_QUERY);
        if (!mediaQuery) {
            return;
        }
        const handleChange = (e: MediaQueryListEvent) => setReduced(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return reduced;
};

export default useReducedMotion;
