# Storefront Backend Project
This is an online dental store RESTful API. This backend will be used for the frontend.
It was made according to the requirements.md file and the rubric of Udacity. You can find the endpoint routes and database schema at the requirements.md file.
## Used Technologies
- PostgreSQL for the database
- Node/Express for runtime and backend
- dotenv for managing environment variables
- db-migrate for migrations
- jsonwebtoken for authentication and authorizations
- jasmine for unit and endpoint testing
- bcrypt for hashing passwords

## Installation
- run 'yarn install' to install the packages
- run 'yarn watch' to start the project

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
- From the root directory run:  db-migrate up
- For down migration run: db-migrate down


## Endpoints
- Please check the requirements.md file


## PORTS
- The backend is running on port 3000
- The database is running on port 5432

## ENVIRONMENT VARIABLES

- POSTGRES_HOST= localhost
- POSTGRES_PORT= 5432
- POSTGRES_DB= dental_store
- POSTGRES_USER= store_owner
- POSTGRES_PASSWORD= hellothere
- POSTGRES_TEST_DB= dental_store_test
- ENV= dev
- BCRYPT_PASSWORD= 12345678
- SALT_ROUNDS= 10
- TOKEN_SECRET= 123456

## Testing
Run: yarn test 
- The env variable will change to test and connect to the testing database.
