'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import MobileLayout from '@/components/MobileLayout';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const { user, isAuthenticated, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
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