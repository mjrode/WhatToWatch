import axios from 'axios';
import buildUrl from 'build-url';
import parser from 'xml2json';
import config from '../../../config';

// const url = require('url');

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
      'X-Plex-Token': this.options.token,
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
        return resolve(parser.toJson(response.data));
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

// console.log(PlexApiClient.prototype);
export default PlexApiClient;
// const options = {token: config.plex.token};
// const PlexApi = new PlexApiClient(options);
// const urlParams = PlexApi.getUsersUrlParams();
// const url = PlexApi.buildUrl(urlParams);
// const result = PlexApi.request(url);
// const plexUrl = buildUrl(config.plex.url, {
//   path: '/library/sections',
//   port: '32400',
//   queryParams: {
//     'X-Plex-Token': config.plex.token,
//   },
// });

// const constructPlexUrl = urlParams => {
//   const params = urlParams();
//   const {host} = params;
//   delete params.host;
//   const urlHash = params;

//   return buildUrl(host, urlHash);
// };

// const request = options => {

// };

// // console.log(
// //   url.parse('https://plex.tv/api/users?&X-Plex-Token=hhnKQYskVjepfkhixqJu'),
// // );

// const usersUrl = constructPlexUrl(getUsersUrlParams);

// request(usersUrl);
// // console.log(request(usersUrl));
