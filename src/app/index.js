import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import configureRoutes from './routes';

const app = express();
const port = process.env.PORT || 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
configureRoutes(app, express);

app.listen(port, () => console.info(`Example app listening on port ${port}!`));
