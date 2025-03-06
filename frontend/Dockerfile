FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./

# Installer les dépendances
RUN if [ -f package-lock.json ]; then npm install; \
    elif [ -f yarn.lock ]; then yarn install; \
    fi

COPY . /app/

EXPOSE 5173

# Lancer le serveur de développement
CMD ["npm", "start"]