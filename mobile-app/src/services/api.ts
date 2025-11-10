import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, DEFAULT_PER_PAGE } from '../constants';
import { ApiResponse, Person } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

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

export const apiService = {
  getRecommendations: async (page = 1, perPage = DEFAULT_PER_PAGE): Promise<ApiResponse<Person[]>> => {
    const response = await api.get<ApiResponse<Person[]>>('/recommendations', {
      params: {
        per_page: perPage,
        page,
      },
    });
    return response.data;
  },

  likePerson: async (likedId: number): Promise<ApiResponse<any>> => {
    const response = await api.post<ApiResponse<any>>('/likes', {
      liked_id: likedId,
    });
    return response.data;
  },

  dislikePerson: async (dislikedId: number): Promise<ApiResponse<any>> => {
    const response = await api.post<ApiResponse<any>>('/dislikes', {
      disliked_id: dislikedId,
    });
    return response.data;
  },

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
