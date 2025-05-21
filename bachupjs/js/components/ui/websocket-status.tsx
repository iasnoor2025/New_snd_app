"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useWebSocket } from "@/hooks/useWebSocket"
import { Wifi, WifiOff } from "lucide-react"

interface WebSocketStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean
}

export function WebSocketStatus({ className, showLabel = true, ...props }: WebSocketStatusProps) {
  const { isConnected } = useWebSocket()

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      {isConnected ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          {showLabel && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
              Connected
            </Badge>
          )}
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          {showLabel && (
            <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
              Disconnected
            </Badge>
          )}
        </>
      )}
    </div>
  )
}
