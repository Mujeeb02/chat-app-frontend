'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import useUIStore from '@/store/uiStore';
import LoadingSpinner from './LoadingSpinner';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const { 
    chats, 
    currentChat, 
    isLoading,
    fetchChats,
    selectChat,
    createChat
  } = useChatStore();
  const { 
    showCreateChat, 
    toggleCreateChat,
    showProfile,
    toggleProfile,
    showNotifications,
    toggleNotifications
  } = useUIStore();

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user, fetchChats]);

  const handleLogout = () => {
    logout();
  };

  const formatLastMessage = (message?: any) => {
    if (!message) return 'No messages yet';
    
    const content = message.content || '';
    if (content.length > 30) {
      return content.substring(0, 30) + '...';
    }
    return content;
  };

  const formatTime = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getChatName = (chat: any) => {
    if (chat.type === 'group') {
      return chat.name;
    }
    
    // For direct chats, show the other participant's name
    const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
    return otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown User';
  };

  const getChatAvatar = (chat: any) => {
    if (chat.avatar) {
      return chat.avatar;
    }
    
    if (chat.type === 'group') {
      return null; // Use default group avatar
    }
    
    // For direct chats, show the other participant's avatar
    const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
    return otherParticipant?.avatar || null;
  };

  return (
    <div className="sidebar w-full lg:w-80 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gradient">
            ChatApp
          </h1>
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button
              onClick={toggleNotifications}
              className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring relative"
              title="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25v3h15v-3l-2.25-2.25V9.75a6 6 0 00-6-6z" />
              </svg>
              {chats.some(chat => chat.unreadCount > 0) && (
                <span className="notification-badge">
                  {chats.reduce((total, chat) => total + chat.unreadCount, 0)}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={toggleProfile}
              className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
              title="Profile"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="avatar w-10 h-10 relative">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">
                {user?.firstName?.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="status-indicator online"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 focus-ring"
            title="Logout"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={toggleCreateChat}
          className="enhanced-button primary w-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner />
          </div>
        ) : chats.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No chats yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              Create a new chat to get started
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {chats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => selectChat(chat._id)}
                className={`chat-bubble ${
                  currentChat?._id === chat._id 
                    ? 'active' 
                    : ''
                }`}
              >
                {/* Chat Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="avatar w-12 h-12">
                    {getChatAvatar(chat) ? (
                      <img 
                        src={getChatAvatar(chat)} 
                        alt={getChatName(chat)}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {getChatName(chat)?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>
                  {chat.type === 'direct' && (() => {
                    const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
                    return otherParticipant?.status === 'online';
                  })() && (
                    <div className="status-indicator online"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {getChatName(chat)}
                    </h3>
                    {chat.lastMessage && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {formatTime(chat.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {formatLastMessage(chat.lastMessage)}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="badge primary ml-2">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 