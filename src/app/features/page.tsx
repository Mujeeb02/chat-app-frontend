'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      icon: "💬",
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with typing indicators and read receipts. Our optimized infrastructure ensures your messages are delivered without delay, even on slow connections.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📹",
      title: "Video & Voice Calls",
      description: "Crystal clear HD video and voice calls with up to 50 participants. Screen sharing, background blur, and noise cancellation features make virtual meetings more productive and enjoyable.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "📁",
      title: "File Sharing",
      description: "Share files of any size with end-to-end encryption. Preview documents, images, and videos directly in the chat without downloading. Organize shared files in folders for easy access.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🎨",
      title: "Rich Media",
      description: "Express yourself with emojis, GIFs, stickers, and voice messages. Create custom sticker packs and reactions to personalize your conversations and make them more engaging.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "End-to-end encryption for all your conversations ensures your data stays private. Two-factor authentication, biometric login, and remote session management keep your account secure.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description: "Beautiful dark and light themes for comfortable chatting day and night. Customize colors, fonts, and layouts to create your perfect chat environment that's easy on your eyes.",
      gradient: "from-gray-500 to-slate-500",
    },
    {
      icon: "🔍",
      title: "Advanced Search",
      description: "Quickly find messages, files, and links with our powerful search engine. Filter results by date, sender, file type, and more to locate exactly what you need in seconds.",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: "🔄",
      title: "Cross-Platform Sync",
      description: "Seamlessly switch between devices with real-time synchronization. Start a conversation on your phone and continue on your computer without missing a beat.",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: "🌐",
      title: "Translation",
      description: "Break language barriers with real-time message translation. Communicate with people around the world in over 100 languages with accurate, context-aware translations.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: "📊",
      title: "Organization Tools",
      description: "Keep conversations organized with folders, tags, and pinned messages. Create separate workspaces for different projects or teams to maintain focus.",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      description: "Get help from our intelligent assistant for scheduling, reminders, and information. Automate routine tasks and get smart suggestions based on your conversation context.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Customize notifications for different contacts and groups. Our AI prioritizes important messages so you never miss what matters while reducing notification fatigue.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Header */}
      <header className="relative z-10 px-6 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ChatApp
            </span>
          </Link>
          
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover all the tools and capabilities that make ChatApp the ultimate communication platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden h-full">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to experience these features?
          </h2>
          <Link href="/auth">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Get Started Now
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}