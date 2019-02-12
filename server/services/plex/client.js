import axios from 'axios';
import config from '../../../config';

const url = require('url');
const buildUrl = require('build-url');

const plexUrl = buildUrl(config.plex.url, {
  path: '/library/sections',
  port: '32400',
  queryParams: {
    'X-Plex-Token': config.plex.token,
  },
});

const getUsersUrlParams = () => ({
  host: 'https://plex.tv',
  path: '/api/users',
  queryParams: {
    'X-Plex-Token': config.plex.token,
  },
});

const constructPlexUrl = urlParams => {
  const params = urlParams();
  const {host} = params;
  delete params.host;
  const urlHash = params;

  return buildUrl(host, urlHash);
};

const request = options => {
  const opts = options || {};
  const plexUrl = typeof options === 'string' ? options : options.url;
  const httpClient = opts.httpClient || axios;

  httpClient
    .get(plexUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log('headers', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

// console.log(
//   url.parse('https://plex.tv/api/users?&X-Plex-Token=hhnKQYskVjepfkhixqJu'),
// );

const usersUrl = constructPlexUrl(getUsersUrlParams);

request(usersUrl);
// console.log(request(usersUrl));
