'use client';

import { useState, useEffect } from 'react';
import useUIStore from '@/store/uiStore';
import webrtcService from '@/lib/webrtc';

export default function CallControls() {
  const { showCallControls, toggleCallControls } = useUIStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    // Listen to WebRTC service events
    webrtcService.on('call:mute-toggled', (muted: boolean) => {
      setIsMuted(muted);
    });

    webrtcService.on('call:video-toggled', (videoOff: boolean) => {
      setIsVideoOff(videoOff);
    });

    webrtcService.on('call:screen-share-toggled', (screenSharing: boolean) => {
      setIsScreenSharing(screenSharing);
    });

    webrtcService.on('call:ended', () => {
      toggleCallControls();
    });

    return () => {
      // Cleanup listeners
      webrtcService.off('call:mute-toggled', () => {});
      webrtcService.off('call:video-toggled', () => {});
      webrtcService.off('call:screen-share-toggled', () => {});
      webrtcService.off('call:ended', () => {});
    };
  }, [toggleCallControls]);

  const handleMuteToggle = () => {
    webrtcService.toggleMute();
  };

  const handleVideoToggle = () => {
    webrtcService.toggleVideo();
  };

  const handleScreenShareToggle = () => {
    webrtcService.toggleScreenShare();
  };

  const handleEndCall = () => {
    webrtcService.endCall();
    toggleCallControls();
  };

  if (!showCallControls) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        {/* Mute Button */}
        <button
          onClick={handleMuteToggle}
          className={`p-3 rounded-full transition-colors duration-200 ${
            isMuted 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        {/* Video Toggle Button */}
        <button
          onClick={handleVideoToggle}
          className={`p-3 rounded-full transition-colors duration-200 ${
            isVideoOff 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
          title={isVideoOff ? 'Turn on video' : 'Turn off video'}
        >
          {isVideoOff ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>

        {/* Screen Share Button */}
        <button
          onClick={handleScreenShareToggle}
          className={`p-3 rounded-full transition-colors duration-200 ${
            isScreenSharing 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
          title="End call"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l18 18M3 21L21 3" />
          </svg>
        </button>
      </div>
    </div>
  );
} 