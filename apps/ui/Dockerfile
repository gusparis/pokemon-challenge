# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app
COPY . .

# Install dependencies using Yarn
RUN yarn install

RUN ls -a apps/api

# Build the application using Nx
RUN npx nx run libs:build
RUN npx nx run ui:build

# Expose the port the app runs on
EXPOSE 4200

# Command to run the application
CMD ["npx", "serve", "-l", "4200", "-s", "dist/apps/ui"]