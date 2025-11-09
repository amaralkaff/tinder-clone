# Tinder Clone Mobile App

React Native mobile application with Tinder-style swiping interface.

## Features
- 🔥 Tinder-style card swiping (like/dislike)
- 💚 View liked profiles
- 🎨 Atomic Design pattern
- ⚡ React Query for data fetching
- 🔄 Recoil for state management

## Tech Stack
- React Native (Expo)
- TypeScript
- TanStack Query (React Query)
- Recoil
- React Navigation
- Axios

## Quick Start

```bash
# Install dependencies
npm install

# Start the app
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## API Configuration
The app connects to: `http://103.103.23.174/api`

Hardcoded user_id: `1` (for MVP testing)

## Project Structure
```
src/
├── components/
│   ├── atoms/          # Basic UI elements
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── screens/            # App screens
├── navigation/         # Navigation setup
├── services/           # API client & queries
├── state/             # Recoil atoms
├── types/             # TypeScript types
└── constants/         # App constants
```

## Architecture
- **Atomic Design**: Components organized by complexity
- **React Query**: Server state management with caching
- **Recoil**: Client state management
- **React Navigation**: Bottom tabs + Stack navigation

## Screens
1. **Splash Screen**: 2.5s app intro
2. **Main Screen**: Swipe cards (like/dislike)
3. **Likes Screen**: View liked profiles (no swipe)
