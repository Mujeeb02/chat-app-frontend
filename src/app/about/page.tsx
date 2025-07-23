'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Engineering at a major tech company. Passionate about building products that connect people.',
      image: '/images/team/alex.jpg',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack engineer with 10+ years experience. Expert in scalable systems and real-time communication.',
      image: '/images/team/sarah.jpg',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Design',
      bio: 'Award-winning designer focused on creating intuitive, accessible user experiences.',
      image: '/images/team/michael.jpg',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Product',
      bio: 'Product strategist with a background in user research and data-driven decision making.',
      image: '/images/team/emily.jpg',
      linkedin: '#',
      twitter: '#'
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize digital communication'
    },
    {
      year: '2021',
      title: 'First Product Launch',
      description: 'Released our MVP to 1,000 beta users'
    },
    {
      year: '2022',
      title: 'Series A Funding',
      description: 'Raised $10M to accelerate growth and development'
    },
    {
      year: '2023',
      title: '1M+ Users',
      description: 'Reached over 1 million active users worldwide'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Opened offices in London, Singapore, and São Paulo'
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About ChatApp
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make communication more meaningful, accessible, and secure for everyone.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                In an increasingly connected world, we believe that communication should bring people closer together, 
                not drive them apart. Our mission is to create technology that enhances human connection while 
                respecting privacy and promoting meaningful interactions.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We're building more than just a chat app – we're creating a platform that understands the nuances 
                of human communication and adapts to help people express themselves authentically.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">Your conversations are yours. We use end-to-end encryption and never sell your data.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Human-Centered</h3>
              <p className="text-gray-600 dark:text-gray-300">Technology should serve people, not the other way around. We design with empathy and inclusivity.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">We're constantly exploring new ways to improve communication and user experience.</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our vision of making communication better for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-xl hover:bg-white/90 transition-colors"
              >
                View Open Positions
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
            <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}