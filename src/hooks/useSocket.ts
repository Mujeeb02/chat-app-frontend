import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';

export function useSocket() {
  const { token, isAuthenticated } = useAuthStore();
  const { addMessage, updateMessage, setTyping, updateUserStatus, markMessageAsRead } = useChatStore();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    // Connect to socket
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Message events
    socket.on('message:new', (data) => {
      const { message, chatId } = data;
      addMessage(message);
    });

    socket.on('message:sent', (data) => {
      const { message, chatId } = data;
      updateMessage(message._id, message);
    });

    // Typing events
    socket.on('typing:start', (data) => {
      const { chatId, userId, userName } = data;
      setTyping(true, userId);
    });

    socket.on('typing:stop', (data) => {
      const { chatId, userId } = data;
      setTyping(false, userId);
    });

    // User status events
    socket.on('user:status', (data) => {
      const { userId, status, lastSeen } = data;
      updateUserStatus(userId, status, lastSeen);
    });

    // Message read events
    socket.on('message:read', (data) => {
      const { messageId, userId, chatId } = data;
      markMessageAsRead(messageId, userId);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, token, addMessage, updateMessage, setTyping, updateUserStatus, markMessageAsRead]);

  const sendMessage = (chatId: string, content: string, type = 'text', replyTo?: string) => {
    if (!socketRef.current?.connected) {
      throw new Error('Socket not connected');
    }

    socketRef.current.emit('message:send', {
      chatId,
      content,
      type,
      replyTo
    });
  };

  const startTyping = (chatId: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('typing:start', { chatId });
  };

  const stopTyping = (chatId: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('typing:stop', { chatId });
  };

  const markMessageAsReadSocket = (messageId: string, chatId: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('message:read', { messageId, chatId });
  };

  const joinChat = (chatId: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('chat:join', chatId);
  };

  const leaveChat = (chatId: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('chat:leave', chatId);
  };

  return {
    sendMessage,
    startTyping,
    stopTyping,
    markMessageAsRead: markMessageAsReadSocket,
    joinChat,
    leaveChat,
    isConnected: socketRef.current?.connected || false
  };
}
