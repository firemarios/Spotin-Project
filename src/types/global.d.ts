declare module '*.css';
declare const alertify: {
    alert(message: string, onok?: () => void): void;
    confirm(message: string, onok: () => void, oncancel?: () => void): void;
    prompt(message: string, defaultValue: string, onok: (value: string) => void, oncancel?: () => void): void;
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    message(message: string): void;
};
