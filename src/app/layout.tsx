import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { SocketProvider } from "@/components/SocketProvider";
import SocketStatus from "@/components/SocketStatus";
import SocketDebug from "@/components/SocketDebug";
import ProfileModal from "@/components/ProfileModal";
import NotificationPanel from "@/components/NotificationPanel";
import CreateChatModal from "@/components/CreateChatModal";

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
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <SocketProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {children}
            </div>
            <SocketStatus />
            <SocketDebug />
            <ProfileModal />
            <NotificationPanel />
            <CreateChatModal />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
