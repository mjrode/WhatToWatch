
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./services/plex/route');

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
