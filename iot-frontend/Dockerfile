# Frontend Dev Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose dev server port
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
