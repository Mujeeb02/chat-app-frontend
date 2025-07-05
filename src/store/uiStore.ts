import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, UIState } from '@/types';

const defaultTheme: Theme = {
  name: 'default',
  primary: '#3b82f6',
  secondary: '#64748b',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  accent: '#f59e0b',
};

const darkTheme: Theme = {
  name: 'dark',
  primary: '#60a5fa',
  secondary: '#94a3b8',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  border: '#334155',
  accent: '#fbbf24',
};

interface UIStoreState {
  theme: Theme;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  showEmojiPicker: boolean;
  showFileUpload: boolean;
  showVoiceRecorder: boolean;
  showUserProfile: boolean;
  showChatSettings: boolean;
  showCreateChat: boolean;
  showProfile: boolean;
  showSearch: boolean;
  showNotifications: boolean;
  showCallControls: boolean;
  isTyping: boolean;
  typingUsers: Record<string, string[]>;
}

interface UIStoreActions {
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  toggleEmojiPicker: () => void;
  toggleFileUpload: () => void;
  toggleVoiceRecorder: () => void;
  toggleUserProfile: () => void;
  toggleChatSettings: () => void;
  toggleCreateChat: () => void;
  toggleProfile: () => void;
  toggleSearch: () => void;
  toggleNotifications: () => void;
  toggleCallControls: () => void;
  setTyping: (isTyping: boolean) => void;
  addTypingUser: (chatId: string, userId: string) => void;
  removeTypingUser: (chatId: string, userId: string) => void;
  closeAllModals: () => void;
}

type UIStoreType = UIStoreState & UIStoreActions;

const useUIStore = create<UIStoreType>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: defaultTheme,
      isDarkMode: false,
      sidebarOpen: true,
      showEmojiPicker: false,
      showFileUpload: false,
      showVoiceRecorder: false,
      showUserProfile: false,
      showChatSettings: false,
      showCreateChat: false,
      showProfile: false,
      showSearch: false,
      showNotifications: false,
      showCallControls: false,
      isTyping: false,
      typingUsers: {},

      // Actions
      setTheme: (theme: Theme) => {
        set({ theme });
      },

      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          const newTheme = newDarkMode ? darkTheme : defaultTheme;
          return {
            isDarkMode: newDarkMode,
            theme: newTheme,
          };
        });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      toggleEmojiPicker: () => {
        set((state) => ({ showEmojiPicker: !state.showEmojiPicker }));
      },

      toggleFileUpload: () => {
        set((state) => ({ showFileUpload: !state.showFileUpload }));
      },

      toggleVoiceRecorder: () => {
        set((state) => ({ showVoiceRecorder: !state.showVoiceRecorder }));
      },

      toggleUserProfile: () => {
        set((state) => ({ showUserProfile: !state.showUserProfile }));
      },

      toggleChatSettings: () => {
        set((state) => ({ showChatSettings: !state.showChatSettings }));
      },

      toggleCreateChat: () => {
        set((state) => ({ showCreateChat: !state.showCreateChat }));
      },

      toggleProfile: () => {
        set((state) => ({ showProfile: !state.showProfile }));
      },

      toggleSearch: () => {
        set((state) => ({ showSearch: !state.showSearch }));
      },

      toggleNotifications: () => {
        set((state) => ({ showNotifications: !state.showNotifications }));
      },

      toggleCallControls: () => {
        set((state) => ({ showCallControls: !state.showCallControls }));
      },

      setTyping: (isTyping: boolean) => {
        set({ isTyping });
      },

      addTypingUser: (chatId: string, userId: string) => {
        set((state) => {
          const currentTypingUsers = state.typingUsers[chatId] || [];
          if (!currentTypingUsers.includes(userId)) {
            return {
              typingUsers: {
                ...state.typingUsers,
                [chatId]: [...currentTypingUsers, userId],
              },
            };
          }
          return state;
        });
      },

      removeTypingUser: (chatId: string, userId: string) => {
        set((state) => {
          const currentTypingUsers = state.typingUsers[chatId] || [];
          return {
            typingUsers: {
              ...state.typingUsers,
              [chatId]: currentTypingUsers.filter((id) => id !== userId),
            },
          };
        });
      },

      closeAllModals: () => {
        set({
          showEmojiPicker: false,
          showFileUpload: false,
          showVoiceRecorder: false,
          showUserProfile: false,
          showChatSettings: false,
          showCreateChat: false,
          showProfile: false,
          showSearch: false,
          showNotifications: false,
          showCallControls: false,
        });
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        isDarkMode: state.isDarkMode,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

export default useUIStore; 