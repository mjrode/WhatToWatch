import express from 'express';
import { json, urlencoded } from 'body-parser';

import './services/plex/route';

const app = express();

const port = 8000;
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
