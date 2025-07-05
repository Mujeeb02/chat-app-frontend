# ChatApp - Modern Real-time Chat Application

A feature-rich, mobile-responsive chat application built with Next.js, TypeScript, and modern web technologies.

## ✨ Features

### 🎨 **Theme System**
- **Multiple Color Themes**: Choose from 6 beautiful themes (Default, Dark, Ocean, Forest, Sunset, Purple)
- **Dark Mode Toggle**: Seamless light/dark mode switching
- **Real-time Theme Application**: Instant theme changes with smooth transitions
- **Persistent Preferences**: Theme choices saved across sessions

### 📱 **Mobile Responsive Design**
- **Mobile-First Approach**: Optimized for all screen sizes
- **Touch-Friendly Interface**: Large touch targets and intuitive gestures
- **Responsive Layout**: Adaptive sidebar and chat interface
- **Mobile Navigation**: Swipe gestures and mobile-optimized controls

### 💬 **Chat Features**
- **Real-time Messaging**: Instant message delivery with Socket.IO
- **File Sharing**: Support for images, videos, audio, and documents
- **Message Reactions**: React to messages with emojis
- **Typing Indicators**: See when others are typing
- **Message Status**: Read receipts and delivery confirmations
- **Voice & Video Calls**: WebRTC-powered calling system

### 🔐 **Authentication & Security**
- **JWT Authentication**: Secure token-based authentication
- **OAuth Integration**: Google and GitHub login support
- **User Profiles**: Customizable user profiles with avatars
- **Session Management**: Persistent login sessions

### 🎯 **User Experience**
- **Modern UI/UX**: Clean, intuitive interface design
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for fast loading and smooth interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development servers**
   ```bash
   # Start frontend
   npm run dev
   
   # Start backend (in new terminal)
   npm run dev:server
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📱 Mobile Features

### Responsive Design
- **Adaptive Layout**: Sidebar collapses on mobile with slide-out menu
- **Touch Optimized**: Large buttons and touch-friendly interactions
- **Mobile Navigation**: Back button and mobile-specific headers
- **Gesture Support**: Swipe to navigate between chats

### Mobile-Specific Components
- **MobileHeader**: Context-aware header with navigation controls
- **MobileLayout**: Responsive layout management
- **ThemeSelector**: Mobile-optimized theme selection modal

## 🎨 Theme System

### Available Themes
1. **Default**: Clean blue and purple gradient
2. **Dark**: Elegant dark theme with blue accents
3. **Ocean**: Calming blue and cyan tones
4. **Forest**: Natural green and emerald palette
5. **Sunset**: Warm red and orange gradients
6. **Purple**: Rich purple and violet theme

### Theme Customization
Themes are applied using CSS custom properties:
```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #0f172a;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
  --color-accent: #f59e0b;
}
```

### Theme Components
- **ThemeSelector**: Modal for theme selection
- **ThemeProvider**: Applies themes globally
- **Theme Store**: Manages theme state with Zustand

## 🏗️ Architecture

### Frontend Structure
```
src/
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── MobileLayout.tsx   # Mobile responsive layout
│   ├── ThemeSelector.tsx  # Theme selection modal
│   ├── MobileHeader.tsx   # Mobile navigation header
│   └── ...               # Other components
├── store/                 # Zustand state management
├── types/                 # TypeScript definitions
├── lib/                   # Utility libraries
└── hooks/                 # Custom React hooks
```

### Key Components

#### MobileLayout.tsx
Handles responsive layout with mobile sidebar toggle:
```typescript
const [sidebarOpen, setSidebarOpen] = useState(false);
// Mobile sidebar with overlay and smooth transitions
```

#### ThemeSelector.tsx
Theme selection with preview and customization:
```typescript
const themes: Theme[] = [
  { name: 'default', primary: '#3b82f6', ... },
  { name: 'dark', primary: '#60a5fa', ... },
  // ... more themes
];
```

#### MobileHeader.tsx
Context-aware mobile navigation:
```typescript
interface MobileHeaderProps {
  onMenuToggle: () => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}
```

## 🎯 Usage Examples

### Theme Selection
```typescript
import useUIStore from '@/store/uiStore';

const { setTheme, toggleDarkMode } = useUIStore();

// Change theme
setTheme(oceanTheme);

// Toggle dark mode
toggleDarkMode();
```

### Mobile Navigation
```typescript
import MobileLayout from '@/components/MobileLayout';

// In your page component
return <MobileLayout />;
```

### Responsive Design Classes
```css
/* Mobile-first responsive classes */
.container {
  @apply px-2 sm:px-4 lg:px-6;
}

.message-bubble {
  @apply max-w-[280px] sm:max-w-xs lg:max-w-md;
}
```

## 🔧 Development

### Available Scripts
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check
```

### Mobile Testing
- **Chrome DevTools**: Device simulation
- **React Developer Tools**: Component inspection
- **Lighthouse**: Performance and accessibility testing

### Theme Development
To add a new theme:
1. Add theme object to `ThemeSelector.tsx`
2. Update theme colors in CSS custom properties
3. Test across light/dark modes

## 📊 Performance

### Mobile Optimizations
- **Code Splitting**: Lazy-loaded components
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Tree-shaking and minification
- **Caching**: Service worker for offline support

### Responsive Images
```typescript
import Image from 'next/image';

<Image
  src={avatar}
  alt="User avatar"
  width={40}
  height={40}
  className="rounded-full"
/>
```

## 🎨 Design System

### Color Palette
- **Primary**: Theme-based primary colors
- **Secondary**: Supporting color palette
- **Background**: Light/dark mode backgrounds
- **Surface**: Card and component backgrounds
- **Text**: Primary and secondary text colors
- **Border**: Subtle border colors
- **Accent**: Highlight and accent colors

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Fluid typography scaling

### Spacing
- **Mobile**: 4px, 8px, 12px, 16px
- **Desktop**: 16px, 24px, 32px, 48px
- **Responsive**: Tailwind responsive prefixes

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_SOCKET_URL=https://your-api.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Development Guidelines
- **Mobile-First**: Design for mobile first
- **Accessibility**: Follow WCAG guidelines
- **Performance**: Optimize for Core Web Vitals
- **Testing**: Test on multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS
- **Zustand**: State management
- **Socket.IO**: Real-time communication
- **TypeScript**: Type safety

---

**Built with ❤️ for modern chat experiences**
