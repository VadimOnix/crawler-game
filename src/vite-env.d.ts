/// <reference types="vite/client" />

declare module '*.module.sass' {
    const classes: Readonly<Record<string, string>>;
    export default classes;
}
