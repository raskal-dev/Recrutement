# Recrutement
Backend d'une application de mise en relation entre recruteurs et étudiants.

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
Pour le Monitoring on a utiliser prometheus et grafana 

### Prometeus
````bash
 http://localhost:9090
````
### Grafana
````bash
 http://localhost:3001
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
