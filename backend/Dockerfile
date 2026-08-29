# syntax=docker/dockerfile:1

ARG NODE_VERSION=24-alpine

# ---- deps ------------------------------------------------------------------
# Full dependency tree, cached on the lockfile alone.
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build -----------------------------------------------------------------
FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The Prisma client is generated into src/generated, so it has to exist before
# `nest build` compiles it into dist/. prisma.config.ts resolves DATABASE_URL
# eagerly, so generate needs *a* value — it never opens a connection, and the
# real URL is injected at runtime.
RUN DATABASE_URL=postgresql://placeholder:placeholder@localhost:26257/placeholder \
    npm run prisma:generate \
 && npm run build

# ---- migrate ---------------------------------------------------------------
# Own stage because it needs what the runtime image deliberately drops: the
# Prisma CLI (a devDependency) and the migrations folder. Run as a one-shot
# service by docker compose before the API starts.
FROM build AS migrate
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/prisma/seed.js"]

# ---- production dependencies ----------------------------------------------
FROM node:${NODE_VERSION} AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- runtime ---------------------------------------------------------------
FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production
WORKDIR /app
# GraphQLModule rewrites src/schema.gql on boot (autoSchemaFile), so the working
# directory has to be writable by the unprivileged user. Ownership is set on the
# copies themselves — a `chown -R` afterwards would duplicate every layer.
RUN chown node:node /app
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
