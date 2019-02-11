import express from 'express';
import {json} from 'body-parser';

const routes = require('./routes').default;

export default () => {
  const server = express();

  const create = config => {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    // Returns middleware that parses json
    server.use(json());

    // Set up routes
    routes.init(server);
  };

  const start = () => {
    const hostname = server.get('hostname');

    const port = server.get('port');

    server.listen(port, () => {
      console.log(`Express server listening on - http://${hostname}:${port}`);
    });
  };

  return {create, start};
};
