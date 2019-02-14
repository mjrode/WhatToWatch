import axios from 'axios';
import buildUrl from 'build-url';
import config from '../../../config';
import formatResponse from './helpers';

function PlexApiClient(options) {
  this.setOptions(options);
}

PlexApiClient.prototype.setOptions = function(options) {
  this.options = options || {};
};

PlexApiClient.prototype.getUsersUrlParams = function() {
  return {
    host: config.plex.plexApiUrl,
    path: '/users',
    queryParams: {
      'X-Plex-Token': this.options.token || config.plex.token,
    },
  };
};

PlexApiClient.prototype.getSectionsUrlParams = function() {
  return {
    host: config.plex.plexServerUrl,
    path: '/library/sections',
    queryParams: {
      'X-Plex-Token': this.options.token || config.plex.token,
    },
  };
};

PlexApiClient.prototype.mostWatchedUrlParams = function(query) {
  return {
    host: config.plex.plexServerUrl,
    path: '/library/all/top',
    queryParams: {
      ...(query.accountID && {accountID: query.accountID}),
      ...(query.type && {type: query.type}),
      ...((query.limit && {limit: query.limit}) || {limit: 10}),
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
  console.log('Request URL', url);
  return new Promise((resolve, reject) => {
    const httpClient = this.options.httpClient || axios;
    httpClient
      .get(url)
      .then(response => {
        return resolve(formatResponse(response));
      })
      .catch(error => {
        if (error.response) {
          console.log('data', error.response.data);
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

PlexApiClient.prototype.getUsers = async function() {
  const urlParams = this.getUsersUrlParams();
  const getUsersUrl = this.buildUrl(urlParams);
  const response = await this.request(getUsersUrl);
  return response.MediaContainer.User;
};

PlexApiClient.prototype.getMostWatched = async function(query) {
  const urlParams = this.mostWatchedUrlParams(query);
  const mostWatchedUrl = this.buildUrl(urlParams);
  const response = await this.request(mostWatchedUrl);
  return response.MediaContainer.Metadata;
};

PlexApiClient.prototype.getSections = async function() {
  const urlParams = this.getSectionsUrlParams();
  const getUsersUrl = this.buildUrl(urlParams);
  const response = await this.request(getUsersUrl);
  return response.MediaContainer.Directory;
};

const plexApiClient = (options = []) => {
  return new PlexApiClient(options);
};

export default plexApiClient;
