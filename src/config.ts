export const env = process.env.NODE_ENV || 'dev';
export const jwtSecret = process.env.APP_SECRET || 'dev_secret (not really)';
export const port = process.env.PORT || 3000;

const db = require('../database.json')[env];

const dbConfig = {
  database:  db.database,
  host:      db.host || 'localhost',
  password:  db.password,
  port:      db.port || 5432,
  user:      db.user || process.env.USER
};

export const dbConnectionString = process.env.DATABASE_URL || `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;