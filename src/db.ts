import * as promise from 'bluebird';
import * as pgPromise from 'pg-promise';
import { dbConnectionString } from './config';

export const pgp: pgPromise.IMain = pgPromise({
  promiseLib: promise,
  capSQL: true,
  query: (e) => console.log('[SQL] ', e.query),
  error: (e) => console.log('[SQL ERROR]', e)
});

const db = pgp(dbConnectionString);

export default db;