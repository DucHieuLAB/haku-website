# ===== Build Stage =====
FROM node:18 AS build-stage

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Angular project (replace 'production' with 'development' if needed)
RUN npm run build -- --configuration production

# ===== Production Stage =====
FROM nginx:stable-alpine AS production-stage

# Copy built Angular app to nginx public directory
COPY --from=build-stage /app/dist/haku-website /usr/share/nginx/html

# Copy custom nginx config if any (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
