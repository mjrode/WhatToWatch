import config from './config';

const server = require('./server')();

server.create(config);
server.start();
