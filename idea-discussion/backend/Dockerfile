# Stage 1: Build Backend Server
FROM node:20-alpine AS backend-builder
WORKDIR /app

# Copy root package files and relevant workspace package.json files
COPY package.json package-lock.json ./
COPY ./idea-discussion/backend/package.json ./idea-discussion/backend/

# Install ALL dependencies (including dev) needed for build
RUN npm install --workspace=idobata-idea-discussion-backend

WORKDIR /app/idea-discussion/backend
# Copy the backend source code
COPY ./idea-discussion/backend ./
# Build backend (tsc outputs to ./build; required for `npm start`)
RUN npm run build

# Stage 2: Final Production/Development Image
FROM node:20-alpine AS production
WORKDIR /app

# Copy installed node_modules from the first stage
COPY --from=backend-builder /app/node_modules ./node_modules

# Copy backend source code
COPY ./idea-discussion/backend ./idea-discussion/backend
COPY --from=backend-builder /app/idea-discussion/backend/build ./idea-discussion/backend/build

# Set environment variables
ENV NODE_ENV=production

WORKDIR /app/idea-discussion/backend
EXPOSE 3000
CMD ["npm", "start"]

# Note:
# A separate dev image is defined in `idea-discussion/backend/Dockerfile.dev`.
# Keep this Dockerfile production-only so platforms like Railway use the correct stage by default.
