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
  const { user } = useAuthStore();
  const { handleAnswerCall, handleRejectCall, handleEndCall } = useCall();
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

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
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        {/* Call Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isIncoming ? 'Incoming Call' : 'Start Call'}
          </h3>
          {caller && (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {caller.firstName?.[0]}{caller.lastName?.[0]}
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {caller.firstName} {caller.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {caller.username}
                </p>
              </div>
            </div>
          )}
          
          {/* Call Status */}
          {callStatus !== 'idle' && (
            <div className="mt-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                callStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                callStatus === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                callStatus === 'incoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  callStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                  callStatus === 'connected' ? 'bg-green-500' :
                  callStatus === 'incoming' ? 'bg-blue-500 animate-pulse' :
                  'bg-red-500'
                }`}></div>
                {callStatus === 'connecting' ? 'Connecting...' :
                 callStatus === 'connected' ? 'Connected' :
                 callStatus === 'incoming' ? 'Incoming Call...' :
                 'Failed'}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Video Preview */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden aspect-video">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {isIncoming ? 'Waiting for call...' : 'Camera preview'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Remote Video (Picture-in-Picture) */}
            {remoteStream && (
              <div className="absolute top-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden border-2 border-white shadow-lg">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Call Options */}
        {!isIncoming && callStatus === 'idle' && (
          <div className="mb-8">
            <label className="flex items-center justify-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <input
                type="checkbox"
                checked={isVideo}
                onChange={(e) => setIsVideo(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Video call</span>
            </label>
          </div>
        )}

        {/* Call Controls */}
        <div className="flex justify-center space-x-6">
          {isIncoming ? (
            <>
              {/* Accept Call */}
              <button
                onClick={handleAcceptCall}
                disabled={callStatus === 'connecting'}
                className="p-6 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                title="Accept call"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>

              {/* Reject Call */}
              <button
                onClick={handleRejectCallModal}
                className="p-6 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                title="Reject call"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l18 18M3 21L21 3" />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* Start Call */}
              <button
                onClick={handleStartCall}
                disabled={callStatus === 'connecting'}
                className="p-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                title="Start call"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>

              {/* Cancel */}
              <button
                onClick={onClose}
                className="p-6 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                title="Cancel"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* End Call Button (for active calls) */}
        {webrtcService.isInCall() && (
          <div className="mt-6 text-center">
            <button
              onClick={handleEndCallModal}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              End Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 