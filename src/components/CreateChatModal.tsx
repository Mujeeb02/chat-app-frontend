'use client';

import { useState, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import useUIStore from '@/store/uiStore';
import api from '@/lib/api';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  status?: string;
}

export default function CreateChatModal() {
  const { user: currentUser } = useAuthStore();
  const { createChat, chats } = useChatStore();
  const { showCreateChat, toggleCreateChat } = useUIStore();
  
  const [chatType, setChatType] = useState<'direct' | 'group'>('direct');
  const [chatName, setChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users when modal opens
  useEffect(() => {
    if (showCreateChat) {
      fetchUsers();
    }
  }, [showCreateChat]);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      setError(null);
      const response = await api.getAllUsers() as { success: boolean; data?: User[]; error?: string };
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
      // Fallback to mock data for development
      const mockUsers: User[] = [
        {
          _id: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          email: 'john@example.com',
          status: 'online'
        },
        {
          _id: 'user2',
          firstName: 'Jane',
          lastName: 'Smith',
          username: 'janesmith',
          email: 'jane@example.com',
          status: 'offline'
        },
        {
          _id: 'user3',
          firstName: 'Alice',
          lastName: 'Johnson',
          username: 'alicejohnson',
          email: 'alice@example.com',
          status: 'online'
        },
        {
          _id: 'user4',
          firstName: 'Bob',
          lastName: 'Wilson',
          username: 'bobwilson',
          email: 'bob@example.com',
          status: 'offline'
        }
      ];
      setUsers(mockUsers);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleUserToggle = (userId: string) => {
    if (chatType === 'direct') {
      // For direct chats, only allow one user
      setSelectedUsers([userId]);
    } else {
      // For group chats, allow multiple users
      setSelectedUsers(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const handleCreateChat = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (chatType === 'direct' && selectedUsers.length !== 1) {
        throw new Error('Please select exactly one user for direct chat');
      }

      if (chatType === 'group' && selectedUsers.length === 0) {
        throw new Error('Please select at least one user for group chat');
      }

      if (chatType === 'group' && !chatName.trim()) {
        throw new Error('Please enter a group name');
      }

      const chatData = {
        type: chatType,
        name: chatType === 'group' ? chatName : 'Direct Chat',
        participants: selectedUsers,
      };

      await createChat(chatData);
      handleClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create chat');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setChatType('direct');
    setChatName('');
    setSelectedUsers([]);
    setSearchQuery('');
    setError(null);
    toggleCreateChat();
  };

  // Get users who are already in direct chats with current user
  const existingDirectChatUsers = chats
    .filter(chat => chat.type === 'direct')
    .flatMap(chat => chat.participants)
    .filter(participant => participant._id !== currentUser?._id)
    .map(participant => participant._id);

  const filteredUsers = users.filter(user => 
    user._id !== currentUser?._id && // Exclude current user
    !existingDirectChatUsers.includes(user._id) && // Exclude users already in direct chats
    (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!showCreateChat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Chat
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Chat Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Chat Type
          </label>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setChatType('direct');
                setSelectedUsers([]);
                setChatName('');
              }}
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                chatType === 'direct'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Direct Message</span>
              </div>
            </button>
            <button
              onClick={() => {
                setChatType('group');
                setSelectedUsers([]);
              }}
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                chatType === 'group'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Group Chat</span>
              </div>
            </button>
          </div>
        </div>

        {/* Group Name Input */}
        {chatType === 'group' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        )}

        {/* Search Users */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {chatType === 'direct' ? 'Select User' : 'Select Users'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Users List */}
        <div className="mb-8">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {isLoadingUsers ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Loading users...
                </p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {searchQuery ? 'No users found' : 'No users available'}
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleUserToggle(user._id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedUsers.includes(user._id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {user.firstName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {user.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      @{user.username}
                    </p>
                  </div>
                  {selectedUsers.includes(user._id) && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Selected Users Summary */}
        {selectedUsers.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              Selected Users ({selectedUsers.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map(userId => {
                const user = users.find(u => u._id === userId);
                return user ? (
                  <span
                    key={userId}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {user.firstName} {user.lastName}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            disabled={isLoading || selectedUsers.length === 0 || (chatType === 'group' && !chatName.trim())}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors duration-200"
          >
            {isLoading ? 'Creating...' : 'Create Chat'}
          </button>
        </div>
      </div>
    </div>
  );
} 