'use client';

import { useState } from 'react';
import socketService from '@/lib/socket';
import webrtcService from '@/lib/webrtc';
import useChatStore from '@/store/chatStore';
import useAuthStore from '@/store/authStore';

export default function SocketDebug() {
  const [status, setStatus] = useState<string>('Unknown');
  const { currentChat, messages } = useChatStore();
  const { user } = useAuthStore();

  const testSocketConnection = () => {
    const isConnected = socketService.getConnectionStatus();
    setStatus(isConnected ? 'Connected' : 'Disconnected');
    console.log('Socket connection test:', isConnected);
  };

  const testReaction = () => {
    if (!currentChat || messages.length === 0) {
      console.log('No chat or messages available for reaction test');
      return;
    }

    const firstMessage = messages[0];
    console.log('Testing reaction on message:', firstMessage._id);
    socketService.reactToMessage(firstMessage._id, '👍', currentChat._id);
  };

  const testCall = () => {
    if (!currentChat) {
      console.log('No chat available for call test');
      return;
    }

    console.log('Testing call for chat:', currentChat._id);
    console.log('WebRTC service state:', {
      isInCall: webrtcService.isInCall(),
      connectionState: webrtcService.getConnectionState()
    });

    // Test incoming call manually
    const testIncomingCall = {
      chatId: currentChat._id,
      offer: {
        type: 'offer',
        sdp: 'test-sdp'
      },
      isVideo: true,
      caller: {
        _id: 'test-caller-id',
        firstName: 'Test',
        lastName: 'Caller',
        username: 'testcaller'
      }
    };

    console.log('Manually triggering incoming call event:', testIncomingCall);
    webrtcService.emit('call:incoming', testIncomingCall);
  };

  const testStartCall = async () => {
    if (!currentChat) {
      console.log('No chat available for call test');
      return;
    }

    try {
      console.log('Starting test call for chat:', currentChat._id);
      await webrtcService.startCall(currentChat._id, true);
      console.log('Test call started successfully');
    } catch (error) {
      console.error('Failed to start test call:', error);
    }
  };

  const testServerCall = () => {
    if (!currentChat) {
      console.log('No chat available for server call test');
      return;
    }

    // Find the other participant
    const otherParticipant = currentChat.participants.find(p => p._id !== user?._id);
    if (!otherParticipant) {
      console.log('No other participant found');
      return;
    }

    console.log('Testing server-side call to user:', otherParticipant._id);
    // Note: Direct socket access not available in SocketService
    console.log('Socket emit not available through public interface');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <h3 className="text-sm font-semibold mb-2">Socket Debug</h3>
      <div className="space-y-2">
        <div className="text-xs">
          Status: <span className={status === 'Connected' ? 'text-green-600' : 'text-red-600'}>{status}</span>
        </div>
        <button
          onClick={testSocketConnection}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Test Connection
        </button>
        <button
          onClick={testReaction}
          className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
        >
          Test Reaction
        </button>
        <button
          onClick={testCall}
          className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
        >
          Test Call
        </button>
        <button
          onClick={testStartCall}
          className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
        >
          Test Start Call
        </button>
        <button
          onClick={testServerCall}
          className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
        >
          Test Server Call
        </button>
      </div>
    </div>
  );
} 