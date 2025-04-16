FROM node:latest AS builder
WORKDIR /CAVeViewer
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN apk add certbot certbot-nginx
COPY --from=builder /CAVeViewer/dist /usr/share/nginx/html/maps
WORKDIR /etc/nginx/conf.d
COPY ./docker/nginx.conf default.conf
WORKDIR /root
COPY ./docker/launch.sh .
RUN chmod +x launch.sh
ENTRYPOINT ["./launch.sh"]