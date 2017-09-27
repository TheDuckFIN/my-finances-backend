import * as express from 'express';

import users from './routes/user-routes';

const app = express();

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('API index');
});

app.get('*', (req, res) => {
  res.status(404)
    .json({
      status: 'failure',
      message: 'Invalid request'
    });
});

app.listen(3000);
