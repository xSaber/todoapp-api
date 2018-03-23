import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { routes } from './routes'

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// Require our routes into the application.
routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
