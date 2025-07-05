'use client';

import { useState, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import useUIStore from '@/store/uiStore';
import useChatStore from '@/store/chatStore';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import MobileHeader from './MobileHeader';

export default function MobileLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentChat } = useChatStore();
  const { user } = useAuthStore();

  // Close sidebar when chat is selected on mobile
  useEffect(() => {
    if (currentChat) {
      setSidebarOpen(false);
    }
  }, [currentChat]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackToChats = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <MobileHeader 
          onMenuToggle={handleMenuToggle}
          title={currentChat ? 
            (currentChat.type === 'direct' && currentChat.participants.length > 0 ? 
              (() => {
                const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
                return `${otherParticipant?.firstName || ''} ${otherParticipant?.lastName || ''}`.trim() || 'Unknown User';
              })() : 
              currentChat.name || 'Unnamed Chat'
            ) : 
            "ChatApp"
          }
          showBackButton={!!currentChat}
          onBack={handleBackToChats}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar />
      </div>
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <ChatInterface />
      </div>
    </div>
  );
} 