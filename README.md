# Storefront Backend Project
This is an online dental store RESTful API. This backend will be used for the frontend.

## Used Technologies
- Postgres for the database
- Node/Express
- dotenv
- db-migrate
- jsonwebtoken
- jasmine 

## Setting up the database

- Connect to the default postgres database: sudo su - postgres
- psql
- Create the user: CREATE USER store_owner WITH PASSWORD 'hellothere';
- Create the databases: 1- CREATE DATABASE dental_store; 2- CREATE DATABASE dental_store_test;
- Connect to the databases to grant all privileges: 
   * 1- \c dental_store 
   * 2- GRANT ALL PRIVILEGES ON DATABASE dental_store to store_owner; 
   * 3- \c dental_store_test 
   * 4- GRANT ALL PRIVILEGES ON DATABASE dental_store_test to store_owner;

## Migrations 
- From the root directory run:  yarn mig-up


## ENVIRONMENT VARIABLES

- POSTGRES_HOST= localhost
- POSTGRES_PORT= 5432
- POSTGRES_DB= dental_store
- POSTGRES_USER= store_owner
- POSTGRES_PASSWORD= hellothere
- POSTGRES_TEST_DB= dental_store_test
- ENV= dev

## Testing (In Progress)



## Authentication (In Progress)


## Start Application

- run: yarn watch