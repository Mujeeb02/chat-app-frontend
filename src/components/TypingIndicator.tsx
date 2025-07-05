'use client';

import useChatStore from '@/store/chatStore';
import useAuthStore from '@/store/authStore';

export default function TypingIndicator() {
  const { isTyping, typingUsers } = useChatStore();
  const { user } = useAuthStore();

  if (!isTyping || typingUsers.length === 0) {
    return null;
  }

  // Filter out current user from typing users
  const otherTypingUsers = typingUsers.filter(userId => userId !== user?._id);

  if (otherTypingUsers.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-xs">?</span>
        </div>

        {/* Typing indicator */}
        <div className="flex flex-col items-start">
          <div className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
            {otherTypingUsers.length === 1 
              ? 'Someone is typing...' 
              : `${otherTypingUsers.length} people are typing...`
            }
          </p>
        </div>
      </div>
    </div>
  );
} 