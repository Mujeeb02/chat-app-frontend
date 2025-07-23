/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0.5]);
  const scale1 = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll animation for elements
    const animateOnScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animate');
      
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  const features = [
    {
      icon: "💬",
      title: "Real-time Messaging",
      description: "Instant messaging with typing indicators and read receipts. Stay connected with friends and colleagues in real-time.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📹",
      title: "Video & Voice Calls",
      description: "Crystal clear HD video and voice calls with screen sharing capabilities for seamless collaboration.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "📁",
      title: "File Sharing",
      description: "Share documents, images, and files of any size with end-to-end encryption for complete privacy.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🎨",
      title: "Rich Media",
      description: "Express yourself with emojis, GIFs, stickers, and voice messages to make conversations more engaging.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "End-to-end encryption for all your conversations ensures your data stays private and secure.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description: "Beautiful dark and light themes for comfortable chatting day and night, easy on your eyes.",
      gradient: "from-gray-500 to-slate-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "SJ",
      content:
        "This chat app has revolutionized how our team communicates. The interface is intuitive and the features are exactly what we needed for our remote team collaboration.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Developer",
      avatar: "MC",
      content:
        "The video call quality is exceptional, and the file sharing makes collaboration so much easier. Code sharing and screen sharing features are perfect for our dev team!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Designer",
      avatar: "ED",
      content:
        "Beautiful design and smooth animations. The dark mode is perfect for late-night work sessions. The ability to share design files directly in the chat is a game-changer.",
      rating: 5,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up in seconds with your email or social accounts and set up your profile with a few clicks.",
      icon: "👤",
      gradient: "from-indigo-500 to-purple-600",
      rotation: "rotate-3",
    },
    {
      step: 2,
      title: "Connect with Friends",
      description: "Find friends, create groups, or start direct conversations with anyone in your network.",
      icon: "🔗",
      gradient: "from-purple-500 to-pink-600",
      rotation: "-rotate-3",
    },
    {
      step: 3,
      title: "Start Chatting",
      description: "Send messages, make calls, share files, and enjoy all the features of our platform.",
      icon: "💭",
      gradient: "from-blue-500 to-cyan-500",
      rotation: "rotate-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          style={{ y: y2, opacity: opacity1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 px-6 py-6 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ChatApp
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Reviews
            </a>
            <Link 
              href="/auth"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#testimonials" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Reviews
              </a>
              <Link href="/auth" className="block py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  Connect
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Without Limits
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience seamless communication with our modern chat platform.
                Real-time messaging, crystal-clear video calls, secure file sharing, and more - 
                all in one beautiful interface.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center">
                      <span className="mr-2">Get Started</span>
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </div>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Demo
                  </div>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex items-center space-x-8 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Support
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Phone Frame */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-80 h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl"
                >
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-6 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-6 text-xs">
                      <span className="font-semibold">9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-6 h-3 border border-gray-400 rounded-sm">
                          <div className="w-4 h-full bg-green-500 rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Interface Preview */}
                    <div className="p-4 space-y-4">
                      {/* Header */}
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            JD
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            John Doe
                          </div>
                          <div className="text-xs text-green-500">Online</div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 }}
                          className="flex"
                        >
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                            <p className="text-sm text-gray-900 dark:text-white">
                              Hey! How's the new chat app?
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2 }}
                          className="flex justify-end"
                        >
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                            <p className="text-sm text-white">
                              It's amazing! The UI is so smooth 🚀
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.5 }}
                          className="flex"
                        >
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                            <p className="text-sm text-gray-900 dark:text-white">
                              The video calls are crystal clear!
                            </p>
                          </div>
                        </motion.div>

                        {/* Typing Indicator */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">
                              JD
                            </span>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: 0,
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: 0.2,
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: 0.4,
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Input Area */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                          <button className="text-gray-500 dark:text-gray-400 mr-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <input 
                            type="text" 
                            placeholder="Type a message..." 
                            className="bg-transparent border-none focus:outline-none flex-1 text-sm text-gray-700 dark:text-gray-300"
                          />
                          <button className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-2 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">⚡</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">🎯</span>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute top-1/4 -right-12 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-xl">💬</span>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    x: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/4 -left-12 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-xl">🔒</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-6 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm scroll-animate"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need for seamless communication, all in one
              beautiful platform designed for modern teams and individuals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden h-full">
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
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 scroll-animate">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                How ChatApp Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Simple, intuitive, and powerful - start chatting in minutes with our easy-to-use platform
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="relative mb-8 mx-auto">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto transform ${step.rotation} hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-1/2 w-1/2 border-t-2 border-dashed border-indigo-300 dark:border-indigo-700"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* App Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Beautiful, Intuitive Interface
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    Our clean and modern design makes chatting a pleasure. With dark mode support, 
                    customizable themes, and a focus on usability, ChatApp provides the best messaging 
                    experience available.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Responsive design works on all devices",
                      "Intuitive navigation and controls",
                      "Accessibility features built-in",
                      "Customizable interface options"
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                  >
                    <div className="relative w-full h-[400px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-2 shadow-2xl">
                      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
                        {/* App Screenshot Content */}
                        <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">C</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">ChatApp</div>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-xs">JD</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                Hey there! Are we still meeting tomorrow?
                              </p>
                            </div>
                            <div className="bg-indigo-500 rounded-lg p-3 ml-auto max-w-[80%]">
                              <p className="text-sm text-white">
                                Yes! Let's meet at the coffee shop at 10am.
                              </p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-xs">JD</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                Perfect! I'll bring the project files with me.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity }
                    }}
                    className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg z-20"
                  >
                    <span className="text-xl">📱</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm scroll-animate">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                What Users Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied users who love our platform and experience the difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 scroll-animate">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already enjoying seamless communication. 
              Start your journey today with our powerful chat platform!
            </p>

            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              >
                Start Chatting Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-bold">ChatApp</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The modern way to communicate. Fast, secure, and beautiful.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Add custom styles for scroll animations */}
      <style jsx global>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes float-slow {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;