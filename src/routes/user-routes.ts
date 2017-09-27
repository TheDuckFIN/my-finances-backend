import * as express from 'express';
import * as users from '../queries/user-queries';

const router = express.Router();

router.get('/', (req, res) => {
  users.getAll()
    .then(users =>
      res.status(200).json(users)
    );
});

export default router;