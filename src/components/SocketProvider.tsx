'use client';

import { createContext, useContext, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import socketService from '@/lib/socket';

interface SocketContextType {
  isConnected: boolean;
  sendMessage: (chatId: string, content: string, type?: string, replyTo?: string) => void;
  startTyping: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  markMessageAsRead: (messageId: string, chatId: string) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { token, isAuthenticated, initializeSocket } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    // Initialize socket connection
    initializeSocket();
  }, [isAuthenticated, token, initializeSocket]);

  const sendMessage = async (chatId: string, content: string, type = 'text', replyTo?: string) => {
    try {
      await socketService.sendMessage(chatId, content, type, replyTo);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const startTyping = (chatId: string) => {
    socketService.startTyping(chatId);
  };

  const stopTyping = (chatId: string) => {
    socketService.stopTyping(chatId);
  };

  const markMessageAsReadSocket = (messageId: string, chatId: string) => {
    socketService.markMessageAsRead(messageId, chatId);
  };

  const joinChat = (chatId: string) => {
    socketService.joinChat(chatId);
  };

  const leaveChat = (chatId: string) => {
    socketService.leaveChat(chatId);
  };

  const value: SocketContextType = {
    isConnected: socketService.getConnectionStatus(),
    sendMessage,
    startTyping,
    stopTyping,
    joinChat,
    leaveChat,
    markMessageAsRead: markMessageAsReadSocket
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
} 