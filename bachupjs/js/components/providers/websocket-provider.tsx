"use client"

import React, { ReactNode, useContext } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { WebSocketStatus } from "@/components/ui/websocket-status";

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { isConnected, hasError, error } = useWebSocket();

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <WebSocketStatus showLabel={false} />
      </div>
      {children}
    </>
  );
}

export function useWebSocketContext() {
  // This is a placeholder for context usage if needed in the future
  // For now, just use the useWebSocket hook directly
  return useWebSocket();
}

export default WebSocketProvider;


