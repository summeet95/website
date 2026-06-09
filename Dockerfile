# ── Stage 1: build (nothing to compile, just copy static assets) ──────────────
FROM nginx:alpine AS base

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy site files
COPY index.html   /usr/share/nginx/html/
COPY styles.css   /usr/share/nginx/html/
COPY app.js       /usr/share/nginx/html/
COPY assets/      /usr/share/nginx/html/assets/

# Copy custom nginx config
COPY nginx.conf   /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80

# Healthcheck — nginx serves the index within 5s on startup
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
