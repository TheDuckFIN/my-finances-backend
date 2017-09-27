import * as express from 'express';
import { success, failure } from '../utils/json-gen';
import * as R from 'ramda';
import { authenticate } from '../utils/authentication';

import users from './user-routes';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json(success()));

router.post('/authenticate', (req, res) => {
  const {username, password} = R.pickAll(['username', 'password'], req.body);
  authenticate(username, password)
    .then(token => res.status(200).json(success(token)))
    .catch(error => res.status(400).json(failure(error)));
});

router.use('/users', users);

export default router;