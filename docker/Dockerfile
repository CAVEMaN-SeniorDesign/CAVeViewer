FROM node:latest AS builder
WORKDIR /CAVeViewer
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN apk add certbot
COPY --from=builder /CAVeViewer/dist /usr/share/nginx/html/maps
COPY ./docker/launch.sh .
RUN chmod +x launch.sh
ENTRYPOINT ["./launch.sh"]