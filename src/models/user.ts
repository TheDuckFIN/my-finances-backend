import db from '../db';
import * as bcrypt from 'bcrypt';
import * as Promise from 'bluebird';
import * as R from 'ramda';
import { pgp } from '../db';
import { User } from 'types';

export function getAll() {
  return db.any('SELECT * FROM users');
}

export function create(params: User) {
  return new Promise((resolve, reject) =>
    findByName(params.username)
      .then(
        resolve => reject('Username already in use'),
        reject => resolve(bcrypt.hash(R.prop('password', params), 10).then(hash =>
          db.none(pgp.helpers.insert(R.assoc('password', hash, params), null, 'users'))
        ))
      )
  );
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