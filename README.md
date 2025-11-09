# Tinder-like Dating App

A full-stack dating application with PHP Laravel backend and React Native mobile app, featuring Tinder-style card swiping.

## Project Overview

This is a complete Tinder-like dating application with:
- **Backend**: PHP Laravel REST API
- **Frontend**: React Native mobile app (iOS/Android)
- **Database**: MySQL with optimized schema
- **Documentation**: Swagger/OpenAPI
- **Deployment**: DigitalOcean ready

## Features

### Core Functionality
- ✅ User profile cards with multiple pictures
- ✅ Swipe right to like, swipe left to dislike
- ✅ Paginated recommendations (excludes liked/disliked profiles)
- ✅ View list of liked people
- ✅ Fully documented REST API

### Architecture Highlights
- **Atomic Design Pattern** for React Native components
- **React Query** for server state management
- **Recoil** for client state management
- **Swagger UI** for API testing
- **MySQL** with indexed queries for performance

## Project Structure

```
php-tinder-app/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── RecommendationController.php
│   │   │   ├── LikeController.php
│   │   │   └── DislikeController.php
│   │   └── Models/
│   │       ├── Person.php
│   │       ├── Picture.php
│   │       ├── Like.php
│   │       └── Dislike.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
│
└── docs/                       # Documentation
    ├── database-schema.md
    ├── digitalocean-deployment.md
    └── react-native-structure.md
```

## Quick Start

### Backend Setup (Local Development)

```bash
cd backend

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_DATABASE=tinder_db
DB_USERNAME=your_user
DB_PASSWORD=your_password

# Run migrations and seeders
php artisan migrate
php artisan db:seed

# Generate Swagger docs
php artisan l5-swagger:generate

# Start development server
php artisan serve
```

### Access Points (Local)

- **API**: http://localhost:8000/api
- **Swagger Docs**: http://localhost:8000/api/documentation
- **Health Check**: http://localhost:8000/up

## API Endpoints

### GET /api/recommendations
Get paginated list of recommended people

**Query Parameters:**
- `user_id` (optional): Current user ID
- `per_page` (optional, default: 15): Items per page

**Example:**
```bash
curl http://localhost:8000/api/recommendations?user_id=1&per_page=15
```

### POST /api/likes
Like a person

**Request Body:**
```json
{
  "liker_id": 1,
  "liked_id": 2
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/likes \
  -H "Content-Type: application/json" \
  -d '{"liker_id": 1, "liked_id": 2}'
```

### GET /api/liked-people
Get list of people the user has liked

**Query Parameters:**
- `user_id` (required): User ID
- `per_page` (optional, default: 15): Items per page

**Example:**
```bash
curl http://localhost:8000/api/liked-people?user_id=1
```

### POST /api/dislikes
Dislike a person

**Request Body:**
```json
{
  "disliker_id": 1,
  "disliked_id": 2
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/dislikes \
  -H "Content-Type: application/json" \
  -d '{"disliker_id": 1, "disliked_id": 2}'
```

## Database Schema

### Tables

**people**
- id, name, age, location, timestamps

**pictures**
- id, person_id (FK), image_url, order, timestamps

**likes**
- id, liker_id (FK), liked_id (FK), created_at

**dislikes**
- id, disliker_id (FK), disliked_id (FK), created_at

See [docs/database-schema.md](docs/database-schema.md) for detailed schema with indexes and relationships.

## React Native App

### Recommended Stack
- React Native with TypeScript
- React Query for API integration
- Recoil for state management
- React Native Deck Swiper for card swiping
- Atomic Design architecture

See [docs/react-native-structure.md](docs/react-native-structure.md) for complete implementation guide.

## Deployment

### VPS Deployment Options

