# Set the base image to Node
FROM node

# File Author / Maintainer
MAINTAINER Couchbase

# Expose ports
EXPOSE 8081

COPY . .

RUN npm install
RUN npm install @vue/cli-service

# Set the default command to execute
CMD npm run serve

# try:
#    docker build -t frontend .
#    docker run -it -p8081:8081 frontend
