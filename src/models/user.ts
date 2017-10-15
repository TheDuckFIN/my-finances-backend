import db from '../db';
import * as bcrypt from 'bcrypt';
import * as Promise from 'bluebird';
import * as R from 'ramda';
import { pgp } from '../db';
import { User } from 'types';
import * as validator from 'validator';

function validate(params: User) {
  const errors = [];

  if (!params.username || !validator.isLength(params.username, {min: 3, max: undefined})) {
    errors.push('Username not specified or not long enough. Minimum 3 characters.');
  } else {
    if (!validator.isAlphanumeric(params.username)) errors.push('Username must be alphanumeric');
  }
  if (!params.password || !validator.isLength(params.password, {min: 8, max: undefined})) {
    errors.push('Password not specified or not long enough. Minimum 8 characters.');
  }

  if (errors.length > 0) {
    return Promise.reject(errors);
  } else {
    return Promise.resolve();
  }
}

export function getAll() {
  return db.any('SELECT * FROM users');
}

export function create(params: User) {
  return new Promise((resolve, reject) =>
    validate(params)
      .then(
        resolve => findByName(params.username),
        err => reject(err)
      )
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