# Groupomania

## Set up instructions

* Install PostgreSQL database
  * Add username and password to .env
* Create database and save name in .env for DB_DATABASE
* Add JWT secret to .env

## Start 

* Run npm install inside backend folder and inside frontend folder
* In backend folder, type npm start
  * Sequelize will create the tables the first time the backend starts using info from models schema index.js file
  * Note: Sequel used to create the tables are in backend/data.sql
* In frontend folder, type npm start

