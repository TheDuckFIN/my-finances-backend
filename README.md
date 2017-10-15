# my-finances-backend

[![Build Status](https://travis-ci.org/TheDuckFIN/my-finances-backend.svg?branch=master)](https://travis-ci.org/TheDuckFIN/my-finances-backend)

## Deployment
At the moment, just push to git and travis will build a docker image and push it to heroku. The application will run at http://myfinances-api.herokuapp.com

## Migrations
To create a new database migration, use `db-migrate create <migration_name>`. To run migrations, use `db-migrate up/down`.

## Local development
1. Set up postgresql and create database `myfinances_dev`. Alternatively, edit database.json to match your database setup.
1. `yarn install`
2. `yarn run start:dev`

Alternate way is using docker and `docker-compose up` but that is not a good dev environment right now, because it mimics production environment. I'll maybe fix this someday.