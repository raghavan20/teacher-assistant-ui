# Use the official Nginx image
FROM nginx:alpine

# Copy the React build files to Nginx's HTML directory
COPY dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
