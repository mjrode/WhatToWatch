import express from 'express';
import {json, urlencoded} from 'body-parser';
import {sequelize} from './models';

const routes = require('./routes').default;

export default () => {
  const server = express();

  const create = config => {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.server.port);
    server.set('hostname', config.server.hostname);

    // Returns middleware that parses json
    server.use(json());
    server.use(urlencoded({extended: true}));

    // Set up routes
    routes.init(server);
    return server;
  };

  const start = () => {
    const hostname = server.get('hostname');

    const port = server.get('port');

    sequelize.sync().then(() => {
      server.listen(port, () => {
        console.log(`Express server listening on - http://${hostname}:${port}`);
      });
    });
  };

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

  return {create, start};
};
