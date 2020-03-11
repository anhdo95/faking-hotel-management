# BUILD WEB APP FROM THE NODE ENVIRONMENT
FROM node:alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# DEPLOY TO THE WEB SERVER
FROM nginx:alpine as webapp

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist ./