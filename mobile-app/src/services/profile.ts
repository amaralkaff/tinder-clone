import { useMutation, useQuery, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import api from './api';

export interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  user_id: number;
  pictures: ProfilePicture[];
  created_at: string;
  updated_at: string;
}

export interface ProfilePicture {
  id: number;
  person_id: number;
  image_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileRequest {
  name?: string; // Optional - auto-populated from registration if not provided
  age: number;
  location: string;
}

export interface UpdateProfileRequest {
  name?: string;
  age?: number;
  location?: string;
}

export interface ProfileResponse {
  success: boolean;
  data: Profile;
  message?: string;
}

export interface PictureResponse {
  success: boolean;
  data: ProfilePicture;
  message: string;
}

// API functions
export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    const { data } = await api.get<ProfileResponse>('/profile');
    return data.data;
  },

  createProfile: async (profileData: CreateProfileRequest): Promise<Profile> => {
    const { data } = await api.post<ProfileResponse>('/profile', profileData);
    return data.data;
  },

  updateProfile: async (profileData: UpdateProfileRequest): Promise<Profile> => {
    const { data } = await api.put<ProfileResponse>('/profile', profileData);
    return data.data;
  },

  uploadPicture: async (imageUri: string): Promise<ProfilePicture> => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);

    const { data } = await api.post<PictureResponse>(
      '/profile/pictures',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data.data;
  },

  deletePicture: async (pictureId: number): Promise<void> => {
    await api.delete(`/profile/pictures/${pictureId}`);
  },
};

// React Query hooks
export const useProfile = (): UseQueryResult<Profile, Error> => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
    retry: false,
  });
};

export const useCreateProfile = (): UseMutationResult<Profile, Error, CreateProfileRequest, unknown> => {
  return useMutation({
    mutationFn: profileApi.createProfile,
  });
};

export const useUpdateProfile = (): UseMutationResult<Profile, Error, UpdateProfileRequest, unknown> => {
  return useMutation({
    mutationFn: profileApi.updateProfile,
  });
};

export const useUploadPicture = (): UseMutationResult<ProfilePicture, Error, string, unknown> => {
  return useMutation({
    mutationFn: profileApi.uploadPicture,
  });
};

export const useDeletePicture = (): UseMutationResult<void, Error, number, unknown> => {
  return useMutation({
    mutationFn: profileApi.deletePicture,
  });
};
