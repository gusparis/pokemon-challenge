# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app
COPY . .

# Install dependencies using Yarn
RUN yarn install

RUN ls -a apps/api

# Build the application using Nx
RUN npx nx run libs:build
RUN npx nx run api:build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/apps/api/main.js"]