**Recommended Providers:**
- ✅ **Biznet NEO** (Indonesia) - Rp100,000/month (~$6.50) - Best value! 🇮🇩
- ✅ **DigitalOcean** - $12/month - Beginner-friendly
- ✅ **Linode** - $12/month - Excellent reliability
- ✅ **Hetzner** - €4.51/month (~$5) - Best European option
- ✅ **Vultr** - $12/month - Global reach

See [docs/vps-alternatives.md](docs/vps-alternatives.md) for complete comparison.

### Quick Start Guides

**Biznet NEO (Recommended for Indonesia):**
- [Quick Start - 15 minutes](docs/QUICKSTART-BIZNET.md)
- [Full Guide](docs/deployment-biznet-neo.md)
- Specs: 2.22GB RAM, 2 vCPU, 60GB SSD
- Price: Rp100,000/month

**DigitalOcean:**
- [Full Guide](docs/digitalocean-deployment.md)
- Specs: 2GB RAM, 1 vCPU, 50GB SSD
- Price: $12/month

**Linode:**
- [Full Guide](docs/deployment-linode.md)
- Specs: 2GB RAM, 1 vCPU, 50GB SSD
- Price: $12/month

**Requirements (All Providers):**
- Ubuntu 22.04
- 2GB RAM minimum
- MySQL 8.0
- PHP 8.2 + Nginx

## Testing the API

### Using Swagger UI
1. Start the server: `php artisan serve`
2. Open browser: http://localhost:8000/api/documentation
3. Try out endpoints directly from the UI

### Using cURL

```bash
# Get recommendations
curl http://localhost:8000/api/recommendations

# Like someone
curl -X POST http://localhost:8000/api/likes \
  -H "Content-Type: application/json" \
  -d '{"liker_id": 1, "liked_id": 2}'

# Get liked people
curl http://localhost:8000/api/liked-people?user_id=1

# Dislike someone
curl -X POST http://localhost:8000/api/dislikes \
  -H "Content-Type: application/json" \
  -d '{"disliker_id": 1, "disliked_id": 2}'
```

## Sample Data

The database seeder creates 25 sample profiles with:
- Realistic names (Faker library)
- Ages between 18-45
- Random locations
- 3-5 profile pictures per person
- Images from placeholder services

To reset and reseed:
```bash
php artisan migrate:fresh --seed
```

## Development

### Run Migrations
```bash
php artisan migrate
```

### Reset Database
```bash
php artisan migrate:fresh --seed
```

### Generate Swagger Docs
```bash
php artisan l5-swagger:generate
```

### Clear Caches
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## Technology Stack

### Backend
- **Framework**: Laravel 11
- **Database**: MySQL 8.0
- **Documentation**: L5-Swagger (OpenAPI 3.0)
- **PHP Version**: 8.2+

### Frontend (Planned)
- **Framework**: React Native
- **State Management**: Recoil + React Query
- **UI Pattern**: Atomic Design
- **Language**: TypeScript

## Security Considerations

- No authentication in MVP (as requested)
- Input validation on all endpoints
- SQL injection prevention via Eloquent ORM
- Unique constraints to prevent duplicate likes/dislikes
- Rate limiting recommended for production
- HTTPS required for production deployment

## Performance Optimizations

- Database indexes on frequently queried columns
- Eager loading of pictures with `with('pictures')`
- Pagination on all list endpoints
- Query optimization to exclude already-liked/disliked users
- API response caching with React Query

## Future Enhancements

- [ ] User authentication (JWT/Sanctum)
- [ ] Match notifications
- [ ] Real-time messaging
- [ ] User profile editing
- [ ] Advanced filtering (age, location, interests)
- [ ] Photo upload functionality
- [ ] Block/report users
- [ ] Email notifications (50+ likes cronjob ready)

## License

This project is for educational/demonstration purposes.

## Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review Swagger API docs at `/api/documentation`
3. Check Laravel logs: `storage/logs/laravel.log`

## Credits

- Laravel Framework
- React Native
- Sample images from pravatar.cc and randomuser.me
