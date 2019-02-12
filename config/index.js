/* eslint-disable no-undef */
const _ = require('lodash');

const env = process.env.NODE_ENV || 'local';

const envConfig = require(`./${env}`);
const plexConfig = require('./plex').default;

const defaultConfig = {
  env,
};

export default {env: _.merge(defaultConfig, envConfig), plex: plexConfig};
