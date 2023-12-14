# Set the base image to Node
FROM node:15-buster-slim as build-stage

LABEL maintainer="Couchbase"

EXPOSE 8081

COPY . /app
WORKDIR /app

RUN apt-get update && \
    apt-get install wait-for-it

RUN npm install && \
    npm install @vue/cli-service && \
    npm run build

FROM nginx:1.19.6-alpine
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
