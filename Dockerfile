ARG NODE_VERSION=22.8.0
ARG PNPM_VERSION=9.14.4
ARG DENO_VERSION=2.1.2

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

# Install node_modules
COPY ./app/package.json ./app/pnpm-lock.yaml ./
RUN npm install -g pnpm@${PNPM_VERSION}
RUN pnpm install

# Build the Vite app
COPY ./app .
RUN pnpm build

FROM denoland/deno:${DENO_VERSION}
WORKDIR /server

COPY ./server ./
RUN deno install

# Copy the built static files from the Vite build
COPY --from=builder /app/dist ./app

EXPOSE 8000

CMD ["run", "start"]