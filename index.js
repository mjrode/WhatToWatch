import config from './config';

const server = require('./server').default();

server.create(config.env);

server.start();

export default server.create(config.env);
