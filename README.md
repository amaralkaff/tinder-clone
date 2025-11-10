# Tinder Clone - PHP Laravel + React Native

Full-stack dating app with swipe functionality, built with Laravel REST API backend and React Native mobile app.

## Technology Stack

### Backend (PHP Laravel)
- Laravel 11.x
- PHP 8.2+
- MySQL 8.0
- Laravel Sanctum (API Authentication)
- L5-Swagger (API Documentation)
- Queue Workers (Email Notifications)

### Mobile (React Native)
- React Native (Expo)
- React Query (Data Fetching)
- Atomic Design Pattern
- TypeScript

## Features Implementation

### Backend API Features

#### People Data Structure
- **name** - Profile name
- **age** - User age (18-100)
- **pictures** - Multiple profile photos with ordering
- **location** - User location

#### Required API Endpoints

1. **Recommendations** - `GET /api/recommendations`
   - Paginated list of people to swipe
   - Excludes already liked/disliked profiles
   - Excludes user's own profile

2. **Like Person** - `POST /api/likes`
   - Swipe right functionality
   - Prevents duplicate likes

3. **Dislike Person** - `POST /api/dislikes`
   - Swipe left functionality
   - Prevents duplicate dislikes

4. **Liked People List** - `GET /api/liked-people`
   - Paginated list of liked profiles
   - Includes profile pictures

5. **Email Notification Cronjob**
   - Daily check at 9:00 AM (Asia/Jakarta)
   - Sends email to admin when profile reaches 50+ likes
   - Prevents duplicate notifications

### Mobile App Features

1. **Splash Screen** - App loading screen with branding

2. **Opponent Card (Main Screen)**
   - Tinder-style card stack
   - Swipe right (like) gesture
   - Swipe left (nope) gesture
   - Like/Nope buttons
   - Profile details display

3. **Authentication Flow**
   - User registration
   - Login/Logout
   - Profile creation (mandatory after registration)

4. **Liked Opponent List**
   - Grid view of liked profiles
   - Read-only (no swipe actions)

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

## Database Schema (RDB)

**users** - Authentication
- id, name, email, password, email_verified_at

**people** - Dating Profiles
- id, user_id (FK), name, age, location, popular_profile_email_sent

**pictures** - Profile Photos
- id, person_id (FK), image_url, order

**likes** - Like Relationships
- id, liker_id (FK), liked_id (FK)

**dislikes** - Dislike Relationships
- id, disliker_id (FK), disliked_id (FK)

## API Documentation (Swagger)

**Local:** http://localhost:8000/api/documentation
**Production:** https://amangly.duckdns.org/api/documentation

All endpoints are documented with request/response examples and authentication requirements.

## Deployment (VPS - Nginx)

### VPS Configuration
- **Server:** Nginx 1.18.0
- **Domain:** https://amangly.duckdns.org
- **SSL:** Let's Encrypt (HTTPS enabled)
- **PHP-FPM:** 8.2

### Cronjob Setup
Add to crontab for Laravel scheduler:
```bash
* * * * * cd /home/amangly/tinder-clone/backend && php artisan schedule:run >> /dev/null 2>&1
```

### Queue Worker Setup
For email notifications, run:
```bash
php artisan queue:work --daemon
```

Or add as systemd service for automatic restart.

## Email Notifications

Configure in `.env`:
```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ADMIN_EMAIL=admin@yourdomain.com
```

Manual test:
```bash
php artisan profiles:check-popular --threshold=50
php artisan queue:work --once
```

## Environment Configuration

### Backend (.env)
```bash
APP_URL=https://amangly.duckdns.org
DB_DATABASE=tinder_clone
DB_USERNAME=tinder_user
DB_PASSWORD=your_password

MAIL_ADMIN_EMAIL=admin@example.com
QUEUE_CONNECTION=database
```

### Mobile (src/config/environment.ts)
```typescript
export const API_BASE_URL = 'https://amangly.duckdns.org/api'
```

## API Endpoints Summary

### Public
- `POST /api/register` - Create account
- `POST /api/login` - Authenticate user

### Protected (require Bearer token)
- `GET /api/user` - Get authenticated user
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/pictures` - Upload photo
- `DELETE /api/profile/pictures/{id}` - Delete photo
- `GET /api/recommendations` - Get profiles to swipe
- `POST /api/likes` - Like a profile
- `POST /api/dislikes` - Dislike a profile
- `GET /api/liked-people` - View liked profiles

## License

MIT
