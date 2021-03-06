import * as express from 'express';
import * as Users from '../models/user';
import * as R from 'ramda';
import { success, failure } from '../utils/json-gen';
import { requireAuthentication } from '../utils/authentication';
import { User } from 'types';

const router = express.Router();

router.get('/', (req, res) => {
  Users.getAll()
    .then(users =>
      res.status(200).json(success(users))
    )
    .catch(error => res.status(400).json(failure(error)));
});

router.post('/create', (req, res) => {
  const parameters: User = R.pickAll(['username', 'password'], req.body);

  Users.create(parameters)
    .then(() => res.status(200).json(success()))
    .catch(error => {
      res.status(400).json(failure(error));
    });
});

router.get('/test', requireAuthentication, (req, res) => {
  res.status(200).json(success({fuck: 'yeah'}));
});

export default router;