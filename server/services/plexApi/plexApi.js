import axios from 'axios';
import buildUrl from 'build-url';
import parser from 'xml2json';
import config from '../../../config';

function PlexApiClient(options) {
  this.setOptions(options);
}

PlexApiClient.prototype.setOptions = function(options) {
  this.options = options || {};
};

PlexApiClient.prototype.getUsersUrlParams = function() {
  return {
    host: 'https://plex.tv',
    path: '/api/users',
    queryParams: {
      'X-Plex-Token': this.options.token || config.plex.token,
    },
  };
};

PlexApiClient.prototype.buildUrl = function(urlParams) {
  const params = urlParams;
  const {host} = params;
  delete params.host;
  const urlHash = params;

  return buildUrl(host, urlHash);
};

PlexApiClient.prototype.request = async function(url) {
  return new Promise((resolve, reject) => {
    const httpClient = this.options.httpClient || axios;
    httpClient
      .get(url)
      .then(response => {
        return resolve(JSON.parse(parser.toJson(response.data)));
      })
      .catch(error => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('data', error.response.data);
          console.log('status', error.response.status);
          console.log('headers', error.response.headers);
          return reject(error.data);
        }
        if (error.request) {
          // The request was made but no response was received
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
        return reject(error);
      });
  });
};

PlexApiClient.prototype.getUsers = function() {
  const urlParams = this.getUsersUrlParams();
  console.log('URL params', urlParams);
  const getUsersUrl = this.buildUrl(urlParams);
  console.log('mike', getUsersUrl);
  return this.request(getUsersUrl);
};

const plexApiClient = (options = []) => {
  return new PlexApiClient(options);
};

export default plexApiClient;

// const options = {token: config.plex.token};
// const PlexApi = new PlexApiClient(options);
// const urlParams = PlexApi.getUsersUrlParams();
// const url = PlexApi.buildUrl(urlParams);
// console.log(url)
// const result = PlexApi.request(url);
