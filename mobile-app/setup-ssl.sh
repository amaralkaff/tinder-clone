#!/bin/bash

# HTTPS Setup for amangly.duckdns.org
# Run this on your server: 103.103.23.174

set -e

echo "🔒 Setting up HTTPS for amangly.duckdns.org"
echo "============================================"

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Backup current config
echo "💾 Backing up nginx config..."
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup.$(date +%Y%m%d_%H%M%S)

# Create new nginx config
echo "⚙️  Configuring nginx..."
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name amangly.duckdns.org;

    root /var/www/html/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location /storage {
        alias /var/www/html/storage/app/public;
        try_files $uri $uri/ =404;
    }
}
EOF

# Test nginx config
echo "🧪 Testing nginx configuration..."
sudo nginx -t

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

# Get SSL certificate
echo "🔐 Obtaining SSL certificate from Let's Encrypt..."
sudo certbot --nginx -d amangly.duckdns.org --non-interactive --agree-tos --register-unsafely-without-email

# Test HTTPS
echo ""
echo "✅ HTTPS setup complete!"
echo ""
echo "Testing HTTPS connection..."
curl -s https://amangly.duckdns.org/api/recommendations?user_id=1&per_page=3 | head -20

echo ""
echo "🎉 Your API is now available at: https://amangly.duckdns.org/api"
echo ""
