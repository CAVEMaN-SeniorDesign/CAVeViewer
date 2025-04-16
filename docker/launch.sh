#!/bin/sh

if [ ! -e /etc/letsencrypt/live/caverobotics.com/cert.pem ]; then
    certbot --nginx --agree-tos -m tyler.hansen028@gmail.com certonly --standalone --preferred-challenges http -d caverobotics.com --force-renewal --redirect --non-interactive
fi

echo "0 0 * * 0 /usr/bin/certbot renew" >> certbot.renewal
crontab certbot.renewal
crond -b
nginx -g "daemon off;"