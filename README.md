# TaskMaster

TaskMaster est une application web simple de gestion de tâches personnelles.

## Fonctionnalités
- Ajouter une tâche
- Marquer une tâche comme terminée / en cours
- Supprimer une tâche
- Sauvegarde locale via localStorage

## Technologies utilisées
- HTML, CSS, JavaScript
- Docker (Nginx)
- GitHub
- Trello (gestion de projet)

## Lancer le projet

### En local :
Ouvrir `index.html` dans un navigateur.

### Avec Docker :
```bash
docker build -t taskmaster .
docker run -d -p 8080:80 taskmaster
```
Accéder à l'application sur [http://localhost:8080](http://localhost:8080)