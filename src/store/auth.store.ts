import { create } from 'zustand';
import { authService } from '../services/auth.service';
import type { RegisterData, User } from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        set({ user: response.user, token: response.token, isAuthenticated: true });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    try {
      authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        set({ user: response.user, token: response.token, isAuthenticated: true });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
}));