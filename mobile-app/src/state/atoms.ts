import { atom } from 'recoil';
import { HARDCODED_USER_ID } from '../constants';

// Current User State
export const currentUserState = atom({
  key: 'currentUserState',
  default: {
    id: HARDCODED_USER_ID,
  },
});

// UI State for loading indicators
export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

// Current card index (for tracking swiped cards)
export const currentCardIndexState = atom({
  key: 'currentCardIndexState',
  default: 0,
});
