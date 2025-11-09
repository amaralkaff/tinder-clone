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
      // Invalidate recommendations to fetch new profiles
      queryClient.invalidateQueries({ queryKey: queryKeys.recommendations });
      // Invalidate liked people to update the list
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
      // Invalidate recommendations to fetch new profiles
      queryClient.invalidateQueries({ queryKey: queryKeys.recommendations });
    },
  });
};
