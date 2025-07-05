'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Message } from '@/types';
import ReactPlayer from 'react-player';
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
  const { reactToMessage } = useChatStore();
  const { currentChat } = useChatStore();
  const { user } = useAuthStore();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <img 
              src={message.mediaUrl || message.content} 
              alt="Image" 
              className="max-w-xs rounded-lg"
            />
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        );
      case 'video':
        return (
          <div className="space-y-2">
            <video 
              src={message.mediaUrl || message.content} 
              controls 
              className="max-w-xs rounded-lg"
            />
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        );
      case 'audio':
        return (
          <div className="space-y-2">
            <audio 
              src={message.mediaUrl || message.content} 
              controls 
              className="max-w-xs"
            />
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        );
      case 'file':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  File
                </p>
                {message.mediaSize && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(message.mediaSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        );
      case 'gif':
        return (
          <div className="space-y-2">
            <img 
              src={message.mediaUrl || message.content} 
              alt="GIF" 
              className="max-w-xs rounded-lg"
            />
            {message.content && message.content !== message.mediaUrl && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} px-2 sm:px-4`}>
      <div className={`flex items-end space-x-2 max-w-[280px] sm:max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!isOwnMessage && (
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            {message.sender.avatar ? (
              <img 
                src={message.sender.avatar} 
                alt={`${message.sender.firstName} ${message.sender.lastName}`}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-xs">
                {message.sender.firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          {/* Sender Name (for group chats) */}
          {!isOwnMessage && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-2">
              {message.sender.firstName} {message.sender.lastName}
            </p>
          )}

          {/* Message Bubble */}
          <div className={`relative group px-3 sm:px-4 py-2 rounded-2xl ${
            isOwnMessage 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
          }`}>
            {renderMessageContent()}
            
            {/* Reaction Button */}
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 bg-gray-100 dark:bg-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
              title="React to message"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Reaction Picker */}
            {showReactions && (
              <div className="absolute -bottom-12 -right-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-2 z-10">
                <div className="flex space-x-1">
                  {REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-lg"
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
            <div className="flex flex-wrap gap-1 mt-2 px-2">
              {REACTIONS.map((emoji) => {
                const count = getReactionCount(emoji);
                if (count === 0) return null;
                
                return (
                  <div
                    key={emoji}
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                      hasUserReacted(emoji)
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
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

          {/* Time */}
          <p className={`text-xs mt-1 px-2 ${
            isOwnMessage 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {formatTime(message.createdAt.toString())}
          </p>
        </div>
      </div>
    </div>
  );
} 