import config from './config';

const server = require('./server').default();

server.create(config);
server.start();
