import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminLayout from "@/layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WebSocketTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  
  useEffect(() => {
    // Make sure Echo is initialized
    if (!window.Echo) {
      setConnectionStatus("Echo is not initialized!");
      return;
    }

    try {
      // Subscribe to a public channel
      const channel = window.Echo.channel('test-channel');
      
      if (!channel) {
        setConnectionStatus("Failed to subscribe to channel");
        return;
      }
      
      // Listen for the TestEvent
      channel.listen('TestEvent', (e: { message: string }) => {
        setMessages(prev => [...prev, e.message]);
        
      })
      
      setConnectionStatus("Connected and listening on test-channel");
      
      // Cleanup on component unmount
      return () => {
        channel.stopListening('TestEvent');
        window.Echo.leave('test-channel');
      };
    } catch (error) {
      
      setConnectionStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, []);
  
  const triggerEvent = async () => {
    try {
      const response = await axios.get('/test-websocket');
      
    } catch (error) {
      
    }
  };
  
  return (
    <AdminLayout>
      <Head title="WebSocket Test" />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">WebSocket Test</h1>
            
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Connection Status:</h2>
              <p className={connectionStatus.includes("Error") ? "text-red-500" : 
                            connectionStatus.includes("Connected") ? "text-green-500" : "text-yellow-500"}>
                {connectionStatus}
              </p>
            </div>
            
            <div className="mb-4">
              <Button onClick={triggerEvent}>
                Trigger Test Event
              </Button>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Received Messages:</h2>
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages received yet.</p>
              ) : (
                <ul className="border rounded-md p-4">
                  {messages.map((message, index) => (
                    <li key={index} className="py-1">
                      {message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 