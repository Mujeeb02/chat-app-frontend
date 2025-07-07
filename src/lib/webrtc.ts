import { EventEmitter } from 'events';
import socketService from './socket';

interface CallState {
  isInCall: boolean;
  isVideoOff: boolean;
  isMuted: boolean;
  isScreenSharing: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
  screenStream: MediaStream | null;
  pendingIceCandidates?: RTCIceCandidate[];
}

class WebRTCService extends EventEmitter {
  private state: CallState = {
    isInCall: false,
    isVideoOff: false,
    isMuted: false,
    isScreenSharing: false,
    localStream: null,
    remoteStream: null,
    peerConnection: null,
    screenStream: null,
    pendingIceCandidates: [],
  };

  private currentChatId: string | null = null;

  constructor() {
    super();
    console.log('WebRTC: Initializing WebRTC service');
    this.setupSocketListeners();
    
    // Re-setup listeners when socket connects
    socketService.onConnect(() => {
      console.log('WebRTC: Socket connected, re-setting up listeners');
      this.setupSocketListeners();
    });
  }

  private setupSocketListeners() {
    console.log('WebRTC: Setting up socket listeners');

    socketService.on('call:incoming', (data: any) => {
      console.log('WebRTC: Incoming call received:', data);
      this.emit('call:incoming', data);
    });

    socketService.on('call:accepted', (data: any) => {
      console.log('WebRTC: Call accepted:', data);
      this.handleCallAccepted(data);
    });

    socketService.on('call:rejected', (data: any) => {
      console.log('WebRTC: Call rejected:', data);
      this.emit('call:rejected', data);
    });

    socketService.on('call:ended', (data: any) => {
      console.log('WebRTC: Call ended:', data);
      this.handleCallEnded(data);
    });

    socketService.on('call:ice-candidate', (data: any) => {
      console.log('WebRTC: ICE candidate received:', data);
      this.handleIceCandidate(data);
    });

    socketService.on('call:offer', (data: any) => {
      console.log('WebRTC: Call offer received:', data);
      this.handleOffer(data);
    });

    socketService.on('call:answer', (data: any) => {
      console.log('WebRTC: Call answer received:', data);
      this.handleAnswer(data);
    });
  }

  // Method to re-setup listeners when socket becomes available
  public setupListeners() {
    console.log('WebRTC: Re-setting up socket listeners');
    this.setupSocketListeners();
  }

  async startCall(chatId: string, isVideo: boolean = true): Promise<void> {
    try {
      this.currentChatId = chatId;
      
      // Get user media based on call type
      const mediaConstraints = {
        audio: true,
        video: isVideo ? true : false, // Only request video if it's a video call
      };

      console.log('WebRTC: Requesting media with constraints:', mediaConstraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

      this.state.localStream = stream;
      this.state.isInCall = true;
      this.state.isVideoOff = !isVideo;

      // Create peer connection with better configuration
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' },
        ],
        iceCandidatePoolSize: 10,
      });

