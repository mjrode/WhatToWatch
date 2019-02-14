import config from './config';

require('dotenv').config()

const server = require('./server').default();

server.create(config);

server.start();

export default server.create(config);
