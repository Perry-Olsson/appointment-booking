FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*
RUN rm /usr/share/nginx/html/*

COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]