import axios from 'axios';
import parser from 'xml2json';
import buildUrlPackage from 'build-url';

const formatResponse = response => {
  const xmlResponse = response.headers['content-type'].includes('xml');
  if (xmlResponse) {
    return JSON.parse(parser.toJson(response.data));
  }
  if (response.config.url.includes('tastedive')) {
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

    return buildUrlPackage(host, urlHash);
  } catch (error) {
    console.log(error);
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
        console.log(error);
        if (error.response) {
          console.log('Status Error--', error.response.status);
          console.log('Headers Error--', error.response.headers);
          return reject(error.response);
        }
        if (error.request) {
          console.log('Request Error--', error.request);
        } else {
          console.log('Error', error.message);
        }
        return reject(error);
      });
  });
};

const handleError = (res, method) => err => {
  console.log('Error in', method);
  console.log(err);
  const {code, message} = err.responseData || {
    code: 500,
    message: 'An unknown error occurred.',
  };
  res.status(code).json({message});
};

export default {formatResponse, buildUrl, request, handleError};
