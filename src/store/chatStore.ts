import { create } from 'zustand';
import api from '@/lib/api';
import { Message, User, Chat } from '@/types';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isTyping: boolean;
  typingUsers: string[];
}

interface ChatActions {
  // Chat operations
  fetchChats: () => Promise<void>;
  createChat: (chatData: {
    name: string;
    type: 'direct' | 'group';
    participants: string[];
    description?: string;
  }) => Promise<void>;
  selectChat: (chatId: string) => void;
  updateChat: (chatId: string, updateData: { name?: string; description?: string }) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;

  // Message operations
  fetchMessages: (chatId: string, page?: number) => Promise<void>;
  sendMessage: (messageData: {
    chatId: string;
    content: string;
    type?: 'text' | 'image' | 'video' | 'audio' | 'file' | 'gif';
    mediaUrl?: string;
    mediaType?: string;
    mediaSize?: number;
    fileName?: string;
    replyTo?: string;
  }) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  reactToMessage: (messageId: string, reaction: string) => Promise<void>;

  // Real-time updates
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  removeMessage: (messageId: string) => void;
  updateChatLastMessage: (chatId: string, message: Message) => void;
  updateUserStatus: (userId: string, status: string, lastSeen: string) => void;
  markMessageAsRead: (messageId: string, userId: string) => void;
  setTyping: (isTyping: boolean, userId?: string) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  addReaction: (messageId: string, reaction: any) => void;
  removeReaction: (messageId: string, emoji: string, userId: string) => void;
}

type ChatStore = ChatState & ChatActions;

