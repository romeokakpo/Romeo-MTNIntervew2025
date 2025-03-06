# Frontend Dockerfile
FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files and build
COPY . ./
RUN npm run build

# Expose port
EXPOSE 5173

CMD ["npm", "start"]
