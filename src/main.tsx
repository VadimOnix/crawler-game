import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Globals } from '@react-spring/web';
import './index.css';
import AppContainer from './AppContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { prefersReducedMotion, REDUCED_MOTION_QUERY } from './utils/useReducedMotion';

// react-spring живёт вне CSS, поэтому «меньше движения» ему нужно сообщить
// отдельно — одним переключателем на все пружины в приложении
const applyReducedMotion = (reduced: boolean) => Globals.assign({ skipAnimation: reduced });

applyReducedMotion(prefersReducedMotion());
window
    .matchMedia?.(REDUCED_MOTION_QUERY)
    .addEventListener('change', (e) => applyReducedMotion(e.matches));

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Не найден контейнер #root в index.html');
}

createRoot(rootElement).render(
    <StrictMode>
        <ErrorBoundary>
            <AppContainer />
        </ErrorBoundary>
    </StrictMode>,
);
