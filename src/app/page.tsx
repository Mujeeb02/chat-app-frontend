'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import AuthForm from '@/components/AuthForm';
import MobileLayout from '@/components/MobileLayout';
import CreateChatModal from '@/components/CreateChatModal';
import ProfileModal from '@/components/ProfileModal';
import NotificationPanel from '@/components/NotificationPanel';

export default function Home() {
  const { user, isAuthenticated, loginWithToken } = useAuthStore();

  // Check for stored token and OAuth tokens on mount
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const error = urlParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      if (token) {
        try {
          await loginWithToken(token);
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Failed to login with token:', error);
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleOAuthCallback();
  }, [loginWithToken]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <MobileLayout />
      
      {/* Modals */}
      <CreateChatModal />
      <ProfileModal />
      <NotificationPanel />
    </div>
  );
}
