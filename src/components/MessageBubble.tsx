'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Message } from '@/types';
import useChatStore from '@/store/chatStore';
import useAuthStore from '@/store/authStore';
import socketService from '@/lib/socket';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '😡'];

export default function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);
  const { currentChat } = useChatStore();
  const { user } = useAuthStore();

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'HH:mm');
    } catch (error) {
      console.error('Error formatting time:', error);
      return '--:--';
    }
  };

  // Safely get sender information with fallbacks
  const getSenderInfo = () => {
    if (!message.sender) {
      console.warn('Message has no sender information:', message);
      return {
        firstName: 'Unknown',
        lastName: 'User',
        avatar: undefined,
        initials: 'U'
      };
    }

    const firstName = message.sender.firstName || 'Unknown';
    const lastName = message.sender.lastName || 'User';
    const avatar = message.sender.avatar;
    const initials = (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();

    return {
      firstName,
      lastName,
      avatar,
      initials
    };
  };

  const senderInfo = getSenderInfo();

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <div className="relative group">
              <img 
                src={message.mediaUrl || message.content} 
                alt="Image" 
                className="max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-md"
                onClick={() => window.open(message.mediaUrl || message.content, '_blank')}
              />
              {message.content && message.content !== message.mediaUrl && (
                <p className="text-sm mt-2">{message.content}</p>
              )}
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="space-y-2">
            <div className="relative">
              <video 
                src={message.mediaUrl || message.content} 
                controls 
                className="max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] rounded-xl shadow-md"
              />
              {message.content && message.content !== message.mediaUrl && (
                <p className="text-sm mt-2">{message.content}</p>
              )}
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="space-y-2">
            <div className="bg-gray-100 dark:bg-gray-600 rounded-xl p-3 shadow-sm">
              <audio 
                src={message.mediaUrl || message.content} 
                controls 
                className="w-full"
              />
            </div>
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm mt-2">{message.content}</p>
            )}
          </div>
        );
      case 'file':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-600 rounded-xl max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] shadow-sm">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {message.mediaUrl ? 'File' : 'Document'}
                </p>
                {message.mediaSize && (
                  <p className="text-xs opacity-75">
                    {(message.mediaSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
              <button
                onClick={() => window.open(message.mediaUrl, '_blank')}
                className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg transition-colors focus-ring"
                title="Download file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm mt-2">{message.content}</p>
            )}
          </div>
        );
      case 'gif':
        return (
          <div className="space-y-2">
            <div className="relative group">
              <img 
                src={message.mediaUrl || message.content} 
                alt="GIF" 
                className="max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-md"
                onClick={() => window.open(message.mediaUrl || message.content, '_blank')}
              />
              {message.content && message.content !== message.mediaUrl && (
                <p className="text-sm mt-2">{message.content}</p>
              )}
            </div>
          </div>
        );
      default:
        return <p className="text-sm leading-relaxed">{message.content}</p>;
    }
  };

  const handleReaction = async (emoji: string) => {
    try {
      if (currentChat) {
        socketService.reactToMessage(message._id, emoji, currentChat._id);
      }
      setShowReactions(false);
    } catch (error) {
      console.error('Failed to react to message:', error);
    }
  };

  const getReactionCount = (emoji: string) => {
    return message.reactions?.filter(r => r.emoji === emoji).length || 0;
  };

  const hasUserReacted = (emoji: string) => {
    return message.reactions?.some(r => {
      return r.emoji === emoji && r.user === user?._id;
    }) || false;
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 px-3 sm:px-4`}>
      <div className={`flex items-end space-x-2 max-w-[85%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar - Only show for received messages */}
        {!isOwnMessage && (
          <div className="avatar w-8 h-8 flex-shrink-0">
            {senderInfo.avatar ? (
              <img 
                src={senderInfo.avatar} 
                alt={`${senderInfo.firstName} ${senderInfo.lastName}`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('span');
                    fallback.className = 'text-white font-semibold text-xs';
                    fallback.textContent = senderInfo.initials;
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <span className="text-white font-semibold text-xs">
                {senderInfo.initials}
              </span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-full`}>
          {/* Sender Name - Only for group chats and received messages */}
          {!isOwnMessage && currentChat?.type === 'group' && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-1">
              {senderInfo.firstName} {senderInfo.lastName}
            </p>
          )}

          {/* Message Bubble */}
          <div className={`relative group max-w-full ${
            isOwnMessage 
              ? 'message-bubble sent' 
              : 'message-bubble received'
          } px-4 py-2.5`}>
            {renderMessageContent()}
            
            {/* Message Status and Time */}
            <div className={`flex items-center justify-end mt-1 space-x-1 ${
              isOwnMessage ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              <span className="text-xs">{formatTime(message.createdAt.toString())}</span>
              {isOwnMessage && (
                <div className="flex items-center space-x-1">
                  {/* Message status indicators */}
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Reaction Button */}
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 bg-gray-100 dark:bg-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 shadow-sm focus-ring"
              title="React to message"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Reaction Picker */}
            {showReactions && (
              <div className="emoji-picker">
                <div className="flex space-x-1">
                  {REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-lg focus-ring"
                      title={`React with ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reactions Display */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 px-1">
              {REACTIONS.map((emoji) => {
                const count = getReactionCount(emoji);
                if (count === 0) return null;
                
                return (
                  <div
                    key={emoji}
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                      hasUserReacted(emoji)
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span>{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 