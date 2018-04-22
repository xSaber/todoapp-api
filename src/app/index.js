import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import configureRoutes from './routes';
import { isEmpty } from 'lodash';

const app = express();
const port = process.env.PORT || 3030;

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof Error) {
    res.status(500).send(error);
    return;
  }

  next(error);
};

const jsonMiddleware = (data, req, res, next) => {
  const statusCode = isEmpty(data) ? 204 : 200;

  res.status(statusCode).send(data);

  next(data);
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
configureRoutes(app, express);

app.use(errorMiddleware);
app.use(jsonMiddleware);

app.listen(port, () => console.info(`Example app listening on port ${port}!`));
