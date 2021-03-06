import express      from 'express';
import path         from 'path';
import cors from 'cors';
import logger       from 'morgan';
import bodyParser   from 'body-parser';

import getRoutes from './src/routes';

import {initDb} from './src/sql';


const app = express();

if(process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Pass down the store object
app.use('/', getRoutes(initDb()));

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});



export default app;
