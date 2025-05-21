import { useEffect, useCallback, useState } from 'react';
import { webSocketService } from '@/services/WebSocketService';

interface UseWebSocketOptions {
    channel?: string;
    event?: string;
    onMessage?: (data: any) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onError?: (error: any) => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
    const [isConnected, setIsConnected] = useState(webSocketService.getConnectionStatus());
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleMessage = useCallback((data: any) => {
        if (options.onMessage) {
            options.onMessage(data);
        }
    }, [options.onMessage]);

    useEffect(() => {
        if (options.channel && options.event) {
            // Subscribe to the channel and event
            webSocketService.subscribe(options.channel, options.event, handleMessage);
        }

        // Set up connection status listeners
        const checkConnection = () => {
            const connected = webSocketService.getConnectionStatus();
            setIsConnected(connected);

            if (connected && options.onConnect) {
                options.onConnect();
            } else if (!connected && options.onDisconnect) {
                options.onDisconnect();
            }
        };

        // Check connection status periodically
        const interval = setInterval(checkConnection, 5000);

        // Cleanup on unmount
        return () => {
            clearInterval(interval);
            if (options.channel && options.event) {
                webSocketService.unsubscribe(options.channel, options.event, handleMessage);
            }
        };
    }, [options.channel, options.event, handleMessage, options.onConnect, options.onDisconnect]);

    // Error handling
    useEffect(() => {
        if (options.onError) {
            const handleError = (error: any) => {
                setHasError(true);
                setError(error);
                options.onError(error);
            };

            // Add error handler to window
            window.addEventListener('error', handleError);

            return () => {
                window.removeEventListener('error', handleError);
            };
        }
    }, [options.onError]);

    return {
        isConnected,
        hasError,
        error,
        subscribe: webSocketService.subscribe.bind(webSocketService),
        unsubscribe: webSocketService.unsubscribe.bind(webSocketService),
    };
}



