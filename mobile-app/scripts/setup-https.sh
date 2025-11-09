#!/bin/bash

# SSL Setup Script for Tinder Clone Backend
# Run this on your server: 103.103.23.174

set -e

echo "🔒 Setting up HTTPS for Tinder Clone API"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root: sudo bash setup-https.sh"
    exit 1
fi

# Update package list
echo "📦 Updating package list..."
apt-get update -qq

# Install Certbot and Nginx plugin
echo "📦 Installing Certbot..."
apt-get install -y certbot python3-certbot-nginx

# Backup current nginx config
echo "💾 Backing up nginx configuration..."
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup.$(date +%Y%m%d_%H%M%S)

# Create nginx config for HTTP (required for certbot validation)
echo "⚙️  Configuring nginx for certbot..."
cat > /etc/nginx/sites-available/default << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name 103.103.23.174;

    root /var/www/html/public;
    index index.php;

    # Allow certbot validation
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

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
nginx -t

# Reload nginx
echo "🔄 Reloading nginx..."
systemctl reload nginx

echo ""
echo "⚠️  IMPORTANT: You need a domain name for Let's Encrypt!"
echo "IP addresses (103.103.23.174) are NOT supported by Let's Encrypt."
echo ""
echo "Options:"
echo "1. Get a domain name and point it to 103.103.23.174"
echo "2. Use a free service like DuckDNS, No-IP, or FreeDNS"
echo "3. Use self-signed certificate (not recommended for production)"
echo ""
read -p "Do you have a domain name? (y/n): " has_domain

if [ "$has_domain" = "y" ]; then
    read -p "Enter your domain name (e.g., api.yourdomain.com): " domain_name

    # Update nginx config with domain
    sed -i "s/103.103.23.174/$domain_name/g" /etc/nginx/sites-available/default
    systemctl reload nginx

    echo "🔐 Obtaining SSL certificate..."
    certbot --nginx -d $domain_name --non-interactive --agree-tos --register-unsafely-without-email

    echo "✅ HTTPS setup complete!"
    echo "Your API is now available at: https://$domain_name/api"
else
    echo ""
    echo "📝 Setting up self-signed certificate (temporary solution)..."

    # Create self-signed certificate
    mkdir -p /etc/nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/selfsigned.key \
        -out /etc/nginx/ssl/selfsigned.crt \
        -subj "/C=ID/ST=Jakarta/L=Jakarta/O=TinderClone/CN=103.103.23.174"

    # Create nginx HTTPS config
    cat > /etc/nginx/sites-available/default << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name 103.103.23.174;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name 103.103.23.174;

    ssl_certificate /etc/nginx/ssl/selfsigned.crt;
    ssl_certificate_key /etc/nginx/ssl/selfsigned.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

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

    nginx -t && systemctl reload nginx

    echo "⚠️  Self-signed certificate created!"
    echo "Your API is now at: https://103.103.23.174/api"
    echo ""
    echo "⚠️  NOTE: Self-signed certificates will show security warnings."
    echo "For production, please get a domain name and use Let's Encrypt."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Test: curl -k https://103.103.23.174/api/recommendations?user_id=1&per_page=5"
echo "2. Update mobile app BASE_URL to use https://"
echo ""
