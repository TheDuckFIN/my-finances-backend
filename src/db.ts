import * as promise from 'bluebird';
import * as pgPromise from 'pg-promise';
import { dbConnectionString } from './config';

const pgp: pgPromise.IMain = pgPromise({
  promiseLib: promise
});

const db = pgp(dbConnectionString);

export default db;