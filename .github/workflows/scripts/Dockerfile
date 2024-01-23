FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN ng build

FROM nginx:latest
COPY .github/workflows/scripts/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html/
EXPOSE 80
