# 🚀 Lancer le projet avec Docker

### Étapes à suivres :

1. Assurez-vous d’avoir Docker et Docker Compose installés.
2. Clone le projet :
```bash
$ git clone git@github.com:raskal-dev/Recrutement.git
$ cd Recrutement
````

3. Lancer le projet
````bash
$ docker-compose up --build
````

# Monitoring 
Pour le Monitoring on a utiliser un projet [dockprom](https://github.com/stefanprodan/dockprom.git), qui est un projet basé sur prometheus, grafana, caddy, cadvisor, alertmanager et nodeexport 

### Installation de dockprom
````bash
$ git clone git@github.com:stefanprodan/dockprom.git
$ cd dockprom
$ docker-compose up
````

# Les Tests
### Test Linter
````bash
$ npm run lint
````
### Test Unitaire
````bash
$ npm run test
````
