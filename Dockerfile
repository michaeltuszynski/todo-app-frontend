FROM node:18.17.1-slim AS build

WORKDIR /react-app

COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.25
COPY ./nginx/nginx.conf /etc/nginx/default.conf
COPY --from=build /react-app/build /usr/share/nginx/html