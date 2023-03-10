FROM node:18.1.0-alpine3.14 AS installer

RUN apk add --no-cache libc6-compat

RUN apk add vim -v --progress

RUN apk add nano -v --progress

WORKDIR /home/node/app

COPY package.json ./

RUN yarn install

# STAGE 2 APP BUILDING PROCESS

FROM node:18.1.0-alpine3.14  AS builder

RUN apk add --no-cache libc6-compat

RUN apk add vim -v --progress

RUN apk add nano -v --progress

WORKDIR /home/node/app

RUN mkdir node_modules

COPY . .

COPY --from=installer /home/node/app/node_modules ./node_modules

COPY --from=installer /home/node/app/yarn.lock .

ENV GENERATE_SOURCEMAP=false

ENV NODE_OPTIONS=openssl-legacy-provider

ENV PUBLIC_URL=/asegura_intt

RUN yarn build

# STAGE 3 DESPLIEGUE DE LA APLICACION EN SERVIDOR NGINX

FROM nginx:1.21.6-alpine as deployer

ENV PUBLIC_URL=/asegura_intt

RUN apk add --no-cache libc6-compat

RUN apk add vim -v --progress

RUN apk add nano -v --progress

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

RUN mkdir ./asegura_intt

RUN chown -R nginx:nginx ./asegura_intt

COPY default.conf /etc/nginx/conf.d

COPY --from=builder --chown=nginx:nginx /home/node/app/build /usr/share/nginx/html/asegura_intt

RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid  && chown -R nginx:nginx /var/cache/nginx/

EXPOSE 9010

USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
