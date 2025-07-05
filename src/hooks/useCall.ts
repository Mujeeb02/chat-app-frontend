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

  // Handle incoming calls
  useEffect(() => {
    const handleIncomingCall = (data: {
      caller: { _id: string; firstName: string; lastName: string };
      offer: RTCSessionDescriptionInit;
    }) => {
      console.log('Incoming call data:', data);
      setIncomingCallData(data);
      setIncomingOffer(data.offer);
      setIsIncomingCall(true);
      setShowCallModal(true);
    };

    webrtcService.on('call:incoming', handleIncomingCall);

    return () => {
      webrtcService.off('call:incoming', handleIncomingCall);
    };
  }, []);

  const handleStartCall = (isVideo: boolean = false) => {
    if (currentChat && user) {
      console.log(`Starting ${isVideo ? 'video' : 'audio'} call for chat:`, currentChat._id);
      setShowCallModal(true);
      setIsIncomingCall(false);
      setIncomingCallData(null);
      setIncomingOffer(null);
      
      // Here you would trigger the actual call
      // For now, we'll just open the modal
      // In a real implementation, you would:
      // 1. Create a call offer
      // 2. Send it to the other participants
      // 3. Handle the WebRTC connection
    }
  };

  const handleCloseCallModal = () => {
    setShowCallModal(false);
    setIsIncomingCall(false);
    setIncomingCallData(null);
    setIncomingOffer(null);
  };

  const handleAnswerCall = () => {
    if (incomingOffer && currentChat) {
      console.log('Answering incoming call');
      // Handle answering the call
      // In a real implementation, you would:
      // 1. Create an answer
      // 2. Send it back to the caller
      // 3. Establish the WebRTC connection
    }
  };

  const handleRejectCall = () => {
    console.log('Rejecting incoming call');
    handleCloseCallModal();
    // Send rejection signal to caller
  };

  const handleEndCall = () => {
    console.log('Ending call');
    handleCloseCallModal();
    // Send end call signal to participants
  };

  return {
    showCallModal,
    isIncomingCall,
    incomingCallData,
    incomingOffer,
    handleStartCall,
    handleCloseCallModal,
    handleAnswerCall,
    handleRejectCall,
    handleEndCall,
  };
}; 