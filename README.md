# Skitter &emsp; ![alt text](https://travis-ci.org/BrysonMcI/Skitter.svg?branch=master "Master Build Status")

## Objectives/Goal:
You are charged with developing a heavily user-centric web application. This web application will demonstrate fluency in complex web application security notions across various platforms. This will be accomplished by using multiple different platforms as part of web application designed around the micro-service architecture concept. Students will also demonstrate their familiarity with industry accepted development practices by using common development techniques as part of the project. 

## MySQL setup
For local dev pull and start the [mysql docker container](https://hub.docker.com/_/mysql/) and run with:

`docker run --name dev-sql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -v $PWD/mysql-data:/var/lib/mysql`

Where `$PWD` is the Skitter root directory. Mounting a local folder as the MySQL directory will allow easy data persistance.
Additionally on the first start of the container, run the setup script to create the skitter database, the session table and test user: default_db.sql. 
This can be done via `docker exec` and the mysql command line or by mounting the sql file to `/docker-entrypoint-initdb.d` as per the dockerhub container instructions.
