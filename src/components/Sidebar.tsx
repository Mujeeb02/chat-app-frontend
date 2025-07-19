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
    <div className="sidebar w-full lg:w-80 flex flex-col h-full overflow-hidden relative">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative p-6 border-b border-white/10 dark:border-gray-700/50 backdrop-blur-xl">
        {/* Header Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10"></div>
        
        <div className="relative flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                ChatApp
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Stay Connected
              </p>
            </div>
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-1">
            {/* Notifications with Advanced Badge */}
            <button
              onClick={toggleNotifications}
              className="group relative p-3 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
              title="Notifications"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25v3h15v-3l-2.25-2.25V9.75a6 6 0 00-6-6z" />
              </svg>
              {chats.some(chat => chat.unreadCount > 0) && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {chats.reduce((total, chat) => total + chat.unreadCount, 0)}
                </span>
              )}
            </button>

            {/* Profile with Hover Effect */}
            <button
              onClick={toggleProfile}
              className="group relative p-3 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
              title="Profile"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced User Info Card */}
      <div className="relative p-4 border-b border-white/10 dark:border-gray-700/50">
        {/* User Card Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white/30 to-gray-50/50 dark:from-gray-800/50 dark:via-gray-700/30 dark:to-gray-800/50 backdrop-blur-sm"></div>
        
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            {/* Enhanced Avatar */}
            <div className="relative">
              <div className="avatar w-12 h-12 ring-2 ring-white/50 dark:ring-gray-700/50 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Enhanced Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse"></div>
            </div>
            
            {/* User Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                  Online
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">
                {user?.email}
              </p>
            </div>
            
            {/* Enhanced Logout Button */}
            <button
              onClick={handleLogout}
              className="group/logout relative p-2.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
              title="Logout"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/logout:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced New Chat Button */}
      <div className="p-4">
        <button
          onClick={toggleCreateChat}
          className="group relative w-full py-4 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center justify-center space-x-3">
            <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
              <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-lg">Start New Chat</span>
          </div>
        </button>
      </div>

      {/* Enhanced Chats List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="relative">
              <LoadingSpinner />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
                Loading your chats...
              </p>
            </div>
          </div>
        ) : chats.length === 0 ? (
          <div className="p-8 text-center animate-fade-in">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No conversations yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Start connecting with others by creating your first chat
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span>Ready to chat</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-3">
            {chats.map((chat, index) => (
              <button
                key={chat._id}
                onClick={() => selectChat(chat._id)}
                className={`group relative w-full p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-left animate-slide-in-bottom ${
                  currentChat?._id === chat._id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                    : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Active Chat Indicator */}
                {currentChat?._id === chat._id && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                )}

                <div className="flex items-center space-x-4">
                  {/* Enhanced Chat Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`avatar w-14 h-14 ring-2 shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
                      currentChat?._id === chat._id 
                        ? 'ring-white/50' 
                        : 'ring-gray-200/50 dark:ring-gray-600/50'
                    }`}>
                      {getChatAvatar(chat) ? (
                        <img 
                          src={getChatAvatar(chat)} 
                          alt={getChatName(chat)}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {getChatName(chat)?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      )}
                    </div>
                    
                    {/* Enhanced Status Indicator */}
                    {chat.type === 'direct' && (() => {
                      const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
                      const isOnline = otherParticipant?.status === 'online';
                      return isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse"></div>
                      );
                    })()}
                    
                    {/* Unread Messages Indicator */}
                    {chat.unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                        {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-bold truncate ${
                        currentChat?._id === chat._id 
                          ? 'text-white' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {getChatName(chat)}
                      </h3>
                      {chat.lastMessage && (
                        <span className={`text-xs flex-shrink-0 ml-2 ${
                          currentChat?._id === chat._id 
                            ? 'text-white/80' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {formatTime(chat.lastMessage.createdAt)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate pr-2 ${
                        currentChat?._id === chat._id 
                          ? 'text-white/70' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatLastMessage(chat.lastMessage)}
                      </p>
                      
                      {/* Chat Type Badge */}
                      {chat.type === 'group' && (
                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          currentChat?._id === chat._id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        }`}>
                          Group
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 