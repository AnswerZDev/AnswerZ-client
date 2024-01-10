FROM docker.io/nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY answer-z-client /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html/
EXPOSE 4200
