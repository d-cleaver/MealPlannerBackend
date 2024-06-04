-- mealPlan_master.sql

\echo 'Deleting and recreating mealPlan db...'
\connect postgres
REVOKE CONNECT ON DATABASE mealPlan FROM PUBLIC;
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'mealPlan' AND pid <> pg_backend_pid();
DROP DATABASE IF EXISTS mealPlan;
CREATE DATABASE mealPlan;

\echo 'Deleting and recreating mealPlan_test db...'
DROP DATABASE IF EXISTS mealPlan_test;
CREATE DATABASE mealPlan_test;

\connect mealPlan

\echo 'Applying schema to mealPlan db...'
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  recipeId INT NOT NULL,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
  UNIQUE (username, recipeId)
);

\echo 'Seeding data into mealPlan db...'
TRUNCATE TABLE favorites, users RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'test@test.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'test@test.com',
        TRUE);

\connect mealPlan_test

\echo 'Applying schema to mealPlan_test db...'
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  recipeId INT NOT NULL,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
  UNIQUE (username, recipeId)
);
