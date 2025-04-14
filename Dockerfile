# --- Stage 1: Build React app ---
    FROM node:18 AS builder

    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN PUBLIC_URL=/ npm run build
    
    
    # --- Stage 2: Serve it with Nginx ---
    FROM nginx:stable-alpine
    
    # Copy build output to Nginx html dir
    COPY --from=builder /app/build /usr/share/nginx/html
    
    # Optional: custom Nginx config
    RUN rm /etc/nginx/conf.d/default.conf
    COPY nginx.conf /etc/nginx/conf.d
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    