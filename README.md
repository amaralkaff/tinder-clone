# Tinder Clone API

Laravel REST API for a Tinder-like dating app with swipe functionality.

## Features

- 🔥 Tinder-style recommendations
- 👍 Like/Dislike functionality
- 📋 View liked profiles
- 📧 Automated email notifications for popular profiles (50+ likes)
- 📄 Swagger API documentation
- 🗄️ MySQL database with relationships
- ⚡ Queue-based async processing

## Quick Start

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configure database in .env
php artisan migrate
php artisan db:seed
php artisan serve
```

**Access:**
- API: http://localhost:8000/api
- Swagger: http://localhost:8000/api/documentation

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recommendations` | Get paginated profiles |
| POST | `/api/likes` | Like a person |
| GET | `/api/liked-people` | Get liked profiles |
| POST | `/api/dislikes` | Dislike a person |

> Full API documentation available at `/api/documentation`

## Database Schema

**Tables:** `people`, `pictures`, `likes`, `dislikes`

## Email Notifications

Automated email system that notifies admins when profiles reach 50+ likes.

**Setup:**
```bash
# Configure admin email in .env
MAIL_ADMIN_EMAIL="admin@yourdomain.com"

# Run queue worker for async email processing
php artisan queue:work

# Manual check
php artisan profiles:check-popular
```

See [EMAIL_NOTIFICATIONS.md](EMAIL_NOTIFICATIONS.md) for complete documentation.

## Tech Stack

- Laravel 11
- PHP 8.2+
- MySQL 8.0
- Swagger/OpenAPI
- Laravel Queue System

## License

MIT