      this.state.peerConnection = peerConnection;

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketService.emit('call:ice-candidate', {
            chatId,
            candidate: event.candidate,
          });
        }
      };

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        this.state.remoteStream = event.streams[0];
        this.emit('call:remote-stream', event.streams[0]);
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        if (peerConnection.connectionState === 'failed') {
          this.emit('call:error', new Error('Connection failed'));
        }
      };

      // Create and send offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socketService.emit('call:start', {
        chatId,
        offer,
        isVideo,
      });

      this.emit('call:started', { chatId, isVideo });
    } catch (error) {
      console.error('Failed to start call:', error);
      this.emit('call:error', error);
      throw error;
    }
  }

  // Method to process pending ICE candidates
  private async processPendingIceCandidates(): Promise<void> {
    if (!this.state.peerConnection || !this.state.pendingIceCandidates || this.state.pendingIceCandidates.length === 0) {
      return;
    }

    console.log('WebRTC: Processing pending ICE candidates:', this.state.pendingIceCandidates.length);
    
    for (const candidate of this.state.pendingIceCandidates) {
      try {
        await this.state.peerConnection.addIceCandidate(candidate);
        console.log('WebRTC: Added pending ICE candidate');
      } catch (error) {
        console.error('WebRTC: Failed to add pending ICE candidate:', error);
      }
    }
    
    this.state.pendingIceCandidates = [];
  }

  async acceptCall(chatId: string, offer?: RTCSessionDescriptionInit, isVideo: boolean = true): Promise<void> {
    try {
      console.log('Accepting call for chat:', chatId, 'Offer:', offer, 'IsVideo:', isVideo);
      
      this.currentChatId = chatId;
      this.state.isInCall = true;

      // Get user media based on call type
      const mediaConstraints = {
        audio: true,
        video: isVideo ? true : false, // Only request video if it's a video call
      };

      console.log('WebRTC: Accepting call with media constraints:', mediaConstraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

      this.state.localStream = stream;

      // Create peer connection
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' },
        ],
      });

      this.state.peerConnection = peerConnection;

      // Add local stream tracks
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        console.log('Remote stream received');
        this.state.remoteStream = event.streams[0];
        this.emit('call:remote-stream', event.streams[0]);
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketService.emit('call:ice-candidate', {
            chatId,
            candidate: event.candidate,
          });
        }
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
          this.emit('call:connected');
        }
      };

      // If we have an offer (incoming call), set it as remote description first
      if (offer) {
        console.log('Setting remote description from offer:', offer);
        
        // Validate offer format
        if (!offer.type || !offer.sdp) {
          throw new Error('Invalid offer format: missing type or sdp');
        }
        
        if (offer.type !== 'offer') {
          throw new Error(`Invalid offer type: expected 'offer', got '${offer.type}'`);
        }
        
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        
        // Check the connection state after setting remote description
        console.log('Connection state after setting remote description:', peerConnection.connectionState);
        console.log('Signaling state after setting remote description:', peerConnection.signalingState);
        
        // Process any pending ICE candidates
        await this.processPendingIceCandidates();
        
        // Wait a bit for the remote description to be properly set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check state again before creating answer
        console.log('Connection state before creating answer:', peerConnection.connectionState);
        console.log('Signaling state before creating answer:', peerConnection.signalingState);
        
        console.log('Creating answer after setting remote description');
        // Create and set local description
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Send answer to the caller
        socketService.emit('call:answer', {
          chatId,
          answer,
        });

        this.emit('call:accepted', { chatId });
      } else {
        console.error('No offer provided for incoming call');
        throw new Error('No offer provided for incoming call');
      }
    } catch (error) {
      console.error('Failed to accept call:', error);
      this.emit('call:error', error);
      throw error;
    }
  }

  rejectCall(chatId: string): void {
    socketService.emit('call:reject', { chatId });
    this.emit('call:rejected', { chatId });
  }

  endCall(): void {
    if (this.state.peerConnection) {
      this.state.peerConnection.close();
    }

    if (this.state.localStream) {
      this.state.localStream.getTracks().forEach(track => track.stop());
    }

    if (this.state.screenStream) {
      this.state.screenStream.getTracks().forEach(track => track.stop());
    }

    socketService.emit('call:end', { chatId: this.currentChatId });

    this.state = {
      isInCall: false,
      isVideoOff: false,
      isMuted: false,
      isScreenSharing: false,
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      screenStream: null,
      pendingIceCandidates: [],
    };

    this.currentChatId = null;
    this.emit('call:ended');
  }

  toggleMute(): void {
    if (!this.state.localStream) return;

    const audioTrack = this.state.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      this.state.isMuted = !audioTrack.enabled;
      this.emit('call:mute-toggled', this.state.isMuted);
    }
  }

  toggleVideo(): void {
    if (!this.state.localStream) return;

    const videoTrack = this.state.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      this.state.isVideoOff = !videoTrack.enabled;
      this.emit('call:video-toggled', this.state.isVideoOff);
    }
  }

  async toggleScreenShare(): Promise<void> {
    try {
      if (this.state.isScreenSharing) {
        // Stop screen sharing
        if (this.state.screenStream) {
          this.state.screenStream.getTracks().forEach(track => track.stop());
          this.state.screenStream = null;
        }

        // Restore video track
        if (this.state.localStream) {
          const videoTrack = this.state.localStream.getVideoTracks()[0];
          if (videoTrack && this.state.peerConnection) {
            const sender = this.state.peerConnection.getSenders().find(s => s.track?.kind === 'video');
            if (sender) {
              sender.replaceTrack(videoTrack);
            }
          }
        }

        this.state.isScreenSharing = false;
        this.emit('call:screen-share-toggled', false);
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        this.state.screenStream = screenStream;

        // Replace video track with screen track
        if (this.state.peerConnection) {
          const videoTrack = screenStream.getVideoTracks()[0];
          const sender = this.state.peerConnection.getSenders().find(s => s.track?.kind === 'video');
          if (sender && videoTrack) {
            sender.replaceTrack(videoTrack);
          }
        }

        this.state.isScreenSharing = true;
        this.emit('call:screen-share-toggled', true);

        // Handle screen share stop
        screenStream.getVideoTracks()[0].onended = () => {
          this.toggleScreenShare();
        };
      }
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
      this.emit('call:error', error);
    }
  }

  private handleCallAccepted(data: any): void {
    this.emit('call:accepted', data);
  }

  private handleCallEnded(data: any): void {
    this.endCall();
    this.emit('call:ended', data);
  }

  private async handleIceCandidate(data: any): Promise<void> {
    try {
      const { candidate, chatId } = data;
      
      if (!this.state.peerConnection) {
        console.log('WebRTC: No peer connection available for ICE candidate');
        return;
      }

      // Check if remote description is set before adding ICE candidate
      if (!this.state.peerConnection.remoteDescription) {
        console.log('WebRTC: Remote description not set, storing ICE candidate for later');
        // Store the candidate to add later
        if (!this.state.pendingIceCandidates) {
          this.state.pendingIceCandidates = [];
        }
        this.state.pendingIceCandidates.push(candidate);
        return;
      }

      console.log('WebRTC: Adding ICE candidate:', candidate);
      await this.state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('WebRTC: Failed to add ICE candidate:', error);
    }
  }

  private async handleOffer(data: any): Promise<void> {
    if (this.state.peerConnection) {
      try {
        console.log('WebRTC: Handling offer:', data.offer);
        await this.state.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        
        // Process any pending ICE candidates
        await this.processPendingIceCandidates();
        
        const answer = await this.state.peerConnection.createAnswer();
        await this.state.peerConnection.setLocalDescription(answer);

        socketService.emit('call:answer', {
          chatId: data.chatId,
          answer,
        });
        
        console.log('WebRTC: Answer created and sent');
      } catch (error) {
        console.error('Failed to handle offer:', error);
      }
    }
  }

  private async handleAnswer(data: any): Promise<void> {
    if (this.state.peerConnection) {
      try {
        console.log('WebRTC: Handling answer:', data.answer);
        await this.state.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        
        // Process any pending ICE candidates
        await this.processPendingIceCandidates();
        
        console.log('WebRTC: Remote description set successfully from answer');
      } catch (error) {
        console.error('Failed to handle answer:', error);
      }
    }
  }

  // Getters
  isInCall(): boolean {
    return this.state.isInCall;
  }

  isMuted(): boolean {
    return this.state.isMuted;
  }

  isVideoOff(): boolean {
    return this.state.isVideoOff;
  }

  isScreenSharing(): boolean {
    return this.state.isScreenSharing;
  }

  getLocalStream(): MediaStream | null {
    return this.state.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.state.remoteStream;
  }

  getConnectionState(): string | null {
    return this.state.peerConnection?.connectionState || null;
  }
}

const webrtcService = new WebRTCService();
export default webrtcService; 