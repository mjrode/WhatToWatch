import axios from 'axios';
import parser from 'xml2json';
import buildUrlPackage from 'build-url';
import logger from '../../config/winston';
import { inspect } from 'util';

const formatResponse = response => {
  logger.info(
    `API request url: ${response.config.method} ${inspect(
      response.config.url,
    )}`,
  );
  logger.info(
    `API response status: ${inspect(
      response.status,
    )} API response length: ${inspect(
      response.headers['content-length'],
    )}`,
  );
  logger.silly(`API response data: ${inspect(response.data)}`);
  const xmlResponse = response.headers['content-type'].includes(
    'xml',
  );
  if (xmlResponse) {
    return JSON.parse(parser.toJson(response.data));
  }
  if (response.config.url.includes('tastedive')) {
    return response.data.Similar.Results;
  }
  return response.data;
};

const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => {
    return '%' + c.charCodeAt(0).toString(16);
  });
};

const buildUrl = function(urlParams) {
  try {
    const params = urlParams;
    const { host } = params;
    delete params.host;
    const urlHash = params;

    if (typeof urlHash !== 'object') {
      throw new Error(`Invalid urlParams: ${urlHash}`);
    }
    return buildUrlPackage(host, urlHash);
  } catch (error) {
    return error;
  }
};

const request = async function(url) {
  return new Promise((resolve, reject) => {
    const httpClient = axios;
    httpClient
      .get(url)
      .then(response => {
        return resolve(formatResponse(response));
      })
      .catch(error => {
        if (error.response) {
          logger.error(`Error: Status --, ${error.response.status}`);
          logger.error(
            `Error: Headers --, ${error.response.headers}`,
          );
          logger.error(`Error: Response --, ${error.response}`);
          return reject(error.response);
        }
        if (error.request) {
          // eslint-disable-next-line no-underscore-dangle
          logger.error(
            `Error request path: ${error.request._options.path} ${error}`,
          );
        } else {
          logger.error(`Error: ${error.message}`);
        }
        return reject(error);
      });
  });
};

const handleError = (res, method) => err => {
  logger.error(`Error in ${method}`);
  const { code, message } = err.responseData || {
    code: 500,
    message: 'An unknown error occurred.',
  };
  res.status(code).json({ message });
};

export default {
  formatResponse,
  buildUrl,
  request,
  handleError,
  fixedEncodeURIComponent,
};
