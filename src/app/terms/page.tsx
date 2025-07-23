'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Last updated: July 23, 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ChatApp, Inc. ("we," "us" or "our"), concerning your access to and use of the ChatApp platform.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You agree that by accessing the Application, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Application and you must discontinue use immediately.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Supplemental terms and conditions or documents that may be posted on the Application from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. User Accounts</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2.1 Account Creation</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            In order to use certain features of the Application, you must register for an account with us and provide certain information about yourself. You represent and warrant that: (1) all required registration information you submit is truthful and accurate; (2) you will maintain the accuracy of such information; and (3) you are at least 13 years of age.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2.2 Account Responsibilities</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2.3 Account Termination</h3>
          <p className="text-gray-600 dark:text-gray-300">
            We reserve the right to terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Application will immediately cease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Acceptable Use</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You agree not to use the Application:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Application, or which, as determined by us, may harm the Company or users of the Application or expose them to liability.</li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-300">
            Additionally, you agree not to:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Use the Application in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Application.</li>
            <li>Use any robot, spider, or other automatic device, process, or means to access the Application for any purpose, including monitoring or copying any of the material on the Application.</li>
            <li>Use any manual process to monitor or copy any of the material on the Application or for any other unauthorized purpose without our prior written consent.</li>
            <li>Use any device, software, or routine that interferes with the proper working of the Application.</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Application, the server on which the Application is stored, or any server, computer, or database connected to the Application.</li>
            <li>Attack the Application via a denial-of-service attack or a distributed denial-of-service attack.</li>
            <li>Otherwise attempt to interfere with the proper working of the Application.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Application and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            These Terms of Service permit you to use the Application for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Application, except as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
            <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
            <li>You may print or download one copy of a reasonable number of pages of the Application for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
            <li>If we provide desktop, mobile, or other applications for download, you may download a single copy to your computer or mobile device solely for your own personal, non-commercial use, provided you agree to be bound by our end user license agreement for such applications.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>ChatApp, Inc.</strong><br />
              123 Innovation Drive<br />
              San Francisco, CA 94107<br />
              <br />
              <strong>Email:</strong> legal@chatapp.com<br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}