'use client';

import { useEffect, useState } from 'react';
import socketService from '@/lib/socket';
import useAuthStore from '@/store/authStore';

export default function SocketStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsConnected(false);
      setConnectionError(null);
      return;
    }

    const checkAndConnect = async () => {
      const status = socketService.getConnectionStatus();
      setIsConnected(status);
      
      if (!status) {
        setConnectionError('Socket not connected');
        // Try to connect if not connected
        try {
          await socketService.connect(token);
          setIsConnected(true);
          setConnectionError(null);
        } catch (error) {
          console.error('Failed to connect socket:', error);
          setConnectionError('Connection failed');
        }
      } else {
        setConnectionError(null);
      }
    };

    // Check connection status immediately
    checkAndConnect();

    // Set up interval to check connection status
    const interval = setInterval(checkAndConnect, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
        isConnected 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Socket Connected</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Socket Disconnected</span>
            {connectionError && (
              <span className="text-xs opacity-75">({connectionError})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 