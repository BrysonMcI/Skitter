# Skitter &emsp; ![alt text](https://travis-ci.org/BrysonMcI/Skitter.svg?branch=master "Master Build Status")

## Objectives/Goal:
You are charged with developing a heavily user-centric web application. This web application will demonstrate fluency in complex web application security notions across various platforms. This will be accomplished by using multiple different platforms as part of web application designed around the micro-service architecture concept. Students will also demonstrate their familiarity with industry accepted development practices by using common development techniques as part of the project. 

## MySQL setup
For local dev pull and start the [mysql docker container](https://hub.docker.com/_/mysql/) and run with:

Change into the `mysql-files` directory and run `docker-compose up` to start the database container. The first run will initialize some sample data into the database as well as mount the sql db to the local filesystem (please do not commit these into Git).

## PHP setup
Just run the the command inside the User-Settings folder (add the -d flag to detach):

`docker run -p 80:80 --name php-settings -v $PWD/:/var/www/html php:7.0-apache`

Then install mysqli extension by using an interactive `docker exec` and running `docker-php-ext-install mysqli && docker-php-ext-enable mysqli`

## Flask Setup
The flask stack here is nginx, gunicorn, and obviously flask. The docker compose file will handle all of this. Enter the Follow-Unfollow directory and run:

`docker-compose up`

## Ruby Setup
Ruby on rails, nginx, and puma stack all with docker compose.

`docker-compose build ; docker-compose up`

## ElasticSearch setup
Navigate to the `elk-files` directory and run the `fix_mmap.sh` script to allow more memory for the elk container. Then simply run `docker-compose up` to start up an ELK stack.

## API Gateway
The API Gateway is a custom proxy that will serve as a public face of the Skitter web application. All requests to any endpoint will be made to the gateway, which will then forward valid requests to the respective microservice. To run, simple issue `docker-compose up` from the `API-Gateway` folder.
