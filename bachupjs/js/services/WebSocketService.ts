import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { toast } from '@/components/ui/use-toast.tsx';

interface WebSocketConfig {
    key: string;
    cluster: string;
    host?: string;
    port?: number;
    scheme?: string;
}

interface Message {
    id: string;
    type: string;
    data: any;
    timestamp: number;
}

class WebSocketService {
    private static instance: WebSocketService;
    private echo: Echo | null = null;
    private messageQueue: Message[] = [];
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // Start with 1 second
    private maxReconnectDelay = 30000; // Max 30 seconds
    private isConnected = false;
    private eventHandlers: Map<string, Set<Function>> = new Map();

    private constructor() {
        this.initializeWebSocket();
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private initializeWebSocket() {
        const config: WebSocketConfig = {
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
            host: import.meta.env.VITE_PUSHER_HOST,
            port: import.meta.env.VITE_PUSHER_PORT ? parseInt(import.meta.env.VITE_PUSHER_PORT) : undefined,
            scheme: import.meta.env.VITE_PUSHER_SCHEME ?? 'https',
        };

        if (!config.key) {
            console.error('Pusher key is not defined. WebSocket functionality will be disabled.');
            return;
        }

        try {
            this.echo = new Echo({
                broadcaster: 'pusher',
                key: config.key,
                cluster: config.cluster,
                wsHost: config.host ? config.host : `ws-${config.cluster}.pusher.com`,
                wsPort: config.port ?? 80,
                wssPort: config.port ?? 443,
                forceTLS: config.scheme === 'https',
                enabledTransports: ['ws', 'wss'],
                disableStats: true,
                encrypted: true,
            })

            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize WebSocket:', error);
            this.handleError(error);
        }
    }

    private setupEventListeners() {
        if (!this.echo) return;

        const socket = this.echo.connector.socket;

        socket.on('connect', () => {
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.reconnectDelay = 1000;
            this.processMessageQueue();
            toast({
                title: "WebSocket Connected",
                description: "Real-time updates are now active",
                variant: "default",
            })
        })

        socket.on('disconnect', () => {
            this.isConnected = false;
            this.handleDisconnect();
        })

        socket.on('error', (error: any) => {
            this.handleError(error);
        })

        socket.on('connecting', () => {
            toast({
                title: "Connecting...",
                description: "Attempting to establish WebSocket connection",
                variant: "default",
            })
        })

        socket.on('failed', () => {
            this.handleError(new Error('WebSocket connection failed'));
        })
    }

    private handleDisconnect() {
        toast({
            title: "WebSocket Disconnected",
            description: "Real-time updates are paused",
            variant: "destructive",
        })

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);

            setTimeout(() => {
                this.initializeWebSocket();
            }, this.reconnectDelay);
        } else {
            toast({
                title: "Connection Failed",
                description: "Maximum reconnection attempts reached. Please refresh the page.",
                variant: "destructive",
            })
        }
    }

    private handleError(error: any) {
        console.error('WebSocket error:', error);
        toast({
            title: "WebSocket Error",
            description: error.message || 'An error occurred with the WebSocket connection',
            variant: "destructive",
        })
    }

    public subscribe(channel: string, event: string, callback: Function) {
        if (!this.echo) {
            this.messageQueue.push({
                id: Math.random().toString(36).substr(2, 9),
                type: 'subscribe',
                data: { channel, event, callback },
                timestamp: Date.now(),
            })
            return;
        }

        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, new Set());
        }
        this.eventHandlers.get(event)?.add(callback);

        this.echo.channel(channel).listen(event, (data: any) => {
            callback(data);
        })
    }

    public unsubscribe(channel: string, event: string, callback: Function) {
        if (!this.echo) return;

        this.eventHandlers.get(event)?.delete(callback);
        this.echo.leave(channel);
    }

    private processMessageQueue() {
        if (!this.isConnected || !this.echo) return;

        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            if (!message) continue;

            switch (message.type) {
                case 'subscribe':
                    const { channel, event, callback } = message.data;
                    this.subscribe(channel, event, callback);
                    break;
                // Add other message types as needed
            }
        }
    }

    public getConnectionStatus(): boolean {
        return this.isConnected;
    }
}

export const webSocketService = WebSocketService.getInstance();



