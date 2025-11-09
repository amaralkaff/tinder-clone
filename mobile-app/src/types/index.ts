// API Response Types
export interface Picture {
  id: number;
  person_id: number;
  image_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Person {
  id: number;
  name: string;
  age: number;
  location: string;
  bio?: string;
  popular_profile_email_sent: boolean;
  popular_profile_email_sent_at: string | null;
  created_at: string;
  updated_at: string;
  pictures: Picture[];
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationMeta;
}

export interface LikeRequest {
  liker_id: number;
  liked_id: number;
}

export interface DislikeRequest {
  disliker_id: number;
  disliked_id: number;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
};

export type MainTabsParamList = {
  Main: undefined;
  Likes: undefined;
};
