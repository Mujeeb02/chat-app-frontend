'use client';

import { useState, useEffect, useRef } from 'react';
import webrtcService from '@/lib/webrtc';
import useAuthStore from '@/store/authStore';
import { useCall } from '@/hooks/useCall';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  isIncoming?: boolean;
  caller?: any;
  onOpen: () => void;
  incomingOffer?: RTCSessionDescriptionInit | null;
}

export default function CallModal({ isOpen, onClose, chatId, isIncoming = false, caller, onOpen, incomingOffer }: CallModalProps) {
  const [isVideo, setIsVideo] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'failed' | 'idle' | 'incoming'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video'>('video');
  const { user } = useAuthStore();
  const { handleAnswerCall, handleRejectCall, handleEndCall } = useCall();
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Update call type when incoming call is received
  useEffect(() => {
    if (isIncoming && incomingOffer) {
      // Try to determine call type from the offer or default to video
      // In a real implementation, you might get this from the incoming call data
      setCallType('video'); // Default to video, but this should come from the call data
    }
  }, [isIncoming, incomingOffer]);

  useEffect(() => {
    if (!isOpen) return;

    console.log('CallModal: Setting up event listeners');

    // Listen to WebRTC events
    const handleRemoteStream = (stream: MediaStream) => {
      console.log('CallModal: Remote stream received');
      setRemoteStream(stream);
      setCallStatus('connected');
    };

    const handleCallStarted = () => {
      console.log('CallModal: Call started');
      const stream = webrtcService.getLocalStream();
      setLocalStream(stream);
      setCallStatus('connecting');
    };

    const handleCallAccepted = () => {
      console.log('CallModal: Call accepted');
      const stream = webrtcService.getLocalStream();
      setLocalStream(stream);
      setCallStatus('connected');
    };

    const handleCallEnded = () => {
      console.log('CallModal: Call ended');
      setLocalStream(null);
      setRemoteStream(null);
      setCallStatus('idle');
      setError(null);
      onClose();
    };

    const handleCallError = (error: Error) => {
      console.log('CallModal: Call error:', error.message);
      setError(error.message);
      setCallStatus('failed');
    };

    webrtcService.on('call:remote-stream', handleRemoteStream);
    webrtcService.on('call:started', handleCallStarted);
    webrtcService.on('call:accepted', handleCallAccepted);
    webrtcService.on('call:ended', handleCallEnded);
    webrtcService.on('call:error', handleCallError);

    return () => {
      console.log('CallModal: Cleaning up event listeners');
      webrtcService.off('call:remote-stream', handleRemoteStream);
      webrtcService.off('call:started', handleCallStarted);
      webrtcService.off('call:accepted', handleCallAccepted);
      webrtcService.off('call:ended', handleCallEnded);
      webrtcService.off('call:error', handleCallError);
    };
  }, [isOpen, onClose]);

  // Set incoming status when offer is received
  useEffect(() => {
    if (isIncoming && incomingOffer) {
      console.log('CallModal: Received incoming offer:', incomingOffer);
      setCallStatus('incoming');
    }
  }, [isIncoming, incomingOffer]);

  useEffect(() => {
    if (localVideoRef.current && localStream && callType === 'video') {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, callType]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream && callType === 'video') {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, callType]);

  const handleStartCall = async () => {
    try {
      setError(null);
      setCallStatus('connecting');
      await webrtcService.startCall(chatId, isVideo);
    } catch (error) {
      console.error('Failed to start call:', error);
      setError(error instanceof Error ? error.message : 'Failed to start call');
      setCallStatus('failed');
    }
  };

  const handleAcceptCall = async () => {
    try {
      setCallStatus('connecting');
      setError(null);
      
      console.log('CallModal: Accepting call with offer:', incomingOffer);
      
      if (!incomingOffer) {
        throw new Error('No offer found for incoming call');
      }
      
      await handleAnswerCall();
      setCallStatus('connected');
    } catch (error) {
      console.error('Failed to accept call:', error);
      setError(error instanceof Error ? error.message : 'Failed to accept call');
      setCallStatus('failed');
    }
  };

  const handleRejectCallModal = () => {
    handleRejectCall();
    onClose();
  };

  const handleEndCallModal = () => {
    handleEndCall();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/30 to-pink-900/20"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-white/20 dark:border-gray-700/30">
        {/* Enhanced Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/30 to-purple-50/50 dark:from-indigo-950/30 dark:via-gray-900/50 dark:to-purple-950/30 rounded-3xl"></div>
        
        {/* Call Header */}
        <div className="relative text-center mb-8">
          {/* Call Type Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className={`absolute inset-0 rounded-full flex items-center justify-center shadow-2xl ${
              callType === 'video' 
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600' 
                : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600'
            }`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {callType === 'video' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                )}
              </svg>
            </div>
            
            {/* Pulsing Ring Animation */}
            {(callStatus === 'connecting' || callStatus === 'incoming') && (
              <>
                <div className={`absolute inset-0 rounded-full animate-ping ${
                  callType === 'video' ? 'bg-blue-400/30' : 'bg-green-400/30'
                }`}></div>
                <div className={`absolute inset-0 rounded-full animate-pulse ${
                  callType === 'video' ? 'bg-blue-400/20' : 'bg-green-400/20'
                }`} style={{ animationDelay: '0.5s' }}></div>
              </>
            )}
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-2">
            {isIncoming ? 'Incoming Call' : `${callType === 'video' ? 'Video' : 'Audio'} Call`}
          </h3>
          
          {caller && (
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {caller.firstName?.[0]}{caller.lastName?.[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {caller.firstName} {caller.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  @{caller.username}
                </p>
              </div>
            </div>
          )}
          
          {/* Enhanced Call Status */}
          {callStatus !== 'idle' && (
            <div className="mb-6">
              <div className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm ${
                callStatus === 'connecting' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700' :
                callStatus === 'connected' ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700' :
                callStatus === 'incoming' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700' :
                'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
              }`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  callStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                  callStatus === 'connected' ? 'bg-green-500' :
                  callStatus === 'incoming' ? 'bg-blue-500 animate-pulse' :
                  'bg-red-500'
                }`}></div>
                {callStatus === 'connecting' ? 'Connecting...' :
                 callStatus === 'connected' ? 'Connected' :
                 callStatus === 'incoming' ? 'Incoming Call...' :
                 'Call Failed'}
              </div>
            </div>
          )}

          {/* Enhanced Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Video Preview - Only show for video calls */}
        {callType === 'video' && (
          <div className="relative mb-8">
            <div className="relative bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl overflow-hidden aspect-video shadow-inner border border-white/20 dark:border-gray-600/30">
              {localStream ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {(callStatus === 'connecting' || callStatus === 'incoming') && (
                        <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {isIncoming ? 'Preparing video...' : 'Camera preview'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {isIncoming ? 'Please wait' : 'Your video will appear here'}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Enhanced Remote Video (Picture-in-Picture) */}
              {remoteStream && (
                <div className="absolute top-4 right-4 w-36 h-28 bg-black rounded-2xl overflow-hidden border-3 border-white/80 dark:border-gray-800/80 shadow-2xl backdrop-blur-sm">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-white text-xs font-medium">Remote</span>
                  </div>
                </div>
              )}

              {/* Video Controls Overlay */}
              {localStream && (
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-medium">Live</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Audio Call Indicator */}
        {callType === 'audio' && (
          <div className="mb-8">
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                
                {/* Audio Wave Animation */}
                {(callStatus === 'connecting' || callStatus === 'connected') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-white/60 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Pulsing Ring for Audio */}
                {(callStatus === 'connecting' || callStatus === 'incoming') && (
                  <>
                    <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-200 font-bold text-lg mb-1">
                {isIncoming ? 'Incoming Audio Call' : 'Audio Call'}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {callStatus === 'connected' ? 'Call in progress' : 
                 callStatus === 'connecting' ? 'Connecting...' :
                 isIncoming ? 'Tap to answer' : 'High quality audio'}
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Call Options */}
        {!isIncoming && callStatus === 'idle' && (
          <div className="relative mb-8">
            <div className="p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-600/30">
              <label className="flex items-center justify-center space-x-4 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isVideo}
                    onChange={(e) => setIsVideo(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    isVideo 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                      isVideo ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isVideo 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-bold">
                    {isVideo ? 'Video Call' : 'Audio Call'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Enhanced Call Controls */}
        <div className="relative flex justify-center items-center space-x-8">
          {isIncoming ? (
            <>
              {/* Enhanced Accept Call Button */}
              <button
                onClick={handleAcceptCall}
                disabled={callStatus === 'connecting'}
                className="group relative p-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-300 text-white rounded-full transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:scale-110 active:scale-95 disabled:transform-none disabled:cursor-not-allowed"
                title="Accept call"
              >
                {callStatus === 'connecting' ? (
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )}
                
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping"></div>
              </button>

              {/* Enhanced Reject Call Button */}
              <button
                onClick={handleRejectCallModal}
                className="group relative p-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:scale-110 active:scale-95"
                title="Reject call"
              >
                <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l18 18M3 21L21 3" />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* Enhanced Start Call Button */}
              <button
                onClick={handleStartCall}
                disabled={callStatus === 'connecting'}
                className={`group relative p-6 text-white rounded-full transition-all duration-300 shadow-2xl transform hover:scale-110 active:scale-95 disabled:transform-none disabled:cursor-not-allowed ${
                  callType === 'video'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 hover:shadow-blue-500/25'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-300 hover:shadow-green-500/25'
                }`}
                title={`Start ${callType} call`}
              >
                {callStatus === 'connecting' ? (
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {callType === 'video' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    )}
                  </svg>
                )}
              </button>

              {/* Enhanced Cancel Button */}
              <button
                onClick={onClose}
                className="group relative p-6 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-full transition-all duration-300 shadow-2xl hover:shadow-gray-500/25 transform hover:scale-110 active:scale-95"
                title="Cancel"
              >
                <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Enhanced End Call Button (for active calls) */}
        {webrtcService.isInCall() && (
          <div className="mt-8 text-center">
            <button
              onClick={handleEndCallModal}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="relative flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l18 18M3 21L21 3" />
                </svg>
                <span>End Call</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 