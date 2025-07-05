'use client';

import { useState, useEffect } from 'react';
import useUIStore from '@/store/uiStore';
import useAuthStore from '@/store/authStore';

interface Notification {
  id: string;
  type: 'message' | 'call' | 'reaction' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  chatId?: string;
  senderId?: string;
  senderName?: string;
}

export default function NotificationPanel() {
  const { showNotifications, toggleNotifications } = useUIStore();
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock notifications for demonstration
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        title: 'New Message',
        message: 'John Doe sent you a message',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        isRead: false,
        chatId: 'chat1',
        senderId: 'user1',
        senderName: 'John Doe'
      },
      {
        id: '2',
        type: 'call',
        title: 'Missed Call',
        message: 'Jane Smith tried to call you',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        isRead: false,
        senderId: 'user2',
        senderName: 'Jane Smith'
      },
      {
        id: '3',
        type: 'reaction',
        title: 'Reaction',
        message: 'Alice reacted to your message',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isRead: true,
        senderId: 'user3',
        senderName: 'Alice'
      },
      {
        id: '4',
        type: 'system',
        title: 'System Update',
        message: 'New features are available in ChatApp',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return (
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'call':
        return (
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        );
      case 'reaction':
        return (
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') {
      return !notification.isRead;
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!showNotifications) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={toggleNotifications}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'all'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'unread'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:text-gray-400 dark:disabled:text-gray-500 transition-colors duration-200"
          >
            Mark all as read
          </button>
          <button
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:text-gray-400 dark:disabled:text-gray-500 transition-colors duration-200"
          >
            Clear all
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25v3h15v-3l-2.25-2.25V9.75a6 6 0 00-6-6z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                No notifications
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                {activeTab === 'unread' ? 'All caught up!' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    notification.isRead
                      ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                      : 'bg-white dark:bg-gray-700 border-blue-200 dark:border-blue-600 shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          {notification.senderName && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              from {notification.senderName}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          title="Mark as read"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                        title="Delete notification"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 