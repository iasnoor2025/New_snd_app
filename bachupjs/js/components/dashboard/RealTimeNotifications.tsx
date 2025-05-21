import { useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Bell, Check, X, Trash2, BellOff, BellRing } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    time: string;
    read: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function RealTimeNotifications() {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const { isConnected } = useWebSocket({
        channel: 'notifications',
        event: 'notification',
        onMessage: (notification: Notification) => {
            handleNewNotification(notification);
            if (!isMuted) {
                toast({
                    title: notification.title,
                    description: notification.message,
                    variant: notification.type === 'error' ? 'destructive' : 'default',
                })
            }
        },
        onConnect: () => {
            toast({
                title: "Notifications Connected",
                description: "Real-time notifications are now active",
                variant: "default",
            })
        },
        onDisconnect: () => {
            toast({
                title: "Notifications Disconnected",
                description: "Real-time notifications are paused",
                variant: "destructive",
            })
        },
        onError: (error) => {
            toast({
                title: "Notification Error",
                description: error.message || 'An error occurred with notifications',
                variant: "destructive",
            })
        },
    })

    const handleNewNotification = (notification: Notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    const handleMarkAsRead = (id: number) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleClearNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleViewAll = () => {
        setShowAll(true);
        // Navigate to notifications page
    };

    const handleToggleMute = () => {
        setIsMuted(!isMuted);
        toast({
            title: isMuted ? "Notifications Unmuted" : "Notifications Muted",
            description: isMuted ? "You will now receive notifications" : "You will not receive notifications",
            variant: "default",
        })
    };

    const getNotificationBadgeColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    {isMuted ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    {unreadCount > 0 && !isMuted && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={handleToggleMute}
                            {isMuted ? <BellRing className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                        </Button>
                        {notifications.length > 0 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleClearAll}
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    "flex flex-col items-start space-y-1 p-4",
                                    !notification.read && "bg-accent"
                                )}
                                onClick={() => handleMarkAsRead(notification.id)}
                                <div className="flex items-center space-x-2 w-full">
                                    <div className={`h-2 w-2 rounded-full ${getNotificationBadgeColor(notification.type)}`} />
                                    <span className="font-medium">{notification.title}</span>
                                    <span className="text-xs text-muted-foreground ml-auto">{notification.time}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{notification.message}</span>
                                <div className="flex items-center space-x-2 w-full mt-1">
                                    {notification.action && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                notification.action?.onClick();
                                            }}
                                            {notification.action.label}
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 ml-auto"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClearNotification(notification.id);
                                        }}
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleViewAll}>
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

