import { useMutation, UseMutationResult } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

// Types
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

// Storage helpers
export const authStorage = {
  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async setUser(user: any): Promise<void> {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<any | null> {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  async clear(): Promise<void> {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },
};

// API Methods
export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/logout');
  },
};

// React Query Hooks
export const useLogin = (): UseMutationResult<AuthResponse, Error, LoginRequest, unknown> => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      await authStorage.setToken(data.token);
      await authStorage.setUser(data.user);
    },
  });
};

export const useRegister = (): UseMutationResult<AuthResponse, Error, RegisterRequest, unknown> => {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (data) => {
      await authStorage.setToken(data.token);
      await authStorage.setUser(data.user);
    },
  });
};

export const useLogout = (): UseMutationResult<void, Error, void, unknown> => {
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      await authStorage.clear();
    },
  });
};
