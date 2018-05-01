const app = require('./app');
const port = process.env.PORT || 3030;

app.listen(port, () => console.info(`Example app listening on port ${port}!`));
