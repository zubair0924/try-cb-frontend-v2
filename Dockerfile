# Set the base image to Node
FROM node:15-buster-slim

LABEL maintainer="Couchbase"

EXPOSE 8081

COPY . .

RUN apt-get update
RUN apt-get install wait-for-it

RUN npm install
RUN npm install @vue/cli-service

CMD npm run serve
