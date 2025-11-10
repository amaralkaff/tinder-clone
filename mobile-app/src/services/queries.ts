import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { apiService } from './api';
import { ApiResponse, Person } from '../types';

export const queryKeys = {
  recommendations: ['recommendations'] as const,
  likedPeople: ['likedPeople'] as const,
};

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

export const useLikePerson = (): UseMutationResult<ApiResponse<any>, Error, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (likedId: number) => apiService.likePerson(likedId),
    onSuccess: () => {
      // Backend handles filtering, so we only refresh the likes list
      queryClient.invalidateQueries({ queryKey: queryKeys.likedPeople });
    },
  });
};

export const useDislikePerson = (): UseMutationResult<ApiResponse<any>, Error, number, unknown> => {
  return useMutation({
    mutationFn: (dislikedId: number) => apiService.dislikePerson(dislikedId),
    onSuccess: () => {
      // Backend filters dislikes automatically - no need to refresh here
    },
  });
};
