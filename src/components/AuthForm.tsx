/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative group"
      >
        {/* Enhanced Animated Border Gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

        {/* Main Card with Glass Effect */}
        <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/40 dark:border-gray-700/40 p-8 overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-transparent to-purple-50/60 dark:from-indigo-950/40 dark:to-purple-950/40"></div>

          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:bg-purple-600"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 dark:bg-yellow-600"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 dark:bg-pink-600"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:shadow-3xl transition-all duration-300">
                  <motion.svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </motion.svg>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  {isLogin ? "Welcome Back" : "Join ChatApp"}
                </span>
              </motion.h1>

              <motion.p
                className="text-gray-600 dark:text-gray-400 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isLogin
                  ? "Sign in to continue your conversations"
                  : "Create your account to get started"}
              </motion.p>
            </motion.div>

            {/* Enhanced Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200/50 dark:border-red-800/50 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <motion.svg
                      className="w-5 h-5 text-red-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </motion.svg>
                    <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4 animate-slide-in-bottom">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required={!isLogin}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                          placeholder="John"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required={!isLogin}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                          placeholder="Doe"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                  <div className="group animate-slide-in-bottom">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                        placeholder="johndoe"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </>
              )}

              <div className="group animate-slide-in-bottom">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="john@example.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="group animate-slide-in-bottom">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {!isLogin && (
                <div className="group animate-slide-in-bottom">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden animate-slide-in-bottom"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Button Content */}
                <div className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3"></div>
                      <span className="animate-pulse">
                        {isLogin
                          ? "Signing you in..."
                          : "Creating your account..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">
                        {isLogin ? "Sign In" : "Create Account"}
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Enhanced Toggle Mode */}
            <div className="mt-8 text-center animate-slide-in-bottom">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {isLogin ? "New to ChatApp?" : "Already have an account?"}
              </p>
              <button
                onClick={toggleMode}
                className="group relative inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-all duration-200 hover:scale-105"
              >
                <span className="relative">
                  {isLogin ? "Create your account" : "Sign in instead"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
