DROP DATABASE IF EXISTS skitter;
CREATE DATABASE skitter;
USE skitter;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS followers;

-- Mediumblob is 16.7MB ish
CREATE TABLE users (
	email varchar(40) not null,
	username varchar(30) not null,
	photo mediumblob,
	primary key (email)
);

CREATE TABLE sessions (
	id char(32) not null,
	email varchar(40) not null,
	primary key (id),
	FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE followers (
	leader varchar(40) not null,
	follower varchar(40) not null,
	primary key (leader, follower),
	FOREIGN KEY (leader) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (follower) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users VALUES ('test@test.org', 'Gru', NULL);
INSERT INTO users VALUES ('test1@test.org', 'Dave', NULL);
INSERT INTO users VALUES ('test2@test.org', 'Stuart', NULL);
INSERT INTO users VALUES ('test3@test.org', 'Kevin', NULL);
INSERT INTO users VALUES ('test4@test.org', 'Bob', NULL);

INSERT INTO sessions VALUES ('1111111111111111111111111111', 'test@test.org');
INSERT INTO sessions VALUES ('2222222222222222222222222222', 'test1@test.org');
INSERT INTO sessions VALUES ('3333333333333333333333333333', 'test2@test.org');

INSERT INTO followers VALUES ('test@test.org','test1@test.org');
INSERT INTO followers VALUES ('test@test.org','test3@test.org');
INSERT INTO followers VALUES ('test@test.org','test2@test.org');
INSERT INTO followers VALUES ('test@test.org','test4@test.org');

