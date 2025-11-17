FROM node:22-alpine

WORKDIR /app


# We are going to copy our local project to the working directory /app
COPY package*.json  .

# Install all dependencies to our docker environment

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port our app runs in
EXPOSE 8383

# Define the command to run our application
CMD ["node", "./src/server.js"]