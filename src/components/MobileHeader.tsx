"use client";

import { useState } from "react";
import useAuthStore from "@/store/authStore";
import useUIStore from "@/store/uiStore";
import useChatStore from "@/store/chatStore";
import ThemeSelector from "./ThemeSelector";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onAudioCall?: () => void;
  onVideoCall?: () => void;
}

export default function MobileHeader({
  onMenuToggle,
  title = "ChatApp",
  showBackButton = false,
  onBack,
  onAudioCall,
  onVideoCall,
}: MobileHeaderProps) {
  const { user } = useAuthStore();
  const { currentChat } = useChatStore();
  const { toggleProfile, toggleNotifications, toggleCreateChat } = useUIStore();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Check if we're in a chat and have call handlers
  const isInChat = showBackButton && currentChat;
  const canMakeCalls = isInChat && onAudioCall && onVideoCall;

  return (
    <div className="mobile-header-wrapper">
      <div className="mobile-header lg:hidden relative overflow-hidden">
        {/* Enhanced Header Background */}
        <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-white/20 to-purple-50/30 dark:from-indigo-950/20 dark:via-gray-900/30 dark:to-purple-950/20"></div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

        <div className="relative px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Left Section */}
            <div className="flex items-center space-x-3">
              {showBackButton ? (
                <button
                  onClick={onBack}
                  className="group relative p-3 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
                  title="Back to chats"
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onMenuToggle}
                  className="group relative p-3 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
                  title="Menu"
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}

              {/* Enhanced Title */}
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </h1>
                {!showBackButton && (
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="flex items-center space-x-2">
              {/* When in a chat, show enhanced call buttons */}
              {canMakeCalls ? (
                <>
                  {/* Enhanced Audio Call Button */}
                  <button
                    onClick={onAudioCall}
                    className="group relative p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 focus-ring"
                    title="Audio Call"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>

                  {/* Enhanced Video Call Button */}
                  <button
                    onClick={onVideoCall}
                    className="group relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 focus-ring"
                    title="Video Call"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                /* Enhanced regular buttons */
                <>
                  {/* Enhanced Theme Toggle */}
                  <button
                    onClick={() => setShowThemeSelector(true)}
                    className="group relative p-3 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
                    title="Theme Settings"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </button>

                  {/* Enhanced Notifications */}
                  <button
                    onClick={toggleNotifications}
                    className="group relative p-3 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
                    title="Notifications"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25v3h15v-3l-2.25-2.25V9.75a6 6 0 00-6-6z"
                      />
                    </svg>
                    {/* Enhanced notification badge */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                  </button>

                  {/* Enhanced New Chat */}
                  <button
                    onClick={toggleCreateChat}
                    className="group relative p-3 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
                    title="New Chat"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>

                  {/* Enhanced Profile */}
                  <button
                    onClick={toggleProfile}
                    className="group relative p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
                    title="Profile"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Enhanced User Info Bar (if not in chat) */}
          {!showBackButton && user && (
            <div className="relative mt-4 mx-4 animate-slide-in-bottom">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-white/30 to-purple-50/50 dark:from-indigo-950/30 dark:via-gray-800/50 dark:to-purple-950/30 rounded-2xl backdrop-blur-sm"></div>
              <div className="relative flex items-center space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-lg">
                <div className="relative">
                  <div className="avatar w-12 h-12 ring-2 ring-white/50 dark:ring-gray-700/50 shadow-md">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {user?.firstName?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <div className="px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                      Online
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">
                    {user?.email}
                  </p>
                </div>

                {/* Activity Indicator */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Chat Info Bar (when in chat) */}
          {showBackButton && currentChat && (
            <div className="relative mt-4 mx-4 animate-slide-in-bottom">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 via-white/30 to-indigo-50/50 dark:from-slate-950/30 dark:via-gray-800/50 dark:to-indigo-950/30 rounded-2xl backdrop-blur-sm"></div>
              <div className="relative flex items-center space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-lg">
                <div className="relative">
                  <div className="avatar w-12 h-12 ring-2 ring-white/50 dark:ring-gray-700/50 shadow-md">
                    {currentChat.type === "direct" &&
                    currentChat.participants.length > 0 ? (
                      (() => {
                        const otherParticipant = currentChat.participants.find(
                          (p) => p._id !== user?._id
                        );
                        return otherParticipant?.avatar ? (
                          <img
                            src={otherParticipant.avatar}
                            alt={`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-sm">
                            {otherParticipant?.firstName
                              ?.charAt(0)
                              .toUpperCase() || "U"}
                          </span>
                        );
                      })()
                    ) : currentChat.avatar ? (
                      <img
                        src={currentChat.avatar}
                        alt={currentChat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {currentChat.name?.charAt(0).toUpperCase() || ""}
                      </span>
                    )}
                  </div>

                  {/* Enhanced Status Indicator */}
                  {currentChat.type === "direct" &&
                    currentChat.participants.length > 0 &&
                    (() => {
                      const otherParticipant = currentChat.participants.find(
                        (p) => p._id !== user?._id
                      );
                      const isOnline = otherParticipant?.status === "online";
                      return (
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm ${
                            isOnline
                              ? "bg-gradient-to-r from-green-400 to-green-500 animate-pulse"
                              : "bg-gradient-to-r from-gray-400 to-gray-500"
                          }`}
                        ></div>
                      );
                    })()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {currentChat.type === "direct" &&
                      currentChat.participants.length > 0
                        ? (() => {
                            const otherParticipant =
                              currentChat.participants.find(
                                (p) => p._id !== user?._id
                              );
                            return (
                              `${otherParticipant?.firstName || ""} ${
                                otherParticipant?.lastName || ""
                              }`.trim() || "Unknown User"
                            );
                          })()
                        : currentChat.name || "Unnamed Chat"}
                    </p>

                    {/* Enhanced Status Badge */}
                    {currentChat.type === "direct" &&
                      currentChat.participants.length > 0 &&
                      (() => {
                        const otherParticipant = currentChat.participants.find(
                          (p) => p._id !== user?._id
                        );
                        const isOnline = otherParticipant?.status === "online";
                        return (
                          <div
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              isOnline
                                ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300"
                                : "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {isOnline ? "Online" : "Offline"}
                          </div>
                        );
                      })()}

                    {/* Group Chat Badge */}
                    {currentChat.type === "group" && (
                      <div className="px-2 py-0.5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">
                        Group
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">
                    {currentChat.type === "direct" &&
                    currentChat.participants.length > 0
                      ? (() => {
                          const otherParticipant =
                            currentChat.participants.find(
                              (p) => p._id !== user?._id
                            );
                          if (otherParticipant?.status === "online") {
                            return "Active now";
                          } else if (otherParticipant?.lastSeen) {
                            const lastSeen = new Date(
                              otherParticipant.lastSeen
                            );
                            const now = new Date();
                            const diffInMinutes = Math.floor(
                              (now.getTime() - lastSeen.getTime()) / (1000 * 60)
                            );

                            if (diffInMinutes < 1) {
                              return "Last seen just now";
                            } else if (diffInMinutes < 60) {
                              return `Last seen ${diffInMinutes}m ago`;
                            } else if (diffInMinutes < 1440) {
                              const hours = Math.floor(diffInMinutes / 60);
                              return `Last seen ${hours}h ago`;
                            } else {
                              const days = Math.floor(diffInMinutes / 1440);
                              return `Last seen ${days}d ago`;
                            }
                          } else {
                            return "Last seen a while ago";
                          }
                        })()
                      : `${currentChat.participants.length} member${
                          currentChat.participants.length !== 1 ? "s" : ""
                        } • Group chat`}
                  </p>
                </div>

                {/* Chat Actions */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Chat
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Selector Modal */}
        <ThemeSelector
          isOpen={showThemeSelector}
          onClose={() => setShowThemeSelector(false)}
        />
      </div>
    </div>
  );
}
  