# Utilisez une image de base Node.js
FROM node:20.5.1

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste de votre application dans le conteneur
COPY . .

# Exposez le port sur lequel votre application Node.js écoute
EXPOSE 3000

# Commande pour démarrer votre application
CMD ["node", "dist/index.js"]
