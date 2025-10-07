# Stage 1: Build dependencies
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only prod dependencies first
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Stage 2: Run production server
FROM node:20-alpine

WORKDIR /app

# Copy dependencies and source from builder
COPY --from=builder /app /app

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["npm", "start"]
