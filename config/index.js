/* eslint-disable no-undef */
require('custom-env').env();
require('dotenv').config();
const _ = require('lodash');

const env = process.env.NODE_ENV || 'local';

const envConfig = require(`./${env}`).default;
const plexConfig = require('./plex').default;

const defaultConfig = {
  env,
};
export default {server: _.merge(defaultConfig, envConfig), plex: plexConfig};
