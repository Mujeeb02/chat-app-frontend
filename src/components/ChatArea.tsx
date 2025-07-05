'use client';

import { useEffect, useRef } from 'react';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import useUIStore from '@/store/uiStore';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import LoadingSpinner from './LoadingSpinner';

export default function ChatArea() {
  const { user } = useAuthStore();
  const { currentChat, messages, fetchMessages, isLoading } = useChatStore();
  const { typingUsers } = useUIStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = currentChat ? messages : [];
  const currentTypingUsers = currentChat ? typingUsers[currentChat._id] || [] : [];

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat._id);
    }
  }, [currentChat, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  if (!currentChat) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Send a message to begin chatting
              </p>
            </div>
          </div>
        ) : (
          <>
            {currentMessages.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                isOwnMessage={message.sender._id === user?._id}
              />
            ))}
            <TypingIndicator />
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 