# syntax=docker/dockerfile:1

ARG NODE_VERSION=24-alpine
ARG NGINX_VERSION=1.29-alpine

# ---- build -----------------------------------------------------------------
FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Vite inlines VITE_* variables at build time, so the endpoint is a build arg
# rather than a runtime env var. The default keeps the browser same-origin and
# lets nginx proxy /graphql to the API.
ARG VITE_GRAPHQL_ENDPOINT=/graphql
ENV VITE_GRAPHQL_ENDPOINT=${VITE_GRAPHQL_ENDPOINT}
RUN npm run build

# ---- runtime ---------------------------------------------------------------
FROM nginx:${NGINX_VERSION} AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
