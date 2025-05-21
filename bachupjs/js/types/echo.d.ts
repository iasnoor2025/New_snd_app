import Echo from 'laravel-echo';

declare module 'laravel-echo' {
    interface EchoConfig {
        broadcaster: 'pusher' | 'socket.io' | 'redis' | null;
        host?: string;
        port?: number;
        scheme?: string;
        auth?: {
            headers: {
                [key: string]: string;
            };
        };
    }
} 