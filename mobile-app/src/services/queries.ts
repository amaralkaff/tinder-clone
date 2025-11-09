import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { apiService } from './api';
import { ApiResponse, Person } from '../types';

// Query Keys
export const queryKeys = {
  recommendations: ['recommendations'] as const,
  likedPeople: ['likedPeople'] as const,
};

// Get Recommendations Hook
export const useRecommendations = (
  page = 1,
  perPage = 15
): UseQueryResult<ApiResponse<Person[]>, Error> => {
  return useQuery({
    queryKey: [...queryKeys.recommendations, page, perPage],
    queryFn: () => apiService.getRecommendations(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Get Liked People Hook
export const useLikedPeople = (
  page = 1,
  perPage = 15
): UseQueryResult<ApiResponse<Person[]>, Error> => {
  return useQuery({
    queryKey: [...queryKeys.likedPeople, page, perPage],
    queryFn: () => apiService.getLikedPeople(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Like Person Mutation
export const useLikePerson = (): UseMutationResult<ApiResponse<any>, Error, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (likedId: number) => apiService.likePerson(likedId),
    onSuccess: () => {
      // Only invalidate liked people list, not recommendations
      // Backend already filters out liked people from recommendations
      queryClient.invalidateQueries({ queryKey: queryKeys.likedPeople });
    },
  });
};

// Dislike Person Mutation
export const useDislikePerson = (): UseMutationResult<ApiResponse<any>, Error, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dislikedId: number) => apiService.dislikePerson(dislikedId),
    onSuccess: () => {
      // No need to invalidate recommendations
      // Backend already filters out disliked people from recommendations
      // Data will refresh naturally when user runs out of profiles
    },
  });
};
