const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // User management
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    bio?: string;
    avatar?: string;
  }) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async searchUsers(query: string) {
    return this.request(`/users/search/${encodeURIComponent(query)}`);
  }

  async getAllUsers() {
    return this.request('/users');
  }

  async getUser(userId: string) {
    return this.request(`/users/${userId}`);
  }

  // Chat management
  async getChats() {
    return this.request('/chats');
  }

  async createChat(chatData: {
    name: string;
    type: 'direct' | 'group';
    participants: string[];
    description?: string;
  }) {
    return this.request('/chats', {
      method: 'POST',
      body: JSON.stringify(chatData),
    });
  }

  async getChat(chatId: string) {
    return this.request(`/chats/${chatId}`);
  }

  async updateChat(chatId: string, updateData: {
    name?: string;
    description?: string;
  }) {
    return this.request(`/chats/${chatId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteChat(chatId: string) {
    return this.request(`/chats/${chatId}`, {
      method: 'DELETE',
    });
  }

  async addParticipant(chatId: string, userId: string) {
    return this.request(`/chats/${chatId}/participants`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async removeParticipant(chatId: string, userId: string) {
    return this.request(`/chats/${chatId}/participants/${userId}`, {
      method: 'DELETE',
    });
  }

  // Messaging
  async getMessages(chatId: string, page = 1, limit = 50) {
    return this.request(`/messages/${chatId}?page=${page}&limit=${limit}`);
  }

  async sendMessage(messageData: {
    chatId: string;
    content: string;
    type?: 'text' | 'image' | 'video' | 'audio' | 'file' | 'gif';
    mediaUrl?: string;
    mediaType?: string;
    mediaSize?: number;
    fileName?: string;
    replyTo?: string;
  }) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async editMessage(messageId: string, content: string) {
    return this.request(`/messages/${messageId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteMessage(messageId: string) {
    return this.request(`/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  async reactToMessage(messageId: string, reaction: string) {
    return this.request(`/messages/${messageId}/reactions`, {
      method: 'POST',
      body: JSON.stringify({ emoji: reaction }),
    });
  }

  // File upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Image upload failed');
    }

    return response.json();
  }

  async uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('video', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/upload/video`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Video upload failed');
    }

    return response.json();
  }

  async uploadAudio(file: File) {
    const formData = new FormData();
    formData.append('audio', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/upload/audio`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Audio upload failed');
    }

    return response.json();
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/upload/file`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'File upload failed');
    }

    return response.json();
  }

  // Helper method to determine upload type based on file
  async uploadFileByType(file: File) {
    const fileType = file.type;
    
    if (fileType.startsWith('image/')) {
      return this.uploadImage(file);
    } else if (fileType.startsWith('video/')) {
      return this.uploadVideo(file);
    } else if (fileType.startsWith('audio/')) {
      return this.uploadAudio(file);
    } else {
      return this.uploadFile(file);
    }
  }

  async searchGifs(query: string, limit = 20, offset = 0) {
    return this.request(`/upload/giphy?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`);
  }
}

export const api = new ApiService();
export default api; 