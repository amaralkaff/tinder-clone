# Tinder Clone - PHP Laravel + React Native

Full-stack dating app with swipe functionality - Laravel REST API + React Native mobile app.

## Quick Start

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configure database in .env then run:
php artisan migrate
php artisan db:seed
php artisan serve
```

### Mobile Setup
```bash
cd mobile-app
npm install
npx expo start
```

## Stack

**Backend**
- Laravel 11
- PHP 8.2+
- MySQL 8.0
- Swagger API Documentation

**Mobile**
- React Native (Expo)
- React 19
- React Query
- Atomic Design Pattern

## Features

**Backend API**
- GET /api/recommendations - Paginated profile list
- POST /api/likes - Like a person
- POST /api/dislikes - Dislike a person
- GET /api/liked-people - View liked profiles
- Email notifications when profile reaches 50+ likes

**Mobile App**
- Tinder-style card swiping
- Like/Nope gestures and buttons
- Liked profiles grid view
- Authentication flow
- Profile setup with photo upload

## API Documentation

Swagger UI: http://localhost:8000/api/documentation

## Database Schema

Tables: people, pictures, likes, dislikes, users, profiles

## Email Notifications

Configure admin email in .env:
```bash
MAIL_ADMIN_EMAIL="admin@yourdomain.com"
php artisan queue:work
```

Manual check: `php artisan profiles:check-popular`

## Environment Variables

**Backend (.env)**
```
DB_DATABASE=tinder_clone
DB_USERNAME=root
DB_PASSWORD=

MAIL_ADMIN_EMAIL=admin@example.com
```

**Mobile (src/constants/index.ts)**
```
API_BASE_URL=http://localhost:8000/api
```

## License

MIT
