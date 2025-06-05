# Utilise l'image Nginx légère
FROM nginx:alpine

# Copie les fichiers HTML/CSS/JS dans le répertoire public de Nginx
COPY . /usr/share/nginx/html

# Expose le port 80
EXPOSE 80
