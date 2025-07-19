'use client';

import { useState, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import MobileHeader from './MobileHeader';
import { useCall } from '@/hooks/useCall';

export default function MobileLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentChat } = useChatStore();
  const { user } = useAuthStore();
  const { handleStartCall } = useCall();

  // Call handlers with proper error handling
  const handleAudioCall = async () => {
    try {
      console.log('Initiating audio call...');
      await handleStartCall(false); // false for audio call
    } catch (error) {
      console.error('Failed to initiate audio call:', error);
      // You might want to show a toast notification here
    }
  };

  const handleVideoCall = async () => {
    try {
      console.log('Initiating video call...');
      await handleStartCall(true); // true for video call
    } catch (error) {
      console.error('Failed to initiate video call:', error);
      // You might want to show a toast notification here
    }
  };

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
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden relative">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/60 to-indigo-50/80 dark:from-gray-950/90 dark:via-gray-900/80 dark:to-indigo-950/90 backdrop-blur-sm"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Mobile Header with Glass Effect */}
      <div className="lg:hidden flex-shrink-0 relative z-30">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg">
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
            onAudioCall={handleAudioCall}
            onVideoCall={handleVideoCall}
          />
        </div>
      </div>
      
      {/* Enhanced Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        >
          {/* Overlay Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
        </div>
      )}
      
      {/* Enhanced Sidebar with Glass Effect */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl
        border-r border-white/20 dark:border-gray-800/50
        shadow-2xl lg:shadow-lg
        transform transition-all duration-500 ease-out
        lg:translate-x-0 lg:h-full
        ${sidebarOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'}
      `}>
        {/* Sidebar Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-950/30 dark:to-purple-950/30 pointer-events-none"></div>
        
        {/* Sidebar Content */}
        <div className="relative h-full overflow-y-auto custom-scrollbar">
          <Sidebar />
        </div>
        
        {/* Sidebar Edge Glow */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>
      </div>
      
      {/* Enhanced Main Chat Interface */}
      <div className="flex-1 flex flex-col lg:ml-0 h-full overflow-hidden relative z-10">
        {/* Chat Interface Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-slate-50/30 to-indigo-50/40 dark:from-gray-900/40 dark:via-gray-800/30 dark:to-indigo-950/40"></div>
        
        {/* Chat Interface Content */}
        <div className="relative h-full">
          <ChatInterface />
        </div>
        
        {/* Floating Action Buttons (Mobile) */}
        <div className="lg:hidden absolute bottom-6 right-6 flex flex-col space-y-3 z-20">
          {currentChat && (
            <>
              <button
                onClick={handleVideoCall}
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={handleAudioCall}
                className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Ambient Light Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000 pointer-events-none"></div>
    </div>
  );
} 