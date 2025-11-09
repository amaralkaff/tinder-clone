import axios from 'axios';
import { API_BASE_URL, HARDCODED_USER_ID, DEFAULT_PER_PAGE } from '../constants';
import { ApiResponse, Person, LikeRequest, DislikeRequest } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// API Methods
export const apiService = {
  // Get recommendations for swiping
  getRecommendations: async (page = 1, perPage = DEFAULT_PER_PAGE): Promise<ApiResponse<Person[]>> => {
    const response = await api.get<ApiResponse<Person[]>>('/recommendations', {
      params: {
        user_id: HARDCODED_USER_ID,
        per_page: perPage,
        page,
      },
    });
    return response.data;
  },

  // Like a person
  likePerson: async (likedId: number): Promise<ApiResponse<any>> => {
    const payload: LikeRequest = {
      liker_id: HARDCODED_USER_ID,
      liked_id: likedId,
    };
    const response = await api.post<ApiResponse<any>>('/likes', payload);
    return response.data;
  },

  // Dislike a person
  dislikePerson: async (dislikedId: number): Promise<ApiResponse<any>> => {
    const payload: DislikeRequest = {
      disliker_id: HARDCODED_USER_ID,
      disliked_id: dislikedId,
    };
    const response = await api.post<ApiResponse<any>>('/dislikes', payload);
    return response.data;
  },

  // Get liked people
  getLikedPeople: async (page = 1, perPage = DEFAULT_PER_PAGE): Promise<ApiResponse<Person[]>> => {
    const response = await api.get<ApiResponse<Person[]>>('/liked-people', {
      params: {
        user_id: HARDCODED_USER_ID,
        per_page: perPage,
        page,
      },
    });
    return response.data;
  },
};

export default api;
