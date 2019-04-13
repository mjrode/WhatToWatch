import axios from 'axios';
import parser from 'xml2json';
import buildUrlPackage from 'build-url';

const formatResponse = response => {
  const xmlResponse = response.headers['content-type'].includes('xml');
  if (xmlResponse) {
    return JSON.parse(parser.toJson(response.data));
  }
  if (response.config.url.includes('tastedive')) {
    console.log('taste dive response', response.data.Similar.Results[0]);
    return response.data.Similar.Results;
  }
  return response.data;
};

const buildUrl = function(urlParams) {
  try {
    const params = urlParams;
    const {host} = params;
    delete params.host;
    const urlHash = params;

    console.log('hash', urlHash);

    if (typeof urlHash !== 'object') {
      throw new Error(`Invalid urlParams: ${urlHash}`);
    }
    return buildUrlPackage(host, urlHash);
  } catch (error) {
    return error;
  }
};

const request = async function(url) {
  console.log('Request URL', url);
  return new Promise((resolve, reject) => {
    const httpClient = axios;
    httpClient
      .get(url)
      .then(response => {
        return resolve(formatResponse(response));
      })
      .catch(error => {
        if (error.response) {
          console.log('Error: Response --', error.response);
          console.log('Error: Status--', error.response.status);
          console.log('Error: Headers--', error.response.headers);
          return reject(error.response);
        }
        if (error.request) {
          // eslint-disable-next-line no-underscore-dangle
          console.log(error);
          console.log('Error: Request Path--', error.request._options.path);
        } else {
          console.log('Error:', error.message);
        }
        return reject(error);
      });
  });
};

const handleError = (res, method) => err => {
  console.log('Error in', method);
  const {code, message} = err.responseData || {
    code: 500,
    message: 'An unknown error occurred.',
  };
  res.status(code).json({message});
};

export default {formatResponse, buildUrl, request, handleError};
