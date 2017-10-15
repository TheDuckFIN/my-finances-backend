import * as Users from '../models/user';
import * as Promise from 'bluebird';
import * as bcrypt from 'bcrypt';
import * as config from '../config';
import * as R from 'ramda';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { failure } from '../utils/json-gen';
import { RequestWithAuth, User, JWTData } from 'types';

export const authenticate = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    Users.findByName(username)
      .then((user: User) => {
        bcrypt.compare(password, user.password)
          .then(result => {
            if (!result) reject('Invalid password');

            const jwtData = {
              id: user.id,
              username: user.username
            };

            jwt.sign(jwtData, config.jwtSecret, (err, token) => {
              if (err) reject('Error while generating JWT');
              resolve({token});
            });
          })
          .catch(reject);
      })
      .catch(error => reject(error));
  });
};

// Express middleware for authentication
export const requireAuthentication = (req: RequestWithAuth, res: express.Response, next: express.NextFunction) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.jwtSecret, (err: jwt.JsonWebTokenError, decoded: JWTData) => {
      if (err) {
        return res.status(403).json(failure('Failed to authenticate token'));
      } else {
        req.authData = decoded;
        next();
      }
    });
  } else {
    res.status(403).json(failure('No access token specified'));
  }
};