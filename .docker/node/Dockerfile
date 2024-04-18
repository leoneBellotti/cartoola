FROM node:18-alpine

# Atualizando / Instalando pacotes
RUN apk update && apk upgrade

ARG MODE

RUN mkdir /build

WORKDIR /build

COPY . .

COPY .env.$MODE ./.env

RUN npm install -g npm@10.2.5

RUN npm --unsafe-perm install

RUN npm --unsafe-perm install -g http-server

RUN npm run build

WORKDIR /build/dist

COPY package.json ./

COPY vite.config.js ./

COPY server.js ./

COPY .env.$MODE ./.env

RUN npm install --omit=dev

CMD ["node", "server"]
