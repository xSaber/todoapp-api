import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import * as middleware from '~/app/middleware';
import rootRouter from '~/app/routes';

const app = express();
const port = process.env.PORT || 3030;

app.use(logger('dev'));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', rootRouter);
app.use(middleware.notFound);
app.use(middleware.error);

app.listen(port, () => console.info(`Example app listening on port ${port}!`));
