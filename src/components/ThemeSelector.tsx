'use client';

import { useState } from 'react';
import useUIStore from '@/store/uiStore';
import { Theme } from '@/types';

const themes: Theme[] = [
  {
    name: 'default',
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#f59e0b',
  },
  {
    name: 'dark',
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    border: '#334155',
    accent: '#fbbf24',
  },
  {
    name: 'ocean',
    primary: '#0891b2',
    secondary: '#64748b',
    background: '#f0f9ff',
    surface: '#e0f2fe',
    text: '#0c4a6e',
    textSecondary: '#0369a1',
    border: '#7dd3fc',
    accent: '#f59e0b',
  },
  {
    name: 'forest',
    primary: '#059669',
    secondary: '#64748b',
    background: '#f0fdf4',
    surface: '#dcfce7',
    text: '#14532d',
    textSecondary: '#15803d',
    border: '#86efac',
    accent: '#f59e0b',
  },
  {
    name: 'sunset',
    primary: '#dc2626',
    secondary: '#64748b',
    background: '#fef2f2',
    surface: '#fee2e2',
    text: '#7f1d1d',
    textSecondary: '#b91c1c',
    border: '#fca5a5',
    accent: '#f59e0b',
  },
  {
    name: 'purple',
    primary: '#7c3aed',
    secondary: '#64748b',
    background: '#faf5ff',
    surface: '#f3e8ff',
    text: '#581c87',
    textSecondary: '#7c3aed',
    border: '#c4b5fd',
    accent: '#f59e0b',
  },
];

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useUIStore();
  const [selectedTheme, setSelectedTheme] = useState(theme.name);

  const handleThemeChange = (newTheme: Theme) => {
    setSelectedTheme(newTheme.name);
    setTheme(newTheme);
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Theme Settings
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Dark Mode Toggle */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dark Mode
            </h4>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={handleDarkModeToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Theme Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Color Themes
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => handleThemeChange(themeOption)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedTheme === themeOption.name
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  style={{
                    backgroundColor: themeOption.background,
                    color: themeOption.text,
                  }}
                >
                  {/* Theme Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: themeOption.primary }}
                        />
                        <span className="text-xs font-medium capitalize">
                          {themeOption.name}
                        </span>
                      </div>
                      {selectedTheme === themeOption.name && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Color Palette Preview */}
                    <div className="flex space-x-1">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: themeOption.primary }}
                      />
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: themeOption.secondary }}
                      />
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: themeOption.accent }}
                      />
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: themeOption.border }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Theme Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Theme Customization
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Your theme preference will be saved and applied across all your devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
} 