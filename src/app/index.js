require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const middleware = require('./middleware');
const rootRouter = require('./routes');

const app = express();
const port = process.env.PORT || 3030;

app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', rootRouter);
app.use(middleware.notFound);
app.use(middleware.error);

app.listen(port, () => console.info(`Example app listening on port ${port}!`));

module.exports = app;
