import React from 'react';
import { Link } from '@inertiajs/react';
import { Smartphone, Wifi, Bell, Download } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { Badge } from '@/Components/ui/badge';

interface PWAMenuItemProps {
    className?: string;
    showBadges?: boolean;
}

const PWAMenuItem: React.FC<PWAMenuItemProps> = ({ className = '', showBadges = true }) => {
    const {
        isOnline,
        isInstallable,
        isStandalone,
        notificationPermission,
        serviceWorkerStatus
    } = usePWA();

    const getStatusBadges = () => {
        const badges = [];

        // Offline status
        if (!isOnline) {
            badges.push(
                <Badge key="offline" variant="destructive" className="text-xs">
                    Offline
                </Badge>
            );
        }

        // Installable status
        if (isInstallable && !isStandalone) {
            badges.push(
                <Badge key="installable" variant="secondary" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Install
                </Badge>
            );
        }

        // Notification permission status
        if (notificationPermission === 'default') {
            badges.push(
                <Badge key="notifications" variant="outline" className="text-xs">
                    <Bell className="h-3 w-3 mr-1" />
                    Enable
                </Badge>
            );
        }

        // Service worker update available
        if (serviceWorkerStatus === 'waiting') {
            badges.push(
                <Badge key="update" variant="default" className="text-xs bg-blue-600">
                    Update
                </Badge>
            );
        }

        return badges;
    };

    const statusBadges = showBadges ? getStatusBadges() : [];

    return (
        <Link
            href="/pwa"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted ${className}`}
        >
            <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>PWA Management</span>
            </div>

            {statusBadges.length > 0 && (
                <div className="flex items-center gap-1 ml-auto">
                    {statusBadges.slice(0, 2)} {/* Show max 2 badges */}
                    {statusBadges.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                            +{statusBadges.length - 2}
                        </Badge>
                    )}
                </div>
            )}

            {/* Connection status indicator */}
            <div className="flex items-center gap-1 ml-auto">
                <div className={`w-2 h-2 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                }`} />
                {isStandalone && (
                    <Smartphone className="h-3 w-3 text-blue-600" title="Running as installed app" />
                )}
            </div>
        </Link>
    );
};

export default PWAMenuItem;

