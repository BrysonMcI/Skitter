CREATE DATABASE skitter;
USE skitter;
DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
	id char(32) not null,
	email varchar(128),
	name varchar(256),
	primary key (id)
);
INSERT INTO sessions VALUES ('1111111111111111111111111111', 'test@test.org', 'test name');

