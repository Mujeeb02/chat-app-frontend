'use client';

import { useState } from 'react';
import useAuthStore from '@/store/authStore';
import useUIStore from '@/store/uiStore';
import useChatStore from '@/store/chatStore';
import ThemeSelector from './ThemeSelector';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onAudioCall?: () => void;
  onVideoCall?: () => void;
}

export default function MobileHeader({ 
  onMenuToggle, 
  title = "ChatApp", 
  showBackButton = false,
  onBack,
  onAudioCall,
  onVideoCall
}: MobileHeaderProps) {
  const { user } = useAuthStore();
  const { currentChat } = useChatStore();
  const { toggleProfile, toggleNotifications, toggleCreateChat } = useUIStore();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Check if we're in a chat and have call handlers
  const isInChat = showBackButton && currentChat;
  const canMakeCalls = isInChat && onAudioCall && onVideoCall;

  return (
    <>
      <div className="mobile-header lg:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {showBackButton ? (
              <button
                onClick={onBack}
                className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
                title="Back to chats"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onMenuToggle}
                className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
                title="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <h1 className="text-lg font-bold text-gradient">
              {title}
            </h1>
          </div>

          {/* Right Section - Show different buttons based on context */}
          <div className="flex items-center space-x-1">
            {/* When in a chat, show only call buttons */}
            {canMakeCalls ? (
              <>
                {/* Audio Call Button */}
                <button
                  onClick={onAudioCall}
                  className="call-button audio p-2.5 transition-all duration-200 transform hover:scale-110 active:scale-95 focus-ring"
                  title="Audio Call"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>

                {/* Video Call Button */}
                <button
                  onClick={onVideoCall}
                  className="call-button video p-2.5 transition-all duration-200 transform hover:scale-110 active:scale-95 focus-ring"
                  title="Video Call"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </>
            ) : (
              /* When not in a chat, show regular buttons */
              <>
                {/* Theme Toggle */}
                <button
                  onClick={() => setShowThemeSelector(true)}
                  className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
                  title="Theme Settings"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </button>

                {/* Notifications */}
                <button
                  onClick={toggleNotifications}
                  className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring relative"
                  title="Notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25v3h15v-3l-2.25-2.25V9.75a6 6 0 00-6-6z" />
                  </svg>
                  <span className="notification-badge"></span>
                </button>

                {/* New Chat */}
                <button
                  onClick={toggleCreateChat}
                  className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
                  title="New Chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
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
              </>
            )}
          </div>
        </div>

        {/* User Info Bar (if not in chat) */}
        {!showBackButton && user && (
          <div className="mt-3 flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="avatar w-8 h-8 relative">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-xs">
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
            <div className="badge success">
              Online
            </div>
          </div>
        )}

        {/* Chat Info Bar (when in chat) */}
        {showBackButton && currentChat && (
          <div className="mt-3 flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="avatar w-8 h-8 relative">
              {currentChat.type === 'direct' && currentChat.participants.length > 0 ? (
                (() => {
                  const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
                  return otherParticipant?.avatar ? (
                    <img 
                      src={otherParticipant.avatar} 
                      alt={`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-xs">
                      {otherParticipant?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  );
                })()
              ) : currentChat.avatar ? (
                <img 
                  src={currentChat.avatar} 
                  alt={currentChat.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-xs">
                  {currentChat.name?.charAt(0).toUpperCase() || ''}
                </span>
              )}
              {currentChat.type === 'direct' && currentChat.participants.length > 0 && (
                (() => {
                  const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
                  const isOnline = otherParticipant?.status === 'online';
                  return (
                    <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
                  );
                })()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {currentChat.type === 'direct' && currentChat.participants.length > 0 ? (
                  (() => {
                    const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
                    return `${otherParticipant?.firstName || ''} ${otherParticipant?.lastName || ''}`.trim() || 'Unknown User';
                  })()
                ) : (
                  currentChat.name || 'Unnamed Chat'
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {currentChat.type === 'direct' && currentChat.participants.length > 0 ? (
                  (() => {
                    const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
                    if (otherParticipant?.status === 'online') {
                      return 'Online';
                    } else if (otherParticipant?.lastSeen) {
                      const lastSeen = new Date(otherParticipant.lastSeen);
                      const now = new Date();
                      const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
                      
                      if (diffInMinutes < 1) {
                        return 'Just now';
                      } else if (diffInMinutes < 60) {
                        return `${diffInMinutes} minutes ago`;
                      } else if (diffInMinutes < 1440) {
                        const hours = Math.floor(diffInMinutes / 60);
                        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                      } else {
                        const days = Math.floor(diffInMinutes / 1440);
                        return `${days} day${days > 1 ? 's' : ''} ago`;
                      }
                    } else {
                      return 'Offline';
                    }
                  })()
                ) : (
                  `${currentChat.participants.length} participant${currentChat.participants.length !== 1 ? 's' : ''}`
                )}
              </p>
            </div>
            {currentChat.type === 'direct' && currentChat.participants.length > 0 && (
              (() => {
                const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
                const isOnline = otherParticipant?.status === 'online';
                return (
                  <div className={`badge ${isOnline ? 'success' : 'secondary'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </div>
                );
              })()
            )}
          </div>
        )}
      </div>

      {/* Theme Selector Modal */}
      <ThemeSelector 
        isOpen={showThemeSelector} 
        onClose={() => setShowThemeSelector(false)} 
      />
    </>
  );
} 