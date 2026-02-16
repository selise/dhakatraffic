# Use Nginx alpine as the base image for a lightweight static file server
FROM nginx:alpine

# Copy the static files to the default nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY i18n.js /usr/share/nginx/html/
COPY env.js /usr/share/nginx/html/
COPY env.template.js /usr/share/nginx/html/
COPY og-image.png /usr/share/nginx/html/
COPY favicon.png /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY docker-entrypoint-generate-env.sh /docker-entrypoint.d/40-generate-env.sh
RUN chmod +x /docker-entrypoint.d/40-generate-env.sh

# Expose port 80
EXPOSE 80

# The default command for nginx:alpine is to start nginx
CMD ["nginx", "-g", "daemon off;"]
