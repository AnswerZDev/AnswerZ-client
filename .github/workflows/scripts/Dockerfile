# Étape 1: Utilise une image Node.js pour construire l'application Angular
FROM node:20

# Crée le répertoire de travail
WORKDIR /app

# Copie tous les fichiers du projet
COPY . .

# Installe les dépendances
RUN npm install

# Construit l'application Angular en mode de production
RUN npm run build --prod

# Étape 2: Utilise une image Nginx pour servir l'application construite
FROM nginx

# Copie les fichiers d'application construits depuis le conteneur du constructeur vers le conteneur Nginx
COPY /app/dist/ /usr/share/nginx/html

# Copie le fichier de configuration Nginx personnalisé
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose le port 80 pour accéder à l'application
EXPOSE 80

# Commande pour démarrer le serveur Nginx lorsqu'un conteneur basé sur cette image est lancé
CMD ["nginx", "-g", "daemon off;"]
