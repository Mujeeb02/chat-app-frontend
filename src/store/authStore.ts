/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import socketService from '@/lib/socket';

interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen: string;
  isEmailVerified?: boolean;
  oauthProvider?: 'google' | 'github' | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
  updateProfile: (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    bio?: string;
    avatar?: string;
  }) => Promise<void>;
  initializeSocket: () => void;
  initialize: () => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response:any = await api.login({ email, password });
          console.log("response",response);
          if (response.success && response.data) {
            const { user, token } = response.data;
            api.setToken(token);
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            // Connect to socket
            socketService.connect(token);
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response:any = await api.register(userData);
          
          if (response.success && response.data) {
            const { user, token } = response.data;
            api.setToken(token);
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            // Connect to socket
            socketService.connect(token);
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
          throw error;
        }
      },

      loginWithToken: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          api.setToken(token);
          
          // Get user profile with the token
          const response:any = await api.getProfile();
          
          if (response.success && response.data) {
            set({
              user: response.data,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            // Connect to socket
            socketService.connect(token);
          } else {
            throw new Error('Failed to get user profile');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Token login failed',
          });
          throw error;
        }
      },

      logout: () => {
        api.clearToken();
        socketService.disconnect();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response:any = await api.updateProfile(profileData);
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Profile update failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Profile update failed',
          });
          throw error;
        }
      },

      initializeSocket: () => {
        const { token, isAuthenticated } = get();
        if (isAuthenticated && token && !socketService.getConnectionStatus()) {
          console.log('Initializing socket connection...');
          socketService.connect(token).catch(error => {
            console.error('Failed to initialize socket:', error);
          });
        }
      },

      initialize: () => {
        const { token, isAuthenticated } = get();
        // Set token in API service if we have one from persisted state
        if (token && isAuthenticated) {
          api.setToken(token);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore; 