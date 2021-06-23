sudo docker run -it --rm \
-v /docker-volumes/etc/letsencrypt:/etc/letsencrypt \
-v /docker-volumes/var/lib/letsencrypt:/var/lib/letsencrypt \
-v /var/www/certbot:/data/letsencrypt \
-v "/docker-volumes/var/log/letsencrypt:/var/log/letsencrypt" \
certbot/certbot \
certonly --webroot \
--email olsson.perry@gmail.com --agree-tos --no-eff-email\
--webroot-path=/data/letsencrypt \
-d appointment-booking-example.com -d www.appointment-booking-example.com