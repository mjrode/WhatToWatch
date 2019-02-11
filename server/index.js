const express = require('express');

const bodyParser = require('body-parser');

module.exports = function() {
  const server = express();

  let create;

  let start;

  create = function(config) {
    const routes = require('./routes');

    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);
    server.set('viewDir', config.viewDir);

    // Returns middleware that parses json
    server.use(bodyParser.json());

    // Set up routes
    routes.init(server);
  };

  start = function() {
    const hostname = server.get('hostname');

    const port = server.get('port');

    server.listen(port, function() {
      console.log(`Express server listening on - http://${hostname}:${port}`);
    });
  };

  return {
    create,
    start,
  };
};