const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  error: null,
  isTyping: false,
  typingUsers: [],

  // Chat operations
  fetchChats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response:any = await api.getChats();
      if (response.success) {
        set({ chats: response.data, isLoading: false });
      } else {
        throw new Error(response.message || 'Failed to fetch chats');
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch chats',
      });
    }
  },

  createChat: async (chatData) => {
    set({ isLoading: true, error: null });
    try {
      const response:any = await api.createChat(chatData);
      if (response.success) {
        const newChat = response.data;
        set(state => ({
          chats: [newChat, ...state.chats],
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to create chat');
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create chat',
      });
    }
  },

  selectChat: (chatId: string) => {
    const chat = get().chats.find(c => c._id === chatId);
    if (chat) {
      set({ currentChat: chat, messages: [] });
      get().fetchMessages(chatId);
    }
  },

  updateChat: async (chatId: string, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const response:any = await api.updateChat(chatId, updateData);
      if (response.success) {
        const updatedChat = response.data;
        set(state => ({
          chats: state.chats.map(chat =>
            chat._id === chatId ? updatedChat : chat
          ),
          currentChat: state.currentChat?._id === chatId ? updatedChat : state.currentChat,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to update chat');
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update chat',
      });
    }
  },

  deleteChat: async (chatId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response:any = await api.deleteChat(chatId);
      if (response.success) {
        set(state => ({
          chats: state.chats.filter(chat => chat._id !== chatId),
          currentChat: state.currentChat?._id === chatId ? null : state.currentChat,
          messages: state.currentChat?._id === chatId ? [] : state.messages,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to delete chat');
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to delete chat',
      });
    }
  },

  // Message operations
  fetchMessages: async (chatId: string, page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response:any = await api.getMessages(chatId, page);
      if (response.success) {
        const newMessages = response.data;
        set(state => ({
          messages: page === 1 ? newMessages : [...state.messages, ...newMessages],
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch messages');
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch messages',
      });
    }
  },

  sendMessage: async (messageData) => {
    try {
      const response:any = await api.sendMessage(messageData);
      if (response.success) {
        const newMessage = response.data;
        get().addMessage(newMessage);
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  },

  editMessage: async (messageId: string, content: string) => {
    try {
      const response:any = await api.editMessage(messageId, content);
      if (response.success) {
        const updatedMessage = response.data;
        get().updateMessage(messageId, updatedMessage);
      } else {
        throw new Error(response.message || 'Failed to edit message');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to edit message',
      });
    }
  },

  deleteMessage: async (messageId: string) => {
    try {
      const response:any = await api.deleteMessage(messageId);
      if (response.success) {
        get().removeMessage(messageId);
      } else {
        throw new Error(response.message || 'Failed to delete message');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete message',
      });
    }
  },

  reactToMessage: async (messageId: string, reaction: string) => {
    try {
      const response:any = await api.reactToMessage(messageId, reaction);
      if (response.success) {
        const updatedMessage = response.data;
        get().updateMessage(messageId, updatedMessage);
      } else {
        throw new Error(response.message || 'Failed to react to message');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to react to message',
      });
    }
  },

  // Real-time updates
  addMessage: (message: Message) => {
    set(state => {
      // Check if message already exists to prevent duplicates
      const existingMessage = state.messages.find(m => m._id === message._id);
      if (existingMessage) {
        console.log('Message already exists, updating instead:', message._id);
        return {
          messages: state.messages.map(msg =>
            msg._id === message._id ? { ...msg, ...message } : msg
          ),
          chats: state.chats.map(chat =>
            chat._id === message.chatId
              ? { ...chat, lastMessage: message, unreadCount: chat.unreadCount + 1 }
              : chat
          ),
        };
      }

      console.log('Adding new message:', message._id);
      return {
        messages: [...state.messages, message],
        chats: state.chats.map(chat =>
          chat._id === message.chatId
            ? { ...chat, lastMessage: message, unreadCount: chat.unreadCount + 1 }
            : chat
        ),
      };
    });
  },

  updateMessage: (messageId: string, updates: Partial<Message>) => {
    set(state => ({
      messages: state.messages.map(message =>
        message._id === messageId ? { ...message, ...updates } : message
      ),
    }));
  },

  removeMessage: (messageId: string) => {
    set(state => ({
      messages: state.messages.filter(message => message._id !== messageId),
    }));
  },

  updateChatLastMessage: (chatId: string, message: Message) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat._id === chatId
          ? { ...chat, lastMessage: message }
          : chat
      ),
    }));
  },

  updateUserStatus: (userId: string, status: string, lastSeen: string) => {
    set((state:any) => ({
      chats: state.chats.map((chat:any) => ({
        ...chat,
        participants: chat.participants.map((participant:any) =>
          participant._id === userId
            ? { ...participant, status, lastSeen }
            : participant
        )
      }))
    }));
  },

  markMessageAsRead: (messageId: string, userId: string) => {
    set(state => ({
      messages: state.messages.map(message =>
        message._id === messageId
          ? { ...message, seenBy: [...(message.seenBy || []), userId] }
          : message
      ),
    }));
  },

  addReaction: (messageId: string, reaction: any) => {
    console.log('ChatStore: Adding reaction to message:', messageId, reaction.emoji);
    set(state => ({
      messages: state.messages.map(message =>
        message._id === messageId
          ? { 
              ...message, 
              reactions: [...(message.reactions || []), reaction]
            }
          : message
      ),
    }));
  },

  removeReaction: (messageId: string, emoji: string, userId: string) => {
    console.log('ChatStore: Removing reaction from message:', messageId, emoji, userId);
    set(state => ({
      messages: state.messages.map(message =>
        message._id === messageId
          ? { 
              ...message, 
              reactions: (message.reactions || []).filter(r => {
                const reactionUserId = typeof r.user === 'object' ? (r.user as any)._id : r.user;
                return !(r.emoji === emoji && reactionUserId === userId);
              })
            }
          : message
      ),
    }));
  },

  setTyping: (isTyping: boolean, userId?: string) => {
    set(state => ({
      isTyping,
      typingUsers: isTyping && userId
        ? [...state.typingUsers, userId]
        : state.typingUsers.filter(id => id !== userId),
    }));
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default useChatStore; 