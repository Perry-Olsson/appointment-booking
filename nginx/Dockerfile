FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*
RUN rm /usr/share/nginx/html/*
COPY ./snippets/self-signed.conf /etc/nginx/snippets/self-signed.conf
COPY ./snippets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY ./snippets/letsencrypt.conf /etc/nginx/snippets/letsencrypt.conf
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]