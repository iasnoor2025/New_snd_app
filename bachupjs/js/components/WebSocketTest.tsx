import React, { useEffect, useState } from 'react';

export default function WebSocketTest() {
    const [message, setMessage] = useState<string>('Waiting for WebSocket message...');
    const [status, setStatus] = useState<string>('Connecting...');

    useEffect(() => {
        // Listen for the WebSocket connection
        if (window.Echo) {
            try {
                // Set a connected status
                setStatus('Connected to WebSocket server');
                
                // Listen to the test-channel
                window.Echo.channel('test-channel')
                    .listen('.TestEvent', (e: { message: string }) => {
                        setMessage(e.message);
                        setStatus('Message received!');
                    })
            } catch (error) {
                
                setStatus('Error connecting to WebSocket server');
            }
        } else {
            setStatus('Echo is not initialized');
        }

        return () => {
            // Clean up the subscription when the component unmounts
            window.Echo?.channel('test-channel').stopListening('.TestEvent');
        };
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">WebSocket Test</h2>
            <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Status:</p>
                <p className={`text-sm ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {status}
                </p>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">Message:</p>
                <p className="text-sm text-gray-700">{message}</p>
            </div>
        </div>
    );
} 