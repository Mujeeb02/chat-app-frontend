'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MobileLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const features = [
    {
      icon: "💬",
      title: "Real-time Messaging",
      description: "Instant messaging with typing indicators and read receipts",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📹",
      title: "Video & Voice Calls",
      description: "High-quality video and voice calls with screen sharing",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "📁",
      title: "File Sharing",
      description: "Share documents, images, and files seamlessly",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🎨",
      title: "Rich Media",
      description: "Send emojis, GIFs, and voice messages",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "End-to-end encryption for all your conversations",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description: "Beautiful dark and light themes for comfortable chatting",
      gradient: "from-gray-500 to-slate-500",
    }
  ];

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ChatApp
            </span>
          </div>
          
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </a>
              <a href="#testimonials" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Reviews
              </a>
              <Link href="/auth" className="block py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 px-4 pb-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Connect
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Instantly
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
          >
            Experience seamless communication with our modern chat platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <Link href="/auth">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">Get Started</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.button>
            </Link>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
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
        </div>
        
        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-[480px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2.5rem] p-2 shadow-2xl"
            >
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.2rem] overflow-hidden">
                {/* Status Bar */}
                <div className="h-6 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-6 text-xs">
                  <span className="font-semibold">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-1.5 bg-green-500 rounded-sm"></div>
                    <div className="w-4 h-2 border border-gray-400 rounded-sm">
                      <div className="w-2 h-full bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Interface Preview */}
                <div className="p-3 space-y-3">
                  {/* Header */}
                  <div className="flex items-center space-x-2 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">John Doe</div>
                      <div className="text-xs text-green-500">Online</div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                      className="flex"
                    >
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-3 py-2 max-w-[70%]">
                        <p className="text-xs text-gray-900 dark:text-white">Hey! How's the new chat app?</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 }}
                      className="flex justify-end"
                    >
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl rounded-br-md px-3 py-2 max-w-[70%]">
                        <p className="text-xs text-white">It's amazing! The UI is so smooth 🚀</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 }}
                      className="flex"
                    >
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-3 py-2 max-w-[70%]">
                        <p className="text-xs text-gray-900 dark:text-white">The video calls are crystal clear!</p>
                      </div>
                    </motion.div>
                    
                    {/* Typing Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-[10px]">JD</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-lg">⚡</span>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-lg">🎯</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-2"
        >
          <div className="text-center p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="text-xl font-bold text-gray-900 dark:text-white">10K+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Users</div>
          </div>
          <div className="text-center p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="text-xl font-bold text-gray-900 dark:text-white">99.9%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div className="text-center p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="text-xl font-bold text-gray-900 dark:text-white">24/7</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need for seamless communication
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10 flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Simple, intuitive, and powerful
          </p>
        </div>
        
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md transform rotate-3">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create Your Account</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 ml-16">
              Sign up in seconds with your email or social accounts and set up your profile
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md transform -rotate-3">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Connect with Friends</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 ml-16">
              Find friends, create groups, or start direct conversations with anyone
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md transform rotate-2">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Start Chatting</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 ml-16">
              Send messages, make calls, share files, and enjoy all the features
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              What Users Say
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of satisfied users
          </p>
        </div>
        
        <div className="space-y-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Product Manager",
              avatar: "SJ",
              content: "This chat app has revolutionized how our team communicates. The interface is intuitive and the features are exactly what we needed.",
              rating: 5
            },
            {
              name: "Mike Chen",
              role: "Developer",
              avatar: "MC",
              content: "The video call quality is exceptional, and the file sharing makes collaboration so much easier. Highly recommended!",
              rating: 5
            },
            {
              name: "Emily Davis",
              role: "Designer",
              avatar: "ED",
              content: "Beautiful design and smooth animations. The dark mode is perfect for late-night conversations.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/90 mb-8">
              Join thousands of users who are already enjoying seamless communication.
            </p>
            
            <Link href="/auth">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-xl text-lg"
              >
                Start Chatting Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold">ChatApp</span>
          </div>
          <p className="text-sm text-gray-400">
            The modern way to communicate. Fast, secure, and beautiful.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-sm">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}