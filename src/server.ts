import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import apiIndex from './routes/index';
import { failure } from './utils/json-gen';
import * as config from './config';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', apiIndex);

app.get('/', (req, res) => {
  res.send('API is located at /api');
});

app.all('*', (req, res) => {
  res.status(400)
    .json(failure({
      message: 'Invalid request: not found'
    }));
});

app.listen(config.port, () => console.log('Listening on port ' + config.port));
