'use client';

import { useState, useRef, useEffect } from 'react';
import useChatStore from '@/store/chatStore';
import socketService from '@/lib/socket';
import api from '@/lib/api';
import EmojiPicker from './EmojiPicker';

interface MessageInputProps {
  chatId: string;
  onTyping?: (isTyping: boolean) => void;
}

export default function MessageInput({ chatId, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [filePreview, setFilePreview] = useState<{
    file: File;
    preview: string;
    type: 'image' | 'video' | 'audio' | 'file';
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const { sendMessage } = useChatStore();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      // Cleanup file preview URL
      if (filePreview?.preview) {
        URL.revokeObjectURL(filePreview.preview);
      }
    };
  }, [filePreview]);

  const handleTyping = (value: string) => {
    setMessage(value);
    
    const wasTyping = isTyping;
    const newIsTyping = value.length > 0;
    
    if (newIsTyping !== wasTyping) {
      setIsTyping(newIsTyping);
      onTyping?.(newIsTyping);
      
      // Send typing indicator via socket
      if (newIsTyping) {
        socketService.startTyping(chatId);
      } else {
        socketService.stopTyping(chatId);
      }
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    if (newIsTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTyping?.(false);
        socketService.stopTyping(chatId);
      }, 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Send message via socket for real-time delivery (API call is handled by socket)
      await socketService.sendMessage(chatId, message.trim(), 'text');
      
      setMessage('');
      setIsTyping(false);
      onTyping?.(false);
      socketService.stopTyping(chatId);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size too large. Maximum size is 10MB.');
      return;
    }

    // Determine file type
    let fileType: 'image' | 'video' | 'audio' | 'file' = 'file';
    if (file.type.startsWith('image/')) {
      fileType = 'image';
    } else if (file.type.startsWith('video/')) {
      fileType = 'video';
    } else if (file.type.startsWith('audio/')) {
      fileType = 'audio';
    }

    // Create preview for images and videos
    let preview = '';
    if (fileType === 'image' || fileType === 'video') {
      preview = URL.createObjectURL(file);
    }

    // Show preview first
    setFilePreview({
      file,
      preview,
      type: fileType
    });

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendFile = async () => {
    if (!filePreview) return;

    setUploadingFile(true);

    try {
      // Upload file using API service
      const result = await api.uploadFileByType(filePreview.file);
      
      if (result.success) {
        // Send message with file info using socket only (API call is handled by socket)
        await socketService.sendMessage(chatId, '', filePreview.type, undefined, {
          mediaUrl: result.data.url,
          mediaType: filePreview.file.type,
          mediaSize: filePreview.file.size,
          fileName: filePreview.file.name,
        });
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setUploadingFile(false);
      setFilePreview(null);
    }
  };

  const handleCancelFile = () => {
    setFilePreview(null);
    if (filePreview?.preview) {
      URL.revokeObjectURL(filePreview.preview);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="message-input-container">
      {/* File Preview */}
      {filePreview && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              File Preview
            </span>
            <button
              onClick={handleCancelFile}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus-ring"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {filePreview.type === 'image' && (
              <img
                src={filePreview.preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-xl shadow-sm"
              />
            )}
            {filePreview.type === 'video' && (
              <video
                src={filePreview.preview}
                className="w-16 h-16 object-cover rounded-xl shadow-sm"
                controls
              />
            )}
            {filePreview.type === 'audio' && (
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            )}
            {filePreview.type === 'file' && (
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
            
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {filePreview.file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(filePreview.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            <button
              onClick={handleSendFile}
              disabled={uploadingFile}
              className="enhanced-button primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingFile ? (
                <div className="flex items-center gap-2">
                  <div className="loading-spinner"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
        {/* Emoji Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex-shrink-0 p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 focus-ring"
            title="Add emoji"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>

        {/* File Upload Button */}
        <button
          type="button"
          onClick={triggerFileUpload}
          disabled={uploadingFile}
          className="flex-shrink-0 p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 disabled:opacity-50 focus-ring"
          title="Attach file"
        >
          {uploadingFile ? (
            <div className="loading-spinner"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          )}
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="enhanced-input w-full pr-12 resize-none min-h-[44px] max-h-[120px] text-sm sm:text-base"
            rows={1}
          />
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || isSubmitting}
            className="absolute right-2 bottom-2 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md focus-ring"
            title="Send message"
          >
            {isSubmitting ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Typing...</span>
        </div>
      )}
    </div>
  );
} 