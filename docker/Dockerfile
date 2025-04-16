FROM node:latest AS builder
WORKDIR /CAVeViewer
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
# COPY --from=builder /CAVeViewer/dist /usr/share/nginx/html
COPY --from=builder /CAVeViewer/dist /usr/share/nginx/html/maps
ENTRYPOINT ["nginx", "-g", "daemon off;"]