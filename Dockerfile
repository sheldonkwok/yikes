FROM node:10.15-alpine as build

RUN apk add --update git
COPY gitconfig /root/.git/config

WORKDIR /opt/app
COPY package*.json ./

RUN npm ci

FROM node:10.15-alpine

WORKDIR /opt/app

COPY --from=build /opt/app/node_modules /opt/app/node_modules
COPY index.js index.js

ENTRYPOINT ["node", "index.js"]
