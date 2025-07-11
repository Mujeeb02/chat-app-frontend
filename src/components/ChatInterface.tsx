'use client';

import { useEffect, useRef } from 'react';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import useUIStore from '@/store/uiStore';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import LoadingSpinner from './LoadingSpinner';
import CallModal from './CallModal';
import { useCall } from '@/hooks/useCall';

export default function ChatInterface() {
  const { user } = useAuthStore();
  const { 
    currentChat, 
    messages, 
    isLoading, 
    error,
    fetchChats,
    fetchMessages,
    setTyping
  } = useChatStore();
  const { 
    toggleCreateChat
  } = useUIStore();
  const {
    showCallModal,
    isIncomingCall,
    incomingCallData,
    incomingOffer,
    handleStartCall,
    handleCloseCallModal
  } = useCall();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user, fetchChats]);

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat._id);
    }
  }, [currentChat, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Call handlers with proper error handling
  const handleAudioCall = async () => {
    try {
      console.log('Initiating audio call from chat interface...');
      await handleStartCall(false);
    } catch (error) {
      console.error('Failed to initiate audio call:', error);
      // You might want to show a toast notification here
    }
  };

  const handleVideoCall = async () => {
    try {
      console.log('Initiating video call from chat interface...');
      await handleStartCall(true);
    } catch (error) {
      console.error('Failed to initiate video call:', error);
      // You might want to show a toast notification here
    }
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center chat-interface">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to ChatApp
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to start chatting
          </p>
        </div>
      </div>
    );
  }

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center chat-interface">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Select a chat to start messaging
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Choose from your existing conversations or create a new one
          </p>
          <button
            onClick={toggleCreateChat}
            className="enhanced-button primary inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 h-full overflow-hidden">
      {/* Desktop Chat Header */}
      <div className="hidden lg:flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {/* Chat Avatar */}
          <div className="relative">
            <div className="avatar w-10 h-10">
              {currentChat.type === 'direct' && currentChat.participants.length > 0 ? (
                // For direct chats, show the other participant's avatar
                (() => {
                  const otherParticipant = currentChat.participants.find(p => p._id !== user._id);
                  return otherParticipant?.avatar ? (
                    <img 
                      src={otherParticipant.avatar} 
                      alt={`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {otherParticipant?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  );
                })()
              ) : currentChat.avatar ? (
                <img 
                  src={currentChat.avatar} 
                  alt={currentChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {currentChat.name?.charAt(0).toUpperCase() || ''}
                </span>
              )}
            </div>
            
            {/* Online Status Indicator */}
            {currentChat.type === 'direct' && currentChat.participants.length > 0 && (
              (() => {
                const otherParticipant = currentChat.participants.find(p => p._id !== user._id);
                const isOnline = otherParticipant?.status === 'online';
                return (
                  <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
                );
              })()
            )}
          </div>
          
          {/* Chat Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {currentChat.type === 'direct' && currentChat.participants.length > 0 ? (
                // For direct chats, show the other participant's name
                (() => {
                  const otherParticipant = currentChat.participants.find(p => p._id !== user._id);
                  return `${otherParticipant?.firstName || ''} ${otherParticipant?.lastName || ''}`.trim() || 'Unknown User';
                })()
              ) : (
                currentChat.name || 'Unnamed Chat'
              )}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentChat.type === 'direct' && currentChat.participants.length > 0 ? (
                // For direct chats, show online status
                (() => {
                  const otherParticipant = currentChat.participants.find(p => p._id !== user._id);
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
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          {/* Call Button */}
          <button
            onClick={handleAudioCall}
            className="call-button audio p-2.5 transition-all duration-200 transform hover:scale-110 active:scale-95 focus-ring"
            title="Start call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>

          {/* Video Call Button */}
          <button
            onClick={handleVideoCall}
            className="call-button video p-2.5 transition-all duration-200 transform hover:scale-110 active:scale-95 focus-ring"
            title="Start video call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          {/* More Options */}
          <button
            className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
            title="More options"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50 dark:bg-gray-900 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
              <button
                onClick={() => currentChat && fetchMessages(currentChat._id)}
                className="enhanced-button primary"
              >
                Retry
              </button>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start the conversation by sending a message
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                isOwnMessage={message.sender._id === user._id}
              />
            ))}
            <TypingIndicator />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      {currentChat && (
        <div className="flex-shrink-0 message-input-container">
          <MessageInput 
            chatId={currentChat._id}
            onTyping={setTyping}
          />
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && currentChat && (
        <CallModal
          isOpen={showCallModal}
          onClose={handleCloseCallModal}
          onOpen={() => handleStartCall(false)}
          chatId={currentChat._id}
          isIncoming={isIncomingCall}
          caller={incomingCallData?.caller}
          incomingOffer={incomingOffer}
        />
      )}
    </div>
  );
} 