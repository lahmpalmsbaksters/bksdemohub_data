# Use the official Node.js image from the Docker Hub, but use a lightweight version
FROM node:22-alpine3.19

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

COPY .env .env

# Expose the port the app runs on
EXPOSE 5005

# Command to run the application
CMD ["nodemon", "app.js"]
