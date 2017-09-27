import db from '../db';
import * as Promise from 'bluebird';

export function getAll() {
  return new Promise((resolve, reject) => {
    db.any('SELECT * FROM users')
      .then(data => resolve(data))
      .catch(error => {
        console.error('DB error: ', error);
        reject(error);
      });
  });
}