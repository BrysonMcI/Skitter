# Skitter &emsp; ![alt text](https://travis-ci.org/BrysonMcI/Skitter.svg?branch=master "Master Build Status")

## Objectives/Goal:
You are charged with developing a heavily user-centric web application. This web application will demonstrate fluency in complex web application security notions across various platforms. This will be accomplished by using multiple different platforms as part of web application designed around the micro-service architecture concept. Students will also demonstrate their familiarity with industry accepted development practices by using common development techniques as part of the project. 

## MySQL setup
For local dev pull and start the [mysql docker container](https://hub.docker.com/_/mysql/) and run with:

`docker run --name dev-sql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -v $PWD/mysql-data:/var/lib/mysql -v $PWD/00-skitter.sql:/docker-entrypoint-initdb.d/00-skitter.sql mysql`

Where `$PWD` is the Skitter root directory. Mounting a local folder as the MySQL directory will allow easy data persistance.
Additionally on the first start of the container, run the setup script to create the skitter database, the session table and test user: default_db.sql. 
This can be done via `docker exec` and the mysql command line or by mounting the sql file to `/docker-entrypoint-initdb.d` as per the dockerhub container instructions.

## PHP setup
Just run the the command inside the User-Settings folder (add the -d flag to detach):

`docker run -p 80:80 --name php-settings -v $PWD/:/var/www/html php:7.0-apache`

Then install mysqli extension by using an interactive `docker exec` and running `docker-php-ext-install mysqli && docker-php-ext-enable mysqli`

## Flask Setup
The flask stack here is nginx, gunicorn, and obviously flask. The docker compose file will handle all of this. Enter the Follow-Unfollow directory and run:

`docker-compose up`

## Ruby Setup
Ruby on rails, nginx, and puma stack all with docker compose.

`docker-compose up`