# Tinder Clone - PHP Laravel + React Native

Dating app with swipe functionality built with Laravel backend and React Native mobile app.

## Stack

**Backend:** Laravel 11, PHP 8.2+, MySQL 8.0, Laravel Sanctum, Swagger
**Mobile:** React Native (Expo), React Query, Atomic Design, TypeScript

## Features (PRD Implementation)

### Backend
**People Data:** name, age, pictures, location

**API Endpoints:**
1. `GET /api/recommendations` - Paginated list of recommended people
2. `POST /api/likes` - Like a person
3. `POST /api/dislikes` - Dislike a person
4. `GET /api/liked-people` - List of liked people
5. **Cronjob** - Email admin when profile reaches 50+ likes (daily 9 AM)

### Mobile App
1. Splash screen
2. Opponent card (Tinder-style swipe)
3. Authentication & profile setup
4. Liked opponent list

## Quick Start

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configure database in .env
php artisan migrate
php artisan storage:link

# Start server
php artisan serve
```

### Mobile Setup
```bash
cd mobile-app
npm install
npx expo start
```

## Database Schema

- `users` - Authentication (id, name, email, password)
- `people` - Profiles (id, user_id, name, age, location)
- `pictures` - Photos (id, person_id, image_url, order)
- `likes` - (id, liker_id, liked_id)
- `dislikes` - (id, disliker_id, disliked_id)

## API Documentation

**Swagger:** https://amangly.duckdns.org/api/documentation

## Deployment

**VPS:** Nginx + PHP-FPM 8.2
**Domain:** https://amangly.duckdns.org

### Crontab
```bash
* * * * * cd /home/amangly/tinder-clone/backend && php artisan schedule:run >> /dev/null 2>&1
```

### Queue Worker
```bash
php artisan queue:work --daemon
```

## Testing

### Email Notifications
```bash
cd backend
php artisan profiles:check-popular --threshold=10
php artisan queue:work --once
```

Default threshold: **50 likes** (PRD requirement)

## License

MIT
