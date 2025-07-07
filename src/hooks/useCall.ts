import { useState, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import webrtcService from '@/lib/webrtc';

export const useCall = () => {
  const { user } = useAuthStore();
  const { currentChat } = useChatStore();
  
  // Call state
  const [showCallModal, setShowCallModal] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [incomingCallData, setIncomingCallData] = useState<{
    caller: { _id: string; firstName: string; lastName: string };
    offer: RTCSessionDescriptionInit;
  } | null>(null);
  const [incomingOffer, setIncomingOffer] = useState<RTCSessionDescriptionInit | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);

  // Handle incoming calls
  useEffect(() => {
    const handleIncomingCall = (data: {
      caller: { _id: string; firstName: string; lastName: string };
      offer: RTCSessionDescriptionInit;
      isVideo: boolean;
    }) => {
      console.log('Incoming call data:', data);
      setIncomingCallData(data);
      setIncomingOffer(data.offer);
      setCallType(data.isVideo ? 'video' : 'audio');
      setIsIncomingCall(true);
      setShowCallModal(true);
    };

    const handleCallStarted = (data: { chatId: string; isVideo: boolean }) => {
      console.log('Call started:', data);
      setCallType(data.isVideo ? 'video' : 'audio');
      setShowCallModal(true);
    };

    const handleCallError = (error: Error) => {
      console.error('Call error:', error);
      // You might want to show a toast notification here
      setShowCallModal(false);
      setIsIncomingCall(false);
      setIncomingCallData(null);
      setIncomingOffer(null);
      setCallType(null);
    };

    const handleCallEnded = () => {
      console.log('Call ended');
      setShowCallModal(false);
      setIsIncomingCall(false);
      setIncomingCallData(null);
      setIncomingOffer(null);
      setCallType(null);
    };

    // Set up event listeners
    webrtcService.on('call:incoming', handleIncomingCall);
    webrtcService.on('call:started', handleCallStarted);
    webrtcService.on('call:error', handleCallError);
    webrtcService.on('call:ended', handleCallEnded);

    return () => {
      webrtcService.off('call:incoming', handleIncomingCall);
      webrtcService.off('call:started', handleCallStarted);
      webrtcService.off('call:error', handleCallError);
      webrtcService.off('call:ended', handleCallEnded);
    };
  }, []);

  const handleStartCall = async (isVideo: boolean = false) => {
    if (!currentChat || !user) {
      console.error('No current chat or user');
      return;
    }

    try {
      console.log(`Starting ${isVideo ? 'video' : 'audio'} call for chat:`, currentChat._id);
      
      // Check if we're already in a call
      if (webrtcService.isInCall()) {
        console.log('Already in a call');
        return;
      }

      // Start the call using WebRTC service
      await webrtcService.startCall(currentChat._id, isVideo);
      
      setCallType(isVideo ? 'video' : 'audio');
      setShowCallModal(true);
      setIsIncomingCall(false);
      setIncomingCallData(null);
      setIncomingOffer(null);
      
    } catch (error) {
      console.error('Failed to start call:', error);
      // You might want to show a toast notification here
    }
  };

  const handleCloseCallModal = () => {
    setShowCallModal(false);
    setIsIncomingCall(false);
    setIncomingCallData(null);
    setIncomingOffer(null);
    setCallType(null);
  };

  const handleAnswerCall = async () => {
    if (!incomingOffer || !currentChat) {
      console.error('No incoming offer or current chat');
      return;
    }

    try {
      console.log('Answering incoming call');
      
      // Determine if this is a video call based on the call type
      const isVideoCall = callType === 'video';
      
      // Accept the call using WebRTC service with the correct call type
      await webrtcService.acceptCall(currentChat._id, incomingOffer, isVideoCall);
      
      setShowCallModal(true);
      setIsIncomingCall(false);
      setIncomingCallData(null);
      setIncomingOffer(null);
      
    } catch (error) {
      console.error('Failed to answer call:', error);
      // You might want to show a toast notification here
    }
  };

  const handleRejectCall = () => {
    if (!currentChat) {
      console.error('No current chat');
      return;
    }

    console.log('Rejecting incoming call');
    webrtcService.rejectCall(currentChat._id);
    handleCloseCallModal();
  };

  const handleEndCall = () => {
    console.log('Ending call');
    webrtcService.endCall();
    handleCloseCallModal();
  };

  return {
    showCallModal,
    isIncomingCall,
    incomingCallData,
    incomingOffer,
    callType,
    handleStartCall,
    handleCloseCallModal,
    handleAnswerCall,
    handleRejectCall,
    handleEndCall,
  };
}; 