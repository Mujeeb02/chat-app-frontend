# Modern Chat Application

A feature-rich, real-time chat application built with Next.js, TypeScript, and Socket.IO. This application includes advanced features like file sharing, audio/video calling, emoji picker, and a beautiful modern UI.

## ✨ Features

### 🚀 Core Features
- **Real-time Messaging**: Instant message delivery with Socket.IO
- **File Sharing**: Support for images, videos, audio, and documents
- **Audio/Video Calling**: High-quality WebRTC-based calling
- **Advanced Emoji Picker**: Categorized emojis with search functionality
- **Modern UI**: Beautiful, responsive design with dark mode support
- **User Authentication**: Secure login/registration system
- **Profile Management**: User profiles with avatars and status
- **Message Reactions**: React to messages with emojis
- **Typing Indicators**: Real-time typing status
- **Message History**: Persistent message storage
- **Online Status**: User online/offline indicators

### 🎨 UI/UX Enhancements
- **Glass Morphism Effects**: Modern glass-like UI elements
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode**: Beautiful dark theme with automatic switching
- **Custom Scrollbars**: Elegant scrollbar styling
- **Loading States**: Beautiful loading animations
- **Toast Notifications**: Elegant notification system
- **Hover Effects**: Interactive hover animations

### 📁 File Upload Features
- **Multiple File Types**: Images, videos, audio, documents
- **Drag & Drop**: Intuitive file upload interface
- **Progress Indicators**: Real-time upload progress
- **File Size Limits**: Configurable file size restrictions
- **Cloud Storage**: Files stored securely in Cloudinary
- **Preview Support**: Image and video previews

### 📞 Calling Features
- **Audio Calls**: High-quality audio calling
- **Video Calls**: HD video calling with camera controls
- **Screen Sharing**: Share your screen during calls
- **Call Controls**: Mute, video toggle, screen share
- **Call Status**: Real-time call status indicators
- **Picture-in-Picture**: Remote video in small window
- **Connection Quality**: Automatic connection optimization

### 😊 Emoji System
- **Categorized Emojis**: Organized by categories
- **Search Functionality**: Find emojis quickly
- **Recent Emojis**: Quick access to frequently used
- **Custom Categories**: Smileys, People, Animals, Food, etc.
- **Keyboard Support**: Emoji keyboard shortcuts

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: State management
- **React Query**: Data fetching and caching
- **Socket.IO Client**: Real-time communication
- **WebRTC**: Peer-to-peer calling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Socket.IO**: Real-time bidirectional communication
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **Multer**: File upload handling
- **Cloudinary**: Cloud file storage

### Additional Libraries
- **React Hot Toast**: Toast notifications
- **Date-fns**: Date manipulation
- **React Hook Form**: Form handling
- **React Dropzone**: File upload interface

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB
- Cloudinary account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

   Create `.env` in the server directory:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/chat-app
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the development servers**
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # In another terminal, start frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
chat-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Next.js page
│   │   └── components/     # React components
│   │       ├── AuthForm.tsx # Authentication forms
│   │       ├── CallModal.tsx # Video call modal
│   │       ├── CallControls.tsx # Call control buttons
│   │       ├── ChatArea.tsx # Main chat interface
│   │       ├── EmojiPicker.tsx # Enhanced emoji picker
│   │       └── Sidebar.tsx # Chat sidebar
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   │   ├── api.ts          # API service
│   │   ├── socket.ts       # Socket.IO service
│   │   └── webrtc.ts       # WebRTC service
│   ├── store/              # Zustand stores
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── server/                 # Backend server
│   ├── src/
│   │   ├── auth/           # Authentication routes
│   │   ├── chat/           # Chat routes
│   │   ├── message/        # Message routes
│   │   ├── upload/         # File upload routes
│   │   ├── user/           # User routes
│   │   └── middleware/     # Express middleware
│   └── models/             # Mongoose models
└── public/                 # Static assets
```

## 🎯 Key Features Explained

### File Upload System
The application supports comprehensive file upload functionality:

- **Supported Types**: Images (JPEG, PNG, GIF, WebP), Videos (MP4, WebM), Audio (MP3, WAV), Documents (PDF, TXT)
- **Upload Limits**: Configurable file size limits (default: 10MB)
- **Progress Tracking**: Real-time upload progress indicators
- **Error Handling**: Comprehensive error messages and retry mechanisms
- **Cloud Storage**: Files stored securely in Cloudinary with automatic optimization

### Audio/Video Calling
Advanced calling features built with WebRTC:

- **Peer-to-Peer**: Direct connection between users for optimal quality
- **Multiple STUN Servers**: Enhanced connection reliability
- **Screen Sharing**: Share your screen during calls
- **Call Controls**: Mute, video toggle, screen share controls
- **Connection Monitoring**: Real-time connection status
- **Fallback Mechanisms**: Automatic reconnection on connection loss

### Enhanced Emoji Picker
Modern emoji picker with advanced features:

- **Categories**: Organized emoji categories (Smileys, People, Animals, etc.)
- **Search**: Find emojis quickly with search functionality
- **Recent**: Quick access to recently used emojis
- **Keyboard Support**: Emoji keyboard shortcuts
- **Responsive Design**: Works perfectly on mobile devices

### Modern UI Components
Beautiful, modern UI with advanced styling:

- **Glass Morphism**: Modern glass-like effects
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Dark Mode**: Beautiful dark theme with automatic switching
- **Responsive Design**: Perfect on all screen sizes
- **Custom Scrollbars**: Elegant scrollbar styling
- **Loading States**: Beautiful loading animations

## 🔧 Configuration

### File Upload Configuration
Configure file upload settings in `server/src/upload/upload.controller.ts`:

```typescript
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav', 'application/pdf', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});
```

### WebRTC Configuration
Configure WebRTC settings in `src/lib/webrtc.ts`:

```typescript
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
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Environment Variables for Production
```env
# Frontend
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.com

# Backend
PORT=3001
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secure-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Socket.IO](https://socket.io/) for real-time communication
- [Cloudinary](https://cloudinary.com/) for cloud file storage
- [WebRTC](https://webrtc.org/) for peer-to-peer communication

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Chatting! 🎉**
