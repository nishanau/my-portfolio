# --- Stage 1: Build React app ---
    FROM node:18 AS builder

    WORKDIR /app
    COPY app/package*.json ./
    RUN npm install
    COPY app/ ./
    RUN npm run build
    
    # --- Stage 2: Serve it with Nginx ---
    FROM nginx:stable-alpine
    
    # Copy custom nginx config for React routing
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy the build output to NGINX's html folder
    COPY --from=builder /app/build /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    