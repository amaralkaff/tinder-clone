import { ENV } from '../config/environment';

// API Configuration
export const API_BASE_URL = ENV.API_BASE_URL;
export const BASE_URL = ENV.BASE_URL;
export const HARDCODED_USER_ID = 1;
export const DEFAULT_PER_PAGE = 15;

// Theme Colors (Tinder-inspired)
export const COLORS = {
  primary: '#FF6B6B',      // Red/Pink for likes
  secondary: '#4ECDC4',    // Teal for accents
  nope: '#FF6B6B',         // Red for dislike
  like: '#4ECDC4',         // Teal for like
  background: '#F5F5F5',   // Light gray
  text: '#2C3E50',         // Dark gray
  white: '#FFFFFF',
  border: '#E0E0E0',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Typography
export const FONTS = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  small: {
    fontSize: 14,
    fontWeight: 'normal' as const,
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 32,
};
