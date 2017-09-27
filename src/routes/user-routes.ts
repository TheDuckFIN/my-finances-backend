import * as express from 'express';
import * as Users from '../queries/user';
import * as R from 'ramda';
import * as bcrypt from 'bcrypt';
import { success, failure } from '../utils/json-gen';
import { requireAuthentication } from '../utils/authentication';

const router = express.Router();

router.get('/', (req, res) => {
  Users.getAll()
    .then(users =>
      res.status(200).json(success(users))
    )
    .catch(error => res.status(400).json(failure(error)));
});

router.post('/new', (req, res) => {
  const parameters = R.pickAll(['username', 'password'], req.body);

  bcrypt.hash(R.prop('password', parameters), 10).then(hash =>
    Users.create(R.assoc('password', hash, parameters))
      .then(() => res.status(200).json(success()))
      .catch(error => {
        res.status(400).json(failure(error));
      })
  );
});

router.get('/test', requireAuthentication, (req, res) => {
  res.status(200).json(success({fuck: 'yeah'}));
});

export default router;