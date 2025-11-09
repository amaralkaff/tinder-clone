# Tinder Clone API - Deployment Information

## Server Details
- **Server IP**: 103.103.23.174
- **Application Path**: /home/amangly/tinder-clone/backend
- **Web Server**: Nginx 1.18.0
- **PHP Version**: 8.2.29
- **Database**: MySQL 8.0.43

## API Access
- **Base URL**: http://103.103.23.174
- **Swagger UI**: http://103.103.23.174/api/documentation ✅ WORKING
- **API Docs JSON**: http://103.103.23.174/docs?api-docs.json

### API Endpoints:
  - GET `/api/recommendations` - Get person recommendations
  - GET `/api/liked-people?user_id={id}` - Get liked people
  - POST `/api/likes` - Like a person
  - POST `/api/dislikes` - Dislike a person

### Using Swagger UI:
1. Open http://103.103.23.174/api/documentation in your browser
2. You'll see an interactive API documentation interface
3. Click on any endpoint to expand it
4. Click "Try it out" to test endpoints directly
5. Fill in parameters and click "Execute"

## Database Configuration
- **Database Name**: tinder_clone
- **Database User**: tinder_user
- **Database Password**: MPn1ncNjWjCrCrMJ6NTeO9xPuyJYsNdN
- **Host**: localhost

## Environment Configuration
- **Environment**: Production
- **Debug Mode**: Disabled (for security)
- **Log Level**: Error (only critical errors logged)
- **Application Key**: Generated and secured

## File Locations
- **Nginx Config**: /etc/nginx/sites-available/tinder-clone
- **Environment File**: /home/amangly/tinder-clone/backend/.env
- **Application Logs**: /home/amangly/tinder-clone/backend/storage/logs/
- **Nginx Logs**:
  - Access: /var/log/nginx/tinder-clone.access.log
  - Error: /var/log/nginx/tinder-clone.error.log

## Services Management
```bash
# Restart PHP-FPM
sudo systemctl restart php8.2-fpm

# Restart Nginx
sudo systemctl restart nginx

# Check service status
sudo systemctl status php8.2-fpm
sudo systemctl status nginx
```

## Laravel Artisan Commands
```bash
cd /home/amangly/tinder-clone/backend

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Run migrations
php artisan migrate

# Regenerate Swagger docs
php artisan l5-swagger:generate
```

## Security Best Practices Implemented
1. ✅ Debug mode disabled in production
2. ✅ Secure database credentials generated
3. ✅ Proper file permissions (755 for directories, 644 for files)
4. ✅ Storage and cache directories writable by web server
5. ✅ Security headers configured in Nginx
6. ✅ Hidden files (.env, .git) protected
7. ✅ Error logging configured
8. ✅ Production-optimized Composer packages

## Performance Optimizations
1. ✅ OPcache enabled
2. ✅ Composer autoloader optimized
3. ✅ FastCGI buffers configured
4. ✅ Static file caching enabled (30 days)
5. ✅ Gzip compression via Nginx

## Testing Your API
```bash
# Test recommendations endpoint
curl http://103.103.23.174/api/recommendations

# Test with JSON response formatting
curl -H "Accept: application/json" http://103.103.23.174/api/recommendations | jq

# Test POST request (like someone)
curl -X POST http://103.103.23.174/api/likes \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "liked_user_id": 2}'
```

## Next Steps & Recommendations

### SSL Certificate (HTTPS)
When you get a domain name, install Let's Encrypt SSL:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Monitoring
- Set up application monitoring (e.g., New Relic, Datadog)
- Configure log rotation for Laravel logs
- Set up database backups

### Firewall
```bash
# Allow HTTP/HTTPS traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Troubleshooting

### API returns 500 error
```bash
# Check Laravel logs
tail -f storage/logs/laravel.log

# Check Nginx error logs
sudo tail -f /var/log/nginx/tinder-clone.error.log
```

### Permission errors
```bash
cd /home/amangly/tinder-clone/backend
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R amangly:www-data storage bootstrap/cache
```

### Database connection errors
```bash
# Test MySQL connection
mysql -u tinder_user -p -h localhost tinder_clone
# Use password: MPn1ncNjWjCrCrMJ6NTeO9xPuyJYsNdN
```

## Support
For issues or updates, check:
- Laravel logs: `/home/amangly/tinder-clone/backend/storage/logs/`
- Nginx logs: `/var/log/nginx/`
- PHP-FPM logs: `/var/log/php8.2-fpm.log`
