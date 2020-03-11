FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV PORT=8080

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]