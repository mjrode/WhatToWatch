import axios from 'axios';
import parser from 'xml2json';
import buildUrlLibrary from 'build-url';

const formatResponse = response => {
  const xmlResponse = response.headers['content-type'].includes('xml');
  if (xmlResponse) {
    return JSON.parse(parser.toJson(response.data));
  }
  return response.data;
};

const buildUrl = function(urlParams) {
  try {
    const params = urlParams;
    const {host} = params;
    delete params.host;
    const urlHash = params;

    return buildUrlLibrary(host, urlHash);
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
        if (error.response) {
          console.log('status', error.response.status);
          console.log('headers', error.response.headers);
          return reject(error.response);
        }
        if (error.request) {
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
        return reject(error);
      });
  });
};

export default {formatResponse, buildUrl, request};
