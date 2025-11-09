import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, DEFAULT_PER_PAGE } from '../constants';
import { ApiResponse, Person } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Methods
export const apiService = {
  // Get recommendations for swiping
  getRecommendations: async (page = 1, perPage = DEFAULT_PER_PAGE): Promise<ApiResponse<Person[]>> => {
    const response = await api.get<ApiResponse<Person[]>>('/recommendations', {
      params: {
        per_page: perPage,
        page,
      },
    });
    return response.data;
  },

  // Like a person
  likePerson: async (likedId: number): Promise<ApiResponse<any>> => {
    const response = await api.post<ApiResponse<any>>('/likes', {
      liked_id: likedId,
    });
    return response.data;
  },

  // Dislike a person
  dislikePerson: async (dislikedId: number): Promise<ApiResponse<any>> => {
    const response = await api.post<ApiResponse<any>>('/dislikes', {
      disliked_id: dislikedId,
    });
    return response.data;
  },

  // Get liked people
  getLikedPeople: async (page = 1, perPage = DEFAULT_PER_PAGE): Promise<ApiResponse<Person[]>> => {
    const response = await api.get<ApiResponse<Person[]>>('/liked-people', {
      params: {
        per_page: perPage,
        page,
      },
    });
    return response.data;
  },
};

export default api;
