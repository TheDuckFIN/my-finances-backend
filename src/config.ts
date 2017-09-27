export const env = process.env.APP_ENV || 'dev';

const db = require('../database.json')[env];

const dbConfig = {
  database:  db.database,
  host:      db.host || 'localhost',
  password:  db.password,
  port:      db.port || 5432,
  user:      db.user || process.env.USER
};

export const dbConnectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;