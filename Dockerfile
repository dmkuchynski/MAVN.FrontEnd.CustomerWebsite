# Stage 1
FROM node:10 as node

WORKDIR /usr/src/app

RUN (node -v && npm -v)

COPY package*.json ./
COPY .npmrc ./
COPY patch.js ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.13.12-alpine

# https://docs.docker.com/engine/reference/builder/#copy
COPY --from=node /usr/src/app/nginx/root.html /usr/share/nginx/html/
COPY --from=node /usr/src/app/dist/token-customer-website /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN ls /usr/share/nginx/html/en
RUN ls /usr/share/nginx/html/en/html-pages/terms
RUN ls /usr/share/nginx/html/en/html-pages/policy
