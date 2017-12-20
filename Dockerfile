FROM node:8-alpine

ADD . /src
WORKDIR /src
RUN npm install

EXPOSE 3000
CMD node index.js
