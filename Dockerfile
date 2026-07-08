# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled assets and change ownership to the 'node' user
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/web/dist ./web/dist
COPY --from=builder --chown=node:node /app/migrations ./dist/migrations

# Copy the entrypoint script
COPY --chown=node:node docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

# Drop privileges to non-root user for security
USER node

# The application listens on port 4173 by default
EXPOSE 4173
CMD ["./docker-entrypoint.sh"]
