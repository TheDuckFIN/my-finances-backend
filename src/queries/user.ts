import db from '../db';
import * as Promise from 'bluebird';
import { pgp } from '../db';

export function getAll() {
  return db.any('SELECT * FROM users');
}

export function create(details: object) {
  return db.none(pgp.helpers.insert(details, null, 'users'));
}

export function findByName(username: string) {
  return new Promise((resolve, reject) => {
    db.one('SELECT * FROM users WHERE LOWER(username) = LOWER($1)', username)
      .then(resolve)
      .catch(error => {
        if (error instanceof pgp.errors.QueryResultError) {
          reject('User not found');
        } else {
          reject(error);
        }
      });
  });
}