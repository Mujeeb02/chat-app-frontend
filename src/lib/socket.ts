import { io, Socket } from 'socket.io-client';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private connectionPromise: Promise<void> | null = null;
  private onConnectCallbacks: (() => void)[] = [];

  connect(token: string) {
    console.log('SocketService: Attempting to connect with token:', token ? 'present' : 'missing');
    
    if (this.socket?.connected) {
      console.log('SocketService: Already connected');
      return Promise.resolve();
    }

    // If already connecting, return the existing promise
    if (this.connectionPromise) {
      console.log('SocketService: Already connecting, returning existing promise');
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
      console.log('SocketService: Connecting to:', socketUrl);
      
      this.socket = io(socketUrl, {
        auth: {
          token
        },
        transports: ['websocket', 'polling'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000
      });

      this.socket.on('connect', () => {
        console.log('SocketService: Socket connected successfully');
        this.isConnected = true;
        this.connectionPromise = null;
        
        // Notify all callbacks
        this.onConnectCallbacks.forEach(callback => callback());
        
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('SocketService: Socket connection error:', error);
        this.isConnected = false;
        this.connectionPromise = null;
        reject(error);
      });

      this.socket.on('disconnect', () => {
        console.log('SocketService: Socket disconnected');
        this.isConnected = false;
      });

      this.setupEventListeners();
    });

    return this.connectionPromise;
  }

  disconnect() {
    console.log('SocketService: Disconnecting socket');
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionPromise = null;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Handle new messages (for other users)
    this.socket.on('message:new', (data) => {
      const { message, chatId } = data;
      console.log('Socket: Received new message:', message._id);
      useChatStore.getState().addMessage(message);
    });

    // Handle message sent confirmation (for sender)
    this.socket.on('message:sent', (data) => {
      const { message, chatId } = data;
      console.log('Socket: Message sent confirmation:', message._id);
      // Don't add the message again, just update it if it exists
      const existingMessage = useChatStore.getState().messages.find(m => m._id === message._id);
      if (!existingMessage) {
        useChatStore.getState().addMessage(message);
      } else {
        useChatStore.getState().updateMessage(message._id, message);
      }
    });

    // Handle message reactions
    this.socket.on('message:reaction', (data) => {
      const { messageId, reaction, chatId } = data;
      console.log('Socket: Received reaction:', messageId, reaction.emoji, chatId);
      useChatStore.getState().addReaction(messageId, reaction);
    });

    // Handle reaction sent confirmation
    this.socket.on('message:reaction:sent', (data) => {
      const { messageId, reaction, chatId } = data;
      console.log('Socket: Reaction sent confirmation:', messageId, reaction.emoji, chatId);
      useChatStore.getState().addReaction(messageId, reaction);
    });

    // Handle reaction removal
    this.socket.on('message:reaction-removed', (data) => {
      const { messageId, emoji, userId, chatId } = data;
      console.log('Socket: Reaction removed:', messageId, emoji, userId, chatId);
      useChatStore.getState().removeReaction(messageId, emoji, userId);
    });

    // Handle reaction removal confirmation
    this.socket.on('message:reaction-removed:sent', (data) => {
      const { messageId, emoji, userId, chatId } = data;
      console.log('Socket: Reaction removal confirmation:', messageId, emoji, userId, chatId);
      useChatStore.getState().removeReaction(messageId, emoji, userId);
    });

    // Handle typing indicators
    this.socket.on('typing:start', (data) => {
      const { chatId, userId, userName } = data;
      useChatStore.getState().setTyping(true, userId);
    });

    this.socket.on('typing:stop', (data) => {
      const { chatId, userId } = data;
      useChatStore.getState().setTyping(false, userId);
    });

    // Handle user status updates
    this.socket.on('user:status', (data) => {
      const { userId, status, lastSeen } = data;
      useChatStore.getState().updateUserStatus(userId, status, lastSeen);
    });

    // Handle message read receipts
    this.socket.on('message:read', (data) => {
      const { messageId, userId, chatId } = data;
      useChatStore.getState().markMessageAsRead(messageId, userId);
    });

    // Handle chat events
    this.socket.on('chat:joined', (data) => {
      const { chatId } = data;
      console.log(`Joined chat: ${chatId}`);
    });

    this.socket.on('chat:left', (data) => {
      const { chatId } = data;
      console.log(`Left chat: ${chatId}`);
    });

    // Handle call events
    this.socket.on('call:incoming', (data) => {
      console.log('Socket: Incoming call received:', data);
    });

    this.socket.on('call:accepted', (data) => {
      console.log('Socket: Call accepted:', data);
    });

    this.socket.on('call:rejected', (data) => {
      console.log('Socket: Call rejected:', data);
    });

    this.socket.on('call:ended', (data) => {
      console.log('Socket: Call ended:', data);
    });
  }

  // Send message with connection check
  async sendMessage(chatId: string, content: string, type = 'text', replyTo?: string, fileInfo?: any) {
    if (!this.socket?.connected) {
      // Try to reconnect if not connected
      try {
        const token = useAuthStore.getState().token;
        if (token) {
          await this.connect(token);
        } else {
          throw new Error('No authentication token available');
        }
      } catch (error) {
        throw new Error('Socket not connected and unable to reconnect');
      }
    }

    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }

    const messageData: any = {
      chatId,
      content,
      type,
      replyTo
    };

    // Add file information if provided
    if (fileInfo) {
      if (fileInfo.mediaUrl) messageData.mediaUrl = fileInfo.mediaUrl;
      if (fileInfo.mediaType) messageData.mediaType = fileInfo.mediaType;
      if (fileInfo.mediaSize) messageData.mediaSize = fileInfo.mediaSize;
      if (fileInfo.fileName) messageData.fileName = fileInfo.fileName;
    }

    console.log('Sending socket message:', messageData);

    this.socket.emit('message:send', messageData);
  }

  // React to message
  reactToMessage(messageId: string, reaction: string, chatId: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected for reaction');
      return;
    }

    console.log('Socket: Sending reaction:', messageId, reaction, chatId);
    this.socket.emit('message:react', {
      messageId,
      reaction,
      chatId
    });
  }

  // Remove reaction from message
  removeReaction(messageId: string, reaction: string, chatId: string) {
    if (!this.socket?.connected) return;

    console.log('Socket: Removing reaction:', messageId, reaction, chatId);
    this.socket.emit('message:remove-reaction', {
      messageId,
      reaction,
      chatId
    });
  }

  // Start typing
  startTyping(chatId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('typing:start', { chatId });
  }

  // Stop typing
  stopTyping(chatId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('typing:stop', { chatId });
  }

  // Mark message as read
  markMessageAsRead(messageId: string, chatId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('message:read', { messageId, chatId });
  }

  // Join chat room
  joinChat(chatId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('chat:join', chatId);
  }

  // Leave chat room
  leaveChat(chatId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('chat:leave', chatId);
  }

  // Get connection status - simplified to just check socket connection
  getConnectionStatus() {
    const status = this.socket?.connected || false;
    console.log('SocketService: Connection status:', status);
    return status;
  }

  // Check if socket is ready
  isReady() {
    return this.socket?.connected || false;
  }

  // Add callback for when socket connects
  onConnect(callback: () => void) {
    this.onConnectCallbacks.push(callback);
  }

  // WebRTC methods
  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit:', event);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.warn('Socket not available, cannot add listener:', event);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService; 