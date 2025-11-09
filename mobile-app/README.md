# Tinder Clone Mobile App

React Native mobile application with Tinder-style swiping interface.

## Features
- 🔥 Tinder-style card swiping (like/dislike)
- 💚 View liked profiles
- 🎨 Atomic Design pattern
- ⚡ React Query for data fetching
- 🔄 Recoil for state management
- 🎨 NativeWind (Tailwind CSS for React Native)
- 🔒 HTTPS with Let's Encrypt SSL
- 📱 Full-screen card layout
- ✨ Custom SVG icons and animations

## Tech Stack
- React Native (Expo)
- TypeScript
- NativeWind v4 (Tailwind CSS)
- TanStack Query (React Query)
- Recoil
- React Navigation
- Axios
- react-native-deck-swiper

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
The app connects to: `https://amangly.duckdns.org/api`

- **Domain**: amangly.duckdns.org
- **SSL**: Let's Encrypt certificate (auto-renews)
- **Hardcoded user_id**: `1` (for MVP testing)

### HTTPS Setup
For backend HTTPS setup, see `scripts/setup-https.sh` or `HTTPS_SETUP.md`

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
1. **Splash Screen**: 1.5s app intro with fade animation
2. **Main Screen**: Full-screen swipe cards with LIKE/NOPE/SUPER LIKE
3. **Likes Screen**: 2-column grid of liked profiles

## Key Components
- **ProfileCard**: Full-screen card with gradient overlay
- **CardDeck**: Swipeable deck with overlay labels
- **ProfileGridCard**: Compact 2-column grid item
- **ActionButton**: Circular gradient buttons (✕, ★, ♥)
- **FlameIcon**: Custom SVG flame for Discover tab
- **HeartIcon**: Custom SVG heart for Likes tab
