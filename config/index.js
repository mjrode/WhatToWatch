/* eslint-disable no-undef */
const _ = require('lodash');

const env = process.env.NODE_ENV || 'local';

const envConfig = require(`./${env}`);

const defaultConfig = {
  env,
};

export default _.merge(defaultConfig, envConfig);
