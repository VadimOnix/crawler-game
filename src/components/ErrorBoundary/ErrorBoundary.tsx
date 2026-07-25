import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import classes from './ErrorBoundary.module.sass';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

/**
 * Единственный классовый компонент в проекте: React не даёт другого способа
 * поймать ошибку рендера. Без него любое исключение в дереве оставляет
 * игрока перед чёрным экраном без объяснений.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Ошибка рендера:', error, errorInfo.componentStack);
    }

    render() {
        const { error } = this.state;
        if (!error) {
            return this.props.children;
        }

        return (
            <div className={classes.container} role="alert">
                <h1 className={classes.title}>Сбой системы</h1>
                <p className={classes.message}>
                    Что-то сломалось при отрисовке. Подробности — в консоли разработчика.
                </p>
                <pre className={classes.details}>{error.message}</pre>
                <button
                    type="button"
                    className={classes.reloadButton}
                    onClick={() => window.location.reload()}
                >
                    Перезагрузить
                </button>
            </div>
        );
    }
}

export default ErrorBoundary;
