'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import AuthForm from '@/components/AuthForm';
import MobileLayout from '@/components/MobileLayout';

export default function Home() {
  const { user, isAuthenticated, loginWithToken, initialize } = useAuthStore();

  // Initialize auth store and check for stored token and OAuth tokens on mount
  useEffect(() => {
    // Initialize the auth store to sync token with API service
    initialize();
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
  }, [loginWithToken, initialize]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Main Chat Interface */}
      <MobileLayout />
      
      {/* Modals are handled in layout.tsx now */}
    </div>
  );
}
