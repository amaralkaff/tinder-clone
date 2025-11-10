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

### Configuration

Configure in `.env`:
```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ADMIN_EMAIL=admin@yourdomain.com
```

### Threshold Recommendations

**Best Practice by User Base:**
- **Small apps (< 1,000 users):** 20-30 likes
- **Medium apps (1,000-10,000 users):** 50-100 likes
- **Large apps (10,000+ users):** 100-500 likes

**Default:** 50 likes (configurable)

### Change Threshold

Edit `backend/routes/console.php` line 12:
```php
// Change to your preferred threshold
Schedule::command('profiles:check-popular --threshold=20')
    ->daily()
    ->at('09:00')
```

### Testing Email Notifications

**Step 1: Create Test Data**
```bash
# Login to MySQL
mysql -u your_user -p your_database

# Give a profile 25+ likes for testing
# (Adjust based on your threshold)
```

**Step 2: Test Manually**
```bash
cd backend

# Run check with custom threshold
php artisan profiles:check-popular --threshold=20

# Process the queued email
php artisan queue:work --once
```

**Step 3: Verify**
- Check admin email inbox
- Check logs: `backend/storage/logs/popular-profiles.log`
- Check database: profile should have `popular_profile_email_sent = 1`

**Step 4: Reset for Re-testing**
```bash
# Reset notification flag
mysql -u your_user -p -e "UPDATE people SET popular_profile_email_sent = 0 WHERE id = X;"

# Run test again
php artisan profiles:check-popular --threshold=20
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

---

*This README was written by AI because the developer was too lazy to write proper documentation. At least it's comprehensive, right?* 😅
