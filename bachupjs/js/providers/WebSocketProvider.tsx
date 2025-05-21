import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

interface WebSocketContextType {
    echo: Echo | null;
    isConnected: boolean;
    connect: () => void;
    disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
    echo: null,
    isConnected: false,
    connect: () => {},
    disconnect: () => {},
})

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const [echo, setEcho] = useState<Echo | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const connect = () => {
        try {
            if (echo) {
                echo.disconnect();
            }

            const newEcho = new Echo({
                broadcaster: 'pusher',
                key: import.meta.env.VITE_PUSHER_APP_KEY,
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
                forceTLS: true,
                enabledTransports: ['ws', 'wss'],
                auth: {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    },
                },
            })

            newEcho.connector.pusher.connection.bind('connected', () => {
                console.log('WebSocket connected');
                setIsConnected(true);
            })

            newEcho.connector.pusher.connection.bind('disconnected', () => {
                console.log('WebSocket disconnected');
                setIsConnected(false);
            })

            newEcho.connector.pusher.connection.bind('error', (error: any) => {
                console.error('WebSocket error:', error);
                setIsConnected(false);
            })

            setEcho(newEcho);
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
            setIsConnected(false);
        }
    };

    const disconnect = () => {
        if (echo) {
            echo.disconnect();
            setEcho(null);
            setIsConnected(false);
        }
    };

    useEffect(() => {
        // Only connect if we have the required environment variables
        if (import.meta.env.VITE_PUSHER_APP_KEY && import.meta.env.VITE_PUSHER_APP_CLUSTER) {
            connect();
        } else {
            console.warn('WebSocket configuration missing. Please check your environment variables.');
        }

        return () => {
            disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ echo, isConnected, connect, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};
