# For Node.js LTS as the base image
FROM node:18

# For Set working directory in container
WORKDIR /app

# Now I have to - Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Now - Copy everything else
COPY . .

# To -  Expose port
EXPOSE 9999

# Start the server
CMD ["npm", "run", "dev"]
