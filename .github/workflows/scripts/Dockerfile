# Utilise une image Node.js pour construire l'application Angular
FROM node:14 AS builder

WORKDIR /app

# Copie les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installe les dépendances
RUN npm install

# Copie le code source de l'application
COPY . .

# Construit l'application Angular en mode de production
RUN npm run build -- --prod

# Utilise une image Nginx pour servir l'application construite
FROM nginx:alpine

# Copie les fichiers d'application construits depuis le conteneur du constructeur vers le conteneur Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Copie le fichier de configuration Nginx personnalisé
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose le port 80 pour accéder à l'application
EXPOSE 80

# Commande pour démarrer le serveur Nginx lorsqu'un conteneur basé sur cette image est lancé
CMD ["nginx", "-g", "daemon off;"]
