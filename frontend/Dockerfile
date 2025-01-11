# Use the official Node.js image to build the Angular app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use an Nginx image to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular app to Nginx's HTML directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]