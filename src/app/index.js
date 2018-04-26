import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import * as controllers from '~/app/controllers';
import * as middleware from './middleware';
import configureRoutes from './routes';

const app = express();
const port = process.env.PORT || 3030;

app.use(logger('dev'));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
configureRoutes(app, express, controllers);

app.use(middleware.notFound);
app.use(middleware.error);

app.listen(port, () => console.info(`Example app listening on port ${port}!`));
