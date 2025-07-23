"use client";

import { useEffect, useRef } from "react";
import useAuthStore from "@/store/authStore";
import useChatStore from "@/store/chatStore";
import useUIStore from "@/store/uiStore";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import LoadingSpinner from "./LoadingSpinner";
import CallModal from "./CallModal";
import { useCall } from "@/hooks/useCall";

export default function ChatInterface() {
  const { user } = useAuthStore();
  const {
    currentChat,
    messages,
    isLoading,
    error,
    fetchChats,
    fetchMessages,
    setTyping,
  } = useChatStore();
  const { toggleCreateChat } = useUIStore();
  const {
    showCallModal,
    isIncomingCall,
    incomingCallData,
    incomingOffer,
    handleStartCall,
    handleCloseCallModal,
  } = useCall();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user, fetchChats]);

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat._id);
    }
  }, [currentChat, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Call handlers with proper error handling
  const handleAudioCall = async () => {
    try {
      console.log("Initiating audio call from chat interface...");
      await handleStartCall(false);
    } catch (error) {
      console.error("Failed to initiate audio call:", error);
      // You might want to show a toast notification here
    }
  };

  const handleVideoCall = async () => {
    try {
      console.log("Initiating video call from chat interface...");
      await handleStartCall(true);
    } catch (error) {
      console.error("Failed to initiate video call:", error);
      // You might want to show a toast notification here
    }
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/30 to-purple-50/50 dark:from-indigo-950/30 dark:via-gray-900/50 dark:to-purple-950/30"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative text-center animate-fade-in">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient-shift">
            Welcome to ChatApp
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Connect, chat, and share moments with friends and colleagues
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-2000"></div>
              <span>Real-time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-4000"></div>
              <span>Modern</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/60 to-indigo-50/80 dark:from-gray-950/80 dark:via-gray-900/60 dark:to-indigo-950/80"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241) 2px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        <div className="relative text-center animate-zoom-in">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg
                className="w-14 h-14 text-white animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            {/* Floating Dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Choose a conversation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-lg mx-auto">
            Select from your existing chats or start a new conversation to begin
            messaging
          </p>

          {/* Enhanced CTA Button */}
          <button
            onClick={toggleCreateChat}
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            {/* Button Content */}
            <div className="relative flex items-center space-x-3">
              <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                <svg
                  className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300"
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
              </div>
              <span className="text-lg">Start New Chat</span>
            </div>
          </button>

          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Instant
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Secure
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Social
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Enhanced Desktop Chat Header */}
      <div className="hidden lg:flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl flex-shrink-0 relative">
        {/* Header Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-white/20 to-purple-50/30 dark:from-indigo-950/20 dark:via-gray-900/30 dark:to-purple-950/20"></div>

        <div className="relative flex items-center space-x-4">
          {/* Enhanced Chat Avatar */}
          <div className="relative group">
            <div className="avatar w-14 h-14 ring-2 ring-white/50 dark:ring-gray-700/50 shadow-lg transform group-hover:scale-105 transition-all duration-300">
              {currentChat.type === "direct" &&
              currentChat.participants.length > 0 ? (
                // For direct chats, show the other participant's avatar
                (() => {
                  const otherParticipant = currentChat.participants.find(
                    (p) => p._id !== user._id
                  );
                  return otherParticipant?.avatar ? (
                    <img
                      src={otherParticipant.avatar}
                      alt={`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {otherParticipant?.firstName?.charAt(0).toUpperCase() ||
                        "U"}
                    </span>
                  );
                })()
              ) : currentChat.avatar ? (
                <img
                  src={currentChat.avatar}
                  alt={currentChat.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">
                  {currentChat.name?.charAt(0).toUpperCase() || ""}
                </span>
              )}
            </div>

            {/* Enhanced Online Status Indicator */}
            {currentChat.type === "direct" &&
              currentChat.participants.length > 0 &&
              (() => {
                const otherParticipant = currentChat.participants.find(
                  (p) => p._id !== user._id
                );
                const isOnline = otherParticipant?.status === "online";
                return (
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 shadow-sm ${
                      isOnline
                        ? "bg-gradient-to-r from-green-400 to-green-500 animate-pulse"
                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                    }`}
                  ></div>
                );
              })()}
          </div>

          {/* Enhanced Chat Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentChat.type === "direct" &&
                currentChat.participants.length > 0
                  ? // For direct chats, show the other participant's name
                    (() => {
                      const otherParticipant = currentChat.participants.find(
                        (p) => p._id !== user._id
                      );
                      return (
                        `${otherParticipant?.firstName || ""} ${
                          otherParticipant?.lastName || ""
                        }`.trim() || "Unknown User"
                      );
                    })()
                  : currentChat.name || "Unnamed Chat"}
              </h3>

              {/* Status Badge */}
              {currentChat.type === "direct" &&
                currentChat.participants.length > 0 &&
                (() => {
                  const otherParticipant = currentChat.participants.find(
                    (p) => p._id !== user._id
                  );
                  const isOnline = otherParticipant?.status === "online";
                  return (
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isOnline
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300"
                          : "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </div>
                  );
                })()}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
              {currentChat.type === "direct" &&
              currentChat.participants.length > 0
                ? // For direct chats, show last seen
                  (() => {
                    const otherParticipant = currentChat.participants.find(
                      (p) => p._id !== user._id
                    );
                    if (otherParticipant?.status === "online") {
                      return "Active now";
                    } else if (otherParticipant?.lastSeen) {
                      const lastSeen = new Date(otherParticipant.lastSeen);
                      const now = new Date();
                      const diffInMinutes = Math.floor(
                        (now.getTime() - lastSeen.getTime()) / (1000 * 60)
                      );

                      if (diffInMinutes < 1) {
                        return "Last seen just now";
                      } else if (diffInMinutes < 60) {
                        return `Last seen ${diffInMinutes} minutes ago`;
                      } else if (diffInMinutes < 1440) {
                        const hours = Math.floor(diffInMinutes / 60);
                        return `Last seen ${hours} hour${
                          hours > 1 ? "s" : ""
                        } ago`;
                      } else {
                        const days = Math.floor(diffInMinutes / 1440);
                        return `Last seen ${days} day${
                          days > 1 ? "s" : ""
                        } ago`;
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
        </div>

        {/* Enhanced Header Actions */}
        <div className="relative flex items-center space-x-2">
          {/* Audio Call Button */}
          <button
            onClick={handleAudioCall}
            className="group relative p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 focus-ring"
            title="Start audio call"
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

          {/* Video Call Button */}
          <button
            onClick={handleVideoCall}
            className="group relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 focus-ring"
            title="Start video call"
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

          {/* More Options */}
          <button
            className="group relative p-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 backdrop-blur-sm rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-ring"
            title="More options"
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 relative custom-scrollbar">
        {/* Messages Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 via-white/20 to-slate-50/30 dark:from-gray-950/30 dark:via-gray-900/20 dark:to-gray-950/30"></div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center animate-fade-in">
                <div className="relative mb-6">
                  <LoadingSpinner />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">
                  Loading messages...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-red-500 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Failed to load messages
                </h3>
                <p className="text-red-600 dark:text-red-400 mb-6 font-medium">
                  {error}
                </p>
                <button
                  onClick={() => currentChat && fetchMessages(currentChat._id)}
                  className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Try Again</span>
                  </div>
                </button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center animate-zoom-in">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                    <svg
                      className="w-12 h-12 text-indigo-500 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  {/* Floating Animation Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Start the conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-sm mx-auto">
                  Send your first message to begin this chat
                </p>

                {/* Conversation Starters */}
                <div className="space-y-3 max-w-xs mx-auto">
                  <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Say hello 👋
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-2000"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Share a photo 📸
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-4000"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Ask a question ❓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MessageBubble
                    message={message}
                    isOwnMessage={message.sender._id === user._id}
                  />
                </div>
              ))}

              {/* Enhanced Typing Indicator */}
              <div className="animate-slide-up">
                <TypingIndicator />
              </div>

              {/* Scroll Anchor */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      {currentChat && (
        <div className="flex-shrink-0 message-input-container">
          <MessageInput chatId={currentChat._id} onTyping={setTyping} />
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && currentChat && (
        <CallModal
          isOpen={showCallModal}
          onClose={handleCloseCallModal}
          onOpen={() => handleStartCall(false)}
          chatId={currentChat._id}
          isIncoming={isIncomingCall}
          caller={incomingCallData?.caller}
          incomingOffer={incomingOffer}
        />
      )}
    </div>
  );
}
