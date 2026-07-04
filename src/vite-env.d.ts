/// <reference types="vite/client" />

declare module '*.module.sass' {
    const classes: Readonly<Record<string, string>>;
    export default classes;
}

interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => import('redux').StoreEnhancer;
}
