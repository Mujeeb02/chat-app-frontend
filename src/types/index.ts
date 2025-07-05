// User Types
export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: Date;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'password'> {
  bio?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Authentication Types
export interface AuthUser {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

// Message Types
export interface Message {
  _id: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'gif' | 'location';
  sender: User;
  chatId: string;
  replyTo?: Message;
  reactions: Reaction[];
  isEdited: boolean;
  isDeleted: boolean;
  isPinned: boolean;
  isForwarded: boolean;
  forwardedFrom?: Message;
  mediaUrl?: string;
  mediaType?: string;
  mediaSize?: number;
  mediaDuration?: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  seenBy: string[];
  deliveredTo: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reaction {
  emoji: string;
  user: string;
  createdAt: Date;
}

// Chat Types
export interface Chat {
  _id: string;
  type: 'direct' | 'group';
  name?: string;
  avatar?: string;
  participants: User[];
  admins: string[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
  isMuted: boolean;
  theme?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DirectChat extends Chat {
  type: 'direct';
  otherUser: User;
}

export interface GroupChat extends Chat {
  type: 'group';
  name: string;
  description?: string;
  inviteLink?: string;
  settings: {
    onlyAdminsCanSendMessages: boolean;
    onlyAdminsCanEditInfo: boolean;
    onlyAdminsCanAddParticipants: boolean;
  };
}

// Call Types
export interface Call {
  _id: string;
  type: 'audio' | 'video';
  initiator: User;
  participants: User[];
  status: 'incoming' | 'ongoing' | 'ended' | 'missed' | 'rejected';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  chatId?: string;
}

export interface CallSignal {
  type: 'offer' | 'answer' | 'ice-candidate' | 'hangup';
  data: any;
  from: string;
  to: string;
}

// Notification Types
export interface Notification {
  _id: string;
  type: 'message' | 'call' | 'mention' | 'reaction' | 'group_invite' | 'admin_action';
  title: string;
  body: string;
  recipient: string;
  sender?: User;
  chatId?: string;
  messageId?: string;
  isRead: boolean;
  createdAt: Date;
}

// Socket Event Types
export interface SocketEvents {
  // Connection
  'user:connect': (userId: string) => void;
  'user:disconnect': (userId: string) => void;
  
  // Messages
  'message:send': (message: Partial<Message>) => void;
  'message:received': (message: Message) => void;
  'message:delivered': (messageId: string, userId: string) => void;
  'message:seen': (messageId: string, userId: string) => void;
  'message:edit': (messageId: string, content: string) => void;
  'message:delete': (messageId: string) => void;
  'message:react': (messageId: string, reaction: Reaction) => void;
  'message:forward': (messageId: string, chatId: string) => void;
  
  // Typing
  'typing:start': (chatId: string, userId: string) => void;
  'typing:stop': (chatId: string, userId: string) => void;
  
  // Calls
  'call:incoming': (call: Call) => void;
  'call:answer': (callId: string, userId: string) => void;
  'call:reject': (callId: string, userId: string) => void;
  'call:end': (callId: string) => void;
  'call:signal': (signal: CallSignal) => void;
  
  // Presence
  'presence:update': (userId: string, status: User['status']) => void;
  
  // Notifications
  'notification:new': (notification: Notification) => void;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface ChatFormData {
  name?: string;
  participants: string[];
  type: 'direct' | 'group';
}

export interface MessageFormData {
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'gif' | 'location';
  replyTo?: string;
  mediaFile?: File;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

// Store Types
export interface AuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Record<string, Message[]>;
  unreadCounts: Record<string, number>;
  isLoading: boolean;
  setCurrentChat: (chat: Chat | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  markAsRead: (chatId: string) => void;
  loadMessages: (chatId: string, page?: number) => Promise<void>;
  loadChats: () => Promise<void>;
}

export interface CallStore {
  currentCall: Call | null;
  isIncoming: boolean;
  isRinging: boolean;
  localStream: MediaStream | null;
  remoteStreams: Record<string, MediaStream>;
  peerConnections: Record<string, RTCPeerConnection>;
  setCurrentCall: (call: Call | null) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  addRemoteStream: (userId: string, stream: MediaStream) => void;
  removeRemoteStream: (userId: string) => void;
  startCall: (chatId: string, type: 'audio' | 'video') => Promise<void>;
  answerCall: (callId: string) => Promise<void>;
  rejectCall: (callId: string) => Promise<void>;
  endCall: () => Promise<void>;
}

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  loadNotifications: () => Promise<void>;
}

// UI Types
export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
}

export interface UIState {
  theme: Theme;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  showEmojiPicker: boolean;
  showFileUpload: boolean;
  showVoiceRecorder: boolean;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  toggleEmojiPicker: () => void;
  toggleFileUpload: () => void;
  toggleVoiceRecorder: () => void;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// File Upload Types
export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

// Search Types
export interface SearchFilters {
  query: string;
  type?: 'messages' | 'users' | 'chats';
  dateFrom?: Date;
  dateTo?: Date;
  sender?: string;
  chatId?: string;
}

export interface SearchResult {
  type: 'message' | 'user' | 'chat';
  data: Message | User | Chat;
  relevance: number;
} 