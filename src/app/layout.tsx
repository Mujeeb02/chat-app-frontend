import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { SocketProvider } from "@/components/SocketProvider";
import ProfileModal from "@/components/ProfileModal";
import NotificationPanel from "@/components/NotificationPanel";
import CreateChatModal from "@/components/CreateChatModal";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App - Real-time Messaging",
  description: "A modern real-time chat application with advanced features including video calls, file sharing, and more.",
  keywords: ["chat", "messaging", "real-time", "video calls", "file sharing"],
  authors: [{ name: "Chat App Team" }],
  creator: "Chat App Team",
  publisher: "Chat App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"),
  openGraph: {
    title: "Chat App - Real-time Messaging",
    description: "A modern real-time chat application with advanced features",
    url: "/",
    siteName: "Chat App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chat App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat App - Real-time Messaging",
    description: "A modern real-time chat application with advanced features",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          <SocketProvider>
            <ThemeProvider>
              {/* Advanced Background with Animated Gradients */}
              <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-purple-100/20 dark:from-indigo-900/20 dark:to-purple-900/20"></div>
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:bg-purple-600"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 dark:bg-yellow-600"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 dark:bg-pink-600"></div>
              </div>
              
              {/* Main Content */}
              <div className="relative min-h-screen backdrop-blur-[0.5px]">
                {children}
              </div>
              
              {/* Enhanced Modals and Components */}
              <ProfileModal />
              <NotificationPanel />
              <CreateChatModal />
              
              {/* Advanced Toast Notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  className: 'backdrop-blur-xl',
                  style: {
                    background: 'rgba(17, 24, 39, 0.95)',
                    color: '#fff',
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(16px)',
                  },
                  success: {
                    duration: 3000,
                    style: {
                      background: 'rgba(5, 150, 105, 0.95)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    },
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    style: {
                      background: 'rgba(220, 38, 38, 0.95)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                    },
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                  loading: {
                    style: {
                      background: 'rgba(99, 102, 241, 0.95)',
                      border: '1px solid rgba(129, 140, 248, 0.3)',
                    },
                  },
                }}
              />
            </ThemeProvider>
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
