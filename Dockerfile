ARG NODE_VERSION=22.8.0
ARG PNPM_VERSION=9.14.4
ARG DENO_VERSION=2.1.2

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

# Pass Vite args as build-time environment variables
ARG VITE_API_URL
ARG VITE_IS_DEV
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_IS_DEV=$VITE_IS_DEV

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